require('dotenv').config();
const pg = require('pg');
const { Pool } = pg;
const { ethers, isAddress } = require('ethers');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');


// ethers js config
const tokenAbi = require('../ContractABI/Definitivo.json')['abi'];
const CONTRACT_ADDRESS = '0xB42A840A256fc60a155922F0Ef4D04d54c426027';

const provider = new ethers.InfuraProvider('sepolia', process.env.INFURA_API);
const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contract = new ethers.Contract(CONTRACT_ADDRESS, tokenAbi, provider);
const contractSigner = contract.connect(signer);

// Data base config
const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

// Cloudinady config
cloudinary.config({
    cloud_name: 'dxf02usq1',
    api_key: '923797376654348',
    api_secret: process.env.CLOUDINARY_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: (req, file) => {
        const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const format = file.mimetype === 'image/svg+xml' ? 'svg' : file.mimetype.split('/')[1];
        return {
            folder: 'uploads',
            format: format,
            public_id: uniqueName,
            resource_type: 'image',
            allowedFormats: ['jpg', 'png', 'jpeg', 'svg']
        }
    },
});
//-------------------------------------------------------------------------------------------------

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, './upload')
//     },
//     filename: function (req, file, cb) {
//       const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9)
//       cb(null, `${uniqueName}.${file.mimetype.split('/')[1]}`)
//     }
//   })
  
const upload = multer({ storage: storage });

const express = require('express');
const router = express.Router();

router.post("/add", upload.single('imageURL'), async (req, res) => {
    if(!req.body.name) {
        res.status(400).send("Name field must not be empty");
        return;
    }
    if(!req.body.acronym) {
        res.status(400).send("Acronym field must not be empty");
        return;
    }
    if(!req.body.description || req.body.description.length < 20) {
        res.status(400).send("Description field must not be empty or have less than 20 characters");
        return;
    }
    if(!req.body.members) {
        res.status(400).send("Members field must not be empty");
        return;
    }
    if(!req.body.sector) {
        res.status(400).send("Sector field must not be empty");
        return;
    }
    if(!req.body.tokenBenefits) {
        res.status(400).send("Token Benefits field must not be empty");
        return;
    }
    if(!req.body.price || isNaN(req.body.price)) {
        res.status(400).send("You must add a price");
        return;
    }
    if(!req.file) {
        res.status(400).send("Token must have an image");
        return;
    }

    if(!req.body.publicKey) return res.status(400).send("publicKey field must not be empty");
    if(!req.body.tokenAmount) return res.status(400).send("tokenAmount field must not be empty or equal to 0");

    //Gets the last generated value in the id column of token via the public.token_id_seq and 
    //adds 1 to get the id that will be generated in the insert of this company
    let tokenId = await makeQuery("SELECT last_value FROM public.token_id_seq");
    tokenId = parseInt(tokenId.rows[0].last_value) + 1;

    //Creates the token in the Block-Chain
    const makeToken = await createToken(req.body.publicKey, tokenId, req.body.tokenAmount, req.body.price, '0x');
    if(!makeToken) return res.status(500).send("Something whent wrong when creating token");

    //Pins the json file to IPFS via pinata
    const tokenJson = {
        id: tokenId,
        name: req.body.name,
        acronym: req.body.acronym,
        description: req.body.tokenBenefits,
        image: req.file.path,
        price: req.body.price,
        totalAmount: req.body.tokenAmount
    }

    const uploadPinata = await uploadJsonPinata(tokenId, tokenJson);
    if(!uploadPinata) return res.status(500).send("Something went wrong when uploading token info to IPFS");

    //Insert Tables in Data Base
    await makeQuery('BEGIN');
    const insertCompany = await makeQuery('INSERT INTO company (name, description, members, sector, "imageURL", public_key) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id', [req.body.name, req.body.description, req.body.members, req.body.sector, req.file.path, req.body.publicKey]);
    const insertToken = await makeQuery("INSERT INTO token (company_id, ipfs_hash) VALUES ($1, $2)", [insertCompany.rows[0].id, uploadPinata.IpfsHash]);
    if(!insertCompany || !insertToken) return res.status(400).send("Error while registering data in the database");
    await makeQuery('COMMIT');

    res.sendStatus(200);
}, (err, req, res, next) => {
    // Manejo de errores
    console.error(err); // Muestra el error completo en la consola para facilitar la depuración
    res.status(500).json({ error: err.message || 'Ocurrió un error al subir el archivo.' });
});

