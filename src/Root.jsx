import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import Footer from "./shared/Footer";
import HorizontalMenu from "./shared/HorizontalMenu/HorizontalMenu";
import MetaTags from "./components/Home/MetaTags/MetaTags";
import useGetSeo from "./Hook/GetPublicDataHook/useGetSeo";
import useAxiosPublic from "./Hook/useAxiosPublic";
import ReactGA from "react-ga4";
import ReactPixel from "react-facebook-pixel"

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


  useEffect(() => {
    const applyCustomCode = async () => {
      const response = await axiosPublic.get("/custom-css-js")
      if (response.status === 200 || response.status === 201) {
        const  data  = await response.data.data[0];

        console.log(data, "css jss")

        if (data) {
          // Apply Custom CSS
          const style = document.createElement("style");
          style.id = "custom-css";
          style.innerHTML = data.css;
          document.head.appendChild(style);

          // Apply Header Script
          const headerScript = document.createElement("script");
          headerScript.id = "header-script";
          headerScript.innerHTML = data.headerJs;
          document.head.appendChild(headerScript);

          // Apply Footer Script
          const footerScript = document.createElement("script");
          footerScript.id = "footer-script";
          footerScript.innerHTML = data.footerJs;
          document.body.appendChild(footerScript);
        }
      }
    };

    applyCustomCode();

    return () => {
      // Clean up old scripts/styles on re-render
      document.getElementById("custom-css")?.remove();
      document.getElementById("header-script")?.remove();
      document.getElementById("footer-script")?.remove();
    };
  }, []);

  useEffect(() => {
    // Fetch the Pixel ID dynamically (from backend or settings)
    const pixelId = localStorage.getItem('facebookPixelId'); // Example
    if (pixelId) {
      ReactPixel.init(pixelId);
      ReactPixel.pageView(); // Track a page view
    }

    const googleAnalytic = localStorage.getItem("googleAnalytic");
    const googleAnalyticData = JSON.parse(googleAnalytic);

    console.log(googleAnalyticData, "googleAnalyticData");
    if (googleAnalyticData?.isEnableAnalytic && googleAnalyticData?.trackingID) {
      ReactGA.initialize(googleAnalyticData?.trackingID);

      const scriptElem = document.createElement("script");
      let scriptSrcElem = document.createElement("script");
       scriptSrcElem.src =  `src="https://www.googletagmanager.com/gtag/js?id=G-2P4DFL43YR`;
       scriptSrcElem.async = true;
      //  `<script async src="https://www.googletagmanager.com/gtag/js?id=G-2P4DFL43YR"></script>`;
      scriptElem.innerHTML = `window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-2P4DFL43YR');`;


  document.body.appendChild(scriptElem);
  document.body.appendChild(scriptSrcElem);


    }

    ReactGA.initialize("G-2P4DFL43YR");
    

  }, []);

  useEffect(() => {
    const fetchShippingPolicy = async () => {
      const response = await axiosPublic.get("/tawk-live-chat");
      const data = response?.data?.data;

      // setTargetId(data[0]?._id);
      // setIsEnabled(data[0]?.isEnabled);
      
      if(data[0]?.isEnabled === "true") {
        
        console.log(data , "agsdfgs sfg sg  talk");

        const scriptElem = document.createElement("script");
        scriptElem.innerHTML = `
        var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
        (function(){
        var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
        s1.async=true;
        s1.src='https://embed.tawk.to/674609ab2480f5b4f5a461f9/1idkpbi66';
        s1.charset='UTF-8';
        s1.setAttribute('crossorigin','*');
        s0.parentNode.insertBefore(s1,s0);
        })();
  `
        
        document.body.appendChild(scriptElem);
      }
    };

    fetchShippingPolicy();
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
