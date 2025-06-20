"use client";
import ReduxProvider from "@/provider/SessionProvider";
import React, { FC, ReactNode } from "react";

interface RootLayoutClientProps {
  children: ReactNode;
}

const RootLayoutClient: FC<RootLayoutClientProps> = ({ children }) => {
  return (
    <>
      <ReduxProvider>
        <SessionProvider>{children}</SessionProvider>
      </ReduxProvider>
    </>
  );
};

export default RootLayoutClient;
