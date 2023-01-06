import { useWallet } from '@meshsdk/react';
import { NextPageWithLayout } from "@/models";
import { MainLayout } from "components/layout";
import { Auth } from "components/common";
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button'
import { useAuth } from '@/hooks';
import TextField from '@mui/material/TextField';
import AlertDialog from '@/components/form/dialog-buy';
import { AppContext } from './_app';
import AlertDialogWithdraw from '@/components/form/dialog-withdraw';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));
const Profile: NextPageWithLayout = () => {
    const [balance, setBalance] = React.useState<number>(0);
    const { pointFirst, getPoint } = useAuth();
    const [errorBuy, setErrorBuy] = React.useState<boolean>(false);
    const [errorWithdraw, setErrorWithdraw] = React.useState<boolean>(false);
    const [valueBuy, setValueBuy] = React.useState<number>(1);
    const [openDialog, setOpenDialog] = React.useState<boolean>(false);
    const {state} = React.useContext(AppContext);
    const [point, setPoint] = React.useState<number>(0);
    const [valueWithdraw, setValueWithdraw] = React.useState<number>(20);
    const [openDialogWithdraw, setOpenDialogWithddraw] = React.useState<boolean>(false);

    const handCloseDialog = () => setOpenDialog(false);
    const handCloseDialogWithdraw =() => setOpenDialogWithddraw(false);

    const { wallet, connected } = useWallet();
    React.useEffect(() => {
        getWallet();
    }, [connected])

    React.useEffect(() => {
        setPoint(pointFirst);
    }, [pointFirst])

    React.useEffect(() => {
        if(state) {
            getWallet();
            setPoint(getPoint());
        }
    }, [state])


    const getWallet = async () => {
        if (wallet && connected) {
            const ada = await wallet.getBalance()
            // const ares = await wallet.getRewardAddresses();
            const result = ada.find((obj) => {
                return obj.unit === "lovelace";
            });
            if (result) {
                setBalance(result.quantity / 1000000)
            }
        }
    }

    const handBuy = () => {
        // const value = valueBuy.toFixed(1);
        setOpenDialog(true)
    }
    const handleBuyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            const value = Number(event.target.value);
            setValueBuy(value)
            if (value > 0 && value <= balance) {
                setErrorBuy(false);
            } else {
                setErrorBuy(true)
            }
        } catch {
            setErrorBuy(true)
        }
    };

    const handleWithdrawChange= (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            const value = Number(event.target.value);
            setValueWithdraw(value)
            if (value >= 20 && value <= point) {
                setErrorWithdraw(false);
            } else {
                setErrorWithdraw(true)
            }
        } catch {
            setErrorWithdraw(true)
        }
    }

    const handleWithdraw = () => {
        if(valueWithdraw<20){
            return;
        }
        setOpenDialogWithddraw(true)
    }

    return (
        <Auth>
            <React.Fragment>
                <CssBaseline />
                <Container maxWidth="sm">
                    <Box sx={{ bgcolor: '#cfe8fc', height: '90vh' }} mt={5}>
                        <Grid container spacing={2}>
                            <Grid item xs={6} md={6}>
                                <Item>
                                    <Card>
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div" marginBottom={0}>
                                                {balance.toLocaleString().split(".")[0]} ADA
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Item>
                            </Grid>
                            <Grid item xs={6} md={6}>
                                <Item>
                                    <Card>
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div" marginBottom={0}>
                                                {point.toLocaleString()} Point = {point / 10} ADA
                                            </Typography>

                                        </CardContent>
                                    </Card>
                                </Item>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <Item>
                                    <Card>
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div" marginBottom={0}>
                                                Đổi ADA lấy điểm
                                            </Typography>
                                            <Typography variant="body2">
                                                1 ADA = 10 Point
                                            </Typography>

                                        </CardContent>
                                        <CardContent>
                                            <Box
                                                component="form"
                                                sx={{
                                                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                                                }}
                                                noValidate
                                                autoComplete="off"
                                            >
                                                <TextField
                                                    label="Nhập ada" 
                                                    variant="outlined" 
                                                    type="number"
                                                    error={errorBuy}
                                                    helperText={errorBuy?"Số tiền nộp (>0) or thấp hơn, bằng ada đang có":valueBuy + " ada = " + valueBuy*10 + "Point"}
                                                    value={valueBuy}
                                                    onChange={handleBuyChange}
                                                    />
                                            </Box>
                                        </CardContent>
                                        <CardActions>
                                            <Button variant="outlined" fullWidth={true} onClick={handBuy}>Nộp</Button>
                                        </CardActions>
                                    </Card>
                                </Item>
                                <AlertDialog open={openDialog} ada_buy={valueBuy} handleClose={handCloseDialog} />
                            </Grid>

                            <Grid item xs={12} md={12}>
                                <Item>
                                    <Card>
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div" marginBottom={0}>
                                                Đổi điểm lấy ada
                                            </Typography>
                                            <Typography variant="body2">
                                                10 Point = 1 ADA rút từ 20 điểm trở lên, phí là 1 ada cả phí giao dịch
                                            </Typography>

                                        </CardContent>
                                        <CardContent>
                                            <Box
                                                component="form"
                                                sx={{
                                                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                                                }}
                                                noValidate
                                                autoComplete="off"
                                            >
                                                <TextField  
                                                label="Nhập điểm" 
                                                variant="outlined" 
                                                type="number" 
                                                error={errorWithdraw}
                                                helperText={errorWithdraw?"Số point rút từ 20 trở lên và bé hơn điểm đang có, phí 1 ada":valueWithdraw + " Point = " + valueWithdraw/10 + "ADA"}
                                                value={valueWithdraw}
                                                onChange={handleWithdrawChange}
                                                />
                                            </Box>
                                        </CardContent>
                                        <CardActions>
                                            <Button variant="outlined" fullWidth={true} onClick={handleWithdraw}>Rút</Button>
                                        </CardActions>
                                    </Card>
                                </Item>
                                <AlertDialogWithdraw open={openDialogWithdraw} handleClose={handCloseDialogWithdraw} point={valueWithdraw}/>
                            </Grid>
                        </Grid>
                    </Box>
                </Container>
            </React.Fragment>
        </Auth>

    );
}
Profile.Layout = MainLayout
export default Profile