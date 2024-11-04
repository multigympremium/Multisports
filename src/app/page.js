import ExclusiveCollection from "@/components/ExclusiveCollection/ExclusiveCollection";
import PopularProducts from "@/components/PopularProducts/PopularProducts";
import NewArrivals from "@/components/NewArrival/NewArrival";
import Banner from "@/components/primary/homeComponents/Banner";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import Footwear from "@/components/Footwear/Footwear";
import TrendyBags from "../components/TrendyBags/TrendyBags";
import HorizontalMenu from "@/components/shared/HorizontalMenu/HorizontalMenu";
import Brands from "@/components/Brands/Brands";
export const metadata = {
  title: "Universal Survey - Home",
  description:
    "Discover a vast collection of surveys on countless topics or create your own and gather valuable insights. Universal Survey is your one-stop platform for exploring, participating in, and creating impactful surveys.",
};
const HomePage = () => {
  return (
    <>
      <Navbar />
      <HorizontalMenu />
      <Banner />
      <PopularProducts />
      <NewArrivals />
      <ExclusiveCollection />
      <Footwear />
      <TrendyBags />

      <Brands />
      <Footer />
    </>
  );
};

export default HomePage;
