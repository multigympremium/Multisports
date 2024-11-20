import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import Footer from "./shared/Footer";
import HorizontalMenu from "./shared/HorizontalMenu/HorizontalMenu";
import MetaTags from "./components/Home/MetaTags/MetaTags";
import useGetSeo from "./Hook/GetPublicDataHook/useGetSeo";
import useAxiosPublic from "./Hook/useAxiosPublic";

//This is Login Page Root only and 404 page Root use for Outlet Component
const Root = () => {

  const axiosPublic = useAxiosPublic()

  
  useEffect(() => {
    // Simulate fetching theme from API
    const fetchTheme = async () => {
      const res = await axiosPublic.get("/website-theme-color")

      const theme = res?.data?.data[0];

      const root = document.documentElement;
      root.style.setProperty("--primary-color", theme.primaryColor || "#3490dc");
root.style.setProperty("--secondary-color", theme.secondaryColor || "#ffed4a");
root.style.setProperty("--tertiary-color", theme.tertiaryColor || "#e3342f");
root.style.setProperty("--title-color", theme.titleColor || "#1a202c");
root.style.setProperty("--paragraph-color", theme.paragraphColor || "#2d3748");
root.style.setProperty("--border-color", theme.borderColor || "#cbd5e0");
      
    };

    fetchTheme();
  }, [axiosPublic]);

  const content = useGetSeo({});
  return (
    <>
          <MetaTags metaTitle={content.metaTitle} metaDescription={content.metaDescription} metaOgTitle={content.metaOgTitle} metaOgDescription={content.metaOgDescription} metaOgImage={content.metaOgImage} metaKeywords={content.metaKeywords} />

      <Navbar />
      <HorizontalMenu />
      <Outlet />
      <Footer />
    </>
  );
};

export default Root;
