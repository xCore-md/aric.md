"use client";
import React from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import NextLink from "next/link";
import { useLocale, useTranslations } from "use-intl";
import { Link, usePathname } from "@/i18n/navigation";

import { cn } from "@/lib/utils";
import logo from "@/assets/images/logo-white.svg";
import roFlag from "@/assets/images/languages/ro.svg";
import ruFlag from "@/assets/images/languages/ru.svg";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  CONTACTS,
  NAV_LINKS,
  PRIVATE_LINKS,
  QUERY_KEYS,
} from "@/utils/constants";

const language: {
  [key: string]: {
    alt: string;
    label: string;
    next: string;
    flag: { src: string; width: number; height: number };
  };
} = {
  ru: {
    flag: roFlag,
    alt: "Româna",
    label: "Ro",
    next: "ro",
  },
  ro: {
    flag: ruFlag,
    alt: "Русский",
    label: "Ру",
    next: "ru",
  },
  en: {
    flag: ruFlag,
    alt: "Русский",
    label: "Ру",
    next: "ru",
  },
};

export const Header: React.FC<{ isHomePage?: boolean }> = ({ isHomePage }) => {
  const [openMenu, setOpenMenu] = React.useState(false);
  const t = useTranslations();

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const locale = useLocale();

  if ((isHomePage && pathname !== "/") || (!isHomePage && pathname === "/"))
    return null;

  return (
    <header className="sticky top-0 z-50">
      <div
        className={cn("mt-5 hidden sm:block", !isHomePage && "mt-0 bg-white")}
      >
        <div className="container">
          <div
            className={cn(
              "flex items-center gap-8 py-3 text-sm font-medium",
              isHomePage && "rounded-full bg-white px-8",
            )}
          >
            <a
              href={`mailto:${CONTACTS.email}`}
              className="flex items-center gap-1"
            >
              <span>📩</span>
              <span>{CONTACTS.email}</span>
            </a>

            <a
              href={`tel:${CONTACTS.phone}`}
              className="flex items-center gap-1"
            >
              <span>📞</span>
              <span>{CONTACTS.phone}</span>
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
              <Image
                src={logo.src}
                alt="Aric.md"
                width={logo.width}
                height={logo.height}
              />
            </Link>

            <div className="hidden items-center gap-8 text-white lg:flex">
              {NAV_LINKS?.map((link, index) => (
                <Link
                  key={index}
                  href={link.path}
                  className="hover:text-blue transition"
                >
                  {t(link.label)}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <NextLink
                href={
                  `/${language[locale]?.next}/${pathname}` +
                  (searchParams.size ? `?${searchParams}` : "")
                }
                className="xs:flex hidden items-center gap-2 font-semibold text-white"
              >
                <Image
                  src={language[locale]?.flag?.src}
                  alt={language[locale]?.alt}
                  width={language[locale]?.flag?.width}
                  height={language[locale]?.flag?.height}
                  className="size-5"
                />
                <span>{language[locale]?.label}</span>
              </NextLink>

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
                      <div
                        className="flex gap-10"
                        onClick={() => setOpenMenu(false)}
                      >
                        <div className="flex items-center gap-1 text-white">
                          <span>🕔</span>
                          <span>Mereu disponibili 24/24</span>
                        </div>

                        <NextLink
                          href={`/${language[locale]?.next}/${pathname}`}
                          className="xs:flex hidden items-center gap-2 font-semibold text-white"
                        >
                          <Image
                            src={language[locale]?.flag?.src}
                            alt={language[locale]?.alt}
                            width={language[locale]?.flag?.width}
                            height={language[locale]?.flag?.height}
                            className="size-5"
                          />
                          <span>{language[locale]?.label}</span>
                        </NextLink>
                      </div>

                      <div
                        className="bg-blue/10 grid gap-2 rounded-xl px-2 py-1 text-white"
                        onClick={() => setOpenMenu(false)}
                      >
                        <a
                          href={`mailto:${CONTACTS.email}`}
                          className="flex items-center gap-1"
                        >
                          <span>📩</span>
                          <span>{CONTACTS.email}</span>
                        </a>

                        <a
                          href={`tel:${CONTACTS.phone}`}
                          className="flex items-center gap-1"
                        >
                          <span>📞</span>
                          <span>{CONTACTS.phone}</span>
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

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDown, LogOut } from "lucide-react";
import { CallButtonList } from "../CallButtonList";
import { useSession } from "next-auth/react";
import { LogoutAlert } from "../logout-alert";
import { useQuery } from "@tanstack/react-query";
import { profileService } from "@/services/profile.service";

const AccountButton = () => {
  const t = useTranslations();
  const pathname = usePathname();

  const { status } = useSession();

  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.profile],
    queryFn: () => profileService.get(),
    enabled: status === "authenticated",
  });

  return (
    <>
      {status === "loading" || isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          {status === "authenticated" ? (
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="white" className="ring-0">
                  {data?.data?.email || "Contul meu"} <ChevronDown />
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-50 p-2">
                {PRIVATE_LINKS?.map((link, index) => (
                  <Link
                    href={link.path}
                    key={index}
                    className={cn(
                      "hover:text-blue flex w-full p-2 text-left transition",
                      pathname === link.path && "text-blue",
                    )}
                  >
                    {t(link.label)}
                  </Link>
                ))}

                <LogoutAlert>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-destructive flex w-full justify-start p-2 font-normal transition"
                  >
                    <LogOut />
                    Logout
                  </Button>
                </LogoutAlert>
              </PopoverContent>
            </Popover>
          ) : (
            <Button variant="white" asChild>
              <Link href="/login">Contul meu</Link>
            </Button>
          )}
        </>
      )}
    </>
  );
};
