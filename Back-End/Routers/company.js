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

    const result = await makeQuery('INSERT INTO company (name, description, members, sector, "imageURL", "tokenBenefits", "tokenImageURL", "tokenID") VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', [req.body.name, req.body.description, req.body.members, req.body.sector, req.body.imageURL, req.body.tokenBenefits, req.body.tokenImageURL, req.body.tokenID]);

    if(!result) {
        res.sendStatus(400);
        return;
    }
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

const createToken = async () => {
    const provider = new ethers.InfuraProvider('sepolia', process.env.INFURA_API);
    const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider)
    const abi = await getAbi('./ContractABI/MyToken.json');
    const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, provider);
    const contractSigner = contract.connect(signer);

    try {
        const tx = await contractSigner.mint('0x6Fdc66cf1c2D108e3eAe95DfBa6FeffCcF90F932', 0, 50, '0x');
        const receipt = await tx.wait();

        if(receipt.status === 1) console.log('Mint succesful');
        else console.log('Mint failed');

        const numero = await contract.balanceOf('0x6Fdc66cf1c2D108e3eAe95DfBa6FeffCcF90F932', 0);
        console.log(numero)

    } catch (error) {
        console.error(`Error minting token: ${error}`);
    }
}

const getAbi = async (path) => {
    const data = await fsPromises.readFile(path, 'utf8');
    const abi = JSON.parse(data)['abi'];
    return abi
}

module.exports = router;