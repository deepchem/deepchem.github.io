import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

/** Common layout with the header and the footer
 * @component
 * @param {Object} props - props passed to the component
 * @param {Object} props.children - children to be rendered inside the common layout
 * @return {JSX} - JSX for the common layout with the header and the footer
 */
export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
