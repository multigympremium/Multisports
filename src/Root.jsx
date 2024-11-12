import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import Footer from "./shared/Footer";
import HorizontalMenu from "./shared/HorizontalMenu/HorizontalMenu";

//This is Login Page Root only and 404 page Root use for Outlet Component
const Root = () => {
  return (
    <>
      <Navbar />
      <HorizontalMenu />
      <Outlet />
      <Footer />
    </>
  );
};

export default Root;
