import React, { useContext, useEffect, useState } from "react";
import { AppBar as MuiAppBar } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useRouter } from 'next/router'
import Link from "next/link";
import { useWallet } from '@meshsdk/react';
import { useWalletList } from '@meshsdk/react';
import { ModalWallet } from "./list-wallet";
import { AppContext } from "@/pages/_app";



export function HeaderDesktop() {
  const [open, setOpen] = useState<boolean>(false);
  const { state, update } = useContext(AppContext);
  const router = useRouter()
  const { connected, wallet, connect } = useWallet();
  const [balance, setBalance] = useState<number>(0);

  const wallets = useWalletList();
  const handleClose = () => {
    setOpen(false);
    getWallet();
  };
  const handOpen = () => setOpen(true);

  useEffect(() => {
    if (wallet && connected) {
      async () => {


      }
    }
  }, [wallet]);

  const getWallet = async () => {
    const ada = await wallet.getBalance()
    const result = ada.find((obj) => {
      return obj.unit === "lovelace";
    });
    if (result) {
      setBalance(Math.round(result.quantity / 1000000))
    }
  }





  return (
    <>
      <MuiAppBar
        color="inherit"
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >


        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            <Link href="/">
              Cardano
            </Link>
          </Typography>
          <Stack direction="row" spacing={2}>
            {balance == 0 && <Button onClick={handOpen} variant="contained" sx={{ textTransform: "none" }}>
              Connect wallet
            </Button>}

            {balance > 0 && <Button variant="contained" disabled>
              {balance.toLocaleString()} ada
            </Button>}
          </Stack>
        </Toolbar>
      </MuiAppBar>
      <ModalWallet handleClose={handleClose} open={open} />
    </>
  );
}