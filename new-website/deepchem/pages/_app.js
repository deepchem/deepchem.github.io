import Head from "next/head";

import "react-responsive-carousel/lib/styles/carousel.min.css";

import "../styles/globals.css";

import MainLayout from "../layouts/main";
import DefaultLayout from "../layouts/default";

import "../components/CustomCarousel/CustomCarousel.styles.css";

import "react-tooltip/dist/react-tooltip.css";
import "react-dropdown/style.css";

import { AnimationsProvider } from "../contexts/animations-context";

/**
 * Custom _app.js to render common and selective layouts for different pages
 * @component
 * @param {Object} props - Props passed to the component
 * @param {React.Component} props.Component - Component to be rendered within the common layout
 * @param {Object} props.pageProps - Props passed to the child component
 * @return {JSX} - JSX for the App component
 */
const MyApp = ({ Component, pageProps }) => {
  const Layout = Component.Layout || DefaultLayout;
  return (
    <AnimationsProvider>
      <Head>
        <title>DeepChem</title>

        <link rel="shortcut icon" href="/deepchem.github.io/favicon.ico" />
      </Head>
      <MainLayout>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </MainLayout>
    </AnimationsProvider>
  );
};
export default MyApp;
