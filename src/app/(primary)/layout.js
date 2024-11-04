import Footer from "@/components/shared/Footer";
import HorizontalMenu from "@/components/shared/HorizontalMenu/HorizontalMenu";
import Navbar from "@/components/shared/Navbar";

function Layout({ children }) {
  return (
    <>
      <Navbar />
      <HorizontalMenu />
      {children}
      <Footer />
    </>
  );
}

export default Layout;
