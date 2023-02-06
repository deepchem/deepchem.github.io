import Head from "next/head";

import "react-responsive-carousel/lib/styles/carousel.min.css";

import "../styles/globals.css";
import Layout from "../layouts/layout";

import "../components/CustomCarousel/CustomCarousel.styles.css";

import "react-tooltip/dist/react-tooltip.css";
import "react-toggle/style.css";
import "react-dropdown/style.css";

import { AnimationsProvider } from "../contexts/animations-context";

/**
 * Custom _app.js to render common layouts for all pages
 * @component
 * @param {Object} props - Props passed to the component
 * @param {React.Component} props.Component - Component to be rendered within the common layout
 * @param {Object} props.pageProps - Props passed to the child component
 * @return {JSX} - JSX for the App component
 */
const MyApp = ({ Component, pageProps }) => {
  return (
    <AnimationsProvider>
      <Head>
        <title>DeepChem</title>

        <link rel="shortcut icon" href="/deepchem.github.io/favicon.ico" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AnimationsProvider>
  );
};

export default MyApp;
