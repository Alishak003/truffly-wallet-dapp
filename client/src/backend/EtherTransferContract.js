import Web3 from "web3";

const contractABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "EtherSent",
    type: "event",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
  {
    inputs: [
      {
        internalType: "address payable",
        name: "recipient",
        type: "address",
      },
    ],
    name: "sendEther",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "getBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const contractAddress = "0xb89E843E485593bC875010759736a2d0A1Eabdb1";

let provider = window.ethereum;
const web3 = new Web3(provider);

const contract = new web3.eth.Contract(contractABI, contractAddress);

export const transferEther = async (
  recipient,
  amount,
  setMessage,
  setBalance,
  setRecipient,
  setAmount
) => {
  if (!window.ethereum) {
    alert("MetaMask is not installed!");
    return;
  }
  try {
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];

    const amountInWei = web3.utils.toWei(amount.toString(), "ether");

    // Send the transaction
    const tx = await contract.methods.sendEther(recipient).send({
      from: account,
      value: amountInWei,
    });

    const receipt = await web3.eth.getTransactionReceipt(tx.transactionHash);
    if (receipt.status) {
      const balanceInWei = await web3.eth.getBalance(accounts[0]);
      // Convert balance from Wei to Ether
      const balanceInEther = web3.utils.fromWei(balanceInWei, "ether");
      setBalance(balanceInEther);
      let transactions = JSON.parse(localStorage.getItem("transactions"));
      transactions.push(tx);
      // localStorage.setItem("transactions", JSON.stringify(transactions));
      setMessage(`Transaction successful!`);
    } else {
      setMessage(`Transaction failed!`);
    }
  } catch (error) {
    setMessage(`Error: ${error.message}`);
  }
};

// export const getTransactionHistory = async () => {
//   try {
//     if (!window.ethereum) {
//       alert("MetaMask is not installed!");
//       return;
//     }
//     const accounts = await web3.eth.getAccounts();
//     const account = accounts[0];

//     // Fetch all past events from the contract
//     const events = await contract.getPastEvents("EtherSent", {
//       filter: { sender: account }, // Filter by sender address
//       fromBlock: 0, // Start from the first block
//       toBlock: "latest", // Until the latest block
//     });

//     const transactionHistory = events.map((event) => ({
//       recipient:
//         event.returnValues.recipient.slice(0, 5) +
//         "..." +
//         event.returnValues.recipient.slice(38),
//       amount: web3.utils.fromWei(event.returnValues.amount, "ether"),
//     }));
//     localStorage.setItem("transactionHistory", transactionHistory);
//     // setTransactionHistory(transactionHistory);
//     return transactionHistory;
//   } catch (error) {
//     console.error("Error fetching transaction history:", error);
//   }
// };

export const fetchTransactionsFromGanache = async (account) => {
  const latestBlock = await web3.eth.getBlockNumber();
  const transactions = [];
  for (let i = 0; i <= latestBlock; i++) {
    const block = await web3.eth.getBlock(i, true);
    if (block && block.transactions) {
      block.transactions.forEach((tx) => {
        if (tx.to != null) {
          if (
            tx.from.toLowerCase() == account.toLowerCase() ||
            tx.to.toLowerCase() == account.toLowerCase()
          ) {
            transactions.push(tx);
          }
        }
      });
    }
  }

  const transactionHistory = transactions.map((transaction) => ({
    recipient: transaction.to.slice(0, 5) + "..." + transaction.to.slice(-4),
    amount: web3.utils.fromWei(transaction.value, "ether"),
    transactionHash: transaction.hash,
  }));
  localStorage.setItem("transactions", JSON.stringify(transactionHistory));

  return transactionHistory;
};
