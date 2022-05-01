// AddPolygonNetworkButton.tsx
import { Button, Box, Text } from "@chakra-ui/react";
import { useEthers, useEtherBalance } from "@usedapp/core";
import { Web3Provider } from "@ethersproject/providers";

import {
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
} from '@chakra-ui/react'

import React, {useEffect} from "react";
import { SimpleGrid } from '@chakra-ui/react'

import { ethers } from "ethers";
import {BigNumber} from "@ethersproject/bignumber";

type Props = {
    handleOpenModal: any;
}

// https://chainlist.org/
export default function AddNetworkButton(/*props: any*/) {

    async function addNetwork() {
        // addPolygonNetwork();
        addAvalancheNetwork();
    }

    function addPolygonNetwork() {
        const provider = new ethers.providers.Web3Provider((window as any).ethereum, "any");
        try {
            provider.send("wallet_addEthereumChain", [{
                chainName: 'Polygon Mainnet',
                chainId: '0x89',
                nativeCurrency: {name: 'MATIC', decimals: 18, symbol: 'MATIC'},
                // rpcUrls: ['https://polygon-rpc.com/'],
                rpcUrls: ['https://rpc-mainnet.matic.network/'],
            },]).then(r => {
            }).catch();
        } catch (e) {
            alert("Cannot add network : " + JSON.stringify(e));
        }
    }

    function addAvalancheNetwork() {
        const provider = new ethers.providers.Web3Provider((window as any).ethereum, "any");
        try {
            provider.send("wallet_addEthereumChain", [{
                chainName: 'Avalanche C-Chain Mainnet',
                chainId: '0xA86A',
                nativeCurrency: {name: 'AVAX', decimals: 18, symbol: 'AVAX'},
                // rpcUrls: ['https://polygon-rpc.com/'],
                rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
            },]).then(r => {
            }).catch();
        } catch (e) {
            alert("Cannot add network : " + JSON.stringify(e));
        }
    }

    return (
        <Box bg='blackAlpha.500'>
            <Button onClick={addNetwork}>Add AVAX Network\r\n to Metamask</Button>
        </Box>
    );
}
