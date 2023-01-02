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

interface Props {
    open: boolean,
    handleClose: () => void,
    ada_buy: number
}
export default function AlertDialog({ open, ada_buy, handleClose }: Props) {
    const { wallet } = useWallet();
    const { changePoint } = useAuth();
    const { update } = React.useContext(AppContext);


    const handleBuy = async () => {
        try {
            const tx = new Transaction({ initiator: wallet })
                .sendLovelace(
                    'addr_test1qrek996jsz9ls3h8mks50fkxw69j8y408nccud35uy337frfjf44wjfqadmas82jpp32fvhxf7fpr0axrmm96kg639zsmhcas8',
                    (ada_buy * 1000000).toString()
                )
            const unsignedTx = await tx.build();
            const signedTx = await wallet.signTx(unsignedTx);
            const txHash = await wallet.submitTx(signedTx);
            if (txHash) {
                changePoint(ada_buy * 10);
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
                    Đổi ADA lấy điểm
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Bạn có muốn đổi {ada_buy.toFixed(1)} ADA sẽ có được {ada_buy * 10} điểm?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Không</Button>
                    <Button onClick={handleBuy} autoFocus>
                        Đồng ý
                    </Button>
                </DialogActions>
            </Dialog>
    );
}