router.get('/all', async (req, res) => {
    const query = await makeQuery('SELECT company.*, token.ipfs_hash FROM token INNER JOIN company ON token.company_id = company.id');
    if(!query) {
        res.sendStatus(502);
        return;
    }

    let result = []

    for (i in query.rows) {
        result.push({
            tokenData: await fetchTokenIpfs(query.rows[i].ipfs_hash),
            companyData: query.rows[i]
        })
    }

    res.status(200).json(result);
});

router.get('/get/:id', async (req, res) => {
    const id = req.params.id;
    if (!id) return res.status(400).send('ID must be included');

    const query = await makeQuery('SELECT company.*, token.ipfs_hash FROM token INNER JOIN company ON token.company_id = company.id WHERE token.id = $1', [id]);
    if(query.rows.length == 0) return res.status(400).send("Token id doesn't exist");

    const tokenData = await fetchTokenIpfs(query.rows[0].ipfs_hash);
    if(!tokenData) return res.status(400).send("Error while retriving data from IPFS");

    result = {
        tokenData: tokenData,
        companyData: query.rows[0]
    }

    res.status(200).json(result);
});

router.get('/owned/:address', async (req, res) => {
    const address = req.params.address;
    if(!address || !isAddress(address)) return res.status(400).send("Address isn't valid");

    const owned = await getTokensFromAddress(address);
    res.status(200).json(owned);
});

router.get('/transactions/:address', async (req, res) => {
    const address = req.params.address;
    if(!address || !isAddress(address)) return res.status(400).send("Address isn't valid");

    const txs = await getTransactions(address);

    const serializedTxs = JSON.stringify(txs, (_, value) =>
        typeof value === "bigint" ? value.toString() : value
    );

    res.status(200).send(serializedTxs);
});

router.post('/balance', async (req, res) => {
    const publicKey = req.body.publicKey;
    const tokenID = req.body.tokenID;

    if(!publicKey || tokenID == null) {
        res.status(400).send("publicKey or tokenID can't be empty");
        return;
    }

    const validTokenID = await makeQuery('SELECT id FROM token WHERE id = $1', [tokenID]);
    if(!validTokenID.rows.length) return res.status(400).send("tokenID doesn't exist or is invalid");

    const balance = await getBalance(publicKey, tokenID);
    if(balance == null) return res.status(500).send("Something went wrong when getting balance");

    return await res.status(200).send(`${balance}`);
});

const makeQuery = async (query, params) => {
    const _params = params ? params : []

    const client = await pool.connect();
    let result;
    try{
        result = await client.query(query, _params)
    } catch (err) {
        console.log(`Error: ${err}`);
    } finally {
        client.release();
    }

    return result;
}

// If the function returns false is because something has failed in the creation of the token
const createToken = async (publicKey, tokenID, amount, price, data) => {

    try {
        const tx = await contractSigner.mint(publicKey, tokenID, amount, price, data);
        const receipt = await tx.wait();

        if(receipt.status === 1) {
            console.log('Mint succesful');
            return true;
        }
        else { 
            console.log('Mint failed');
            return false;
        }

    } catch (error) {
        console.error(`Error minting token: ${error}`);
        return false;
    }
}

const getBalance = async (publicKey, tokenID) => {
    let balance;
    try {
        balance = await contract.balanceOf(publicKey, tokenID);

    } catch(error) {
        console.error(`Error getting balance: ${error}`);
    }

    return balance;
}

