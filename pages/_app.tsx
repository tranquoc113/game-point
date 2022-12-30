import "../styles/globals.css";
import type { AppProps } from "next/app";
import { MeshProvider } from "@meshsdk/react";
import CssBaseline from "@mui/material/CssBaseline";
import { AppPropsWithLayout } from "@/models";
import { EmptyLayout } from "components/layout";
import { ThemeProvider } from "@mui/material/styles";


export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = Component.Layout ?? EmptyLayout;
  return (
    <>
      <MeshProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </MeshProvider>
    </>
  );
}
