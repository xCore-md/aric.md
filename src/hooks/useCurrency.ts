import { useContext, useMemo, useCallback } from "react";
import { useTranslations } from "next-intl";
import { CurrencyEnum } from "@/types";
import { CurrencyContext } from "@/providers/contexts/CurrencyContext";

type FormatCurrencyOptions = {
  with?: "symbol" | "label" | "none";
};

const symbolMap: Record<CurrencyEnum, string> = {
  [CurrencyEnum.MDL]: "L",
  [CurrencyEnum.UAH]: "₴",
};

export const useCurrency = () => {
  const t = useTranslations();
  const context = useContext(CurrencyContext);

  if (!context) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }

  const { currency, setCurrency } = context;

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

  return {
    currency,
    setCurrency,
    currencySymbol,
    currencyLabel,
    formatCurrency,
  };
};
