import React, { useState } from "react";
import { placeBet } from "../blockchain.js";
//1 - teamA
//2 - TIE
//3 - teamB

export default function BetView(props){

    const [bettingAmount, setBettingAmount] = useState(0);
    const [selectedTeam, setSelectedTeam] = useState(0);
    const [odd, setOdd] = useState(0);

    const setOddAndTeam = (team) =>{
        //if data-toggle = "buttons" is added to the div that contains the toggle group it completely ignores the onClick function so the active attribute has to be added manually

        const label1 = document.getElementById(1);
        const label2 = document.getElementById(2);
        const label3 = document.getElementById(3);

        console.log(team)

        setSelectedTeam(team);
        switch (team) {
            case 1:
                label1.className = "btn btn-secondary col active";
                label2.className = "btn btn-secondary col";
                label3.className = "btn btn-secondary col";
                setOdd(props.match.team_a_win);
                break;
            case 2:
                label1.className = "btn btn-secondary col";
                label2.className = "btn btn-secondary col active";
                label3.className = "btn btn-secondary col";
                setOdd(props.match.tie);
                break;
            case 3:
                label1.className = "btn btn-secondary col";
                label2.className = "btn btn-secondary col";
                label3.className = "btn btn-secondary col active";
                setOdd(props.match.team_b_win);
                break;
            default:
                setOdd(0);
        }
    }

    return(
        <div>
            <div className="modalBackground" >
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{props.match.teama} vs. {props.match.teamb}</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick = {() => props.closeModal(false)}>x</button>
                    </div>
                    <div className="modal-body">
                        <div className="btn-group-toggle tglGroup row" >
                            <label className="btn btn-secondary col" id = "1">
                                <input type="radio" role = "buttons" onClick = {(evt) => setOddAndTeam(1)} /> {props.match.teama}
                            </label>
                            <label className="btn btn-secondary col" id = "2">
                                <input type="radio" onClick = {() => setOddAndTeam(2)} /> Tie
                            </label>
                            <label className="btn btn-secondary col" id = "3">
                                <input type="radio" onClick = {() => setOddAndTeam(3)} /> {props.match.teamb}
                            </label>
                        </div>
                        <br></br>
                        <div className = "row">
                            ODDS:
                            <div className = "oddsDisplay">
                                <h6 className = "col">{props.match.team_a_win}</h6>
                                <h6 className = "col">{props.match.tie}</h6>
                                <h6 className = "col">{props.match.team_b_win}</h6> 
                            </div>
                              
                        </div>
                        <input className = "form-control" type = "number" step = "0.0000000000001" placeholder = "Enter the betting amount" onChange = {evt => setBettingAmount(evt.target.value)}/>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={() => {placeBet(props.match.matchid, selectedTeam, odd, props.userAddress, bettingAmount, Date.parse(props.match.gameday)/1000)}}>Confirm Bet</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
//2 tie