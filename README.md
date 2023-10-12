# GovTech-Gift-Redemption

## Brief Description

Company gift redemption app that helps to manage the gift redemption of users.

## Setup

Ensure that PostgreSQL is installed and create a new database for this gift redemption app. For example, "govtechgiftredemption".

Have a ```.env``` file in the grapp directory with the following environment variables as shown below.

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

This app can be used through API calls.

Have a look at the [postman-api-example.json](/grapp/postman-api-example.json) file for a sample of the API calls that can be used with Postman API Platform.

## Assumption Made

1) When someone belonging to a team redeems a gift leaves this team and goes to another team, the gift stays in the original team.
