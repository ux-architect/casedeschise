'use client'

import { createContext, useContext } from "react";
import type { SiteInfoType } from "@/types";

export const GlobalInfoContext = createContext<SiteInfoType | null>(null);

export const useGlobalInfo = () => {
  const context = useContext(GlobalInfoContext);
  if (!context) {
    throw new Error("useGeneralInfo must be used within GeneralInfoProvider");
  }
  return context;
};