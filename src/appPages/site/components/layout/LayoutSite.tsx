"use client";
import { FC, ReactNode, useEffect, useState } from "react";
import scss from "./LayoutSite.module.scss";
import PreLoader from "@/ui/preLoader/PreLoader";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import { useGetMeQuery } from "@/redux/api/auth";

interface LayoutSiteProps {
  children: ReactNode;
}

const LayoutSite: FC<LayoutSiteProps> = ({ children }) => {
  const { status } = useGetMeQuery();
  const [isPreLoader, setIsPreloader] = useState(true);

  useEffect(() => {
    if (status === "fulfilled" || status === "rejected") {
      setTimeout(() => {
        setIsPreloader(false);
      }, 700);
    }
  }, [status]);

  return (
    <>
      {isPreLoader ? (
        <>
          <PreLoader />
        </>
      ) : (
        <>
          <div className={scss.LayoutSite}>
            <Header />
            <main>{children}</main>
            <Footer />
          </div>
        </>
      )}
    </>
  );
};
export default LayoutSite;
