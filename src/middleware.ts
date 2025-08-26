import { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";
import { AVAILABLE_LANGUAGES } from "./utils/constants";

const handleI18nRouting = createMiddleware(routing);

const publicPages = [
  "/",
  "/about",
  "/faq",
  "/contacts",
  "/legal",
  "/login",
  "/search",
  "/payments/success",
  "/payments/fail",
];

export default function middleware(req: NextRequest) {
  const publicPathnameRegex = RegExp(
    `^(/(${AVAILABLE_LANGUAGES.join("|")}))?(${publicPages
      .flatMap((p) => (p === "/" ? ["", "/"] : p))
      .join("|")})/?$`,
    "i",
  );

  if (publicPathnameRegex.test(req.nextUrl.pathname)) {
    return handleI18nRouting(req);
  }

  return handleI18nRouting(req);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
