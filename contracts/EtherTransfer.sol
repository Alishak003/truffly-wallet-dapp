// SPDX-License-Identifier:UNLICENSED

pragma solidity ^0.8.28;

contract EtherTransfer {
    event EtherSent(
        address indexed sender,
        address indexed recipient,
        uint256 amount
    );

    receive() external payable {}

    function sendEther(address payable recipient) public payable {
        require(msg.value > 0, "Must send more than 0 ETH");
        require(recipient != address(0), "Invalid recipient address");

        recipient.transfer(msg.value);

        emit EtherSent(msg.sender, recipient, msg.value);
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
