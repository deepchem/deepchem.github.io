import Head from "next/head";

import "react-responsive-carousel/lib/styles/carousel.min.css";

import "../styles/globals.css";
import Layout from "../layouts/layout";

import "../components/CustomCarousel/CustomCarousel.styles.css";

import "react-tooltip/dist/react-tooltip.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>DeepChem</title>

        <link rel="shortcut icon" href="/deepchem.github.io/favicon.ico" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
