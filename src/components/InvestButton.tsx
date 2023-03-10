// InvestButton.tsx
import { Button, Box, Text } from "@chakra-ui/react";
import { useEthers, useEtherBalance } from "@usedapp/core";

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
import { Textarea } from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'
import { Center, Square, Circle } from '@chakra-ui/react'

type Props = {
    handleOpenModal: any;
}

export default function ConnectButton() {
    const {activateBrowserWallet, account} = useEthers();
    const etherBalance = useEtherBalance(account);

    const format = (val: string) => val
    const parse = (val: string) => val.replace(/^\$/, '')

    const [value, setValue] = React.useState('0.01')
    const [txt, setTxt] = React.useState('0x0')

    let handleInputChange = (e: { target: { value: any; }; }) => {
        let inputValue = e.target.value
        setTxt(inputValue)
    }

    useEffect(() => {
        // Set a default referrer address to 0x0000000000000000000000000000000000000000 (in that case it must not be used)
        setTxt('0x0000000000000000000000000000000000000000');
        const queryParams = new URLSearchParams(window.location.search);
        const referrer = queryParams.get('referrer');
        if (referrer != null) {
            //alert("Referrer = [" + referrer + "]");
            const provider = new ethers.providers.Web3Provider((window as any).ethereum, "any");
            // Attempt to get the balance of the referrer address (in order to check if the wallet exists)
            provider.getBalance(referrer).then(r => {
                // The referrer address exists
                //alert(r);
                setTxt(referrer);
            });
        }
    }, []);

    const myContractInfos = {
        address: "0x02f1557105afeaDac4BA45f8848581e4F075523C", // BSC TESNET
        abi: [{
            "inputs": [{"internalType": "address payable", "name": "wallet", "type": "address"}],
            "stateMutability": "nonpayable",
            "type": "constructor"
        }, {
            "anonymous": false,
            "inputs": [{
                "indexed": true,
                "internalType": "address",
                "name": "user",
                "type": "address"
            }, {"indexed": false, "internalType": "uint256", "name": "totalAmount", "type": "uint256"}],
            "name": "FeePayed",
            "type": "event"
        }, {
            "inputs": [{"internalType": "address", "name": "referrer", "type": "address"}, {
                "internalType": "uint8",
                "name": "plan",
                "type": "uint8"
            }], "name": "invest", "outputs": [], "stateMutability": "payable", "type": "function"
        }, {
            "anonymous": false,
            "inputs": [{
                "indexed": true,
                "internalType": "address",
                "name": "user",
                "type": "address"
            }, {"indexed": false, "internalType": "uint8", "name": "plan", "type": "uint8"}, {
                "indexed": false,
                "internalType": "uint256",
                "name": "percent",
                "type": "uint256"
            }, {"indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256"}, {
                "indexed": false,
                "internalType": "uint256",
                "name": "profit",
                "type": "uint256"
            }, {"indexed": false, "internalType": "uint256", "name": "start", "type": "uint256"}, {
                "indexed": false,
                "internalType": "uint256",
                "name": "finish",
                "type": "uint256"
            }],
            "name": "NewDeposit",
            "type": "event"
        }, {
            "anonymous": false,
            "inputs": [{"indexed": false, "internalType": "address", "name": "user", "type": "address"}],
            "name": "Newbie",
            "type": "event"
        }, {
            "anonymous": false,
            "inputs": [{
                "indexed": true,
                "internalType": "address",
                "name": "referrer",
                "type": "address"
            }, {"indexed": true, "internalType": "address", "name": "referral", "type": "address"}, {
                "indexed": true,
                "internalType": "uint256",
                "name": "level",
                "type": "uint256"
            }, {"indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256"}],
            "name": "RefBonus",
            "type": "event"
        }, {
            "inputs": [],
            "name": "withdraw",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "anonymous": false,
            "inputs": [{
                "indexed": true,
                "internalType": "address",
                "name": "user",
                "type": "address"
            }, {"indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256"}],
            "name": "Withdrawn",
            "type": "event"
        }, {
            "inputs": [],
            "name": "commissionWallet",
            "outputs": [{"internalType": "address payable", "name": "", "type": "address"}],
            "stateMutability": "view",
            "type": "function"
        }, {
            "inputs": [],
            "name": "getContractBalance",
            "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
            "stateMutability": "view",
            "type": "function"
        }, {
            "inputs": [{"internalType": "uint8", "name": "plan", "type": "uint8"}],
            "name": "getPercent",
            "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
            "stateMutability": "view",
            "type": "function"
        }, {
            "inputs": [{"internalType": "uint8", "name": "plan", "type": "uint8"}],
            "name": "getPlanInfo",
            "outputs": [{"internalType": "uint256", "name": "time", "type": "uint256"}, {
                "internalType": "uint256",
                "name": "percent",
                "type": "uint256"
            }],
            "stateMutability": "view",
            "type": "function"
        }, {
            "inputs": [{"internalType": "uint8", "name": "plan", "type": "uint8"}, {
                "internalType": "uint256",
                "name": "deposit",
                "type": "uint256"
            }],
            "name": "getResult",
            "outputs": [{"internalType": "uint256", "name": "percent", "type": "uint256"}, {
                "internalType": "uint256",
                "name": "profit",
                "type": "uint256"
            }, {"internalType": "uint256", "name": "finish", "type": "uint256"}],
            "stateMutability": "view",
            "type": "function"
        }, {
            "inputs": [{"internalType": "address", "name": "userAddress", "type": "address"}],
            "name": "getUserAmountOfDeposits",
            "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
            "stateMutability": "view",
            "type": "function"
        }, {
            "inputs": [{"internalType": "address", "name": "userAddress", "type": "address"}],
            "name": "getUserAvailable",
            "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
            "stateMutability": "view",
            "type": "function"
        }, {
            "inputs": [{"internalType": "address", "name": "userAddress", "type": "address"}],
            "name": "getUserCheckpoint",
            "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
            "stateMutability": "view",
            "type": "function"
        }, {
            "inputs": [{
                "internalType": "address",
                "name": "userAddress",
                "type": "address"
            }, {"internalType": "uint256", "name": "index", "type": "uint256"}],
            "name": "getUserDepositInfo",
            "outputs": [{"internalType": "uint8", "name": "plan", "type": "uint8"}, {
                "internalType": "uint256",
                "name": "percent",
                "type": "uint256"
            }, {"internalType": "uint256", "name": "amount", "type": "uint256"}, {
                "internalType": "uint256",
                "name": "profit",
                "type": "uint256"
            }, {"internalType": "uint256", "name": "start", "type": "uint256"}, {
                "internalType": "uint256",
                "name": "finish",
                "type": "uint256"
            }],
            "stateMutability": "view",
            "type": "function"
        }, {
            "inputs": [{"internalType": "address", "name": "userAddress", "type": "address"}],
            "name": "getUserDividends",
            "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
            "stateMutability": "view",
            "type": "function"
        }, {
            "inputs": [{"internalType": "address", "name": "userAddress", "type": "address"}],
            "name": "getUserDownlineCount",
            "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}, {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }, {"internalType": "uint256", "name": "", "type": "uint256"}],
            "stateMutability": "view",
            "type": "function"
        }, {
            "inputs": [{"internalType": "address", "name": "userAddress", "type": "address"}],
            "name": "getUserReferralBonus",
            "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
            "stateMutability": "view",
            "type": "function"
        }, {
            "inputs": [{"internalType": "address", "name": "userAddress", "type": "address"}],
            "name": "getUserReferralTotalBonus",
            "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
            "stateMutability": "view",
            "type": "function"
        }, {
            "inputs": [{"internalType": "address", "name": "userAddress", "type": "address"}],
            "name": "getUserReferralWithdrawn",
            "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
            "stateMutability": "view",
            "type": "function"
        }, {
            "inputs": [{"internalType": "address", "name": "userAddress", "type": "address"}],
            "name": "getUserReferrer",
            "outputs": [{"internalType": "address", "name": "", "type": "address"}],
            "stateMutability": "view",
            "type": "function"
        }, {
            "inputs": [{"internalType": "address", "name": "userAddress", "type": "address"}],
            "name": "getUserTotalDeposits",
            "outputs": [{"internalType": "uint256", "name": "amount", "type": "uint256"}],
            "stateMutability": "view",
            "type": "function"
        }, {
            "inputs": [],
            "name": "INVEST_MIN_AMOUNT",
            "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
            "stateMutability": "view",
            "type": "function"
        }, {
            "inputs": [],
            "name": "PERCENT_STEP",
            "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
            "stateMutability": "view",
            "type": "function"
        }, {
            "inputs": [],
            "name": "PERCENTS_DIVIDER",
            "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
            "stateMutability": "view",
            "type": "function"
        }, {
            "inputs": [],
            "name": "PROJECT_FEE",
            "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
            "stateMutability": "view",
            "type": "function"
        }, {
            "inputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
            "name": "REFERRAL_PERCENTS",
            "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
            "stateMutability": "view",
            "type": "function"
        }, {
            "inputs": [],
            "name": "startUNIX",
            "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
            "stateMutability": "view",
            "type": "function"
        }, {
            "inputs": [],
            "name": "TIME_STEP",
            "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
            "stateMutability": "view",
            "type": "function"
        }, {
            "inputs": [],
            "name": "totalRefBonus",
            "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
            "stateMutability": "view",
            "type": "function"
        }, {
            "inputs": [],
            "name": "totalStaked",
            "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
            "stateMutability": "view",
            "type": "function"
        }, {
            "inputs": [],
            "name": "WITHDRAW_FEE",
            "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
            "stateMutability": "view",
            "type": "function"
        }]
    }

    function investAmount() {
        try {
            const provider = new ethers.providers.Web3Provider((window as any).ethereum, "any");
            provider.send("eth_requestAccounts", []).then(r => {
                // console.log("Current wallet = " + r);
                const signer = provider.getSigner();
                signer.getAddress().then(r => {
                    //console.log(myContract);
                    callContract(signer).then(r => {
                    });
                });
            });
        } catch (e) {
            alert("Please connect Metamask.");
        }
    }

    async function callContract(signer: ethers.Signer) {

        let referrer = txt;
        if (referrer === '0x0000000000000000000000000000000000000000') {
            // A default referrer is set here (the contract creator)
            referrer = '0x86b794B4d1224925bdb581444228eA89d0B3A9ED';
        }

        // Here are some maths hacks... Not very clear but that works.
        const amount = Number(value) * 100 * 100;
        //console.log("amount=" + (amount * 100000000000000));
        const bn = BigNumber.from((amount * 100000000000000).toString());
        //console.log(bn);

        const myContract = new ethers.Contract(myContractInfos.address, myContractInfos.abi, signer);
        // const cnt = myContract.connect(signer);

        const bigNum = BigNumber.from(bn /*"50000000000000000"*/);
        const result = bigNum.div(BigNumber.from("10000000000000000"));
        const result2 = Number(result) / 100;
        console.log(result2.toString());

        if (result2 >= 0.05) {
            const tx = await myContract.invest(referrer, "0", {value: /*"50000000000000000"*/ bn, gasLimit: 5000000})
            console.log(tx);
        } else {
            alert("Amount to invest must equals 0.05 or be greater than 0.05.");
        }
    }

    return (
        <Box bg='blackAlpha.500'>
            <Text m={2} bgGradient='linear(to-l, #7928CA, #FF0080)' bgClip='text' fontSize='sm' fontWeight='extrabold'
                  align='left'>{"Referrer : "}</Text>
            <Input
                value={txt}
                onChange={handleInputChange}
                placeholder='Referrer address'
                size='sm'
                color='gray.300'
                isDisabled={true}
                width='350px'
                m={2}
                /*bgGradient='linear(to-l, #000080, #0000FF)'*/
            />
            <Box h='5'/>
            <Text m={2} bgGradient='linear(to-l, #7928CA, #FF0080)' bgClip='text' fontSize='sm' fontWeight='extrabold'
                  align='left'>{"Amount to invest : "}</Text>
            <NumberInput focusBorderColor='red.200'
                         onChange={(valueString) => setValue(parse(valueString))}
                         value={format(value)}
                         min={0.01}
                         max={50}
                         color='gray.300'
                         precision={2} step={0.01}
                         width='350px'
                         m={2}
            >
                <NumberInputField/>
                <NumberInputStepper>
                    <NumberIncrementStepper/>
                    <NumberDecrementStepper/>
                </NumberInputStepper>
            </NumberInput>
            <Button colorScheme='orange' variant='outline' m={2} width='200px' onClick={investAmount}>Invest</Button>

        </Box>
    );
}
