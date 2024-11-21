import Web3 from "web3";

let selectedAccount;

export const init = async (setAccount, setBalance) => {
  if (window.ethereum) {
    const init = async () => {
      let provider = window.ethereum;
      provider
        .request({ method: "eth_requestAccounts" })
        .then((accounts) => {})
        .catch((err) => {
          console.log(err);
        });

      window.ethereum.on("accountsChanged", function (accounts) {});

      const web3 = new Web3(provider);

      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);

      const networkId = await web3.eth.net.getId();
      setNetwork(networkId);

      const balanceInWei = await web3.eth.getBalance(accounts[0]);

      // Convert balance from Wei to Ether
      const balanceInEther = web3.utils.fromWei(balanceInWei, "ether");
      setBalance(balanceInEther);
    };
    init();
  } else {
    alert("MetaMask is not installed!");
  }
};
