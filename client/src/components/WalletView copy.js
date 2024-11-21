import React, { useEffect, useState } from "react";
import { logout } from "../backend/utils";
import { transferEther } from "../backend/EtherTransferContract";
import { mintNFT } from "../backend/mintNft";
import "./Wallet.css"; // wallet CSS file
import Web3 from "web3";
import {
  Table,
  Divider,
  Tooltip,
  List,
  Avatar,
  Spin,
  Tabs,
  Input,
  Button,
} from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { use } from "react";

// Deployed contract's address in Ganache

const App = ({
  account,
  balance,
  setAccount,
  setBalance,
  transactionHistory,
  setTransactionHistory,
}) => {
  const navigate = useNavigate();
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [nftMessage, setNftMessage] = useState("");
  const [nftUri, setNftUri] = useState("");
  const [mintedNfts, setMintedNfts] = useState([]);

  const handleMintNft = async () => {
    await mintNFT(nftUri, account, mintedNfts, setMessage, setMintedNfts);
  };
  const handleSendEther = async () => {
    await transferEther(
      recipient,
      amount,
      setMessage,
      setBalance,
      setRecipient,
      setAmount
    );
  };
  useEffect(() => {
    const storedTransactions = JSON.parse(localStorage.getItem("transactions"));
    if (storedTransactions) {
      setTransactionHistory(storedTransactions);
    }
    console.log(storedTransactions);
  }, [transactionHistory]);
  useEffect(() => {
    const storedBalance = localStorage.getItem("balance");
    if (storedBalance) {
      setBalance(storedBalance);
    }
  }, [balance]);
  const columns = [
    {
      title: "Recipient",
      dataIndex: "recipient",
      key: "recipient",
    },
    {
      title: "Amount (ETH)",
      dataIndex: "amount",
      key: "amount",
    },
  ];

  const items = [
    {
      key: "1",
      label: "Transfer",
      children: (
        <>
          <div className="transfer-content">
            <form className="transferForm">
              <input
                className="input"
                type="text"
                placeholder="Recipient Address"
                onChange={(e) => setRecipient(e.target.value)}
              />
              <input
                className="input"
                type="text"
                placeholder="Amount (ETH)"
                onChange={(e) => setAmount(e.target.value)}
              />
              <button
                className="transferButton"
                onClick={(e) => {
                  e.preventDefault();
                  handleSendEther();
                }}
              >
                Send
              </button>
              {nftMessage && (
                <p className="confirmationMessage">{nftMessage}</p>
              )}
            </form>
          </div>
        </>
      ),
    },
    {
      key: "2",
      label: "NFTs",
      children: (
        <>
          <div className="mintSection">
            <input
              type="text"
              className="input"
              placeholder="Enter Token URI"
              id="tokenURI"
              onChange={(e) => setNftUri(e.target.value)}
            />
            <button className="mintButton" onClick={() => handleMintNft()}>
              Mint NFT
            </button>
            <p>{message}</p>
          </div>
          <Divider />
          <div>
            <div className="nftList">
              <h3>Minted NFTs</h3>
              {mintedNfts.length > 0 ? (
                <ul>
                  {mintedNfts.map((nft) => (
                    <li key={nft.id} className="nftItem">
                      Token ID: {nft.id}, URI: {nft.uri}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No NFTs minted yet.</p>
              )}
            </div>
          </div>
        </>
      ),
    },
    {
      key: "3",
      label: "History",
      children: (
        <>
          <div className="transfer-content">
            <Table
              columns={columns}
              dataSource={transactionHistory}
              rowKey="transactionHash"
            />
          </div>
        </>
      ),
    },
  ];

  return (
    <>
      <div className="content">
        <div
          className="logoutButton"
          onClick={() => logout(setAccount, setBalance, navigate)}
        >
          <LogoutOutlined />
        </div>
        <section className="account">
          <div className="accountInfo">
            <h3>
              Account <br />
              <span className="walletAddress">
                {account.slice(0, 7)}...{account.slice(38)}
              </span>
            </h3>
          </div>
          <div className="balance">
            <span className="balanceValue">{balance.slice(0, 7)} ETH</span>
          </div>
        </section>
        <Tabs defaultActiveKey="1" items={items} className="walletView" />
      </div>
    </>
  );
};

export default App;
