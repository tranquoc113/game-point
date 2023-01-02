import Head from "next/head";
import { AppWallet } from '@meshsdk/core';
import { BlockfrostProvider } from '@meshsdk/core';
import { useWallet } from '@meshsdk/react';
import { useState } from "react";
import { NextPageWithLayout } from "@/models";
import { MainLayout } from "components/layout";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useRouter } from "next/router";
import Link from 'next/link'
import { Transaction } from '@meshsdk/core';
import { my_wallet } from "@/models/constants";



const Home: NextPageWithLayout = () => {
  // const address = my_wallet.getPaymentAddress();
  const { connected, wallet } = useWallet();
  const [assets, setAssets] = useState<null | any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();


  const handClick = async () => {

    const tx = new Transaction({ initiator:  my_wallet})
      .sendLovelace(
        'addr_test1qrapfa09duf8g6avan8gxw6k0qnk6p2cy7dy5y5m40zxdnmfjf44wjfqadmas82jpp32fvhxf7fpr0axrmm96kg639zsu38x4m',
        '969750'
      )
      ;

    const unsignedTx = await tx.build();
    const signedTx = await my_wallet.signTx(unsignedTx);
    const txHash = await my_wallet.submitTx(signedTx);
  }





  return (
    <div className="container">
      <Box
        sx={{

          backgroundColor: 'rgb(17 24 39)'
        }}
      />
      <Head>
        <title>Đổi ada lấy điểm</title>
        <meta name="description" content="A Cardano dApp" />
      </Head>

      <main className="main">
        <h1 className="title">
          Kết nối ví và làm theo hướng dẫn
        </h1>
        <Card >
          <CardContent>
            <Typography gutterBottom>
              1. Đổi ADA lấy điểm. Hai ADA đổi lấy 10 điểm, chưa tính phí giao dịch 0.17ada
            </Typography>

            {/* <Typography gutterBottom>
          2. Mở quà đúng sẽ cộng, sai sẽ trừ điểm
        </Typography> */}
            <Typography>
              2. Có thể đổi điểm lấy ADA, đổi từ 20 điểm trở lên, phí là 1 ADA(duy trì hệ thống) và tính cả phí giao dịch
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" disabled={!connected}><Link href="/profile">Bắt đầu thôi</Link></Button>
            <Button onClick={handClick}>Z</Button>
          </CardActions>
        </Card>
      </main>
    </div>


  );
}
Home.Layout = MainLayout
export default Home