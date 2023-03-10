// GetDividendsButton.tsx
import { Button, Box, Text } from "@chakra-ui/react";
import { useEthers, useEtherBalance } from "@usedapp/core";

import {
    NumberInput,
    NumberInputField,
    //NumberInputStepper,
    //NumberIncrementStepper,
    //NumberDecrementStepper,
} from '@chakra-ui/react'

import React, {useEffect} from "react";
//import { SimpleGrid } from '@chakra-ui/react'

import { ethers } from "ethers";
//import {BigNumber} from "@ethersproject/bignumber";

/*type Props = {
    handleOpenModal: any;
}*/

import { myContractInfos } from "./SmartContractInfos";

export default function GetDividendsButton() {
    const {activateBrowserWallet, account} = useEthers();
    const etherBalance = useEtherBalance(account);

    const format = (val: string) => val
    const parse = (val: string) => val.replace(/^\$/, '')

    const [value, setValue] = React.useState('0.01')
    let [value2, setValue2] = React.useState('0.00')

    let {
        BigNumber,
        FixedFormat,
        FixedNumber,
        formatFixed,
        parseFixed,
        BigNumberish
    } = require("@ethersproject/bignumber");

    function getDividends() {
        try {
            const provider = new ethers.providers.Web3Provider((window as any).ethereum, "any");
            provider.send("eth_requestAccounts", []).then(r => {
                // console.log("Current wallet = " + r);
                const signer = provider.getSigner();
                signer.getAddress().then(r => {
                    //console.log(myContract);
                    callContract(signer).then(r => {
                    })
                });
            });
        } catch (e) {
            alert("Please connect MetaMask.");
        }
    }

    async function callContract(signer: ethers.Signer) {
        const provider = new ethers.providers.Web3Provider((window as any).ethereum, "any");
        provider.send("eth_requestAccounts", []).then(async r => {
            const myContract = new ethers.Contract(myContractInfos.address, myContractInfos.abi, signer);
            // const cnt = myContract.connect(signer);
            //const availableDividends = await myContract.getUserAvailable("0x86b794B4d1224925bdb581444228eA89d0B3A9ED");
            const availableDividends = await myContract.getUserAvailable(r.toString());
            console.log(availableDividends);
            const newval = BigNumber.from(availableDividends) / 1000000000000000000;
            setValue2(newval.toString() + ' ETH');
            //alert(newval);
        });

    }

    return (
        <Box bg='blackAlpha.500'>
            <Text m={2} color='yellow' fontSize='sm' fontWeight='bold'
                  align='left'>{"Current dividends : "}</Text>

            {/*<Text color="white" fontSize="sm" align={"center"}>{value2}</Text>*/}

            <NumberInput focusBorderColor='gray.300'
                         value={value2}
                         min={0.000000001}
                         max={50}
                         color='gray.300'
                         width='350px'
                         m={2}
                         errorBorderColor='gray.300'
            >
                <NumberInputField/>
            </NumberInput>


            <Button colorScheme='orange' variant='outline' m={2} onClick={getDividends}>Get current dividends</Button>
        </Box>
    );
}