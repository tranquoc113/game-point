import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Transaction } from '@meshsdk/core';
import { useWallet } from '@meshsdk/react';
import { useAuth } from '@/hooks';
import { AppContext } from '@/pages/_app';
import { BlockfrostProvider } from '@meshsdk/core';
import { AppWallet } from '@meshsdk/core';
import { demoMnemonic } from '@/config';
const blockchainProvider = new BlockfrostProvider('preprodsrIncUaXn1KG93CZRnn28HNN8wrZPx5k');
const my_wallet = new AppWallet({
    networkId: 0,
    fetcher: blockchainProvider,
    submitter: blockchainProvider,
    key: {
        type: 'mnemonic',
        words: demoMnemonic,
    },
});
interface Props {
    open: boolean,
    handleClose: () => void,
    point: number
}
export default function AlertDialogWithdraw({ open, point, handleClose }: Props) {
    const { wallet } = useWallet();
    const { changePoint } = useAuth();
    const { update } = React.useContext(AppContext);

    console.log(my_wallet.getPaymentAddress())


    const handleWithdraw = async () => {
        try {
            const quantity = ((point-10)/10) * 1000000
            const recipientAddress = await wallet.getChangeAddress();
            const tx = new Transaction({ initiator: my_wallet })
                .sendLovelace(
                    recipientAddress,
                    quantity.toString()
                )
            const unsignedTx = await tx.build();
            const signedTx = await my_wallet.signTx(unsignedTx);
            const txHash = await my_wallet.submitTx(signedTx);
            if (txHash) {
                changePoint(-point);
                update(true);
                handleClose();
            }
        } catch (error) {
        }
    };


    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                ?????i ??i???m l???y ADA
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    B???n c?? mu???n ?????i {point} Point s??? c?? ???????c {(point / 10) - 1} ada?(ph?? giao d???ch l?? 1 ada)

                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Kh??ng</Button>
                <Button onClick={handleWithdraw} autoFocus>
                    ?????ng ??
                </Button>
            </DialogActions>
        </Dialog>
    );
}