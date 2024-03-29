// App.tsx
import { ChakraProvider } from "@chakra-ui/react";
import ConnectButton from "./components/ConnectButton";
import InvestButton from "./components/InvestButton";
import { Text } from '@chakra-ui/react'
import GetDividendsButton from "./components/GetDividendsButton";
import WithdrawButton from "./components/WithdrawButton";
import { Image } from '@chakra-ui/react'
//import React, {useEffect} from "react";
import AddNetworkButton from "./components/AddNetworkButton";
import { Grid, GridItem } from '@chakra-ui/react'

export default function App() {

    // useEffect(() => {
    //     // http://localhost:3000/?referrer=0x123
    //     const queryParams = new URLSearchParams(window.location.search);
    //     const referrer = queryParams.get('referrer');
    //     if (referrer != null) {
    //         alert("Referrer = [" + referrer + "]");
    //     }
    // });

    return (
        <ChakraProvider>
            <Image m={2} src="/avaxroyalstaker.png" alt="avax royal staker"/>
            <Text m={2} color='whiteAlpha.700' fontSize='xl' fontWeight='extrabold'>
                Welcome to Avax Royal Staker 2.6
            </Text>

                <Grid border='1px' borderColor='gray' m={2} templateColumns='repeat(2, 0fr)' bg='black' w='800px'>
                    <GridItem><AddNetworkButton/></GridItem>
                    <GridItem><ConnectButton/></GridItem>
                    <GridItem><InvestButton/></GridItem>
                </Grid>

                <Grid alignItems='flex-end' border='1px' borderColor='gray' m={2} templateColumns='repeat(2, 0fr)' bg='black' w='800px'>
                    <GridItem><GetDividendsButton/></GridItem>
                    <GridItem><WithdrawButton/></GridItem>
                </Grid>

                <Grid border='1px' borderColor='gray' m={2} templateColumns='repeat(2, 0fr)' bg='black' w='800px'>
                <GridItem m={4}>
                        <Text w='800px' fontSize='15px' color='yellow'>Earn 3% per day.</Text>
                        <Text fontSize='15px' color='yellow'>1: Connect your wallet</Text>
                        <Text fontSize='15px' color='yellow'>2: Invest at least 0.05</Text>
                        <Text fontSize='15px' color='yellow'>3: [Get current dividends] = see earnings</Text>
                        <Text fontSize='15px' color='yellow'>4: [Withdraw dividends] = withdraw earnings</Text>
                    </GridItem>
                </Grid>
    

        </ChakraProvider>
    )
}

/*
 TODO :
    Obtention montant staké total
    Obtention montant staké pour utilisateur
    Obtention date début staking et date de fin du lock staking
    Définir le type de crypto affiché (ETH/AVAX etc) : Soit obtenir automatiquement soit définir arbitrairement
    Au déploiement final, ne pas oublier de définir l'adresse du créateur du contrat dans le referrer par défaut
    Au déploiement final, ne pas oublier de définir l'adresse du contrat final pour les appels
    Obtention du lien referral de l'utilisateur en cours pour qu'il puisse inviter du monde
    Gérer plusieurs plans !!
    Obtenir le taux des intérêts journaliers régulièrement et afficher pour chaque plan
 */