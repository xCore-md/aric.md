"use client";
import React from "react";
import Image from "next/image";
import NextLink from "next/link";
import { useLocale } from "use-intl";
import { Link, usePathname } from "@/i18n/navigation";

import { cn } from "@/lib/utils";
import logo from "@/assets/images/logo-white.svg";
import roFlag from "@/assets/images/languages/ro.svg";
import ruFlag from "@/assets/images/languages/ru.svg";
import { Button } from "@/components/ui/button";

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
  const pathname = usePathname();
  const locale = useLocale();

  if ((isHomePage && pathname !== "/") || (!isHomePage && pathname === "/"))
    return null;

  return (
    <header>
      <div className={cn("mt-5", !isHomePage && "bg-white mt-0")}>
        <div className="container">
          <div
            className={cn(
              "flex items-center gap-8 text-sm font-medium py-3",
              isHomePage && "bg-white px-8 rounded-full",
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
          <nav className="flex items-center justify-between  py-6">
            <Link href="/" className="w-24 flex">
              <Image
                src={logo.src}
                alt="Aric.md"
                width={logo.width}
                height={logo.height}
              />
            </Link>

            <ul className="flex items-center gap-8 text-white">
              <li>
                <Link href="/">Acasă</Link>
              </li>
              <li>
                <Link href="/about">Despre noi</Link>
              </li>
              <li>
                <Link href="/faq">Întrebări și răspunsuri</Link>
              </li>
              <li>
                <Link href="/contacts">Contacte</Link>
              </li>
            </ul>

            <div className="flex items-center gap-4">
              <NextLink
                href={`/${language[locale]?.next}/${pathname}`}
                className="flex items-center gap-2 font-semibold text-white"
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

              <Button variant="white">Contul meu</Button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};
