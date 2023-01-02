import "../styles/globals.css";
import { MeshProvider } from "@meshsdk/react";
import { AppPropsWithLayout } from "@/models";
import { EmptyLayout } from "components/layout";
import { createCtx } from "@/components/common";

const [ctx, AppProvider] = createCtx(false);
export const AppContext = ctx;

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const Layout = Component.Layout ?? EmptyLayout;

  return (
    <>
      <MeshProvider>
        <AppProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AppProvider>
      </MeshProvider>
    </>
  );
}