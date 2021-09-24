import Web3 from 'web3';
import Betting from './abis/Betting.json';

export const loadWeb3 = () => {
    if(window.ethereum){
        window.web3 = new Web3(window.ethereum);
    }else if(window.web3){
        window.web3 = new Web3('http://localhost:8545');
    }else{
        console.error("Non-Ethereum browser detected. You should consider trying MetaMask!");
    }
}

loadWeb3();

export const getUserAddress = async () => {
    const web3 = window.web3;
    const address = await web3.eth.getAccounts();

    return address[0];
}

export const getUserBalance = async () => {
    const web3 = window.web3;
    const address = await web3.eth.getAccounts();

    var bal = await  web3.eth.getBalance(address[0]);

    return parseFloat(web3.utils.fromWei(bal, "ether")).toFixed(2);
}

export const getContract = async () => {
    const web3 = window.web3;
    const networkId = await web3.eth.net.getId();
    const networkData = await Betting.networks[networkId];

    if(networkData){
        const abi = Betting.abi;
        const address = networkData.address;
        const contract = new web3.eth.Contract(abi, address);

        return contract;
    }else{
        window.alert('Smart contract not deployed to detected network');
    }
}

export const checkForOwner = async () => {
    const contract = await getContract();
    const user = await getUserAddress();

    const owner = await contract.methods.owner().call();

    return !(owner === user);
}

export const placeBet = async (matchId, bettingType, oddForWinning, walletAddress, amount, matchGameDay) => {
    const web3 = window.web3;
    const contract = await getContract();
    var odd = Math.floor((oddForWinning.toFixed(2)*100));

    await contract.methods.placeBet(matchId, bettingType, odd, matchGameDay).send({from: walletAddress, value: web3.utils.toWei(amount, 'ether')});
}

export const payWinningBets = async(matchId, winningType, walletAddress, evt) => {
    evt.preventDefault();
    const contract = await getContract();

    await contract.methods.payWinningBets(matchId, winningType).send({from: walletAddress});
}

export const deposit = async(amount, walletAddress, evt) => {
    evt.preventDefault();
    const contract = await getContract();
    const web3 = window.web3;
    const depAmount = await web3.utils.toWei(amount, 'ether');

    await contract.methods.deposit().send({from: walletAddress, value: depAmount});
}