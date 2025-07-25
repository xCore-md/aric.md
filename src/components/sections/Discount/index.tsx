"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

import wifiImage from "@/assets/images/wifi.png";
import chargerImage from "@/assets/images/usb-charger.png";
import chairImage from "@/assets/images/chair.png";
import bgBus from "@/assets/images/bg-bus.jpg";
import busImage from "@/assets/images/bus.png";
import verticalLine from "@/assets/icons/vertical-line.svg";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export const DiscountSection: React.FC = () => {
  const t = useTranslations();
  return (
    <section className="section">
      <div className="container !p-0 md:!px-6">
        <div className="relative overflow-hidden md:overflow-visible">
          <div className="relative z-10 h-full p-8 md:p-16">
            <h2 className="h1 flex flex-col text-white">
              <span>{t("discount_offer.title")}</span>
              <span>20%</span>
            </h2>

            <p className="subtitle mt-4 mb-8 !text-white lg:max-w-sm">
              {t("discount_offer.description")}
            </p>

            <Button asChild>
              <Link href="/search">{t("action.book_now")}</Link>
            </Button>
          </div>

          <div className="relative z-10 flex items-center gap-4 px-8 pb-8 md:gap-6 md:px-16">
            <Image
              src={wifiImage.src}
              width={wifiImage.width}
              height={wifiImage.height}
              alt="Image"
              className="h-8 w-auto lg:h-14"
            />

            <Image
              src={verticalLine.src}
              width={verticalLine.width}
              height={verticalLine.height}
              alt=""
            />

            <div className="flex items-center gap-2">
              <Image
                src={chargerImage.src}
                width={chargerImage.width}
                height={chargerImage.height}
                alt="Image"
                className="h-8 w-auto lg:h-14"
              />
              <div className="text-xs font-semibold text-white uppercase md:text-base">
                usb charger
              </div>
            </div>

            <Image
              src={verticalLine.src}
              width={verticalLine.width}
              height={verticalLine.height}
              alt=""
            />

            <div className="flex items-center gap-2">
              <Image
                src={chairImage.src}
                width={chairImage.width}
                height={chairImage.height}
                alt="Image"
                className="h-8 w-auto lg:h-14"
              />
              <div className="text-xs font-semibold text-white uppercase md:text-base">
                COMFORT
              </div>
            </div>
          </div>

          <Image
            src={bgBus.src}
            alt="Image"
            fill
            className="bg-top bg-no-repeat object-cover md:rounded-2xl"
          />

          <Image
            src={busImage.src}
            width={busImage.width}
            height={busImage.height}
            alt="Image"
            className="relative -right-10 z-10 lg:absolute lg:-right-72 lg:bottom-0"
          />
        </div>
      </div>
    </section>
  );
};
