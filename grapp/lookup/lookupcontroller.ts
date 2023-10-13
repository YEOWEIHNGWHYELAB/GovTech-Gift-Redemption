import express, { Request, Response } from 'express';
const jwtManager = require("../auth/jwtmanager");
const { Pool } = require('pg');
const jwt = require("jsonwebtoken");

exports.getAllTeam = async (req : Request, res : Response, pool : typeof Pool) => {
    const authHeader = req.headers.authorization as string;
    const token = jwtManager.checkAuthHeader(authHeader, res);

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET, {
                algorithms: ["HS256"],
            });
    
            const queryResult = await pool.query(
                `SELECT team_name
                FROM Teams
                `, []
            );

            let teamArr = []
            
            for (let currName of queryResult.rows) {
                teamArr.push(currName.team_name);
            }
    
            res.json(teamArr);
        } catch (err) {
            // console.error(err);
            res.status(400).json("Not authenticated");
        }
    }
}; 

exports.getTeamName = async (req : Request, res : Response, pool : typeof Pool) => {
    const authHeader = req.headers.authorization as string;
    const token = jwtManager.checkAuthHeader(authHeader, res);

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET, {
                algorithms: ["HS256"],
            });
    
            const queryResult = await pool.query(
                `SELECT team_name, created_at
                FROM Mapping
                WHERE staff_pass_id = $1`,
                [decoded.username]
            );
    
            res.json(queryResult.rows[0]);
        } catch (err) {
            // console.error(err);
            res.status(400).json("Not authenticated");
        }
    }
};

exports.joinTeamName = async (req : Request, res : Response, pool : typeof Pool) => {
    const authHeader = req.headers.authorization as string;
    const token = jwtManager.checkAuthHeader(authHeader, res);

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET, {
                algorithms: ["HS256"],
            });
    
            // Check if the user already have a team first
            
            const queryCurrTeam = await pool.query(
                `SELECT team_name, created_at 
                FROM Mapping
                WHERE staff_pass_id = $1`
                , [decoded.username]);
    
            if (queryCurrTeam.rows.length == 0) {
                await pool.query('INSERT INTO Mapping (staff_pass_id, team_name, created_at) VALUES ($1, $2, NOW())', [decoded.username, req.body.team_name]);
                res.json(`Successfully join new team: ${req.body.team_name}`);
            } else {
                res.json("You are already on a team or you have already joined this team, please contact your admin in order leave your team first")
            }
        } catch (err) {
            // console.log(err);
            res.status(400).json("Teamname does not exist or Server Error");
        }
    }
}

exports.addTeamName = async (req : Request, res : Response, pool : typeof Pool) => {
    const authHeader = req.headers.authorization as string;
    const token = jwtManager.checkAuthHeader(authHeader, res);

    if (token) {
        try {
            await pool.query('INSERT INTO teams (team_name) VALUES ($1)', [req.body.team_name]);
            res.json(`Successfully added new team: ${req.body.team_name}`);
        } catch (err) {
            res.json("Teamname already exist or Server Error");
        }
    } else {
        res.status(400).json("Please login again!");
    }
}
