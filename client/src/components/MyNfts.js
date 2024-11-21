import React, { useState, useEffect } from "react";
import Web3 from "web3";
import { fetchNfts } from "../backend/mintNft";

function NFTGallery() {
  useEffect(() => {
    async function fetchNFTs() {
      let provider = window.ethereum;
      const web3 = new Web3(provider);
      const accounts = await web3.eth.requestAccounts();
      const account = accounts[0];
      fetchNfts(account);
    }

    fetchNFTs();
  }, []);

  //   return (
  //     // <div>
  //     //   <h2>Your Minted NFTs</h2>
  //     //   <div style={{ display: "flex", flexWrap: "wrap" }}>
  //     //     {nfts.map((nft) => (
  //     //       <div key={nft.id} style={{ margin: "10px", textAlign: "center" }}>
  //     //         <img
  //     //           src={nft.uri}
  //     //           alt={`NFT ${nft.id}`}
  //     //           style={{ width: "150px", height: "150px", objectFit: "cover" }}
  //     //         />
  //     //         <p>Token ID: {nft.id}</p>
  //     //       </div>
  //     //     ))}
  //     //   </div>
  //     // </div>
  //   );
}

export default NFTGallery;
