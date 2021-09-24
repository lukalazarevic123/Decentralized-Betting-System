import React, { Component } from 'react';
import { getUserAddress, getUserBalance, checkForOwner, payWinningBets, deposit, getContract } from '../blockchain';
import { getMatches } from '../apiCalls';
import Moment from 'moment';
import './App.css';
import Header from './Header';
import BetView from './BetView';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      account: '',
      balance: '',
      matches: [],
      modalShow: false,
      selectedMatch: '',
      contract: null,
      adminOptions: true,
      matchId: 0,
      winningType: 1,
      depAmount: 0,
      isMatchActiveArr: []
    }
  }

  async componentWillMount() {
    const account = await getUserAddress();
    const balance = await getUserBalance();
    const matches = await getMatches();
    const contract = await getContract();
    const adminOptions = await checkForOwner();

    let isMatchActiveArr = [];
    for(var i = 0;i<matches.length;i++){
      const isMatchActive = await contract.methods.matchPayedOut(matches[i].matchid).call();
      isMatchActiveArr.push(Boolean(isMatchActive));
    }

    console.log(isMatchActiveArr)

    this.setState({account, balance, matches, contract,adminOptions, isMatchActiveArr});
  }

  setModal = (arg) => {
      this.setState({modalShow: arg})
  }

  render() {
    return (
      <div>
        <Header account = {this.state.account.slice(0, 15)} balance = {this.state.balance} />
        {this.state.modalShow && <BetView closeModal = {this.setModal} match = {this.state.selectedMatch} userAddress = {this.state.account}/>}
        <div className = "container">
          <div>
            <div className = "welcomeBox">
              <h1>Welcome to a decentralized betting system</h1>
              <h2>Here you can bet on your favourite teams</h2>
              <h4>* Try it out now by clicking on a match</h4>
            </div>
            
          </div>
          <div>
              <table className = "table matchTable">
                <thead className = "thead-dark">
                  <tr>
                    <th scope = "col">#</th>
                    <th scope = "col">Match</th>
                    <th scope = "col">Game Day</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.matches.filter((match) => {
                    if(!this.state.isMatchActiveArr[match.matchid-1]){
                      return match;
                    }
                  }).map(match => (
                    <tr className = "tableRow" key = {match.matchid} onClick = {()=> this.setState({modalShow: true, selectedMatch: match})}>
                      <th scope = "row">{match.matchid}</th>
                      <td>{match.teama} vs. {match.teamb}</td>
                      <td>{Moment(match.gameday).format("LL")}</td>
                      
                    </tr>
                  ))}
                </tbody>
              </table>
          </div>
          <div hidden = {this.state.adminOptions} className = "adminOptions">
            <h2>Admin options</h2>
            <form className = "form-group">
              <input className = "form-control" placeholder = "Deposit ether into your betting platform" type = "number" step = "0.0000000000001" onChange = {evt => this.setState({depAmount: evt.target.value})} />
              <button className = "btn btn-primary" type = "submit" onClick = {(evt) => deposit(this.state.depAmount, this.state.account, evt)}>Deposit</button>
            </form>
            <hr/>
            <form className = "form-group">
              <input className = "form-control" type = "number" placeholder = "Match Id" onChange = {evt => this.setState({matchId:evt.target.value})}/>
              <select className = "form-select" type = "number" onChange = {evt => this.setState({winningType:evt.target.value})}>
                <option value = "1">Team A</option>
                <option value = "2">Tie</option>
                <option value = "3">Team B</option>
              </select>
              <button className = "btn btn-primary" onClick = {(evt) => payWinningBets(this.state.matchId, this.state.winningType, this.state.account, evt)}>Pay winning bets</button>
            </form>
            
          </div>
        </div>
      </div>
    );
  }
}

export default App;
