import { useState, useEffect } from "react";
import "./App.css";
import logo from "./moralisLogo.svg";
import { Routes, Route } from "react-router-dom";
import { Select } from "antd";
import Home from "./components/Home";
import WalletView from "./components/WalletView";
import { useNavigate } from "react-router-dom";

function App() {
  const [selectedChain, setSelectedChain] = useState("0x1");
  const navigate = useNavigate();

  const [account, setAccount] = useState(null);
  const [network, setNetwork] = useState(null);
  const [balance, setBalance] = useState(null);
  const [transactionHistory, setTransactionHistory] = useState([]);

  useEffect(() => {
    const storedAccount = localStorage.getItem("account");
    const storedBalance = localStorage.getItem("balance");

    if (storedAccount && storedBalance) {
      setAccount(storedAccount);
      setBalance(storedBalance);

      // Redirect to WalletView if account and balance exist in localStorage
      navigate("/connectWallet");
    }
  }, [navigate]);

  return (
    <div className="App">
      <header>
        <img src={logo} className="headerLogo" alt="logo" />
        <Select
          onChange={(val) => setSelectedChain(val)}
          value={selectedChain}
          options={[
            {
              label: "localBlockChain",
              value: "0x1",
            },
          ]}
          className="dropdown"
        ></Select>
      </header>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              account={account}
              balance={balance}
              setAccount={setAccount}
              setBalance={setBalance}
              setNetwork={setNetwork}
              setTransactionHistory={setTransactionHistory}
            />
          }
        />
        {account && balance && (
          <Route
            path="/connectWallet"
            element={
              <WalletView
                account={account}
                balance={balance}
                setAccount={setAccount}
                setBalance={setBalance}
                transactionHistory={transactionHistory}
                setTransactionHistory={setTransactionHistory}
              />
            }
          />
        )}
      </Routes>
    </div>
  );
}

export default App;
