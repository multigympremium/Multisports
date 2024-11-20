
import Banner from "../../../components/Home/Banner/Banner";
import Brands from "../../../components/Home/Brands/Brands";
import ExclusiveCollection from "../../../components/Home/ExclusiveCollection/ExclusiveCollection";
import Footwear from "../../../components/Home/Footwear/Footwear";
import MetaTags from "../../../components/Home/MetaTags/MetaTags";
import NewArrivals from "../../../components/Home/NewArrival/NewArrival";
import PopularProducts from "../../../components/Home/PopularProducts/PopularProducts";
import TrendyBags from "../../../components/Home/TrendyBags/TrendyBags";
import useGetSeo from "../../../Hook/GetPublicDataHook/useGetSeo";
import Footer from "../../../shared/Footer";
import HorizontalMenu from "../../../shared/HorizontalMenu/HorizontalMenu";
import Navbar from "../../../shared/Navbar";
export const metadata = {
  title: "Universal Survey - Home",
  description:
    "Discover a vast collection of surveys on countless topics or create your own and gather valuable insights. Universal Survey is your one-stop platform for exploring, participating in, and creating impactful surveys.",
};
const HomePage = () => {
  const content = useGetSeo({});
  return (
    <>
      
      <MetaTags metaTitle={content.metaTitle} metaDescription={content.metaDescription} metaOgTitle={content.metaOgTitle} metaOgDescription={content.metaOgDescription} metaOgImage={content.metaOgImage} metaKeywords={content.metaKeywords} />

      <Banner />
      <PopularProducts />
      <NewArrivals />
      <ExclusiveCollection />
      <Footwear />
      <TrendyBags />

      <Brands />
    </>
  );
};

export default HomePage;
