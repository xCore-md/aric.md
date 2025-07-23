"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "@/i18n/navigation";

import logo from "@/assets/images/logo.svg";
import { Button } from "@/components/ui/button";
import { ChevronRightIcon } from "lucide-react";
import { CONTACTS, NAV_LINK, NAV_LINKS, QUERY_KEYS } from "@/utils/constants";
import { useTranslations, useLocale } from "next-intl";
import { useQuery } from "@tanstack/react-query";
import { searchService } from "@/services/search.service";
import { getLocalizedField } from "@/utils/getLocalizedField";
import { useFormatUTCToLocal } from "@/hooks/useFormatUTCToLocal ";

export const Footer: React.FC = () => {
  const t = useTranslations();
  const locale = useLocale();
  const { formatUTC } = useFormatUTCToLocal();
  const pathname = usePathname();

  const {
    data: nearestTrips,
    isLoading: isNearestTripsLoading,
    isError: isNearestTripsError,
  } = useQuery({
    queryKey: [QUERY_KEYS.nearestTrips],
    queryFn: () => searchService.getNearestTrips({ limit: 3 }),
  });
  return (
    <div className="mt-auto">
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
                      ? nearestTrips.data.map((trip, index) => (
                          <li key={index} className="pb-6">
                            <div className="flex items-center justify-between gap-4 text-white">
                              <div className="">
                                {getLocalizedField(trip.route_departure.route, "name", locale)}
                              </div>
                              <div className="text-mentol">
                                {formatUTC(trip.route_departure.departure_datetime)?.time}
                              </div>
                              <ChevronRightIcon className="6" />
                            </div>
                          </li>
                        ))
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
                      href={`tel:${CONTACTS.phone}`}
                    >
                      {CONTACTS.phone}
                    </a>
                    <a
                      className="text-text-gray text-sm"
                      href={`mailto:${CONTACTS.email}`}
                    >
                      {CONTACTS.email}
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
                    <Link href={"/ro" + pathname}>Ro</Link>
                    <Link href={"/ru/" + pathname}>Ru</Link>
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
  const t = useTranslations();
  return (
    <div className="flex h-full flex-col justify-between gap-8 sm:flex-row">
      <div className="flex max-w-max grid-cols-2 gap-2 sm:grid">
        {[1, 2, 3, 4, 5].map((_, index) => (
          <div
            key={index}
            className="flex size-10 items-center justify-center rounded-full bg-white"
          >
            X
          </div>
        ))}
      </div>

      <div className="flex h-full flex-col gap-4">
        <div className="flex flex-col sm:items-end">
          <Link
            href="/legal/terms"
            className="text-yellow hover:text-blue text-sm"
          >
            {t("legal_info.terms")}
          </Link>
          <Link
            href="/legal/privacy"
            className="text-yellow hover:text-blue text-sm"
          >
            {t("legal_info.privacy")}
          </Link>
        </div>

        <div className="text-platinum mt-auto text-center text-xs sm:text-right">
          <div>© 2025 — Copyright</div>
          <div> {t("legal_info.copyright")}</div>
        </div>
      </div>
    </div>
  );
};
