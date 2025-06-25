import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { auth } from "@/auth";
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
];

const loginRegex = new RegExp(
  `^/(?:(${AVAILABLE_LANGUAGES.join("|")})/)?login/?$`,
  "i",
);

const authMiddleware = auth((req) => {
  const pathname = req.nextUrl.pathname;
  if (req.auth && loginRegex.test(pathname)) {
    const localeMatch = pathname.match(loginRegex);
    const locale = localeMatch?.[1] ?? routing?.defaultLocale ?? "";
    return NextResponse.redirect(new URL(`/${locale}/tickets`, req.url));
  }

  if (req.auth) {
    return handleI18nRouting(req);
  }

  if (!req.auth && pathname !== "/") {
    return NextResponse.redirect(
      new URL(`/login?callbackUrl=${encodeURIComponent(pathname)}`, req.url),
    );
  }
});

export default function middleware(req: NextRequest) {
  const publicPathnameRegex = RegExp(
    `^(/(${AVAILABLE_LANGUAGES.join("|")}))?(${publicPages
      .flatMap((p) => (p === "/" ? ["", "/"] : p))
      .join("|")})/?$`,
    "i",
  );

  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);

  if (isPublicPage) {
    return handleI18nRouting(req);
  } else {
    return (authMiddleware as any)(req);
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|apple-touch-icon.png|favicon.svg|images/books|icons|manifest).*)",
  ],
};
