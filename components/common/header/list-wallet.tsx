import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Image from 'next/image'

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

import Link from "next/link";
import { useWallet } from '@meshsdk/react';
import { useWalletList } from '@meshsdk/react';

interface Prop {
    open: boolean,
    handleClose(): void
}
export function ModalWallet(props: Prop) {
    const { open, handleClose } = props;
    const { connected, wallet, connect } = useWallet();

    const wallets = useWalletList();

    const handConnect = (name: string) => {
        connect(name).then((data) => {
            console.log("oki----", data)
        }).catch((e) => {
            console.log("erro")
        })
    }

    const listWallet = () => {
        const listItems = wallets.map((wallet, i) =>
            <li key={i.toString()}>{wallet.name}</li>
        );
        return (
            <ul>{listItems}</ul>
        );

    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Chọn ví để kết nối
                </Typography>
                {/* 
                <ul>
                    {wallets.map((wallet, i) =>
                        <button key={i}>{wallet.name}</button>
                    )}
                </ul> */}

                {/* {
                    wallet && <List sx={style} component="nav" aria-label="mailbox folders">
                        {wallets.map((wallet, i) => {
                            return (
                                <>
                                    <button key={i + "xxxx"}>{wallet.name}</button>

                                </>
                            );
                        })}
                    </List>
                } */}


                <List component="nav" aria-label="mailbox folders">
                    {wallets.map((wallet, i) =>
                        <div key={i}>
                            <ListItem button>
                                <ListItemText primary={wallet.name} />
                                <ListItemAvatar>
                                    <Avatar>
                                        <Image
                                            src={wallet.icon}
                                            alt="Picture of the author"
                                            width={30}
                                            height={30}
                                        />
                                        {/* <img src={wallet.icon} style={{ width: '30px' }} /> */}
                                    </Avatar>
                                </ListItemAvatar>
                            </ListItem>
                            <Divider />
                        </div>
                    )}
                </List>

            </Box>
        </Modal>
    );
}