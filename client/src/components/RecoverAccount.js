import React, { useState } from "react";
import { BulbOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";

const { TextArea } = Input;

function RecoverAccount({ setSeedPhrase, setWallet }) {
  const navigate = useNavigate();
  const [typedSeed, setTypedSeed] = useState("");
  const [nonValid, setNonValid] = useState(false);

  function seedAdjust(e) {
    setNonValid(false);
    setTypedSeed(e.target.value);
  }

  function recoverWallet() {
    let recoveredWallet;
    try {
      recoveredWallet = ethers.Wallet.fromPhrase(typedSeed);
    } catch (err) {
      setNonValid(true);
      return;
    }

    setSeedPhrase(typedSeed);
    setWallet(recoveredWallet.address);
    navigate("/yourwallet");
    return;
  }

  return (
    <>
      <div className="content">
        <div className="mnemonic">
          <BulbOutlined />
          <div>
            Type your seedphrase here to recover your wallet (it should contain
            12 words seperated by spaces)
          </div>
        </div>
        <TextArea
          value={typedSeed}
          onChange={seedAdjust}
          rows={5}
          className="seedPhraseContainer"
          placeholder="Type your seed phrase here ..."
        />

        <Button
          disabled={
            typedSeed.split(" ").length !== 12 || typedSeed.slice(-1) === " "
          }
          className="frontPageButton"
          type="primary"
          onClick={() => recoverWallet()}
        >
          Recover Wallet
        </Button>

        {nonValid && <p style={{ color: "red" }}>Inavlid Seed Phrase</p>}

        <p className="frontPageButton" onClick={() => navigate("/")}>
          Back Home
        </p>
      </div>
    </>
  );
}

export default RecoverAccount;
