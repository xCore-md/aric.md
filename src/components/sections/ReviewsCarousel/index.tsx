"use client";
import React from "react";
import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import googleIcon from "@/assets/images/google.svg";
import starIcon from "@/assets/icons/star.svg";
import { useTranslations } from "next-intl";

export const ReviewsCarouselSection: React.FC = () => {
  const t = useTranslations();
  return (
    <section className="section">
      <div className="container">
        <Carousel opts={{ loop: true, align: "start" }}>
          <div className="flex flex-col items-center justify-between text-center md:flex-row md:items-end md:text-left">
            <h2 className="h2 max-w-xl">{t("customer_feedback.title")}</h2>

            <div className="relative flex gap-2">
              <CarouselPrevious />
              <CarouselNext />
            </div>
          </div>

          <CarouselContent className="-ml-8 py-10" wrapperClassName="px-2.5">
            {[1, 2, 3, 4, 5].map((_, index) => (
              <CarouselItem
                key={index}
                className="pl-8 sm:basis-1/2 lg:basis-1/3"
              >
                <div className="rounded-xl bg-white p-8 shadow-lg">
                  <div className="mb-4 text-2xl">
                    “Bucură-te de o călătorie sigură, confortabilă și fără
                    griji”
                  </div>

                  <div className="text-text-gray">
                    Rezervarea online a fost rapidă și simplă. Mi-a plăcut
                    flexibilitatea orarului și faptul că am ajuns exact la timp.
                    O companie serioasă și de încredere!
                  </div>

                  <div className="mt-4 mb-5 flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((_, index) => (
                      <Image
                        key={index}
                        src={starIcon.src}
                        width={starIcon.width}
                        height={starIcon.height}
                        alt=""
                        className="fill-yellow size-6"
                      />
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
                    className="mt-3 h-5"
                  />

                  <div className="relative mt-8 aspect-video overflow-hidden rounded-lg">
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
  );
};
