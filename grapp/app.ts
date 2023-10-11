import express, { Application } from 'express';

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
app.use(express.json());
const cors = require('cors');
app.use(cors());

const port = process.env.WEBPORT;

const authRouter = require('./auth/routes')(pool);
app.use('/auth', authRouter);

const lookupRouter = require('./lookup/routes')(pool);
app.use('/lookup', lookupRouter);

const redemptionRouter = require('./redemption/routes')(pool);
app.use('/redemption', redemptionRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;
