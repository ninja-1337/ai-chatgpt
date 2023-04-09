import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import Layout from "../components/layout";
import { trpc } from "../utils/trpc";
import { ToastContainer, toast } from 'react-toastify';
import "../styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
        <ToastContainer />
      </Layout>
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
