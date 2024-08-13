require('dotenv').config;
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({
    origin: ['https://fraktal.vercel.app', 'http://localhost:5173'],
    credentials: true,
    allowedHeaders: 'Set-Cookie',
    optionsSuccessStatus: 200
}));

app.use(express.json());

app.use('/company', require('./Routers/company'));
app.use('/auth', require('./Routers/authentication').router);


app.get('/', (req, res) => res.send("API is running...").status(200));

app.listen(3000, () => {
    console.log("Server listening on Port 3000")
});