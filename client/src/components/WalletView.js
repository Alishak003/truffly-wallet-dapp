import React, { useEffect, useState } from "react";
import { logout } from "../backend/utils";
import { transferEther } from "../backend/EtherTransferContract";
import "./Wallet.css"; // wallet CSS file
import { mintNFT } from "../backend/mintNft";
import { Table, Divider, Tooltip, List, Tabs } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

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
  const [nftUri, setNftUri] = useState("");
  const [mintedNfts, setMintedNfts] = useState([]);
  const [nftMessage, setNftMessage] = useState("");

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(account);
  };
  const handleMintNft = async () => {
    await mintNFT(nftUri, account, mintedNfts, setNftMessage, setMintedNfts);
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
  }, []);
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
                type="number"
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
              {message && <p>{message}</p>}
            </form>
          </div>
        </>
      ),
    },
    {
      key: "2",
      label: "Mint NFTs",
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
            <p>{nftMessage}</p>
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
              dataSource={transactionHistory} // Pass the formatted transaction history
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
                <button className="copyButton" onClick={handleCopyAddress}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fillRule="currentColor"
                    className="bi bi-copy"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z"
                    />
                  </svg>
                </button>
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
