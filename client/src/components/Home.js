import React, { useEffect } from "react"; // Import useEffect
import mwallet from "../mwallet.png";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import Web3 from "web3";
import { fetchTransactionsFromGanache } from "../backend/EtherTransferContract";

function Home({
  account,
  balance,
  setAccount,
  setBalance,
  setNetwork,
  setTransactionHistory,
}) {
  const navigate = useNavigate();
  const web3 = "http://127.0.0.1:7545";

  useEffect(() => {
    if (account && balance) {
      localStorage.setItem("account", account);
      localStorage.setItem("balance", balance);

      // Redirect to the /connectWallet page once account is set
      navigate("/connectWallet");
    }
  }, [account, balance]);
  function ConnectWallet() {
    if (window.ethereum) {
      const init = async () => {
        let provider = window.ethereum;
        const web3 = new Web3(provider);

        const accounts = await web3.eth.getAccounts();
        const networkId = await web3.eth.net.getId();
        const balanceInWei = await web3.eth.getBalance(accounts[0]);
        const balanceInEther = web3.utils.fromWei(balanceInWei, "ether");

        setAccount(accounts[0]);
        setNetwork(networkId);
        setBalance(balanceInEther);

        // Fetch transactions and set them
        const transactions = await fetchTransactionsFromGanache(accounts[0]);
        setTransactionHistory(transactions);

        // Store account and balance in localStorage
        localStorage.setItem("account", accounts[0]);
        localStorage.setItem("balance", balanceInEther);
      };
      init();
    } else {
      alert("MetaMask is not installed!");
    }
  }

  return (
    <>
      <div className="content">
        <img src={mwallet} alt="logo" className="frontPageLogo" />
        <h1>Hey There ✨</h1>
        <h4>Welcome to your Crypto Wallet</h4>
        <Button
          onClick={() => ConnectWallet()}
          className="frontPageButton"
          type="primary"
        >
          Connect Metamask Wallet
        </Button>
      </div>
    </>
  );
}

export default Home;
