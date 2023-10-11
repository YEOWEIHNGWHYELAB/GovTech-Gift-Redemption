import express, { Request, Response } from 'express';
const { Pool } = require('pg');
const router = express.Router();
const authController = require('./apicaller');

module.exports = (pool: typeof Pool) => {
    // Register user
    router.post('/register', (req: Request, res: Response) => {
        authController.register(req, res, pool);
    });

    // Login user
    router.post('/login', (req: Request, res: Response) => {
        authController.login(req, res, pool);
    });

    return router;
};
