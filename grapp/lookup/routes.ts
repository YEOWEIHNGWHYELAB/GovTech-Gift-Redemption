import express, { Request, Response } from 'express';
const { Pool } = require('pg');
const router = express.Router();
const lookupController = require('./lookupcontroller');

module.exports = (pool: typeof Pool) => {
    // Get user's teamname
    router.get('/teamname', (req: Request, res: Response) => {
        lookupController.getTeamName(req, res, pool);
    });

    router.post('/addteamname', (req: Request, res: Response) => {
        lookupController.addTeamName(req, res, pool);
    });

    router.post('/jointeamname', (req: Request, res: Response) => {
        lookupController.joinTeamName(req, res, pool);
    });

    return router;
};
