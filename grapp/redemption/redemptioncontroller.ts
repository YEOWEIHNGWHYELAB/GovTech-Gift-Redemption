import express, { Request, Response } from 'express';
const { Pool } = require('pg');
const jwt = require("jsonwebtoken");

// Check if the auth header exist from DCS
function checkAuthHeader(authHeader : String, res : Response) {
    if (!authHeader) {
        return res
            .status(401)
            .json({ message: "Authorization header missing" });
    }

    return authHeader.split(" ")[1];
}


exports.verifyRedemption = async (req : Request, res : Response, pool : typeof Pool) => {
    const authHeader = req.headers.authorization as string;
    const token = checkAuthHeader(authHeader, res);

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET, {
            algorithms: ["HS256"],
        });

        const queryTeamNameResult = await pool.query(
            `SELECT team_name, created_at
            FROM Mapping
            WHERE staff_pass_id = $1`,
            [decoded.username]
        );

        const teamname = queryTeamNameResult.rows[0].team_name as String;

        const queryResult = await pool.query(
            `SELECT team_name, redeemed_at
            FROM Redemption
            WHERE team_name = $1`,
            [teamname]
        );

        res.json({
            "can_redeem": (queryResult.rows.length == 0)
        });
    } catch (err) {
        console.error(err);
        res.json("Not authenticated");
    }
};

//exports.addRedemption = async (req : Request, res : Response, pool : typeof Pool) => {