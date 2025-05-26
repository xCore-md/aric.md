"use client";
import React from "react";
import Image from "next/image";
import { Header } from "@/components/shared/Header";

import heroBackground from "@/assets/images/hero.jpg";
import { FAQSection } from "@/components/sections/FAQ";
import { ReviewsCarouselSection } from "@/components/sections/ReviewsCarousel";
import { DiscountSection } from "@/components/sections/Discount";
import { EmailSubscriptionSection } from "@/components/sections/EmailSubscription";
import { SearchTicketForm } from "@/components/shared/SearchTicketForm";

export const HomeContainer: React.FC = () => {
  return (
    <>
      <Header />

      <div className="relative mx-auto w-full max-w-[1600px] overflow-hidden rounded-b-3xl">
        <div className="relative z-10 pb-14">
          <Header isHomePage />

          <div className="container">
            <div className="mt-10 md:mt-18">
              <h1 className="h1 max-w-xl text-white">
                Cumpără ușor biletul de autobuz online!
              </h1>

              <p className="mt-4 max-w-md text-xl text-white md:text-2xl">
                Curse regulate, microbuze confortabile și orare flexibile!
              </p>
            </div>

            <div className="mt-20 lg:mt-44">
              <SearchTicketForm />
            </div>
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

          <div className="relative mt-10 grid gap-4 md:grid-cols-3 xl:gap-8">
            {[
              "Flexibilitate bilete",
              "Călătorie confortabilă",
              "Fiabilitatea serviciilor",
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 rounded-xl sm:bg-white sm:p-4 sm:shadow-[0_4px_16px_rgba(17,34,17,0.05)]"
              >
                <div className="relative hidden h-30 w-30 flex-none overflow-hidden rounded-lg xl:block">
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
                  <div className="text-text-gray hidden items-center gap-2 text-sm sm:flex">
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

      {/*<section className="section">
        <div className="container">
          <div className="relative flex min-h-[95vh] items-center justify-between">
            <div className="absolute h-full w-2/3 overflow-hidden rounded-xl">
              <Image
                src={bgChairs.src}
                alt="Image"
                fill
                className="object-cover object-left"
              />
            </div>

            <div className="relative z-10 flex h-full flex-col p-16">
              <div className="max-w-xs">
                <h2 className="h1 text-white">Rezervează locul!</h2>
                <p className="text-2xl text-white/90">
                  Cea mai populară rută acum: Chișinău – Ismail!
                </p>

                <Button className="mt-8" variant="white">
                  Caută alte rute
                </Button>
              </div>

              <div className="relative mt-auto -ml-28 flex gap-18">
                <div className="flex flex-col items-center gap-4">
                  <div className="flex items-center gap-2 text-2xl text-white">
                    <svg viewBox="0 0 15 18" className="size-5 fill-white">
                      <path
                        fillRule="evenodd"
                        d="M7.3.2C3.3.2 0 3.5 0 7.6c0 3 2.7 6 5 8.3l1.3 1.4a1.4 1.4 0 0 0 2 0L9.7 16c2.2-2.3 5-5.2 5-8.3 0-4-3.3-7.4-7.4-7.4Zm0 4.2a2.7 2.7 0 1 1 0 5.4 2.7 2.7 0 0 1 0-5.4Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Chișinău</span>
                  </div>
                  <div className="relative aspect-[5/4] h-[208px] flex-none overflow-hidden rounded-lg border-2 border-white">
                    <Image
                      src="https://placehold.co/352x200/png"
                      alt="Image"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                <div className="flex flex-col items-center gap-4">
                  <div className="flex items-center gap-2 text-2xl text-white">
                    <svg viewBox="0 0 15 18" className="size-5 fill-white">
                      <path
                        fillRule="evenodd"
                        d="M7.3.2C3.3.2 0 3.5 0 7.6c0 3 2.7 6 5 8.3l1.3 1.4a1.4 1.4 0 0 0 2 0L9.7 16c2.2-2.3 5-5.2 5-8.3 0-4-3.3-7.4-7.4-7.4Zm0 4.2a2.7 2.7 0 1 1 0 5.4 2.7 2.7 0 0 1 0-5.4Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Ismail</span>
                  </div>
                  <div className="relative aspect-[5/4] h-[208px] flex-none overflow-hidden rounded-lg border-2 border-white">
                    <Image
                      src="https://placehold.co/352x200/png"
                      alt="Image"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                <svg
                  viewBox="0 0 116 40"
                  className="absolute top-0 left-1/2 h-10 -translate-x-1/2 fill-white"
                >
                  <path d="M63.3 36.5a1 1 0 0 1 .5 2h-.5c-2.3.7-4.2.8-5.8.2l-.3-.1H57a1 1 0 0 1 .7-1.9h.1l.2.1c1.2.4 2.8.4 5.1-.3h.1Zm7.4-4.7a1 1 0 0 1 2 .7c-.5 1.1-1.1 2.1-2 2.7l-.2.1-2.8 1.6a1 1 0 0 1-.9-1.8l2.7-1.5.2-.1c.4-.3.7-.8 1-1.7Zm-17-3.3a1 1 0 0 1 2 .4c-.4 2.1-.4 3.9 0 5.2l.1.3v.1a1 1 0 0 1-1.8.7V35l-.2-.4c-.5-1.7-.5-3.9 0-6.2Zm18.8-6.2c.5 2.2.8 4.2.8 6a1 1 0 0 1-2 0 21 21 0 0 0-.8-5.5l2-.5Zm-15-3.6a1 1 0 0 1 1.8 1l-.4.7a34 34 0 0 0-2.1 4.7 1 1 0 0 1-2-.7c.7-1.8 1.6-3.8 2.7-5.7ZM2.9 20.9A1 1 0 1 1 4 22.5l-2.4 1.8a1 1 0 0 1-1.2-1.6l2.4-1.8Zm68.5.7a1 1 0 0 1 1.2.7l-2 .5a1 1 0 0 1 .8-1.2Zm-60.5-6.2A1 1 0 0 1 12 17c-1.6 1-3.2 2-4.8 3.2H7a1 1 0 0 1-1-1.7l1.2-.8 3.6-2.4Zm56-2.4a1 1 0 0 1 1.4.3c1.2 1.7 2.2 3.4 3 5.2a1 1 0 0 1-1.9.8c-.7-1.6-1.6-3.3-2.7-4.9a1 1 0 0 1 .2-1.4Zm45 1a1 1 0 0 1 1.3-.1l.6.6 1.6 1.8-1.6 1.3-1.5-1.7-.5-.6a1 1 0 0 1 0-1.4Zm-50.4 2.4a1 1 0 0 1-1.6-1.2l1.6 1.2Zm-1.9-9.7a1 1 0 0 1 1.4-.3l.6.4a25 25 0 0 1 3.6 2.9l.5.5a1 1 0 0 1-.4 1.6c-1.4 1.5-2.7 3-3.8 4.6l-1.6-1.2c1-1.5 2.3-3 3.6-4.4-1-1-2.3-1.9-3.6-2.7a1 1 0 0 1-.3-1.4Zm-40.1 3.7a1 1 0 0 1 .8 1.8l-1.2.6-3.8 2.2a1 1 0 1 1-1-1.7l5-2.9h.2ZM104 7.3a1 1 0 0 1 1.4-.3c1.4 1 2.8 2.2 4.2 3.5l.6.6h.1a1 1 0 0 1-1.4 1.5l-.6-.6a50.8 50.8 0 0 0-4-3.3 1 1 0 0 1-.3-1.4Zm-75.7-1a1 1 0 0 1 .6 1.9l-1.3.5a81 81 0 0 0-4 1.8 1 1 0 0 1-.8-1.8L24 8l4-1.7h.2ZM72 3.9a1 1 0 0 1 1 1.7H73c-1.7 1-3.4 2.2-4.9 3.5a1 1 0 0 1-1.3-1.6C68.4 6.2 70.2 5 72 4Zm-34.3.5.2 1-5.5 1.5h-.1a1 1 0 0 1-.5-2l.7-.1c1.7-.6 3.4-1 5-1.4l.2 1ZM96.4 2c1.6.6 3.2 1.4 4.9 2.3l.7.4v.1a1 1 0 0 1-1 1.7l-.7-.4c-1.6-1-3.1-1.7-4.7-2.3l.4-1 .4-.8ZM57.3 4.6a1 1 0 0 1-.8 1.8l.8-1.8Zm-6-1.7h.2l.8.2c1.8.3 3.4.8 5 1.5l-.4 1-.4.8c-1.4-.6-3-1-4.6-1.4H51v-.1a1 1 0 0 1 .3-2Zm-13.7.5a1 1 0 0 1 .4 2l-.4-2Zm4.7-.7c1.8-.2 3.5-.2 5.2-.2a1 1 0 1 1-.1 2c-1.8 0-3.6 0-5.6.3h-.1a1 1 0 0 1-.2-2h.8ZM76.5 4a1 1 0 0 1-.7-1.8l.7 1.8ZM82 .3a1 1 0 0 1 .3 2l-.8.2c-1.7.3-3.3.8-4.9 1.4l-.7-1.8c1.9-.8 4-1.4 6-1.8h.1Zm13.2 2.2a1 1 0 0 1 1.3-.5l-.8 1.8a1 1 0 0 1-.5-1.3ZM86 0c1.7 0 3.6.2 5.4.5l.8.2h.1a1 1 0 0 1-.4 2h-.1l-.8-.2c-1.7-.3-3.4-.5-5-.5a1 1 0 0 1 0-2Z" />
                </svg>
              </div>
            </div>

            <div className="relative z-10 max-w-2xl">
              <Card>
                <CardHeader className="border-platinum relative -mt-6 gap-0 rounded-t-xl border bg-[#F9F9F9] py-6">
                  <CardTitle className="text-2xl font-normal">
                    Chișinău - Ismail
                  </CardTitle>
                  <div className="bg-mentol absolute top-1/2 right-0 -translate-y-1/2 space-x-2 rounded-l-full px-4 py-2">
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
                            className="border-platinum rounded-xl border px-10 py-6"
                          >
                            <div className="flex items-center justify-between gap-8">
                              <Link
                                href="/"
                                className="flex items-center gap-1 font-semibold"
                              >
                                <span>Detalii bilet</span>
                                <ChevronRightIcon className="size-5" />
                              </Link>

                              <div className="ml-auto text-2xl font-medium">
                                120MDL
                              </div>

                              <Button>Rezervează</Button>
                            </div>

                            <div className="my-6 w-full border-b border-dashed" />

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
                            className="border-platinum rounded-xl border px-10 py-6"
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
*/}

      <EmailSubscriptionSection />

      <ReviewsCarouselSection />

      <DiscountSection />

      <FAQSection />
    </>
  );
};
