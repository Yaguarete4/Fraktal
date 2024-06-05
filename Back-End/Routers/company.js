require('dotenv').config();
const pg = require('pg');
const { Pool } = pg;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

const express = require('express');
const router = express.Router();

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
});

module.exports = router;