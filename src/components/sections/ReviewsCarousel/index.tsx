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
import { useQuery } from "@tanstack/react-query";
import { reviewService } from "@/services/review.service";
import { QUERY_KEYS } from "@/utils/constants";

export const ReviewsCarouselSection: React.FC = () => {
  const t = useTranslations();

  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.reviews],
    queryFn: () => reviewService.getAll({ per_page: 15 }),
  });

  const reviews = data?.data ? data.data.slice(-9) : [];

  if (!isLoading && reviews.length === 0) return null;

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
            {isLoading
              ? Array.from({ length: 3 }).map((_, index) => (
                  <CarouselItem
                    key={index}
                    className="pl-8 sm:basis-1/2 lg:basis-1/3"
                  >
                    <div className="skeleton h-60 rounded-xl" />
                  </CarouselItem>
                ))
              : reviews.map((review, index) => {
                  const rating = Math.min(5, Math.max(0, review.rating));
                  return (
                    <CarouselItem
                      key={index}
                      className="pl-8 sm:basis-1/2 lg:basis-1/3"
                    >
                      <div className="flex h-full flex-col rounded-xl bg-white p-8 shadow-lg">
                        <div className="flex-1">
                          {review.title && (
                            <div className="mb-4 text-2xl">{review.title}</div>
                          )}
                          {review.text && (
                            <div className="text-text-gray">{review.text}</div>
                          )}
                          {rating > 0 && (
                            <div className="mt-4 mb-5 flex items-center gap-2">
                              {Array.from({ length: rating }).map((_, i) => (
                                <Image
                                  key={i}
                                  src={starIcon.src}
                                  width={starIcon.width}
                                  height={starIcon.height}
                                  alt=""
                                  className="fill-yellow size-6"
                                />
                              ))}
                            </div>
                          )}
                        </div>
                        <div className="mt-auto">
                          {review.name && (
                            <div className="font-medium">{review.name}</div>
                          )}
                          {review.google_url && (
                            <a
                              href={review.google_url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Image
                                src={googleIcon.src}
                                alt="Google"
                                width={googleIcon.width}
                                height={googleIcon.height}
                                className="mt-3 h-5"
                              />
                            </a>
                          )}
                        </div>
                      </div>
                    </CarouselItem>
                  );
                })}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};
