"use client";
import React from "react";
import Image from "next/image";
import { Link, usePathname } from "@/i18n/navigation";

import logo from "@/assets/images/logo.svg";
import { Button } from "@/components/ui/button";
import { ChevronRightIcon } from "lucide-react";

export const Footer: React.FC = () => {
  const pathname = usePathname();
  return (
    <div className="mt-auto">
      <footer className="mt-28 bg-black p-14">
        <div className="container">
          <div className="grid grid-cols-2 gap-48">
            <div className="flex flex-col">
              <div className="">
                <Link href="/" className="w-24 flex">
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

              <div className="flex justify-between mt-auto">
                <div className="grid grid-cols-2 gap-2 max-w-max">
                  {[1, 2, 3, 4, 5].map((_, index) => (
                    <div
                      key={index}
                      className="size-10 bg-white rounded-full flex items-center justify-center"
                    >
                      X
                    </div>
                  ))}
                </div>

                <div className="h-full flex flex-col">
                  <div className="flex flex-col items-end">
                    <Link
                      href="/terms"
                      className="text-yellow hover:text-blue text-sm"
                    >
                      Termenii și condițiile generale
                    </Link>
                    <Link
                      href="/terms"
                      className="text-yellow hover:text-blue text-sm"
                    >
                      Politicii de confidențialitate
                    </Link>
                  </div>

                  <div className="text-platinum text-xs text-right mt-auto">
                    <div>© 2025 — Copyright</div>
                    <div>All Rights reserved</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-16 justify-between">
              <ul className="flex items-center gap-8 text-white">
                <li>
                  <Link href="/">Acasă</Link>
                </li>
                <li>
                  <Link href="/about">Despre noi</Link>
                </li>
                <li>
                  <Link href="/">Întrebări și răspunsuri</Link>
                </li>
                <li>
                  <Link href="/">Contacte</Link>
                </li>
              </ul>

              <div className="rounded-2xl bg-white/10 ring-1 ring-white ring-inset p-6">
                <div className="bg-mentol text-sm max-w-max rounded-full py-2 px-3 mb-6">
                  Pleacă în curând
                </div>

                <ul className="divide-y divide-text-gray space-y-6 -mb-6">
                  <li className="pb-6">
                    <div className="text-white flex items-center gap-4 justify-between">
                      <div className="">Chișinău - Ismail</div>
                      <div className="text-mentol">12:20</div>
                      <ChevronRightIcon className="6" />
                    </div>
                  </li>
                  <li className="pb-6">
                    <div className="text-white flex items-center gap-4 justify-between">
                      <div className="">Chișinău - Ismail</div>
                      <div className="text-mentol">12:20</div>
                      <ChevronRightIcon className="6" />
                    </div>
                  </li>
                </ul>
              </div>

              <div className="flex items-end justify-between">
                <div className="space-y-12">
                  <div className="">
                    <div className="text-white text-lg font-semibold">
                      Contacte
                    </div>
                    <a
                      className="text-sm text-text-gray"
                      href="tel:+37378348888"
                    >
                      +373 78 348 888
                    </a>
                    <a
                      className="text-sm text-text-gray"
                      href="mailto:contact@aric.md"
                    >
                      contact@aric.md
                    </a>
                  </div>

                  <div className="">
                    <div className="text-white text-lg font-semibold">
                      Adresa
                    </div>
                    <div className="text-sm text-text-gray">
                      Rep Moldova, mun.Chisinau, str, Calea Basarabiei 26
                    </div>
                  </div>
                </div>

                <div className="">
                  <div className="text-white">Schimbă limba</div>
                  <div className="flex justify-end gap-4 text-[#8F9FA3] text-sm ">
                    <Link href={"/" + pathname}>Ro</Link>
                    <Link href={"/ru/" + pathname}>Ru</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
