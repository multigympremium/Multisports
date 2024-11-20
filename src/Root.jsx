import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import Footer from "./shared/Footer";
import HorizontalMenu from "./shared/HorizontalMenu/HorizontalMenu";
import MetaTags from "./components/Home/MetaTags/MetaTags";
import useGetSeo from "./Hook/GetPublicDataHook/useGetSeo";

//This is Login Page Root only and 404 page Root use for Outlet Component
const Root = () => {

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
