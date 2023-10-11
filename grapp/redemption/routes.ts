import express, { Request, Response } from 'express';
const { Pool } = require('pg');
const router = express.Router();
const redemptionController = require('./redemptioncontroller');

module.exports = (pool: typeof Pool) => {
    // Check if the person can redeem
    router.get('/verify', (req: Request, res: Response) => {
        redemptionController.verifyRedemption(req, res, pool);
    });

    // Try to redeem for the team
    router.post('/redeem', (req: Request, res: Response) => {
        redemptionController.tryRedeem(req, res, pool);
    });

    return router;
};
