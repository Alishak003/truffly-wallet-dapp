// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.28;

uint256 constant TOTAL_TICKETS = 10;

contract Tickets {
    address public owner = msg.sender;

    struct Ticket {
        uint256 id;
        uint256 price;
    }

    Ticket[TOTAL_TICKETS] public tickets;

    constructor() {
        
    }
}
