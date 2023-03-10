// WithdrawButton.tsx
import { Button, Box, Text } from "@chakra-ui/react";
import { useEthers, useEtherBalance } from "@usedapp/core";

/*import {
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
} from '@chakra-ui/react'*/

import React, {useEffect} from "react";
//import { SimpleGrid } from '@chakra-ui/react'

import { ethers } from "ethers";
//import {BigNumber} from "@ethersproject/bignumber";

/*type Props = {
    handleOpenModal: any;
}*/

import { myContractInfos } from "./InvestButton";

export default function WithdrawButton() {
    const { activateBrowserWallet, account } = useEthers();
    const etherBalance = useEtherBalance(account);

    const format = (val: string) => val
    const parse = (val: string) => val.replace(/^\$/, '')

    const [value, setValue] = React.useState('0.01')
    let [value2, setValue2] = React.useState('0.00')

    let { BigNumber, FixedFormat, FixedNumber, formatFixed, parseFixed, BigNumberish} = require("@ethersproject/bignumber");

    function getDividends() {
        try {
            const provider = new ethers.providers.Web3Provider((window as any).ethereum, "any");
            provider.send("eth_requestAccounts", []).then(r => {
                // console.log("Current wallet = " + r);
                const signer = provider.getSigner();
                signer.getAddress().then(r => {
                    //console.log(myContract);
                    callContract(signer).then(r => {})
                });
            });
        } catch(e) {
            alert("Please connect MetaMask.");
        }
    }

    async function callContract(signer: ethers.Signer) {
        const provider = new ethers.providers.Web3Provider((window as any).ethereum, "any");
        provider.send("eth_requestAccounts", []).then(async r => {
            const myContract = new ethers.Contract(myContractInfos.address, myContractInfos.abi, signer);
            // const cnt = myContract.connect(signer);
            const tx = await myContract.withdraw();
            console.log(tx);
        });
    }

    return (
        <Box bg='blackAlpha.500'>
                <Button colorScheme='orange' variant='outline' m={2} onClick={getDividends}>Withdraw dividends</Button>
        </Box>
    );
}
