import React from 'react';
import {NavLink} from 'react-router-dom';

export default function Header(props) {

    return (
        <nav className = "navbar navbar-dark bg-dark">
            <NavLink className = "navbar-brand" style = {{color: "white"}} to = "/">Decentralized Betting</NavLink>
            <div className = "ml-auto userInfo">
                <h5>{props.balance} ETH</h5>
                <h5>{props.account}</h5>
            </div>
        </nav>
    )
}