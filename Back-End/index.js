require('dotenv').config;
const express = require('express');
const app = express();

app.use(express.json());

app.use('/company', require('./Routers/company'));
app.get('/', (_, _) => console.log("API is running..."));

app.listen(3000, () => {
    console.log("Server listening on Port 3000")
});