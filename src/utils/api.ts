import ky from "ky";
import { getSession } from "next-auth/react";
import { getLocale } from "next-intl/server";

import { API_URL } from "@/utils/constants";
import { auth } from "@/auth";
import { authService } from "@/services/auth.service";
import { CurrencyEnum, LanguageEnum } from "@/types";
import { getCookie } from "cookies-next";

export const apiInstance = ky.create({
  prefixUrl: API_URL,
  timeout: 60000,
  hooks: {
    beforeRequest: [
      async (request) => {
        let token = "";
        let locale = LanguageEnum.RO as string;
        let currency = CurrencyEnum.MDL as string;

        if (typeof window === "undefined") {
          // SERVER SIDE
          const session = await auth();
          token = session?.accessToken || "";

          locale = await getLocale();
        } else {
          // CLIENT SIDE
          const session = await getSession();
          token = session?.accessToken || "";

          locale = document.documentElement.lang || LanguageEnum.RO;
          currency = getCookie("currency")?.toString() || CurrencyEnum.MDL;
        }

        request.headers.set("Authorization", `Bearer ${token}`);
        request.headers.set("X-Language", locale);
        request.headers.set("X-Currency", currency);
      },
    ],

    afterResponse: [
      async (_request, _options, response) => {
        if (response.status === 401 || response.status === 403) {
          await authService.logout();
        }
        return response;
      },
    ],
  },
});
