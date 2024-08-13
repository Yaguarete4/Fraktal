const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const router = express.Router();
require('dotenv').config();


var jwt = require('jsonwebtoken');
const pg = require('pg');
const { Pool } = pg;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

router.use(cookieParser());

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

router.post('/register', async (req, res) => {
    let credential = {
        success: false,
        message: null,
        accessToken: null
    };

    if(!req.body.email) {
        credential.message = "El email n puede estar vacio";
        return res.status(400).json(credential);
    } 
    else if (!req.body.username) {
        credential.message = "El usename no puede estar vacio";
        return res.status(400).json(credential);
    }

    const {rows} =  await makeQuery(`SELECT username FROM users WHERE username = $1`, [req.body.username.toString()]);
    const email = await makeQuery('SELECT email FROM users WHERE email = $1', [req.body.email.toString()]);

    const password = req.body.password && req.body.password.toString();
    const confirmPassword = req.body.confirmPassword && req.body.confirmPassword.toString();

    if(rows.length != 0) {
        credential.message = "El usuario ya esta registrado, por favor use otro";
    }
    else if(email.rows.length != 0) {
        credential.message = "El email ya esta existe, por favor use otro";
    }
    else if(!req.body.email.includes('@')){
        credential.message = "El email no es valido"
    }
    else if(password != confirmPassword || !password || !confirmPassword){
        credential.message = "Las contraseñas no coinciden";
    }
    else if(!req.body.name || !req.body.surname){
        credential.message = "El nombre y el apellido no puede estar vacio";
    }
    else {
        credential.success = true;
        credential.accessToken = generateAccessToken({username: req.body.username});
        credential.message = "Inicio de sesion exitoso"
    
        refreshToken = getRefreshToken({username: req.body.username});
    
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true
        });
     
        const hashedPassword = await bcrypt.hash(password, 10);
        await makeQuery('INSERT INTO users (username, name, surname, email, password, refreshToken) VALUES ($1, $2, $3, $4, $5, $6)', [req.body.username, req.body.name, req.body.surname, req.body.email, hashedPassword, refreshToken]);
    }

    res.status(200).json(credential);
});

router.delete('/deleteAccount', authenticateToken, async (req, res) => {
    const password = req.body.password ? req.body.password : "";
    const query = await makeQuery('SELECT password FROM users WHERE username = $1', [req.user.username]);
    if(query.rows.length === 0){
        res.sendStatus(403);
        return;
    }
    
    const passwordChecked = await bcrypt.compare(password, query.rows[0].password);
    console.log(passwordChecked);
    if(!passwordChecked){
        res.sendStatus(403);
        return;
    }

    const success = await makeQuery('DELETE FROM users WHERE username = $1', [req.user.username]);
    if(!success) return res.sendStatus(500);

    res.sendStatus(200);
});

router.get('/authenticate', authenticateToken, (req, res) => {
    res.json(req.user);
});

router.post('/login', async (req, res) => {

    const {rows} =  await makeQuery(`SELECT password, username FROM users WHERE username = $1 OR email = $2`, [req.body.usernameEmail, req.body.usernameEmail]);
    passwordChecked = (rows.length != 0 && req.body.password) && await bcrypt.compare(req.body.password.toString(), rows[0].password);

    let credential = {
        success: false,
        message: null,
        accessToken: null
    };    

    if(rows.length == 0) {
        credential.message = "El correo no existe";
    }
    else if(!passwordChecked){
        credential.message = "La constraseña es incorrecta";
    }
    else {
        const payload = {
            username: rows[0].username
        }

        credential.success = true;
        credential.message = "Inicio de sesion exitoso"
        credential.accessToken = generateAccessToken(payload);

        res.cookie('refreshToken', await updateRefreshToken(payload), {
            httpOnly: true
        });
    }

    res.json(credential);
});

router.delete('/logout', async (req, res) => {
    res.clearCookie('refreshToken');
    const success = await deleteRefreshToken(req.cookies.refreshToken);
    if(!success) return res.sendStatus(500);

    res.sendStatus(200);
});

router.get('/token', async (req, res) => { 
    const refreshToken = req.cookies.refreshToken;
    let sqlRefreshToken = await makeQuery('SELECT refreshtoken FROM users WHERE refreshtoken = $1', [refreshToken]);
    sqlRefreshToken = sqlRefreshToken.rows;
    if(!refreshToken) return res.sendStatus(401);
    if(sqlRefreshToken.length == 0) return res.sendStatus(403);

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, payload) => {
        if(err) return res.sendStatus(403);

        res.cookie('refreshToken', await updateRefreshToken(payload), {
            httpOnly: true
        });

        res.json(generateAccessToken({
            email: payload.email
        }));
    });
});

router.get('/tablas', async (req, res) => {
    const [query] = await connection.query('SELECT * FROM users');
    res.json(query);
});

async function comparePassword(email, password){
    const [query] = await connection.query('SELECT password FROM Users WHERE email = ?', [user]);
    if(query.length === 0){
        return false;
    } else {
        return await bcrypt.compare(password, query[0].password);
    }
}

function generateAccessToken(payload){
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '30m'});
}

async function updateRefreshToken(payload){
    const refreshToken = getRefreshToken(payload);
    //falta implementacion de error si falla la query
    const query = await makeQuery('UPDATE users SET refreshtoken = $1 WHERE username = $2', [refreshToken, payload.username]);
    return refreshToken;
}

function getRefreshToken(payload){
    const user = {
        username: payload.username
    }
    
    refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '1d'});
    return refreshToken;
}

async function deleteRefreshToken(token){
    const query = await makeQuery('UPDATE users SET refreshtoken = NULL WHERE refreshtoken = $1', [token]);
    if(!query) return false;
    return true;
}

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    //Si authHeader != "" o null, entonces asignarle el string del token
    const token = authHeader && authHeader.split(' ')[1];

    if(token == null) return res.sendStatus(401);
    
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
        if(err) return res.sendStatus(403);
        req.user = {
            username: payload.username
        };
        next();
    })
}

module.exports = {
    router,
    authenticateToken
};