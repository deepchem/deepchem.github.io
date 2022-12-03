import "../styles/globals.css";
import Layout from "../components/layout";

//Styles for carousel
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
