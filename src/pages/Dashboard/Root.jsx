import React, { useState } from "react";
// import Header from './../../components/Header/header';
import Sidebar from "./../../components/Sidebar/Sidebar";
import { ChevronRight } from "lucide-react";
import ToggleSidebarBtn from "../../components/Sidebar/ToggleSidebarBtn/ToggleSidebarBtn";
import { Outlet } from "react-router-dom";
import MetaTags from "../../components/Home/MetaTags/MetaTags";
import useGetSeo from "../../Hook/GetPublicDataHook/useGetSeo";

const Root_Dashboard = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const content = useGetSeo({});

  
  return (
    <div className="grid grid-cols-[auto_1fr]">
            <MetaTags metaTitle={content.metaTitle} metaDescription={content.metaDescription} metaOgTitle={content.metaOgTitle} metaOgDescription={content.metaOgDescription} metaOgImage={content.metaOgImage} metaKeywords={content.metaKeywords} />

      <Sidebar isCollapsed={isCollapsed} />
      {/* <Header/> */}
      <div className="md:p-8 bg-slate-50 h-dvh overflow-auto relative">
        <ToggleSidebarBtn
          setIsCollapsed={setIsCollapsed}
          isCollapsed={isCollapsed}
        />
        <Outlet />
      </div>
    </div>
  );
};

export default Root_Dashboard;
