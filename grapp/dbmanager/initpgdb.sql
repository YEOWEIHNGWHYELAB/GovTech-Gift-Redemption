CREATE TABLE IF NOT EXISTS Users (
    username VARCHAR(255) PRIMARY KEY,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS Teams (
    team_name VARCHAR(255) PRIMARY KEY,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS Mapping (
    staff_pass_id VARCHAR(255) REFERENCES Users(username) NOT NULL,
    team_name VARCHAR(255) REFERENCES Teams(team_name) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    PRIMARY KEY (staff_pass_id, team_name)
);

CREATE TABLE IF NOT EXISTS Redemption (
    team_name VARCHAR(255) REFERENCES Teams(team_name) PRIMARY KEY,
    redeemed_at TIMESTAMP DEFAULT NOW() NOT NULL
    -- redemption_count INT NOT NULL
);
