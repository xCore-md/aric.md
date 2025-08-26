"use client";
import React from "react";
import Image from "next/image";
import { Link, usePathname } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";

import logo from "@/assets/images/logo.svg";
import payment from "@/assets/images/payment.webp";
import { Button } from "@/components/ui/button";
import { ChevronRightIcon, Facebook, Instagram } from "lucide-react";

import { NAV_LINK, NAV_LINKS, QUERY_KEYS } from "@/utils/constants";

import { useTranslations, useLocale } from "next-intl";
import { useQuery } from "@tanstack/react-query";
import { searchService } from "@/services/search.service";
import { getLocalizedField } from "@/utils/getLocalizedField";
import { useFormatUTCToLocal } from "@/hooks/useFormatUTCToLocal ";
import { format, parseISO } from "date-fns";

export const Footer: React.FC = () => {
  const t = useTranslations();
  const tc = useTranslations("company");
  const locale = useLocale();
  const { formatUTC } = useFormatUTCToLocal();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const {
    data: nearestTrips,
    isLoading: isNearestTripsLoading,
    isError: isNearestTripsError,
  } = useQuery({
    queryKey: [QUERY_KEYS.nearestTrips],
    queryFn: () => searchService.getNearestTrips({ limit: 3 }),
  });
  const currentPath = pathname + (searchParams.size ? `?${searchParams}` : "");

  return (
    <div className="mt-auto print:hidden">
      <footer className="bg-black px-0 py-10 md:p-14">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-20 xl:gap-48">
            <div className="flex flex-col">
              <div className="">
                <Link href="/" className="flex w-24">
                  <Image
                    src={logo}
                    alt="Aric.md"
                    width={logo.width}
                    height={logo.height}
                  />
                </Link>

                <div className="text-platinum mt-8">{t("footer.title")}</div>

                <Button className="mt-4" variant="white" asChild>
                  <Link href={NAV_LINK.about.path}>
                    {t(NAV_LINK.about.label)}
                  </Link>
                </Button>
              </div>

              <div className="mt-auto hidden lg:block">
                <TermsAndSocial />
              </div>
            </div>

            <div className="flex flex-col justify-between gap-8 md:gap-16">
              <div className="flex flex-col gap-8 text-white md:flex-row md:items-center">
                {NAV_LINKS?.map((link, index) => (
                  <Link
                    key={index}
                    href={link.path}
                    className="hover:text-blue transition"
                  >
                    {t(link.label)}
                  </Link>
                ))}
              </div>

              <div className="rounded-2xl bg-white/10 p-6 ring-1 ring-white ring-inset">
                <div className="bg-mentol mb-6 max-w-max rounded-full px-3 py-2 text-sm">
                  {t("general.leaving_soon")}
                </div>

                <ul className="divide-text-gray -mb-6 space-y-6 divide-y">
                  {isNearestTripsLoading
                    ? Array.from({ length: 3 }).map((_, index) => (
                      <li key={index} className="pb-6">
                        <div className="flex items-center justify-between gap-4 text-white">
                          <div className="skeleton h-6 w-1/2 rounded-full" />
                          <div className="skeleton h-6 w-12 rounded-full" />
                          <ChevronRightIcon className="6" />
                        </div>
                      </li>
                    ))
                    : nearestTrips?.data && nearestTrips.data.length > 0 && !isNearestTripsError
                      ? nearestTrips.data.map((trip, index) => {
                        const stations = trip.route_departure.route.stations;
                        const fromId = stations[0]?.id;
                        const toId = stations[stations.length - 1]?.id;
                        const departureDate = format(
                          parseISO(trip.route_departure.departure_datetime),
                          "dd.MM.yyyy",
                        );
                        const params = new URLSearchParams({
                          from_station_id: String(fromId),
                          to_station_id: String(toId),
                          departure_date: departureDate,
                          passengers: "1",
                        });
                        const href = `/search?${params.toString()}`;

                        return (
                          <li key={index} className="pb-6">
                            <Link
                              href={href}
                              className="flex items-center justify-between gap-4 text-white"
                            >
                              <div>
                                {getLocalizedField(
                                  trip.route_departure.route,
                                  "name",
                                  locale,
                                )}
                              </div>
                              <div className="text-mentol">
                                {
                                  formatUTC(trip.route_departure.departure_datetime, {
                                    dateFormat: "dd.MM.yyyy, HH:mm",
                                  })?.date
                                }
                              </div>
                              <ChevronRightIcon className="6" />
                            </Link>
                          </li>
                        );
                      })
                      : (
                        <li className="pb-6 text-center text-white">
                          {t("general.no_nearest_trips")}
                        </li>
                      )}
                </ul>
              </div>

              <div className="flex items-end justify-between">
                <div className="space-y-12">
                  <div className="flex flex-col gap-2">
                    <div className="text-lg font-semibold text-white">
                      {t("nav.contacts")}
                    </div>
                    <a
                      className="text-text-gray text-sm"
                      href={`tel:${tc("phone").replace(/\s/g, "")}`}
                    >
                      {tc("phone")}
                    </a>
                    <a
                      className="text-text-gray text-sm"
                      href={`mailto:${tc("email")}`}
                    >
                      {tc("email")}
                    </a>
                  </div>

                  <div className="pr-10">
                    <div className="text-lg font-semibold text-white">
                      {t("general.address")}
                    </div>
                    <div className="text-text-gray text-sm">
                      {t("footer.address")}
                    </div>
                  </div>
                </div>

                <div className="flex-none">
                  <div className="text-white">
                    {t("general.language_switch")}
                  </div>
                  <div className="flex justify-end gap-4 text-sm text-[#8F9FA3]">
                    <Link href={currentPath} locale="ro">
                      Ro
                    </Link>
                    <Link href={currentPath} locale="ru">
                      Ru
                    </Link>
                    <Link href={currentPath} locale="en">
                      En
                    </Link>
                  </div>
                </div>
              </div>

              <div className="block lg:hidden">
                <TermsAndSocial />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const TermsAndSocial = () => {
  const locale = useLocale();
  const t = useTranslations();
  const socialIcons = [
    {
      key: "telegram",
      icon: (
        <svg viewBox="0 0 28 28" className="size-5">
          <path d="M24.67 5.45c-.06-.23-.14-.3-.28-.38-.32-.15-.88-.02-.88-.02s-19.89 5.1-21.06 5.76c-.25.15-.34.23-.4.34-.23.53.34.83.34.83l4.8 2.08s.18.05.26.01c1.19-.6 12.02-6.1 12.63-6.26.1-.02.16.02.14.08-.32.81-9.94 7.86-9.94 7.86s-.04.04-.06.1l-.01-.02-.93 4.88s-.34 1.5 1.31.12a42.45 42.45 0 0 1 2.83-2.13c1.6 1.33 3.31 2.81 4.04 3.56.37.38.7.47.97.49.75.04 1.04-.76 1.04-.76S24.31 8.2 24.6 6.32c.03-.18.06-.3.07-.43.02-.17.02-.35 0-.44Z" />
        </svg>
      ),
    },
    {
      key: "facebook",
      icon: <Facebook className="size-5" />,
    },
    {
      key: "instagram",
      icon: <Instagram className="size-5" />,
    },
    {
      key: "whatsapp",
      icon: (
        <svg viewBox="0 0 28 28" className="size-5">
          <path fillRule="evenodd" clipRule="evenodd" d="M23.3 5.06A13.01 13.01 0 0 0 2.84 20.74L1 27.48l6.89-1.8a12.96 12.96 0 0 0 6.2 1.58h.01a13.02 13.02 0 0 0 9.2-22.2Zm-9.2 20c-1.93 0-3.84-.52-5.5-1.5l-.39-.24-4.09 1.07 1.1-3.99-.26-.4a10.8 10.8 0 1 1 9.15 5.06Zm5.93-8.1c-.32-.15-1.92-.94-2.22-1.05-.3-.1-.51-.16-.73.16-.22.33-.84 1.06-1.03 1.28-.19.21-.38.24-.7.08-.33-.16-1.37-.5-2.61-1.61a9.86 9.86 0 0 1-1.8-2.25c-.2-.33-.03-.5.13-.67.15-.14.33-.38.49-.57.16-.19.22-.32.32-.54.11-.22.06-.4-.02-.57-.09-.16-.73-1.76-1-2.41-.27-.63-.53-.55-.74-.56l-.62-.01c-.21 0-.57.08-.86.4-.3.33-1.14 1.12-1.142.72s1.17 3.14 1.33 3.35c.16.22 2.29 3.5 5.55 4.9.77.34 1.38.54 1.85.7.78.24 1.48.2 2.04.12.63-.1 1.92-.78 2.2-1.54.26-.76.26-1.4.18-1.54-.08-.14-.3-.22-.62-.38Z" />
        </svg>
      ),
    },
    {
      key: "viber",
      icon: (
        <svg viewBox="0 0 28 28" className="size-5">
          <path d="M8.7 6.28c.48-.25.94-.17 1.25.2.01.02.65.78.93 1.16.28.4.55.82.8 1.25.31.57.11 1.15-.2 1.4l-.63.5c-.32.26-.28.73-.28.73.01.04.95 3.55 4.43 4.44 0 0 .48.04.73-.28l.5-.63c.25-.31.83-.51 1.4-.2.43.25.85.51 1.25.8.38.28 1.16.93 1.16.93.37.31.46.77.2 1.25v.02c-.27.48-.63.91-1.04 1.28h-.01a2.06 2.06 0 0 1-1.22.53c-.15 0-.3-.02-.45-.07v-.02a15.4 15.4 0 0 1-2.92-1.34 17.37 17.37 0 0 1-3.56-2.6l-.07-.07-.04-.04-.03-.04c-.35-.35-.68-.72-.98-1.1a17.4 17.4 0 0 1-1.62-2.45A15.42 15.42 0 0 1 6.95 9h-.02a1.41 1.41 0 0 1-.06-.61c.05-.35.22-.7.52-1.07.38-.42.81-.77 1.3-1.05Z" />
          <path d="M14 5.37c1.9.05 3.5.71 4.8 1.98 1.3 1.27 1.98 3 2.03 5.12v.25a.34.34 0 0 1-.67 0v-.23c-.06-1.99-.68-3.53-1.83-4.66a6.23 6.23 0 0 0-4.35-1.78h-.2a.34.34 0 0 1 .04-.68H14Z" />
          <path d="m14.44 7.13.13.01c1.37.13 2.48.62 3.29 1.5l.07.09a4.65 4.65 0 0 1 1.12 3.26.34.34 0 0 1-.68-.01 3.96 3.96 0 0 0-1.02-2.88l-.12-.13a4.26 4.26 0 0 0-2.72-1.15h-.12l-.03-.01a.34.34 0 0 1 .05-.68h.03Z" />
          <path d="M15.01 8.96c.68.05 1.24.26 1.64.68.4.41.6.99.65 1.68v.1c0 .17-.14.31-.32.32a.34.34 0 0 1-.35-.29v-.03l-.01-.12c-.05-.55-.21-.93-.46-1.19a1.72 1.72 0 0 0-1.14-.46l-.1-.01h-.04a.34.34 0 0 1 .04-.68H15Z" />
          <path fillRule="evenodd" d="M3.94 3.32C7.4.15 14.49.58 14.49.58c6.01.02 8.71 1.98 9.38 2.6C26.1 5.1 27.32 9.37 26.5 16.1c-.8 6.55-5.73 7.18-6.6 7.46-.38.12-3.7.95-8.01.59a71.3 71.3 0 0 1-1.57 1.77c-.83.9-1.34 1.73-2.22 1.46-.7-.22-.68-1.3-.68-1.32v-2.7c-6.3-1.78-6.22-8.32-6.14-11.82.07-3.49.74-6.3 2.67-8.23Zm10.44-.85s-6.03-.4-8.95 2.26c-1.63 1.6-2.18 4-2.24 6.91-.06 2.92-.37 8.49 4.97 9.97l-.02 4.5c0 .25.03.43.18.46.1.03.26-.03.4-.16.84-.85 3.56-4.13 3.58-4.15 3.66.24 6.58-.49 6.9-.59.73-.23 4.73-.58 5.4-6.04.7-5.63-.25-9.48-2.13-11.09-.57-.51-3-2.04-8.1-2.07Z" clipRule="evenodd" />
        </svg>
      ),
    },
  ];
  return (
    <div className="flex h-full flex-col justify-between gap-8 sm:flex-row">
      <div className="flex max-w-max grid-cols-2 gap-2 sm:grid">
        {socialIcons.map((item) => (
          <div
            key={item.key}
            className="flex size-10 items-center justify-center rounded-full bg-white"
          >
            {item.icon}
          </div>
        ))}
      </div>

      <div className="flex h-full flex-col gap-4">
        <div className="flex flex-col sm:items-end">
          <Link
            href={t("legal_links.terms")}
            locale={locale}
            className="text-blue inline-block text-sm underline-offset-2 transition hover:underline"
          >
            {t("legal_info.terms")}
          </Link>
          <Link
            href={t("legal_links.privacy")}
            locale={locale}
            className="text-blue inline-block text-sm underline-offset-2 transition hover:underline"
          >
            {t("legal_info.privacy")}
          </Link>
        </div>

        <div className="text-platinum mt-auto text-center text-xs sm:text-right">
          <div>© 2025 — Copyright</div>
          <div> {t("legal_info.copyright")}</div>
        </div>

        <Image
          src={payment.src}
          width={payment.width}
          height={payment.height}
          alt="Payment methods"
          className="mx-auto mt-4 h-auto w-full max-w-xs sm:max-w-sm"
        />
      </div>
    </div>
  );
};
