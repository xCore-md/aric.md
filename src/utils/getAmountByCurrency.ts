import { getCookie } from "cookies-next";
import { CurrencyEnum } from "@/types";

export const getAmountByCurrency = (
  obj: Record<string, any> | undefined,
  prefix = "price_",
  fallbackCurrency: CurrencyEnum = CurrencyEnum.MDL,
): number | null => {
  if (!obj) return null;

  const rawCurrency = getCookie("currency");
  const currentCurrency =
    (rawCurrency?.toString().toUpperCase() as CurrencyEnum) || fallbackCurrency;

  const key = `${prefix}${currentCurrency.toLowerCase()}`;
  const fallbackKey = `${prefix}${fallbackCurrency.toLowerCase()}`;

  return obj[key] ?? obj[fallbackKey] ?? null;
};
