"use client";
import React from "react";
import { useLocale, useTranslations } from "next-intl";
import { getLocalizedField } from "@/utils/getLocalizedField";
import type { TripRouteDetailsData, TripSegment } from "@/types";
import { useFormatUTCToLocal } from "@/hooks/useFormatUTCToLocal ";
import { cn } from "@/lib/utils";

export const TripRouteDetails: React.FC<{
  data: TripRouteDetailsData;
  route: TripSegment;
  duration: number;
  className?: string;
  showShort?: boolean;
}> = ({ data, route: routeData, duration: durationMinutes, className, showShort = false }) => {
  const locale = useLocale();
  const t = useTranslations();
  const { formatUTC } = useFormatUTCToLocal();

  const durationLabel = React.useMemo(() => {
    const hours = Math.floor(durationMinutes / 60);
    const minutes = durationMinutes % 60;
    const keyPrefix = "duration." + (hours && minutes
      ? "hoursMinutes"
      : hours
        ? "hours"
        : "minutes");

    const key = showShort ? `${keyPrefix}_short` : keyPrefix;

    return t(key, { hours, minutes });
  }, [durationMinutes, t, showShort]);

  return (
    <div className={cn("flex gap-4", className)}>
      <div className="w-full grid-cols-5 items-center gap-4 space-y-3 md:grid md:space-y-0">
        <div className="col-span-2 flex flex-row-reverse items-center justify-between md:block">
          <div className="flex flex-col items-end md:mb-6 md:flex-row md:items-center md:gap-5">
            <div className="font-semibold md:text-lg">
              {formatUTC(routeData?.departure_datetime)?.time}
            </div>
            <div className="text-text-gray text-xs md:text-base">
              {
                formatUTC(routeData?.departure_datetime, {
                  dateFormat: "d MMMM yyyy",
                })?.date
              }
            </div>
          </div>

          <div className="flex md:flex-col md:gap-2">
            <div className="flex md:items-center">
              <div className="w-5 font-semibold md:text-xl">⚲</div>
              <div className="sr-only text-2xl font-medium md:not-sr-only">
                {getLocalizedField(
                  data?.metadata?.from_station,
                  "name",
                  locale,
                )}
              </div>
            </div>
            <div className="md:ml-5">
              {getLocalizedField(
                data?.metadata?.from_station,
                "address",
                locale,
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div className="bg-platinum after:border-blue relative h-px w-full min-w-12 after:absolute after:top-1/2 after:left-0 after:hidden after:size-2 after:flex-none after:-translate-y-1/2 after:rounded-full after:border after:bg-white md:after:block" />
          <div className="bg-platinum flex-none rounded-md px-2 py-1 text-sm font-medium">
            {durationLabel}
          </div>
          <div className="bg-platinum after:bg-blue after:border-blue relative hidden h-px w-full min-w-12 after:absolute after:top-1/2 after:right-0 after:block after:size-2 after:flex-none after:-translate-y-1/2 after:rounded-full after:border md:block" />
        </div>

        <div className="col-span-2 flex flex-row-reverse items-center justify-between md:block md:justify-end">
          <div className="flex flex-col items-end md:mb-6 md:flex-row md:items-center md:justify-end md:gap-5">
            <div className="text-text-gray text-xs md:text-base">
              {
                formatUTC(routeData?.arrival_datetime, {
                  dateFormat: "d MMMM yyyy",
                })?.date
              }
            </div>

            <div className="font-semibold md:text-lg">
              {formatUTC(routeData?.arrival_datetime)?.time}
            </div>
          </div>

          <div className="flex md:flex-col md:gap-2 md:text-right">
            <div className="flex flex-row-reverse md:items-center">
              <div className="w-5 font-semibold md:text-xl">⚲</div>
              <div className="sr-only text-2xl font-medium md:not-sr-only">
                {getLocalizedField(data?.metadata?.to_station, "name", locale)}
              </div>
            </div>
            <div className="md:mr-5">
              {getLocalizedField(data?.metadata?.to_station, "address", locale)}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center md:hidden">
        <div className="bg-platinum after:border-blue relative h-full w-px after:absolute after:top-0 after:left-1/2 after:size-2 after:flex-none after:-translate-x-1/2 after:rounded-full after:border after:bg-white" />
        <div>🚍</div>
        <div className="bg-platinum after:bg-blue after:border-blue relative h-full w-px after:absolute after:bottom-0 after:left-1/2 after:block after:size-2 after:flex-none after:-translate-x-1/2 after:rounded-full after:border" />
      </div>
    </div>
  );
};
