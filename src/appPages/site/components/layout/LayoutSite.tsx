"use client";
import { FC, ReactNode, useEffect, useState } from "react";
import scss from "./LayoutSite.module.scss";
import PreLoader from "@/ui/preLoader/PreLoader";
import Header from "./header/Header";
import Footer from "./footer/Footer";

interface LayoutSiteProps {
  children: ReactNode;
}

const LayoutSite: FC<LayoutSiteProps> = ({ children }) => {
  const [isPreLoader, setIsPreloader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPreloader(false);
    }, 1000); // 1 секунда

    return () => clearTimeout(timer); // очистка таймера при размонтировании
  }, []);

  return (
    <>
      {isPreLoader ? (
        <PreLoader />
      ) : (
        <div className={scss.LayoutSite}>
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
      )}
    </>
  );
};

export default LayoutSite;
