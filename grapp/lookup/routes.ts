import express, { Request, Response } from 'express';
const { Pool } = require('pg');
const router = express.Router();
const lookupController = require('./lookupcontroller');

module.exports = (pool: typeof Pool) => {
    // Register user
    router.post('/teamname', (req: Request, res: Response) => {
        lookupController.getTeamName(req, res, pool);
    });

    return router;
};
