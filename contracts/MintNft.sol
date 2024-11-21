// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol"; // Optional: Ownable for onlyOwner functions

contract MyNFT is ERC721Enumerable {
    uint public nextTokenId;
    address public admin;
    mapping(uint256 => string) private _tokenURIs;

    constructor() ERC721("MyNFT", "MNFT") {
        admin = msg.sender;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return "https://api.example.com/metadata/";
    }

    function safeMint(address to, string memory nftURi) public {
        uint256 newTokenId = nextTokenId;
        _safeMint(to, newTokenId);
        _setTokenURI(newTokenId, nftURi);
        nextTokenId++;
    }

    function tokenURI(
        uint256 tokenId
    ) public view override returns (string memory) {
        return _tokenURIs[tokenId];
    }

    function _setTokenURI(
        uint256 tokenId,
        string memory _tokenURI
    ) internal virtual {
        _tokenURIs[tokenId] = _tokenURI;
    }
}
