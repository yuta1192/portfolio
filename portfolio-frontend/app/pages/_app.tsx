import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import "tailwindcss/tailwind.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <>
      <Head>
        <title>{pageProps.title}</title>
      </Head>
      <SessionProvider session={session}>
        <div className="flex min-h-screen flex-col">
          <main className="flex-grow">
            <Header />
            <Component {...pageProps} />
          </main>
          <Footer />
        </div>
      </SessionProvider>
    </>
  );
}

export default MyApp;
