import express, { Request, Response } from 'express';
const { Pool } = require('pg');
const router = express.Router();
const redemptionController = require('./redemptioncontroller');

module.exports = (pool: typeof Pool) => {
    // Register user
    router.get('/verify', (req: Request, res: Response) => {
        redemptionController.verifyRedemption(req, res, pool);
    });

    return router;
};
