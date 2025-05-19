"use client";
import React from "react";
import Image from "next/image";

import { ChevronRightIcon } from "lucide-react";
import { Link } from "@/i18n/navigation";

import { Button } from "@/components/ui/button";

import manImage from "@/assets/images/man-with-passport.png";
import bgFaqImage from "@/assets/images/bg-about-faq.png";

import { ReviewsCarouselSection } from "@/components/sections/ReviewsCarousel";
import { FAQSection } from "@/components/sections/FAQ";
import { EmailSubscriptionSection } from "@/components/sections/EmailSubscription";
import { DiscountSection } from "@/components/sections/Discount";

export const AboutContainer: React.FC = () => {
  return (
    <>
      <div className="section mt-12">
        <div className="container">
          <div className="grid grid-cols-2 gap-16">
            <div className="">
              <p className="text-blue font-medium text-2xl mb-3">De ce noi?</p>
              <h1 className="h1 mb-16">Despre noi</h1>

              <p className="text-2xl mt-6">
                Pentru că îți oferim o platformă rapidă, sigură și ușor de
                folosit, unde găsești bilete de autobuz la cele mai bune
                prețuri.
              </p>

              <p className="text-2xl mt-6">
                Colaborăm cu operatori de încredere, actualizăm constant orarele
                și îți asigurăm suport real atunci când ai nevoie.
              </p>

              <p className="text-2xl mt-6">
                La noi, călătoria ta începe fără stres, direct din câteva
                clickuri!
              </p>

              <Button asChild className="mt-16">
                <Link href="/">
                  Rezervează călătoria ta
                  <ChevronRightIcon />
                </Link>
              </Button>
            </div>

            <Image
              src={manImage.src}
              height={manImage.height}
              width={manImage.width}
              alt="Description of image"
              className=""
            />
          </div>
        </div>
      </div>

      <ReviewsCarouselSection />

      <section className="section my-16">
        <div className="container">
          <div className="grid grid-cols-2 gap-16">
            <div className="relative">
              <Image
                src={bgFaqImage.src}
                height={bgFaqImage.height}
                width={bgFaqImage.width}
                alt="Description of image"
                className=""
              />

              <Link
                href="/faq"
                className="flex items-center gap-8 py-5 px-8 rounded-xl absolute z-10 bottom-10 right-32 bg-white/18 backdrop-blur"
              >
                <div className="size-14 rounded-full bg-white flex items-center justify-center flex-none">
                  <svg fill="#FF9F40" viewBox="0 0 102 113" className="size-6">
                    <path d="M15.8.2C8.4 1.2 2.2 6.2.4 13.7-.2 16.4 0 19.2 0 22v68.8c0 4-.2 7.8 1.4 11.5 2.2 5.3 7.2 9.4 12.8 10.4 3 .6 6.4.3 9.5.3h68.1c2.2 0 5.2.5 7.2-.5 3.8-1.6 4-7.3.5-9.3-3-1.7-8-.8-11.4-.8H25.7c-3.1 0-7 .6-10-.2a7.1 7.1 0 0 1-4.1-10.3c2-3.4 5.4-3.6 9-3.6H94c2 0 4.2.3 6-1 2-1.6 2-3.8 2-6v-74c0-2.5 0-4.8-2.3-6.3-2-1.3-4.8-.8-7-.8h-70c-2.2 0-4.7-.2-7 0Zm33.8 15.7c11.5-1.5 20 11 16.3 21.4-.9 2.4-2.4 4.8-4.4 6.5-1.2 1-3 1.7-4 3-2.3 3.1 0 7.6-4.6 9.3-.7.3-1.3.4-2 .4-3.2 0-5.1-2.8-5.1-5.8 0-4.4 1.4-9 4.7-12 1.6-1.6 4-2.4 5.2-4.5 1-1.9.6-4.3-.7-5.9a5.3 5.3 0 0 0-8.3.6c-1 1.5-.7 3.2-1.3 4.8-1 2.8-4.2 4-7 3-3.8-1.4-3.4-6-2.6-9.2A16 16 0 0 1 49.6 16Zm.3 46c7.2-1 8.8 9.5 1.6 10.5-6.3.9-8-9.5-1.6-10.5Z" />
                  </svg>
                </div>
                <div className="max-w-24 text-white font-semibold text-lg">
                  Întrebări și răspunsuri
                </div>
              </Link>
            </div>

            <div className="">
              <div className="bg-mentol text-sm font-semibold space-x-2 max-w-max rounded-full py-2 px-4 mb-6">
                <span>🔥</span>
                <span>Sună acum! +37379435990</span>
              </div>
              <h2 className="h2 !mb-16">
                Planifică-ți călătoriile mai ușor, mai rapid și mai convenabil!
              </h2>

              <ul className="space-y-12">
                <li className="flex gap-12">
                  <div className="text-2xl size-20 rounded-full bg-white flex items-center justify-center flex-none">
                    🏆
                  </div>
                  <div className="">
                    <div className="text-2xl font-medium mb-3">
                      Garanția celui mai bun preț
                    </div>
                    <div className="text-text-gray text-sm">
                      Verificăm constant tarifele partenerilor noștri pentru
                      a-ți oferi cele mai avantajoase prețuri la biletele de
                      autobuz.
                    </div>
                  </div>
                </li>

                <li className="flex gap-12">
                  <div className="text-2xl size-20 rounded-full bg-white flex items-center justify-center flex-none">
                    🚀
                  </div>
                  <div className="">
                    <div className="text-2xl font-medium mb-3">
                      Rezervare rapidă și simplă
                    </div>
                    <div className="text-text-gray text-sm">
                      Platforma noastră este intuitivă, funcționează pe orice
                      dispozitiv și îți permite să alegi ușor ruta preferat.
                    </div>
                  </div>
                </li>

                <li className="flex gap-12">
                  <div className="text-2xl size-20 rounded-full bg-white flex items-center justify-center flex-none">
                    🌟
                  </div>
                  <div className="">
                    <div className="text-2xl font-medium mb-3">
                      Suport real, atunci când ai nevoie
                    </div>
                    <div className="text-text-gray text-sm">
                      Indiferent dacă ai o întrebare, sau ai greșit o rezervare,
                      echipa noastră de suport îți răspunde prompt!
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <EmailSubscriptionSection />

      <DiscountSection />

      <FAQSection />
    </>
  );
};
