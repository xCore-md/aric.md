"use client";

import React from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "use-intl";
import { Link, usePathname } from "@/i18n/navigation";

import { cn } from "@/lib/utils";
import logo from "@/assets/images/logo-white.svg";
import roFlag from "@/assets/images/languages/ro.svg";
import ruFlag from "@/assets/images/languages/ru.svg";
import enFlag from "@/assets/images/languages/en.svg";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDown, LogOut } from "lucide-react";
import { CallButtonList } from "../CallButtonList";
import { useRouter } from "next/navigation";
import { useCustomerAuth } from "@/hooks/useCustomerAuth";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CURRENCIES, NAV_LINKS, PRIVATE_LINKS, API_URL } from "@/utils/constants";
import { CurrencyEnum, LanguageEnum } from "@/types";
import { useCurrency } from "@/hooks/useCurrency";

const languages = [
  {
    key: LanguageEnum.RO,
    flag: roFlag,
    alt: "Româna",
    label: "Ro",
  },
  {
    key: LanguageEnum.RU,
    flag: ruFlag,
    alt: "Русский",
    label: "Ру",
  },
  {
    key: LanguageEnum.EN,
    flag: enFlag,
    alt: "English",
    label: "En",
  },
];

export const Header: React.FC<{ isHomePage?: boolean }> = ({ isHomePage }) => {
  const [openMenu, setOpenMenu] = React.useState(false);
  const t = useTranslations();
  const tc = useTranslations("company");
  const pathname = usePathname();

  if ((isHomePage && pathname !== "/") || (!isHomePage && pathname === "/"))
    return null;

  return (
    <header className="sticky top-0 z-50">
      <div className={cn("mt-5 hidden sm:block", !isHomePage && "mt-0 bg-white")}>
        <div className="container">
          <div
            className={cn(
              "flex items-center gap-8 py-3 text-sm font-medium",
              isHomePage && "rounded-full bg-white px-8"
            )}
          >
            <a href={`mailto:${tc("email")}`} className="flex items-center gap-1">
              <span>📩</span>
              <span>{tc("email")}</span>
            </a>

            <a href={`tel:${tc("phone").replace(/\s/g, "")}`} className="flex items-center gap-1">
              <span>📞</span>
              <span>{tc("phone")}</span>
            </a>

            <div className="ml-auto flex items-center gap-1">
              <span>🕔</span>
              <span>{t("general.always_available")}</span>
            </div>
          </div>
        </div>
      </div>

      <div className={cn(!isHomePage && "bg-black")}>
        <div className="container">
          <nav className="flex items-center justify-between py-6">
            <Link href="/" className="flex w-20 sm:w-24">
              <Image src={logo.src} alt="Aric.md" width={logo.width} height={logo.height} />
            </Link>

            <div className="hidden items-center gap-8 text-white lg:flex">
              {NAV_LINKS?.map((link, index) => (
                <Link key={index} href={link.path} className="hover:text-blue transition">
                  {t(link.label)}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <LanguagePopover />
              <CurrencyPopover />

              <div className="flex gap-4">
                <AccountButton />

                <CallButtonList />

                <Dialog open={openMenu} onOpenChange={setOpenMenu}>
                  <DialogTrigger asChild>
                    <button className="block lg:hidden" type="button">
                      <svg className="size-8 fill-white" viewBox="0 0 33 33">
                        <path d="M31.4 27a1.2 1.2 0 0 1 0 2.2H1.2a1.2 1.2 0 0 1 0-2.3h30.2ZM31.4 15.3a1.2 1.2 0 0 1 0 2.4H1.2a1.2 1.2 0 0 1 0-2.4h30.2ZM31.4 3.8a1.2 1.2 0 0 1 0 2.3H1.2a1.2 1.2 0 0 1 0-2.3h30.2Z" />
                      </svg>
                    </button>
                  </DialogTrigger>
                  <DialogContent className="h-svh bg-black">
                    <DialogHeader className="sr-only">
                      <DialogTitle />
                      <DialogDescription />
                    </DialogHeader>

                    <div className="space-y-8 pt-2 pb-10">
                      <div className="flex gap-10">
                        <div className="flex items-center gap-1 text-white">
                          <span>🕔</span>
                          <span>Mereu disponibili 24/24</span>
                        </div>

                        <LanguagePopover />
                        <CurrencyPopover />
                      </div>

                      <div
                        className="bg-blue/10 grid gap-2 rounded-xl px-2 py-1 text-white"
                        onClick={() => setOpenMenu(false)}
                      >
                        <a href={`mailto:${tc("email")}`} className="flex items-center gap-1">
                          <span>📩</span>
                          <span>{tc("email")}</span>
                        </a>

                        <a href={`tel:${tc("phone").replace(/\s/g, "")}`} className="flex items-center gap-1">
                          <span>📞</span>
                          <span>{tc("phone")}</span>
                        </a>
                      </div>

                      <div className="flex">
                        <AccountButton />
                      </div>

                      <div
                        className="text-blue flex flex-col gap-2 text-xl"
                        onClick={() => setOpenMenu(false)}
                      >
                        {NAV_LINKS?.map((link, index) => (
                          <Link
                            key={index}
                            href={link.path}
                            className="hover:text-blue py-3 transition"
                          >
                            {t(link.label)}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

const LanguagePopover = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const locale = useLocale();

  const selectedLocale = React.useMemo(() => {
    return languages?.find((lang) => lang?.key === locale) || languages[0];
  }, [locale]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-2 rounded-lg font-semibold text-white uppercase"
        >
          <Image
            src={selectedLocale?.flag?.src}
            alt={selectedLocale?.alt}
            width={selectedLocale?.flag?.width}
            height={selectedLocale?.flag?.height}
            className="size-5 flex-none rounded-full"
          />
          <span>{selectedLocale?.label}</span>
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-32 space-y-2 p-1">
        {languages?.map(({ flag, alt, key }, index) => (
          <Button
            key={index}
            variant="ghost"
            size="sm"
            className={cn(
              "flex justify-start gap-2 rounded-lg text-left font-semibold",
              key === locale && "pointer-events-none opacity-50 grayscale"
            )}
            asChild
          >
            <Link
              href={`${pathname}${searchParams.size ? `?${searchParams}` : ""}`}
              locale={key}
            >
              <Image
                src={flag?.src}
                alt={alt}
                width={flag?.width}
                height={flag?.height}
                className="size-5 flex-none rounded-full"
              />
              <span>{alt}</span>
            </Link>
          </Button>
        ))}
      </PopoverContent>
    </Popover>
  );
};

const AccountButton = () => {
  const t = useTranslations();
  const pathname = usePathname();
  const { isLoading, isAuthenticated } = useCustomerAuth();

  if (isLoading) {
    return <div className="skeleton dark h-12 w-44 flex-none rounded-full" />;
  }

  return isAuthenticated ? (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="white" className="max-w-44 ring-0">
          <span className="truncate">{t("nav.profile")}</span> <ChevronDown />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-50 p-2">
        {PRIVATE_LINKS?.map((link, index) => (
          <Link
            href={link.path}
            key={index}
            className={cn(
              "hover:text-blue flex w-full p-2 text-left transition",
              pathname === link.path && "text-blue"
            )}
          >
            {t(link.label)}
          </Link>
        ))}
        <Button
          variant="ghost"
          size="sm"
          className="text-destructive flex w-full justify-start p-2 font-normal transition"
          onClick={async () => {
            try {
              await fetch(`${API_URL}customer/logout`, {
                method: "POST",
                credentials: "include",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
              });
            } catch (e) {
              console.error("Logout error:", e);
            }
            document.cookie =
              "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            window.location.href = "/";
          }}
        >
          <LogOut />
          {t("logout")}
        </Button>
      </PopoverContent>
    </Popover>
  ) : (
    <Button variant="white" asChild>
      <Link href="/login">{t("nav.login")}</Link>
    </Button>
  );
};

export const CurrencyPopover = () => {
  const router = useRouter();
  const { setCurrency, currency } = useCurrency();

  const handleChange = (currency: CurrencyEnum) => {
    setCurrency(currency);
    router.refresh();
  };

  if (!currency)
    return <div className="skeleton dark h-8 w-18 rounded-full" />;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="font-semibold text-white uppercase"
        >
          {currency}
          <ChevronDown strokeWidth={3} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-16 space-y-2 p-1">
        {CURRENCIES?.map((currencyItem) => (
          <Button
            key={currencyItem}
            variant="ghost"
            size="sm"
            className={cn(
              "w-full justify-start rounded-lg font-semibold",
              currencyItem === currency && "pointer-events-none opacity-50 grayscale"
            )}
            onClick={() => handleChange(currencyItem)}
          >
            {currencyItem}
          </Button>
        ))}
      </PopoverContent>
    </Popover>
  );
};