const uploadJsonPinata = async (tokenId, tokenJson) => {
    try {
        const data = JSON.stringify({
            pinataContent: tokenJson,
            pinataOptions: {
                groupId: '28a4a187-079c-40b3-8e9f-2b235b1ef452'
            },
            pinataMetadata: {
                name: `${tokenId}`
            }
        });

        const res = await fetch("https://api.pinata.cloud/pinning/pinJSONToIPFS", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.PINATA_JWT}`,
        },
        body: data,
        });
        const resData = await res.json();
        return resData;

    } catch (error) {
        console.log(error);
        return false;
    }
}

const getDataPinata = async (tokenId) => {
    try {
        const queryParams = new URLSearchParams({
            groupId: "28a4a187-079c-40b3-8e9f-2b235b1ef452",
            'metadata[name]': tokenId ? tokenId : ""
        });

        const res = await fetch(`https://api.pinata.cloud/data/pinList?${queryParams}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${process.env.PINATA_JWT}`
            },
        });

        const data = await res.json();

        // Verifica si hay resultados
        if (data.count > 0) {
            return data.rows;
        } else {
            return false;
        }
    } catch (error) {
        console.error("Error buscando archivo en Pinata:", error);
        return false;
    }
}

const fetchTokenIpfs = async (ipfsPinHash) => {
    try {
        const result = await fetch(`https://gateway.pinata.cloud/ipfs/${ipfsPinHash}`,{
            method: 'GET'
        });
        
        if(!result.ok) return false;

        const data = await result.json();
        return data;

    } catch (error) {
        console.error("Error buscando archivo en Pinata:", error);
        return false;
    }
}

const getTokenData = async (tokenId) => {
    const tokenHash = await getDataPinata(tokenId);
    if (!tokenHash) return []; // Maneja el caso en que no haya hashes

    // Procesa las solicitudes en paralelo
    const tokenData = await Promise.all(
        tokenHash.map(async (hashItem) => {
            const hash = hashItem.ipfs_pin_hash;
            return await fetchTokenIpfs(hash); // Devuelve los datos o null si falla
        })
    );

    return tokenData;
}

const getTokensFromAddress = async (address) => {
    const transferSingleFilter = contract.filters.TransferSingle(null, null, address);
    const tokenSoldFilter = contract.filters.TokenSold(address, null, null);

    const singleEvents = await contract.queryFilter(transferSingleFilter, 0, "latest");
    const soldEvents = await contract.queryFilter(tokenSoldFilter, 0, "latest");

    let ownedTokens = [];

    singleEvents.forEach(event => {
        const tokenId = parseInt(event.args.id)
        const amount = parseInt(event.args.value);

        if(ownedTokens.some(element => element.id == tokenId)){
            let token = ownedTokens.find(element => element.id == tokenId);
            token.amount += amount;
        }
        else {
            ownedTokens.push({
                id: tokenId,
                amount: amount
            })
        }
    })

    soldEvents.forEach((event) => {
        const tokenId = parseInt(event.args.tokenId);
        const amount = parseInt(event.args.amount);

        if(event.args.seller.toString() != event.args.buyer.toString()){
            if(ownedTokens.some(element => element.id == tokenId)){
                let token = ownedTokens.find(element => element.id == tokenId);
                token.amount -= amount;
            }
        }
    });

    ownedTokens = ownedTokens.filter(token => token.amount > 0);

    return ownedTokens;
}

const getTransactions = async (address) => {
    const sellerFilter = contract.filters.TokenSold(address, null, null);
    const buyerFilter = contract.filters.TokenSold(null, address, null);

    // Get the events that match the filters
    const sellerEvents = await contract.queryFilter(sellerFilter, 0, "latest");
    const buyerEvents = await contract.queryFilter(buyerFilter, 0, "latest");

    // Combine the events avoiding duplicates
    const allEvents = [
        ...sellerEvents.map(event => event.args), 
        ...buyerEvents
            .filter(event => !sellerEvents.includes(event))
            .map(event => event.args)
    ];

    return allEvents
}

module.exports = router;