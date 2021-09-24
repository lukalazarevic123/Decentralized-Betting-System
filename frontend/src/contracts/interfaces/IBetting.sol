pragma solidity 0.8.0;

interface IBetting{
    struct Bet{
        uint matchId;
        uint bettingType;
        uint oddForWinning;
        uint initialAmount;
        address payable user;
    }

    event BetMade(uint matchId, uint amount);
    event PayedWinnings(uint matchId);

    function getBalance() external view returns(uint amount);
    function deposit() external payable;
    function placeBet(uint matchId, uint bettingType, uint oddForWinning, uint matchGameDay) external payable;
    function payWinningBets(uint matchId, uint winningType) external;
}