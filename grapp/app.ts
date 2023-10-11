// app.ts
import express, { Application, Request, Response } from 'express';

const dotenv = require("dotenv");
dotenv.config();

const { Pool } = require('pg');
const pool = new Pool({
    user: process.env.PGDBUSERNAME,
    host: process.env.PGDBHOST,
    database: process.env.PGDBNAME,
    password: process.env.PGDBPASSWORD,
    port: process.env.PGDBPORT
});

const app: Application = express();
const port = process.env.WEBPORT;

/*
const authRouter = require('./auth/routes')(pool);
app.use('/auth', authRouter);
*/

app.get('/login', (req: Request, res: Response) => {
    res.send('Hello, World!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
