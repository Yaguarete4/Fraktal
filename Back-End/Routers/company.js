require('dotenv').config();
const pg = require('pg');
const { Pool } = pg;
const { ethers } = require('ethers');

const fs = require('fs')
const fsPromises = fs.promises;

const CONTRACT_ADDRESS = '0xb1E3c3bf25ce15C4B557ad83d8D897E17A47771D';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

const express = require('express');
const router = express.Router();

router.post("/add", async (req, res) => {
    if(!req.body.name) {
        res.status(400).send("Name field must not be empty");
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
    if(!req.body.tokenID) {
        res.status(400).send("Token ID field must not be empty");
        return;
    }
    if(!req.body.publicKey) return res.status(400).send("publicKey field must not be empty");
    if(!req.body.tokenAmount) return res.status(400).send("tokenAmount field must not be empty or equal to 0");

    //chaeck if tokenID already exist
    const validTokenID = await makeQuery('SELECT "tokenID" FROM company WHERE "tokenID" = $1', [req.body.tokenID]);
    if(validTokenID.rows.length !== 0) return res.status(400).send("tokenID already exist");

    const makeToken = await createToken(req.body.publicKey, req.body.tokenID, req.body.tokenAmount, '0x');
    if(!makeToken) return res.status(500).send("Something whent wrong when creating token");

    const result = await makeQuery('INSERT INTO company (name, description, members, sector, "imageURL", "tokenBenefits", "tokenImageURL", "tokenID") VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', [req.body.name, req.body.description, req.body.members, req.body.sector, req.body.imageURL, req.body.tokenBenefits, req.body.tokenImageURL, req.body.tokenID]);

    if(!result) return res.status(400).send("Error while registering data in the database");

    res.sendStatus(200);
})

router.get('/all', async (req, res) => {
    const result = await makeQuery('SELECT * FROM company');
    if(!result) {
        res.sendStatus(502);
        return;
    }
    res.json(result.rows).status(200);

    createToken();
});

router.post('/balance', async (req, res) => {
    const publicKey = req.body.publicKey;
    const tokenID = req.body.tokenID;

    if(!publicKey || tokenID == null) {
        res.status(400).send("publicKey or tokenID can't be empty");
        return;
    }

    const validTokenID = await makeQuery('SELECT "tokenID" FROM company WHERE "tokenID" = $1', [tokenID]);
    if(!validTokenID) return res.status(400).send("tokenID doesn't exist or is invalid");

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
const createToken = async (publicKey, tokenID, amount, data) => {
    const provider = new ethers.InfuraProvider('sepolia', process.env.INFURA_API);
    const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
    const abi = await getAbi('./ContractABI/MyToken.json');
    const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, provider);
    const contractSigner = contract.connect(signer);

    try {
        const tx = await contractSigner.mint(publicKey, tokenID, amount, data);
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
    const provider = new ethers.InfuraProvider('sepolia', process.env.INFURA_API);
    const abi = await getAbi('./ContractABI/MyToken.json');
    const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, provider);
    let balance;
    try {
        balance = await contract.balanceOf(publicKey, tokenID);

    } catch(error) {
        console.error(`Error getting balance: ${error}`);
    }

    return balance;
}

const getAbi = async (path) => {
    const data = await fsPromises.readFile(path, 'utf8');
    const abi = JSON.parse(data)['abi'];
    return abi
}

module.exports = router;