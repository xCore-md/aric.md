import ky from "ky";
import { getLocale } from "next-intl/server";
import { API_URL } from "@/utils/constants";
import { CurrencyEnum, LanguageEnum } from "@/types";
import { getCookie } from "cookies-next";

export const apiInstance = ky.create({
  prefixUrl: API_URL,
  timeout: 60000,
  credentials: "include",
  hooks: {
    beforeRequest: [
      async (request) => {
        const token = getCookie("token")?.toString() || "";
        const locale =
          typeof window === "undefined"
            ? await getLocale()
            : document.documentElement.lang || LanguageEnum.RO;
        const currency = getCookie("currency")?.toString() || CurrencyEnum.MDL;

        if (token) {
          request.headers.set("Authorization", `Bearer ${token}`);
        }
        request.headers.set("X-Language", locale);
        request.headers.set("X-Currency", currency);
      },
    ],
  },
});
