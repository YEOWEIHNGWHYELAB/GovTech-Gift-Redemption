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

async function getTeamName(pool: any, username : String) {
    const queryTeamNameResult = await pool.query(
        `SELECT team_name, created_at
            FROM Mapping
            WHERE staff_pass_id = $1`,
        [username]
    );

    const teamname = queryTeamNameResult.rows[0].team_name as String;
    return teamname;
}

async function checkRedemptionValidity(pool: any, teamname : String) {
    const queryResult = await pool.query(
        `SELECT team_name, redeemed_at
            FROM Redemption
            WHERE team_name = $1`,
        [teamname]
    );

    return queryResult;
}

exports.verifyRedemption = async (req : Request, res : Response, pool : typeof Pool) => {
    const authHeader = req.headers.authorization as string;
    const token = checkAuthHeader(authHeader, res);

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET, {
            algorithms: ["HS256"],
        });
        
        const teamname = await getTeamName(pool, decoded.username);
        const queryResult = await checkRedemptionValidity(pool, teamname);

        res.json({
            "can_redeem": (queryResult.rows.length == 0)
        });
    } catch (err) {
        // console.error(err);
        res.json("Not authenticated");
    }
};

exports.tryRedeem = async (req : Request, res : Response, pool : typeof Pool) => {
    const authHeader = req.headers.authorization as string;
    const token = checkAuthHeader(authHeader, res);

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET, {
            algorithms: ["HS256"],
        });

        const teamname = await getTeamName(pool, decoded.username);
        const queryResult = await checkRedemptionValidity(pool, teamname);

        if (queryResult.rows.length == 0) {
            await pool.query('INSERT INTO redemption (team_name, redeemed_at) VALUES ($1, now())', [teamname]);
            res.json("Successfully redeemed");
        } else {
            res.json("Your team have already redeemed");
        }
    } catch (err) {
        // console.log(err);
        res.json("Unable to redeem");
    }
};
