# GovTech-Gift-Redemption

## Brief Description

Company gift redemption app that helps to manage the gift redemption of users.

## Features

- Authenticated Full Stack
- Switchable dark and light themes
- Add teams and join teams functionality
- Check for team's gift and claim gift
- Register for account

## Frameworks

- JWT
- React
- Node.JS
- Express.JS
- PostgreSQL
- Jest

## Overview of Pages

### Login

![login](/docs/images/login.png)

### Register

![register](/docs/images/register.png)

### Team Lookup

![team](/docs/images/teaminfolookup.png)

### Gift Redemption

![gift](/docs/images/redemption.png)

### Light Theme

![light](/docs/images/light.png)

## Setup

Ensure that PostgreSQL is installed and create a new database for this gift redemption app. For example, "govtechgiftredemption".

Have a `.env` file in the grapp directory with the following environment variables as shown below.

The JWT_SECRET can be any secret string that you would like to use to sign the JWT token for authentication purpose.

```
PGDBUSERNAME=postgres
PGDBHOST=localhost
PGDBNAME=govtechgiftredemption
PGDBPASSWORD=password
PGDBPORT=5432
JWT_SECRET=iloveGOVTECH
WEBPORT=3600
```

Run the [initpgdb.sql](/grapp/dbmanager/initpgdb.sql) to initialize the database with the schema in place.

## Usage

The proper usage is to use the frontend built for this app.

Steps:

1) Use a terminal to start the backend server first
2) Change directory to `cd /grpapp`
3) Run `npm start`
4) Use another terminal to start the frontend
5) Change directory to `cd /grpclient`
6) Run `npm start`

This app can also be used through API calls for testing using Postman.

Have a look at the [postman-api-example.json](/grapp/postman-api-example.json) file for a sample of the API calls that can be used with Postman API Platform.

## Test

Run the following command: `npm test`

## Assumption Made

1) When someone belonging to a team redeems a gift leaves this team and goes to another team, the gift stays in the original team.

2) There will only be a gift throughout the entirety usage of the app for each team.

3) The staff_pass_id is the same as the login username for each employee.

## What to Improve

1) Add more unit tests for the backend.

2) Start doing unit test for frontend since currently there is no unit test for frontend.

3) Write automation script for full end to end testing for the app.

4) Add features to the app to allow adding more gifts for each teams such that a team is not limited to only 1 gift.

5) Add one time password (OTP) for authentication.
