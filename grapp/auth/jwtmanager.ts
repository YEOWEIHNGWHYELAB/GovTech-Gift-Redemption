import express, { Request, Response } from 'express';
const { Pool } = require('pg');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

// Provides the JWT Options
const jwtOptions = () => {
    const token_id = crypto.randomBytes(16).toString('hex');
    const options = { algorithm: 'HS256', expiresIn: '1h', jwtid: token_id };
    return options;
}

// Generate the JWT token
async function generateToken(user : String, res : Response, isRegister = false) {
    const payload = { username: user };
    const options = jwtOptions();

    try {
        // Token is valid, sign it and return the token string
        const token = await jwt.sign(payload, process.env.JWT_SECRET, options);

        // Return token
        if (isRegister) {
            // Registration
            res.json({ message: 'User created successfully', token: token });
        } else {
            // Login
            res.json({ message: 'Login successfully', token: token });
        }
        
    } catch (err) {
        console.error(err);
    }
}

module.exports = {
    jwtOptions: jwtOptions,
    generateToken: generateToken,
};
