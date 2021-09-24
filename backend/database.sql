CREATE DATABASE matches_database;

\c matches_database

CREATE TABLE matches(
    matchId SERIAL PRIMARY KEY,
    competition VARCHAR(200) NOT NULL, 
    teamA VARCHAR(50) NOT NULL, 
    teamB VARCHAR(50) NOT NULL,
    Tie FLOAT(19) NOT NULL, 
    Team_A_Win FLOAT(19) NOT NULL,
    Team_B_Win FLOAT(19) NOT NULL, 
    gameDay DATE NOT NULL
);

INSERT INTO matches (competition, teamA, teamB, tie, team_A_Win, team_B_Win, gameDay) VALUES ('UEFA Champions League', 'Bayern', 'PSG', 3, 2, 3, '2021-10-19') RETURNING *;
INSERT INTO matches (competition, teamA, teamB, tie, team_A_Win, team_B_Win, gameDay) VALUES ('English Premier League', 'Manchester United', 'Chelsea', 1.52, 2, 2.51, '2021-09-28') RETURNING *;
INSERT INTO matches (competition, teamA, teamB, tie, team_A_Win, team_B_Win, gameDay) VALUES ('Serie A', 'Juventus', 'FC Inter Milan', 1.35, 2, 3, '2021-12-19') RETURNING *;