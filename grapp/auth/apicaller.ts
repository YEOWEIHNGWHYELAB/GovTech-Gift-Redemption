import { Request, Response } from 'express';
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const jwtManager = require('./jwtmanager');

// Register user
exports.register = async (req : Request, res : Response, pool : typeof Pool) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.json("Username and password are required");
    }

    try {
        // Check if user already exists
        const queryResult = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        const user = queryResult.rows[0];

        if (user) {
            return res.json("Username already taken");
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert new user
        const insertResult = await pool.query('INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *', [username, hashedPassword]);
        const newUser = insertResult.rows[0];

        // Sign JWT token
        jwtManager.generateToken(newUser.username, res, true);
    } catch (err) {
        // console.error(err);
        res.json("Registration Error");
    }
};

// Login user
exports.login = async (req : Request, res : Response, pool : typeof Pool) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.json("Username and password are required");
    }

    try {
        // Check if user exists
        const queryResult = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        const user = queryResult.rows[0];

        if (!user) {
            return res.json("Invalid username or password");
        }

        // Check if password is correct
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.json("Invalid username or password");
        }

        // Sign JWT token
        jwtManager.generateToken(user.username, res, false);
    } catch (err) {
        // console.error(err);
        res.json("Login Error");
    }
};
