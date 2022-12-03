import Head from "next/head";

import "react-responsive-carousel/lib/styles/carousel.min.css";

import "../styles/globals.css";
import Layout from "../layouts/layout";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>DeepChem</title>
        
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
