// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.28;

library ConvertLib {
    function convert(
        uint amount,
        uint conversionRate
    ) public pure returns (uint convertedAmount) {
        return amount * conversionRate;
    }
}
