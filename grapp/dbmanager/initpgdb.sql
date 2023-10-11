CREATE TABLE IF NOT EXISTS Users (
    username VARCHAR(255) PRIMARY KEY,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS Teams (
    team_name VARCHAR(255) PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS Mapping (
    staff_pass_id VARCHAR(255) REFERENCES Users(username) NOT NULL,
    team_name VARCHAR(255) REFERENCES Teams(team_name) NOT NULL,
    created_at TIMESTAMP,
    PRIMARY KEY (staff_pass_id, team_name)
);

CREATE TABLE IF NOT EXISTS Redemption (
    team_name VARCHAR(255) REFERENCES Teams(team_name) NOT NULL,
    redeemed_at TIMESTAMP NOT NULL
);
