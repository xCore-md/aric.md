import React from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import heroBackground from "@/assets/images/hero.jpg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Header } from "@/components/shared/Header";

export const HomeContainer: React.FC = () => {
  return (
    <>
      <div className="rounded-b-3xl overflow-hidden relative">
        <div className="relative z-10 pb-14">
          <Header isHomePage />

          <div className="container">
            <div className="mt-18">
              <h1 className="text-6xl font-semibold max-w-xl text-white">
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

      <div className="container">
        <h2>Planifică-ți călătoria perfectă!</h2>
        <p>
          Căutați și cumpărați bilete către cele mai populare destinații ale
          noastre
        </p>

        <div className="grid grid-cols-3 gap-4 relative">
          {[1, 2, 3].map((_, index) => (
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

              <div className="">
                <h3 className="flex items-center gap-2">
                  <svg viewBox="0 0 20 20" className="fill-yellow size-5">
                    <path d="M10 0a10 10 0 1 0 0 20 10 10 0 0 0 0-20ZM7.3 14.3l-3.6-3.6a1 1 0 0 1 1.4-1.4L8 12.2l6.9-7a1 1 0 0 1 1.4 1.5l-7.6 7.6a1 1 0 0 1-1.4 0Z" />
                  </svg>
                  <span>Title</span>
                </h3>
                <div>
                  <p>Adaptabil</p>
                  <p>Convenabil</p>
                  <p>Rapid</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="container">
        <h2>
          Fii mereu informat despre cele mai noi curse, reduceri și oferte
          speciale. Abonează-te la noutățile ARIC și planifică-ți călătoriile
          mai ușor, mai rapid și mai convenabil.
        </h2>

        <form action="">
          <Input placeholder="Adresa ta de e-mail" />
          <Button>Abonează-te</Button>
        </form>
      </div>

      <div className="container">
        <Carousel>
          <div className="flex justify-between ">
            <h2 className="">Ce spun clienții despre călătoriile noastre?</h2>
            <div className="relative bg-red">
              <CarouselPrevious />
              <CarouselNext />
            </div>
          </div>
          <CarouselContent className="gap-8">
            {[1, 2, 3, 4, 5].map((_, index) => (
              <CarouselItem
                key={index}
                className="p-0 shadow-lg shadow-red rounded-lg"
              >
                <div className="">
                  <div className="">
                    “Bucură-te de o călătorie sigură, confortabilă și fără
                    griji”
                  </div>

                  <div className="">
                    Rezervarea online a fost rapidă și simplă. Mi-a plăcut
                    flexibilitatea orarului și faptul că am ajuns exact la timp.
                    O companie serioasă și de încredere!
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </>
  );
};
