import React, { useState } from "react";
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



export function HeaderDesktop() {
  const [open, setOpen] = useState<boolean>(false);

  const router = useRouter()
  const { connected, wallet, connect } = useWallet();

  const wallets = useWalletList();
  const handleClose = () => setOpen(false);
  const handOpen =() => setOpen(true);

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
            <Button onClick={handOpen} variant="contained" sx={{ textTransform: "none" }}>
            Connect wallet
          </Button>
          </Stack>
        </Toolbar>
      </MuiAppBar>
      <ModalWallet handleClose={handleClose} open={open}/>
    </>
  );
}