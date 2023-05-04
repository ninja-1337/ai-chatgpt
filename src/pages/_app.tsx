import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider as NextThemesProvider  } from "next-themes";
import { trpc } from "../utils/trpc";
import Layout from "../components/layout";
import { createTheme, NextUIProvider } from "@nextui-org/react"
import "../styles/globals.css";
import 'react-toastify/dist/ReactToastify.css';



const lightTheme = createTheme({
  type: 'light',
  theme: {
    colors: { }, // optional
  }
})

const darkTheme = createTheme({
  type: 'dark',
  theme: {
    colors: { }, // optional
  }
})

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {

  return (
    <SessionProvider session={session}>
       {/* <ThemeProvider enableSystem={true} attribute="class"> */}
       <>
            <NextThemesProvider
            enableSystem={true}
    defaultTheme="system"
    attribute="class"
    value={{
      light: lightTheme.className,
      dark: darkTheme.className
    }}
  >
      <Layout>
       
        <Component {...pageProps} />
       
      </Layout>
      </NextThemesProvider>
    </>
      {/* </ThemeProvider> */}
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
