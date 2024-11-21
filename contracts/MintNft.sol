// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol"; // For onlyOwner modifier

contract MyNFT is ERC721 {
    uint256 private _tokenIdCounter; // Declare a variable to manually increment token IDs

    constructor() ERC721("MyNFT", "MNFT") {}

    // Function to mint a new token, incrementing the token ID manually
    function safeMint(address to) public {
        uint256 tokenId = _tokenIdCounter; // Get the current token ID
        _safeMint(to, tokenId);
        _tokenIdCounter++; // Increment the token ID manually
    }

    // Base URI for metadata
    function _baseURI() internal view virtual override returns (string memory) {
        return "https://api.example.com/metadata/";
    }
}