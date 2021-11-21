import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import "tailwindcss/tailwind.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>{pageProps.title}</title>
      </Head>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;
