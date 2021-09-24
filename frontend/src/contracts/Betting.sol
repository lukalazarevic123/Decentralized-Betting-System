pragma solidity 0.8.0;

import "./interfaces/IBetting.sol";

contract Betting is IBetting{

    address public owner;

    mapping(uint => Bet[]) public matchBets;
    mapping(uint => bool) public matchPayedOut;

    constructor(){
        owner = msg.sender;
    }

    function placeBet(uint matchId, uint bettingType, uint oddForWinning, uint matchGameDay) external payable override{
        require(msg.value != 0, "Betting:: You must bet more than 0 ether!");
        require(block.timestamp - 14400 < matchGameDay, "Betting:: The deadline for this match has passed!");
        require(bettingType> 0 && bettingType<4, "Betting:: matchId invalid!");
        require(matchPayedOut[matchId] == false, "Betting:: This match is not active anymore!");
        // require(address(this).balance > 0, "Betting:: There is no ether ready for payout");

        Bet memory newBet = Bet(matchId, bettingType, oddForWinning, msg.value, payable(msg.sender));

        matchBets[matchId].push(newBet);

        emit BetMade(matchId, msg.value);
    }

    function payWinningBets(uint matchId, uint winningType) external override{
        require(msg.sender == owner, "Betting:: Only the betting administrator can call this function!");
        require(matchPayedOut[matchId] == false, "Betting:: This match has already been payed out!");
        Bet[] memory bets = matchBets[matchId];
        for(uint i =0;i<bets.length;i++){
            if(bets[i].bettingType == winningType){
                uint beforeCommission = (bets[i].oddForWinning * bets[i].initialAmount)/100;
                uint commission = (beforeCommission * 5) / 100;
                (bets[i].user).transfer(beforeCommission - commission);
            }
        }

        matchPayedOut[matchId] = true;

        emit PayedWinnings(matchId);
    }

    function deposit() external payable override{
        require(msg.sender == owner, "Betting: You can only deposit ether if you are the owner!");
    }

    function getBalance() external view override returns(uint amount){
        return address(this).balance;
    }

}