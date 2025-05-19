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

export const ReviewsCarouselSection: React.FC = () => {
  return (
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
                    flexibilitatea orarului și faptul că am ajuns exact la timp.
                    O companie serioasă și de încredere!
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
  );
};
