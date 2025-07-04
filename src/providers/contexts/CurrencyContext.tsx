"use client";

import React, { createContext, useState, useCallback, useEffect } from "react";
import { getCookie, setCookie } from "cookies-next";
import { CurrencyEnum } from "@/types";

const DEFAULT_CURRENCY = CurrencyEnum.MDL;

const isValidCurrency = (value: any): value is CurrencyEnum =>
  Object.values(CurrencyEnum).includes(value);

type CurrencyContextType = {
  currency: CurrencyEnum;
  setCurrency: (value: CurrencyEnum) => void;
};

export const CurrencyContext = createContext<CurrencyContextType | null>(null);

export const CurrencyProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [currency, setCurrencyState] = useState<CurrencyEnum>(DEFAULT_CURRENCY);

  useEffect(() => {
    const raw = getCookie("currency")?.toString().toUpperCase();
    if (isValidCurrency(raw)) {
      setCurrencyState(raw);
    }
  }, []);

  const setCurrency = useCallback((value: CurrencyEnum) => {
    setCurrencyState(value);
    setCookie("currency", value, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
    });
  }, []);

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
};
