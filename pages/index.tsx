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

const Home: NextPageWithLayout = () => {
  const address = my_wallet.getPaymentAddress();
  const { connected, wallet } = useWallet();
  const [assets, setAssets] = useState<null | any>(null);
  const [loading, setLoading] = useState<boolean>(false);




  async function getAssets() {
    if (wallet) {
      setLoading(true);
      const _assets = await wallet.getAssets();
      setAssets(_assets);
      setLoading(false);
    }
  }


  // const handClick = async () => {

  //   const tx = new Transaction({ initiator: wallet })
  //     .sendLovelace(
  //       'addr_test1qrapfa09duf8g6avan8gxw6k0qnk6p2cy7dy5y5m40zxdnmfjf44wjfqadmas82jpp32fvhxf7fpr0axrmm96kg639zsu38x4m',
  //       '969750'
  //     )
  //     ;

  //   const unsignedTx = await tx.build();
  //   const signedTx = await wallet.signTx(unsignedTx);
  //   const txHash = await wallet.submitTx(signedTx);
  // }




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
          1. Đổi ADA lấy điểm. Hai ADA đổi lấy 10 điểm, tính cả phí giao dịch 0.17ada
        </Typography>

        <Typography gutterBottom>
          2. Mở quà đúng sẽ cộng, sai sẽ trừ điểm
        </Typography>
        <Typography>
          3. Có thể đổi điểm lấy ADA, đổi từ 20 điểm trở lên, phí là 1 ADA(duy trì hệ thống) và tính cả phí giao dịch
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Bắt đầu thôi</Button>
      </CardActions>
    </Card>
      </main>
    </div>

    
  );
}
Home.Layout = MainLayout
export default Home