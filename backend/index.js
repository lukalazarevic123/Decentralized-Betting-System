const express = require('express');
const app = express();
const pool = require('./db');
const cors = require("cors");

app.use(cors());
app.use(express.json()); // => req.body


//Routes

//get all matches

app.get("/matches", async(req, res) => {
    try{
        const allMatches = await pool.query(
            "SELECT * FROM matches;"
        );

        res.json(allMatches.rows)
    }catch(err){
        console.error(err.message);
    }
});

//get a match

app.get("/matches/:id", async(req, res) => {
    const { id } = req.params;
    try{
        const match = await pool.query(
            "SELECT * FROM matches WHERE matchId = $1",
            [id]
        );

        res.json(match.rows[0]);
    }catch(err){
        console.error(err.message);
    }
})

//create a match

app.post("/create", async(req, res) => {
    try{
        const { competition } = req.body;
        const { teamA } = req.body;
        const { teamB } = req.body;
        const { tie } = req.body;
        const { team_A_Win } = req.body;
        const { team_B_Win } = req.body;
        const { gameDay } = req.body;

        const newMatch = await pool.query(
            "INSERT INTO matches (competition, teamA, teamB, tie, team_A_Win, team_B_Win, gameDay) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
            [competition, teamA, teamB, tie, team_A_Win, team_B_Win, gameDay]
        );

        res.json(newMatch.rows[0])

    }catch(err){
        console.error(err.message);
    }
});

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});