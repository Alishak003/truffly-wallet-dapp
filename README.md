MY CRYPTO WALLET (TRUFFLY)

A decentralized application (dApp) extension to mint, manage, and display NFTs on a local blockchain using Truffle Suite, Ganache, and a React front-end.

##ABOUT
This project demonstraits Transferring/recieving Ether(ETH) , minting NFTs on a local blockchain simulated using Ganache. It uses ganache to set-up a localblochain with simulated ethers. This allows a user to interact with the Dapp and check it's features wihtout having any real coins in the mainnet.
about some of the files and their usage :
 -EtherTransfer.sol : this is a smart contract that has a payable function which allows to transfer. payable allows a function to send/recieve tokens
 -MintNFT : it allows the minting of Nfts . uses _safeMint ERC721.sol contract to mint token.
 -backend/EtherTransferContract.js & mintNFT.js : connects with the contract using contractABI and contract address . An ABI is a Application binary interface like an API 

##TECHNOLOGIES USED

1.Truffle Suite:
Truffle suite is a framework that consits of truffle, Ganache and Drizzle. It allows users to write, deploy and test Smart contracts usually in pair with a Loacal Blockchain to simulate transactions using simulated Etherium Coins.

2.Ganache: 
Ganache is a part of truffle suit that allows user to simulate a local blockchain on their device. This allows for testing and development of Smart Contracts without spending actaual crypto coins.

3.React: 
Front-end to interact with the Smart contracts.

4.OpenZeppelin: 
Provides ERC-721 Contract that allows the minting of NFTs.Open source library with reliable and tested contracts.

5.MetaMask:
Browser wallet for interacting with the dApp.

##FEATURES

1.transfer eth : you can transfer eth between any accounts in your ganache.simply copy paste the reciepent account's address ,enter the eth and hit send. confirmt the transaction in the metamask pop up that shows up.
2.mint nft : copy and paste the uri of any image on the internet and hit mint
3.transaction histpry : on the initial login the histories section shows your previous transactions [Currently the section doesnt re-render on a new transaction but it will be fixed soon :,) ]

##INSTALLATION AND SETUP
1.Prerequisites
    Node.js
    NPM or Yarn
    Truffle (npm install -g truffle)
    Ganache (from Ganache UI or CLI)
    MetaMask browser extension

2. -run 'npm install' in main directory to install all dependencies
   -in case you are unable to see any contracts in migrations folder run truffle unbox
   -cd client
   -npm install
   -npm run start

3. host local ganache blockchain
   Open Ganache
   create Workspace
   type in any name in work-space name
   in the truffle projects field add the truffle-config.js file located in the main directly
   click ADD PROJECT button  
   
yay you set up your loacl blockchain . Truffle provides you with 10 test accounts

4.connect local blockchain to metamask 
   open metamask extention > click on the networks dopdown in top left corner > add a network.
   scroll down to add a network manually
   enter these -> Network-name : ganache block chain ; rpc URL : http://127.0.0.1:7545 ; chain ID : 1337 ; currency Symbol : ETH
   click save

yay done!

5. connect ganache's account to metamask
   in your ganache gui click the key symbol next to any of the accounts and copy the private key frm the popup
   open metamask >click accounts on the top center> add account or hardware wallet> paste private key > import

Yay import successful

logout out on your dApp and click connect to metamask . it will automatically log in to the active account in your metamask

now you can transfer eth , mint nfts 


   
