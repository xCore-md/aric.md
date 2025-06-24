import { AVAILABLE_LANGUAGES } from "@/utils/constants";
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: AVAILABLE_LANGUAGES,
  defaultLocale: "ro",
  localePrefix: "as-needed",
});
