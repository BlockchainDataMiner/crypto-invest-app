// App.tsx
import { ChakraProvider } from "@chakra-ui/react";
import Layout from "./components/Layout";
import ConnectButton from "./components/ConnectButton";
import InvestButton from "./components/InvestButton";
import { Text } from '@chakra-ui/react'
import { Box } from '@chakra-ui/react'
import GetDividendsButton from "./components/GetDividendsButton";
import WithdrawButton from "./components/WithdrawButton";
import { Image } from '@chakra-ui/react'
import { Center, Square, Circle } from '@chakra-ui/react'
import React, {useEffect} from "react";
import AddNetworkButton from "./components/AddNetworkButton";
import { Grid, GridItem } from '@chakra-ui/react'
import { Container } from '@chakra-ui/react'

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
            <Image src="/avaxroyalstaker.png" alt="avax royal staker"/>
            <Text bgGradient='linear(to-l, #7928CA, #FF0080)' bgClip='text' fontSize='xl' fontWeight='extrabold'>
                Welcome to Avax Royal Staker
            </Text>

            <Container bg='black' m={2}>
                <Grid templateColumns='repeat(2, 0fr)'>
                    <GridItem><AddNetworkButton/></GridItem>
                    <GridItem><ConnectButton/></GridItem>
                    <GridItem><InvestButton/></GridItem>
                </Grid>
            </Container>

            <Container bg='black' m={2}>
                <GridItem><GetDividendsButton/></GridItem>
                <GridItem><WithdrawButton/></GridItem>
            </Container>

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