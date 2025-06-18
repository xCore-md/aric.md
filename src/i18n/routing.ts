import { SUPORTED_LANGUAGES } from "@/utils/constants";
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: SUPORTED_LANGUAGES,
  defaultLocale: "ro",
  localePrefix: "as-needed",
});
