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

const options = ['Create a merge commit', 'Squash and merge', 'Rebase and merge'];


export function HeaderDesktop() {
  const [open, setOpen] = useState<boolean>(false);
  const { state, update } = useContext(AppContext);
  const router = useRouter()
  const { connected, wallet, error, connect } = useWallet();
  const [balance, setBalance] = useState<number>(0);
  const { point, name } = useAuth();

  const [openB, setOpenB] = React.useState(false);
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const [address, setAddress] = useState<string>("");

  const handleClickB = () => {
    console.info(`You clicked ${options[selectedIndex]}`);
  };

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    index: number,
  ) => {
    setSelectedIndex(index);
    setOpenB(false);
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

  useEffect(() => {
    getWallet();
  }, [wallet, name]);

  const getWallet = async () => {
    console.log("name----", name)

    if (wallet && connected) {
      const ada = await wallet.getBalance()
      const ares = await wallet.getRewardAddresses();
      setAddress(ares[0])
      console.log(ares)
      const result = ada.find((obj) => {
        return obj.unit === "lovelace";
      });
      if (result) {
        setBalance(Math.round(result.quantity / 1000000))
      }
      // if(point <= 0){
      //   router.push("/profile")
      // }else{
      //   router.push("/game")
      // }
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
                  <Button>{balance.toLocaleString()} A</Button>
                  <Button style={{"textTransform": "lowercase"}}>{address.slice(0,20)} &#x25BF;</Button>
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
                            {options.map((option, index) => (
                              <MenuItem
                                key={option}
                                disabled={index === 2}
                                selected={index === selectedIndex}
                                onClick={(event) => handleMenuItemClick(event, index)}
                              >
                                {option}
                              </MenuItem>
                            ))}
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