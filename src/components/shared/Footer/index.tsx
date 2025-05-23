"use client";
import React from "react";
import Image from "next/image";
import { Link, usePathname } from "@/i18n/navigation";

import logo from "@/assets/images/logo.svg";
import { Button } from "@/components/ui/button";
import { ChevronRightIcon } from "lucide-react";
import { NAV_LINKS } from "@/utils/constants";
import { useTranslations } from "use-intl";

export const Footer: React.FC = () => {
  const t = useTranslations();
  const pathname = usePathname();
  return (
    <div className="mt-auto">
      <footer className="bg-black px-0 py-10 md:p-14">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-20 xl:gap-48">
            <div className="flex flex-col">
              <div className="">
                <Link href="/" className="flex w-24">
                  <Image
                    src={logo}
                    alt="Aric.md"
                    width={logo.width}
                    height={logo.height}
                  />
                </Link>

                <div className="text-platinum mt-8">
                  Rezervă-ți locul ușor și bucură-te de o călătorie sigură și
                  confortabilă. Microbuze moderne, orare flexibile și rezervare
                  rapidă online — tot ce ai nevoie pentru un drum fără griji.
                </div>

                <Button className="mt-4" variant="white" asChild>
                  <Link href="/">Despre noi</Link>
                </Button>
              </div>

              <div className="mt-auto hidden lg:block">
                <TermsAndSocial />
              </div>
            </div>

            <div className="flex flex-col justify-between gap-8 md:gap-16">
              <div className="flex flex-col gap-8 text-white md:flex-row md:items-center">
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

              <div className="rounded-2xl bg-white/10 p-6 ring-1 ring-white ring-inset">
                <div className="bg-mentol mb-6 max-w-max rounded-full px-3 py-2 text-sm">
                  Pleacă în curând
                </div>

                <ul className="divide-text-gray -mb-6 space-y-6 divide-y">
                  <li className="pb-6">
                    <div className="flex items-center justify-between gap-4 text-white">
                      <div className="">Chișinău - Ismail</div>
                      <div className="text-mentol">12:20</div>
                      <ChevronRightIcon className="6" />
                    </div>
                  </li>
                  <li className="pb-6">
                    <div className="flex items-center justify-between gap-4 text-white">
                      <div className="">Chișinău - Ismail</div>
                      <div className="text-mentol">12:20</div>
                      <ChevronRightIcon className="6" />
                    </div>
                  </li>
                </ul>
              </div>

              <div className="flex items-end justify-between">
                <div className="space-y-12">
                  <div className="flex flex-col gap-2">
                    <div className="text-lg font-semibold text-white">
                      Contacte
                    </div>
                    <a
                      className="text-text-gray text-sm"
                      href="tel:+37378348888"
                    >
                      +373 78 348 888
                    </a>
                    <a
                      className="text-text-gray text-sm"
                      href="mailto:contact@aric.md"
                    >
                      contact@aric.md
                    </a>
                  </div>

                  <div className="pr-10">
                    <div className="text-lg font-semibold text-white">
                      Adresa
                    </div>
                    <div className="text-text-gray text-sm">
                      Rep Moldova, mun.Chisinau, str, Calea Basarabiei 26
                    </div>
                  </div>
                </div>

                <div className="flex-none">
                  <div className="text-white">Schimbă limba</div>
                  <div className="flex justify-end gap-4 text-sm text-[#8F9FA3]">
                    <Link href={"/" + pathname}>Ro</Link>
                    <Link href={"/ru/" + pathname}>Ru</Link>
                  </div>
                </div>
              </div>

              <div className="block lg:hidden">
                <TermsAndSocial />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const TermsAndSocial = () => {
  return (
    <div className="flex h-full flex-col justify-between gap-8 sm:flex-row">
      <div className="flex max-w-max grid-cols-2 gap-2 sm:grid">
        {[1, 2, 3, 4, 5].map((_, index) => (
          <div
            key={index}
            className="flex size-10 items-center justify-center rounded-full bg-white"
          >
            X
          </div>
        ))}
      </div>

      <div className="flex h-full flex-col gap-4">
        <div className="flex flex-col sm:items-end">
          <Link href="/terms" className="text-yellow hover:text-blue text-sm">
            Termenii și condițiile generale
          </Link>
          <Link href="/terms" className="text-yellow hover:text-blue text-sm">
            Politicii de confidențialitate
          </Link>
        </div>

        <div className="text-platinum mt-auto text-center text-xs sm:text-right">
          <div>© 2025 — Copyright</div>
          <div>All Rights reserved</div>
        </div>
      </div>
    </div>
  );
};
