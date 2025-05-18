"use client";
import React from "react";
import Image from "next/image";

import { ChevronRightIcon } from "lucide-react";
import { Link } from "@/i18n/navigation";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Header } from "@/components/shared/Header";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import heroBackground from "@/assets/images/hero.jpg";
import googleIcon from "@/assets/images/google.svg";
import faqAvatar from "@/assets/images/faq.png";
import busImage from "@/assets/images/bus.png";
import bgBus from "@/assets/images/bg-bus.jpg";
import wifiImage from "@/assets/images/wifi.png";
import chairImage from "@/assets/images/chair.png";
import chargerImage from "@/assets/images/usb-charger.png";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const HomeContainer: React.FC = () => {
  return (
    <>
      <div className="rounded-b-3xl overflow-hidden relative">
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

      <div className="container">
        <div className="text-center flex flex-col items-center gap-16">
          <h2 className="text-5xl text-black max-w-4xl	">
            Fii mereu informat despre cele mai noi curse, reduceri și oferte
            speciale. Abonează-te la noutățile ARIC și planifică-ți călătoriile
            mai ușor, mai rapid și mai convenabil.
          </h2>

          <form action="" className="max-w-xl w-full">
            <div className="w-full flex items-center gap-5">
              <Input placeholder="Adresa ta de e-mail" />
              <Button>Abonează-te</Button>
            </div>
          </form>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="relative">
            <div className="f-full z-10 relative p-16">
              <h2 className="h1 text-white flex flex-col">
                <span>Reducere!</span>
                <span>20%</span>
              </h2>

              <p className="text-2xl text-white mt-4 mb-8 max-w-sm">
                Cumpără bilet dus-întors și beneficiază de reducere pentru al
                doilea bilet!
              </p>

              <Button>Rezervează acum</Button>
            </div>

            <div className="relative z-10 flex items-center gap-6 px-16 pb-8">
              <Image
                src={wifiImage.src}
                width={wifiImage.width}
                height={wifiImage.height}
                alt="Image"
                className="h-14 w-auto"
              />

              <svg width="1" height="33" viewBox="0 0 1 33">
                <line
                  x1="0.5"
                  y1="1"
                  x2="0.5"
                  y2="32"
                  stroke="#DDE0E3"
                  stroke-linecap="round"
                />
              </svg>

              <div className="flex gap-2 items-center">
                <Image
                  src={chargerImage.src}
                  width={chargerImage.width}
                  height={chargerImage.height}
                  alt="Image"
                  className="h-14 w-auto"
                />
                <div className="uppercase text-white font-semibold">
                  usb charger
                </div>
              </div>

              <svg width="1" height="33" viewBox="0 0 1 33">
                <line
                  x1="0.5"
                  y1="1"
                  x2="0.5"
                  y2="32"
                  stroke="#DDE0E3"
                  stroke-linecap="round"
                />
              </svg>

              <div className="flex gap-2 items-center">
                <Image
                  src={chairImage.src}
                  width={chairImage.width}
                  height={chairImage.height}
                  alt="Image"
                  className="h-14 w-auto"
                />
                <div className="uppercase text-white font-semibold">
                  COMFORT
                </div>
              </div>
            </div>

            <Image
              src={bgBus.src}
              alt="Image"
              fill
              className="object-cover rounded-2xl bg-top bg-no-repeat"
            />

            <Image
              src={busImage.src}
              width={busImage.width}
              height={busImage.height}
              alt="Image"
              className="absolute -right-72 bottom-0"
            />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Carousel opts={{ loop: true }}>
            <div className="flex justify-between items-end">
              <h2 className="h2 max-w-xl">
                Ce spun clienții despre călătoriile noastre?
              </h2>

              <div className="relative flex gap-2">
                <CarouselPrevious />
                <CarouselNext />
              </div>
            </div>

            <CarouselContent className="-ml-8 py-10" wrapperClassName="px-2.5">
              {[1, 2, 3, 4, 5].map((_, index) => (
                <CarouselItem key={index} className="pl-8 basis-1/3">
                  <div className="bg-white shadow-lg rounded-xl p-8">
                    <div className="text-2xl mb-4">
                      “Bucură-te de o călătorie sigură, confortabilă și fără
                      griji”
                    </div>

                    <div className="text-text-gray">
                      Rezervarea online a fost rapidă și simplă. Mi-a plăcut
                      flexibilitatea orarului și faptul că am ajuns exact la
                      timp. O companie serioasă și de încredere!
                    </div>

                    <div className="flex items-center gap-2 mt-4 mb-5">
                      {[1, 2, 3, 4, 5].map((_, index) => (
                        <svg
                          key={index}
                          viewBox="0 0 24 22"
                          className="fill-yellow size-6"
                        >
                          <path d="m18.5 21.5-.5-.1-6-4.4-6 4.4a.7.7 0 0 1-1.2-.9l2.4-7L1 9.4A.7.7 0 0 1 1.5 8H9l2.3-7a.8.8 0 0 1 1.4 0L15 8h7.5a.8.8 0 0 1 .4 1.4l-6 4.1 2.3 7a.8.8 0 0 1-.7 1Z" />
                        </svg>
                      ))}
                    </div>

                    <div>
                      <div className="font-medium">Andrei</div>
                      <div className="text-text-gray text-sm">
                        Weave Studios – Kai Tak
                      </div>
                    </div>

                    <Image
                      src={googleIcon.src}
                      alt="Image"
                      width={googleIcon.width}
                      height={googleIcon.height}
                      className="h-5 mt-3"
                    />

                    <div className="relative aspect-video rounded-lg overflow-hidden mt-8">
                      <Image
                        src="https://placehold.co/352x200/png"
                        alt="Image"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="flex justify-between gap-16">
            <div className="max-w-3xl w-full">
              <h2 className="h2 flex flex-col !mb-14">
                <span className="flex items-center gap-4">
                  <span>Întrebări</span>
                  <svg viewBox="0 0 39 40" className="size-10">
                    <path
                      fill="#FFC60E"
                      d="M0 20a19.5 19.5 0 1 1 39 0 19.5 19.5 0 1 1-39 0Z"
                    />
                    <path
                      fill="#fff"
                      d="M17 24.9v3.8h3.9V25h-4Zm3.9-3.2a6.8 6.8 0 1 0-8.6-8l3.8.9A3 3 0 1 1 19 18a2 2 0 0 0-2 1.9v3h3.9v-1.3Z"
                    />
                  </svg>
                </span>
                <span>și Răspunsuri</span>
              </h2>

              <div className="flex gap-28">
                <Accordion
                  type="single"
                  collapsible
                  className="w-full max-w-3xl space-y-4 relative"
                >
                  <Image
                    src={faqAvatar.src}
                    alt="Image"
                    width={faqAvatar.width}
                    height={faqAvatar.height}
                    className="absolute right-8 -translate-y-full"
                  />

                  <AccordionItem value="item-1">
                    <AccordionTrigger>Is it accessible?</AccordionTrigger>
                    <AccordionContent>
                      Yes. It adheres to the WAI-ARIA design pattern.
                    </AccordionContent>
                  </AccordionItem>

                  <Button asChild className="mt-8">
                    <Link href="/faq">
                      Vezi toate
                      <ChevronRightIcon />
                    </Link>
                  </Button>
                </Accordion>
              </div>
            </div>

            <Card className="max-w-sm w-full">
              <CardHeader>
                <CardTitle className="h3 text-center">
                  Cere un
                  <br /> apel telefonic
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form action="" className="space-y-6">
                  <Input placeholder="Nume / Prenume *" />
                  <Input placeholder="+373 | 000 00 000" />
                  <Button type="button" className="w-full">
                    Sună-mă înapoi
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
};
