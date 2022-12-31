import Head from "next/head";
import { AppWallet } from '@meshsdk/core';
import { BlockfrostProvider } from '@meshsdk/core';
import { CardanoWallet, useWallet } from '@meshsdk/react';
import { useState } from "react";
import { NextPageWithLayout } from "@/models";
import { MainLayout } from "components/layout";
const blockchainProvider = new BlockfrostProvider('preprodsrIncUaXn1KG93CZRnn28HNN8wrZPx5k');
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const my_wallet = new AppWallet({
  networkId: 0,
  fetcher: blockchainProvider,
  submitter: blockchainProvider,
  key: {
    type: 'mnemonic',
    words: ['energy', 'note', 'snack', 'kingdom', 'search', 'miss', 'wood', 'increase', 'around', 'light', 'pelican', 'pitch', 'found', 'pride', 'fabric', 'intact', 'sudden', 'genuine', 'ordinary', 'near', 'bread', 'zebra', 'popular', 'ignore'],
  },
});

const Game: NextPageWithLayout = () => {
    const {wallet} = useWallet()

    console.log(wallet)

  return (
    <div className="container">
        Game
    </div>

    
  );
}
Game.Layout = MainLayout
export default Game