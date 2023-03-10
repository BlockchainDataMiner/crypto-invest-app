// ConnectButton.tsx
import { Button, Box, Text } from "@chakra-ui/react";
import { useEthers, useEtherBalance } from "@usedapp/core";
import { formatEther } from "@ethersproject/units";
import Identicon from "./Identicon";
import {ethers} from "ethers";
//import {useEffect} from "react";

/*type Props = {
    handleOpenModal: any;
}*/

export default function ConnectButton() {
    const { error, activateBrowserWallet, account } = useEthers();
    const etherBalance = useEtherBalance(account);

    document.addEventListener('DOMContentLoaded', (event) => {
        // If metamask is already connected to a wallet then we try to connect automatically
        try {
            activateBrowserWallet();
        } catch (e) {

        }
    })

    function handleConnectWallet() {
        try {
            const provider = new ethers.providers.Web3Provider((window as any).ethereum, "any");
            activateBrowserWallet();
        } catch (e) {
            alert("Please install Metamask and connect to your wallet in Metamask.");
        }
    }

    return account ? (
        <Box m={2}
            display="flex"
            alignItems="center"
            background="gray.700"
            borderRadius="xl"
            py="0"
        >
            <Box px="3">
                <Text color="white" fontSize="md" width="150px">
                    {etherBalance && parseFloat(formatEther(etherBalance)).toFixed(3) + " ETH"}
                </Text>
            </Box>
            <Button
                bg="gray.800"
                border="1px solid transparent"
                _hover={{
                    border: "1px",
                    borderStyle: "solid",
                    borderColor: "blue.400",
                    backgroundColor: "gray.700",
                }}
                borderRadius="xl"
                m="1px"
                px={3}
                height="38px"
            >
                <Text color="white" fontSize="md" fontWeight="medium" mr="2">
                    {account &&
                        `${account.slice(0, 6)}...${account.slice(
                            account.length - 4,
                            account.length
                        )}`}
                </Text>
                <Identicon />
            </Button>
        </Box>
    ) : (
        <Button colorScheme='orange' variant='outline' m={2} onClick={handleConnectWallet}>Connect to a wallet</Button>
    );
}
