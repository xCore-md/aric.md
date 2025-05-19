"use client";
import React from "react";
import Image from "next/image";
import { Header } from "@/components/shared/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import heroBackground from "@/assets/images/hero.jpg";
import { FAQSection } from "@/components/sections/FAQ";
import { ReviewsCarouselSection } from "@/components/sections/ReviewsCarousel";
import { DiscountSection } from "@/components/sections/Discount";
import { EmailSubscriptionSection } from "@/components/sections/EmailSubscription";
import { TripRouteDetails } from "@/components/shared/TripRouteDetails";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import { ChevronRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import bgChairs from "@/assets/images/chairs.jpg";

export const HomeContainer: React.FC = () => {
  return (
    <>
      <div className="max-w-[1600px] w-full mx-auto rounded-b-3xl overflow-hidden relative">
        <div className="relative z-10 pb-14">
          <Header isHomePage />

          <div className="container">
            <div className="mt-18">
              <h1 className="h1 max-w-xl text-white">
                Cumpără ușor biletul de autobuz online!
              </h1>

              <p className="text-2xl text-white mt-4">
                Curse regulate, microbuze confortabile și orare flexibile!
              </p>
            </div>

            <div className="bg-white h-32 mt-44 rounded-2xl"></div>
          </div>
        </div>

        <Image
          src={heroBackground.src}
          alt="Description of image"
          fill
          className="object-cover"
        />
      </div>

      <section className="section">
        <div className="container">
          <h2 className="h2">Planifică-ți călătoria perfectă!</h2>
          <p className="subtitle">
            Căutați și cumpărați bilete către cele mai populare destinații ale
            noastre
          </p>

          <div className="grid grid-cols-3 gap-8 relative mt-10">
            {[
              "Flexibilitate bilete",
              "Călătorie confortabilă",
              "Fiabilitatea serviciilor",
            ].map((item, index) => (
              <div
                key={index}
                className="p-4 rounded-xl bg-white flex items-center gap-4 shadow-[0_4px_16px_rgba(17,34,17,0.05)]"
              >
                <div className="relative w-30 h-30 rounded-lg overflow-hidden">
                  <Image
                    src="https://placehold.co/600x400/png"
                    alt="Image"
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex flex-col gap-3">
                  <h3 className="flex items-center gap-2 text-lg font-semibold">
                    <svg viewBox="0 0 20 20" className="fill-yellow size-5">
                      <path d="M10 0a10 10 0 1 0 0 20 10 10 0 0 0 0-20ZM7.3 14.3l-3.6-3.6a1 1 0 0 1 1.4-1.4L8 12.2l6.9-7a1 1 0 0 1 1.4 1.5l-7.6 7.6a1 1 0 0 1-1.4 0Z" />
                    </svg>
                    <span>{item}</span>
                  </h3>
                  <div className="flex items-center gap-2 text-text-gray text-sm">
                    <p>Adaptabil</p>
                    <svg
                      width="4"
                      height="4"
                      viewBox="0 0 4 4"
                      fill="currentColor"
                    >
                      <circle cx="2" cy="2" r="2" />
                    </svg>

                    <p>Convenabil</p>
                    <svg
                      width="4"
                      height="4"
                      viewBox="0 0 4 4"
                      fill="currentColor"
                    >
                      <circle cx="2" cy="2" r="2" />
                    </svg>
                    <p>Rapid</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className=" flex justify-between">
            <div className="w-2/3 absolute min-h-[90vh]">
              <Image
                src={bgChairs.src}
                alt="Image"
                fill
                className="object-contain object-left"
              />
            </div>

            <div className="relative z-10 p-16">
              <h2 className="h1 text-white">Rezervează locul!</h2>
              <p className="text-2xl text-white/90">
                Cea mai populară rută acum: Chișinău – Ismail!
              </p>
            </div>

            <div className="max-w-2xl relative z-10">
              <Card>
                <CardHeader className="relative -mt-6 py-6 gap-0 rounded-t-xl bg-[#F9F9F9] border border-platinum">
                  <CardTitle className="text-2xl font-normal">
                    Chișinău - Ismail
                  </CardTitle>
                  <div className="px-4 py-2 space-x-2 rounded-l-full bg-mentol absolute right-0 top-1/2 -translate-y-1/2">
                    <span className="text-xl">🔥</span>
                    <span className="text-lg font-semibold">
                      Cele mai apropiate rute{" "}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="first" className="">
                    <TabsList>
                      <TabsTrigger value="first">Vi, 02 Mai</TabsTrigger>
                      <TabsTrigger value="second">Sâ, 03 Mai</TabsTrigger>
                      <TabsTrigger value="first">Du, 04 Mai</TabsTrigger>
                      <TabsTrigger value="second">Lu, 05 Mai</TabsTrigger>
                    </TabsList>

                    <TabsContent value="first">
                      <ul className="space-y-4">
                        {[1, 2, 3].map((_, index) => (
                          <li
                            key={index}
                            className="px-10 py-6 border border-platinum rounded-xl"
                          >
                            <TripRouteDetails />
                          </li>
                        ))}
                      </ul>
                    </TabsContent>

                    <TabsContent value="second">
                      <ul className="space-y-4">
                        {[1, 2].map((_, index) => (
                          <li
                            key={index}
                            className="px-10 py-6 border border-platinum rounded-xl"
                          >
                            <TripRouteDetails />
                          </li>
                        ))}
                      </ul>
                    </TabsContent>
                  </Tabs>

                  <Button asChild className="mt-4">
                    <Link href="/faq">
                      Vezi toate rutele
                      <ChevronRightIcon />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <EmailSubscriptionSection />

      <ReviewsCarouselSection />

      <DiscountSection />

      <FAQSection />
    </>
  );
};
