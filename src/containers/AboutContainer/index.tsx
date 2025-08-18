"use client";
import React from "react";
import { useTranslations } from "next-intl";
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
  const t = useTranslations();
  const tc = useTranslations("company");
  return (
    <>
      <div className="section mt-12">
        <div className="container">
          <div className="grid-cols-2 gap-16 lg:grid">
            <div className="">
              <p className="text-blue mb-3 text-2xl font-medium">{t("about.why_us")}</p>
              <h1 className="h1 mb-16">{t("about.title")}</h1>

              <p className="mt-6 text-2xl">{t("about.description1")}</p>

              <p className="mt-6 text-2xl">{t("about.description2")}</p>

              <p className="mt-6 text-2xl">{t("about.description3")}</p>

              <Button asChild className="mt-16">
                <Link href="/">
                  {t("about.book_your_trip")}
                  <ChevronRightIcon />
                </Link>
              </Button>
            </div>

            <Image
              src={manImage.src}
              height={manImage.height}
              width={manImage.width}
              alt="Description of image"
              className="mx-auto"
            />
          </div>
        </div>
      </div>

      <ReviewsCarouselSection />

      <section className="section my-16">
        <div className="container">
          <div className="grid gap-16 lg:grid-cols-2">
            <div className="relative hidden lg:block">
              <Image
                src={bgFaqImage.src}
                height={bgFaqImage.height}
                width={bgFaqImage.width}
                alt="Description of image"
              />

              <Link
                href="/faq"
                className="absolute right-32 bottom-10 z-10 flex items-center gap-8 rounded-xl bg-white/18 px-8 py-5 backdrop-blur"
              >
                <div className="flex size-14 flex-none items-center justify-center rounded-full bg-white">
                  <svg fill="#FF9F40" viewBox="0 0 102 113" className="size-6">
                    <path d="M15.8.2C8.4 1.2 2.2 6.2.4 13.7-.2 16.4 0 19.2 0 22v68.8c0 4-.2 7.8 1.4 11.5 2.2 5.3 7.2 9.4 12.8 10.4 3 .6 6.4.3 9.5.3h68.1c2.2 0 5.2.5 7.2-.5 3.8-1.6 4-7.3.5-9.3-3-1.7-8-.8-11.4-.8H25.7c-3.1 0-7 .6-10-.2a7.1 7.1 0 0 1-4.1-10.3c2-3.4 5.4-3.6 9-3.6H94c2 0 4.2.3 6-1 2-1.6 2-3.8 2-6v-74c0-2.5 0-4.8-2.3-6.3-2-1.3-4.8-.8-7-.8h-70c-2.2 0-4.7-.2-7 0Zm33.8 15.7c11.5-1.5 20 11 16.3 21.4-.9 2.4-2.4 4.8-4.4 6.5-1.2 1-3 1.7-4 3-2.3 3.1 0 7.6-4.6 9.3-.7.3-1.3.4-2 .4-3.2 0-5.1-2.8-5.1-5.8 0-4.4 1.4-9 4.7-12 1.6-1.6 4-2.4 5.2-4.5 1-1.9.6-4.3-.7-5.9a5.3 5.3 0 0 0-8.3.6c-1 1.5-.7 3.2-1.3 4.8-1 2.8-4.2 4-7 3-3.8-1.4-3.4-6-2.6-9.2A16 16 0 0 1 49.6 16Zm.3 46c7.2-1 8.8 9.5 1.6 10.5-6.3.9-8-9.5-1.6-10.5Z" />
                  </svg>
                </div>
                <div className="max-w-24 text-lg font-semibold text-white">
                  {t("$Întrebări și răspunsuri")}
                </div>
              </Link>
            </div>

            <div className="">
              <div className="bg-mentol mb-6 max-w-max space-x-2 rounded-full px-4 py-2 text-sm font-semibold">
                <span>🔥</span>
                <span>{t("about.call_now")} {tc("phone")}</span>
              </div>
              <h2 className="h2 !mb-16">{t("about.features_title")}</h2>

              <ul className="space-y-6 md:space-y-12">
                <li className="flex gap-6 md:gap-12">
                  <div className="flex size-20 flex-none items-center justify-center rounded-full bg-white text-2xl">
                    🏆
                  </div>
                  <div className="">
                    <div className="mb-3 text-2xl font-medium">
                      {t("about.feature1.title")}
                    </div>
                    <div className="text-text-gray text-sm">
                      {t("about.feature1.description")}
                    </div>
                  </div>
                </li>

                <li className="flex gap-6 md:gap-12">
                  <div className="flex size-20 flex-none items-center justify-center rounded-full bg-white text-2xl">
                    🚀
                  </div>
                  <div className="">
                    <div className="mb-3 text-2xl font-medium">
                      {t("about.feature2.title")}
                    </div>
                    <div className="text-text-gray text-sm">
                      {t("about.feature2.description")}
                    </div>
                  </div>
                </li>

                <li className="flex gap-6 md:gap-12">
                  <div className="flex size-20 flex-none items-center justify-center rounded-full bg-white text-2xl">
                    🌟
                  </div>
                  <div className="">
                    <div className="mb-3 text-2xl font-medium">
                      {t("about.feature3.title")}
                    </div>
                    <div className="text-text-gray text-sm">
                      {t("about.feature3.description")}
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
