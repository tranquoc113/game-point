import Head from "next/head";
import { useWallet } from '@meshsdk/react';
import { NextPageWithLayout } from "@/models";
import { MainLayout } from "components/layout";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from 'next/link'


const Home: NextPageWithLayout = () => {
  const { connected } = useWallet();


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
          </CardActions>
        </Card>
      </main>
    </div>


  );
}
Home.Layout = MainLayout
export default Home