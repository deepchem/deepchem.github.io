import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

/**
 * Main layout component - A wrapper layout with the header the the footer
 * @component
 * @param {Object} props - props passed to the component
 * @param {Object} props.children - children to be rendered inside the Main layout
 * @return {JSX} - JSX for the MainLayout component
 */
const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
