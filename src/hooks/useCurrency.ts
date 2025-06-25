import { CurrencyEnum } from "@/types";
import { getCookie, setCookie } from "cookies-next";
import { useTranslations } from "next-intl";
import { useMemo, useCallback } from "react";

const DEFAULT_CURRENCY = CurrencyEnum.MDL;

const isValidCurrency = (value: any): value is CurrencyEnum =>
  Object.values(CurrencyEnum).includes(value);

type FormatCurrencyOptions = {
  with?: "symbol" | "label" | "none";
};

const symbolMap: Record<CurrencyEnum, string> = {
  [CurrencyEnum.MDL]: "L",
  [CurrencyEnum.UAH]: "₴",
};

export const useCurrency = () => {
  const t = useTranslations();

  const raw = getCookie("currency")?.toString().toUpperCase();
  const currency = isValidCurrency(raw) ? raw : DEFAULT_CURRENCY;

  const currencySymbol = useMemo(() => symbolMap[currency], [currency]);
  const currencyLabel = useMemo(() => t(`currency.${currency}`), [currency, t]);

  const formatCurrency = useCallback(
    (
      price: number | null | undefined,
      options: FormatCurrencyOptions = { with: "label" },
    ): string => {
      if (price == null) return "-";

      const formatted = price.toLocaleString("ro-RO");

      const suffixMap = {
        symbol: currencySymbol,
        label: currencyLabel,
        none: "",
      };

      const suffix = suffixMap[options.with ?? "label"];

      return `${formatted}${suffix ? ` ${suffix}` : ""}`;
    },
    [currencySymbol, currencyLabel],
  );

  const setCurrency = useCallback((value: CurrencyEnum) => {
    setCookie("currency", value, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365, // 1 an
    });
  }, []);

  return {
    currency,
    currencySymbol,
    currencyLabel,
    formatCurrency,
    setCurrency,
  };
};
