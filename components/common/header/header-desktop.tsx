import React, { useContext, useEffect, useState } from "react";
import { AppBar as MuiAppBar } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { useRouter } from 'next/router'
import Link from "next/link";
import { useWallet } from '@meshsdk/react';
import { ModalWallet } from "./list-wallet";
import { AppContext } from "@/pages/_app";
import { useAuth } from "@/hooks";

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';


export function HeaderDesktop() {
  const [open, setOpen] = useState<boolean>(false);
  const { state, update } = useContext(AppContext);
  const router = useRouter()
  const { connected, wallet, error, connect, disconnect } = useWallet();
  const [balance, setBalance] = useState<number>(0);
  const { name, logout, getPoint, pointFirst } = useAuth();
  const [point, setPoint] = useState<number>(0);

  const [openB, setOpenB] = React.useState(false);
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const [address, setAddress] = useState<string>("");

  const handleLogout = (
  ) => {
    logout();
    disconnect();
    setBalance(0);
    setAddress("")
    router.push("/");
  };

  const handleToggle = () => {
    setOpenB((prevOpen) => !prevOpen);
  };

  const handleCloseB = (event: Event) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpenB(false);
  };


  const handleClose = () => {
    setOpen(false);
    getWallet();
  };
  const handOpen = () => setOpen(true);

  useEffect(()=>{
    if (pointFirst <= 0) {
      router.push("/profile")
    }
    setPoint(pointFirst)
  },[pointFirst]);

  useEffect(()=>{
    if(state){
      setPoint(getPoint());
      getWallet();
      update(false);
    }
  },[state, point]);



  useEffect(() => {
    getWallet();
  }, [wallet, name]);

  const getWallet = async () => {

    if (wallet && connected) {
      const ada = await wallet.getBalance()
      const ares = await wallet.getRewardAddresses();
      setAddress(ares[0])
      const result = ada.find((obj) => {
        return obj.unit === "lovelace";
      });
      if (result) {
        setBalance(result.quantity / 1000000)
      }
      
    } else if (name) {
      connect(name)
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


            {
              balance > 0 && <React.Fragment>
                <ButtonGroup variant="outlined" ref={anchorRef} aria-label="split button" onClick={handleToggle}>
                  <Button>{point.toLocaleString()} P</Button>
                  <Button>{balance.toLocaleString().split(".")[0]} A</Button>
                  <Button style={{ "textTransform": "lowercase" }}>{address.slice(0, 20)} &#x25BF;</Button>
                </ButtonGroup>
                <Popper
                  sx={{
                    zIndex: 1,
                  }}
                  open={openB}
                  anchorEl={anchorRef.current}
                  role={undefined}
                  transition
                  disablePortal
                >
                  {({ TransitionProps, placement }) => (
                    <Grow
                      {...TransitionProps}
                      style={{
                        transformOrigin:
                          placement === 'bottom' ? 'center top' : 'center bottom',
                      }}
                    >
                      <Paper>
                        <ClickAwayListener onClickAway={handleCloseB}>
                          <MenuList id="split-button-menu" autoFocusItem>

                            <MenuItem
                              onClick={(event) => router.push("/profile")}
                            >
                              Thông tin chung
                            </MenuItem>

                            <MenuItem
                              onClick={(event) => handleLogout()}
                            >
                              Ngắt kết nối
                            </MenuItem>
                          </MenuList>
                        </ClickAwayListener>
                      </Paper>
                    </Grow>
                  )}
                </Popper>
              </React.Fragment>
            }
          </Stack>
        </Toolbar>
      </MuiAppBar>
      <ModalWallet handleClose={handleClose} open={open} />
    </>
  );
}