"use client";
import React from "react";
import Image from "next/image";
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
import { NAV_LINKS } from "@/utils/constants";

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
};

export const Header: React.FC<{ isHomePage?: boolean }> = ({ isHomePage }) => {
  const [openMenu, setOpenMenu] = React.useState(false);
  const t = useTranslations();

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
              href="mailto:contact@aric.md"
              className="flex items-center gap-1"
            >
              <span>📩</span>
              <span>contact@aric.md</span>
            </a>

            <a href="tel:+37379435990" className="flex items-center gap-1">
              <span>📞</span>
              <span>+373 79 435 990</span>
            </a>

            <div className="ml-auto flex items-center gap-1">
              <span>🕔</span>
              <span>Mereu disponibili 24/24</span>
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

              <div className="flex gap-4">
                <Button variant="white">Contul meu</Button>

                <Dialog open={openMenu} onOpenChange={setOpenMenu}>
                  <DialogTrigger asChild>
                    <button className="block lg:hidden">
                      <svg className="size-8 fill-white" viewBox="0 0 33 33">
                        <path d="M31.4 27a1.2 1.2 0 0 1 0 2.2H1.2a1.2 1.2 0 0 1 0-2.3h30.2ZM31.4 15.3a1.2 1.2 0 0 1 0 2.4H1.2a1.2 1.2 0 0 1 0-2.4h30.2ZM31.4 3.8a1.2 1.2 0 0 1 0 2.3H1.2a1.2 1.2 0 0 1 0-2.3h30.2Z" />
                      </svg>
                    </button>
                  </DialogTrigger>
                  <DialogContent className="h-svh">
                    <DialogHeader className="sr-only">
                      <DialogTitle />
                      <DialogDescription />
                    </DialogHeader>

                    <div
                      className="px-6 py-10"
                      onClick={() => setOpenMenu(false)}
                    >
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Atque, non?
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
