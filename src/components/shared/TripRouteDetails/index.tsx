"use client";
import React from "react";

export const TripRouteDetails: React.FC = () => {
  return (
    <div className="flex gap-4">
      <div className="w-full grid-cols-5 items-center gap-4 space-y-3 md:grid md:space-y-0">
        <div className="col-span-2 flex flex-row-reverse items-center justify-between md:block">
          <div className="flex flex-col items-end md:mb-6 md:flex-row md:items-center md:gap-5">
            <div className="font-semibold md:text-lg">01:00</div>
            <div className="text-text-gray text-xs md:text-base">
              02 Mai 2025
            </div>
          </div>

          <div className="flex md:flex-col md:gap-2">
            <div className="flex md:items-center">
              <div className="w-5 font-semibold md:text-xl">⚲</div>
              <div className="sr-only text-2xl font-medium md:not-sr-only">
                Chișinău
              </div>
            </div>
            <div className="md:ml-5">
              Stația &#34;NORD&#34;,
              <br /> str. Calea Mosilor 2/1
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div className="bg-platinum after:border-blue relative h-px w-full min-w-12 after:absolute after:top-1/2 after:left-0 after:hidden after:size-2 after:flex-none after:-translate-y-1/2 after:rounded-full after:border after:bg-white md:after:block" />
          <div className="bg-platinum flex-none rounded-md px-2 py-1 text-sm font-medium">
            Durata 12 ore
          </div>
          <div className="bg-platinum after:bg-blue after:border-blue relative hidden h-px w-full min-w-12 after:absolute after:top-1/2 after:right-0 after:block after:size-2 after:flex-none after:-translate-y-1/2 after:rounded-full after:border md:block" />
        </div>

        <div className="col-span-2 flex flex-row-reverse items-center justify-between md:block md:justify-end">
          <div className="flex flex-col items-end md:mb-6 md:flex-row md:items-center md:justify-end md:gap-5">
            <div className="font-semibold md:text-lg">01:00</div>
            <div className="text-text-gray text-xs md:text-base">
              02 Mai 2025
            </div>
          </div>

          <div className="flex md:flex-col md:gap-2 md:text-right">
            <div className="flex flex-row-reverse md:items-center">
              <div className="w-5 font-semibold md:text-xl">⚲</div>
              <div className="sr-only text-2xl font-medium md:not-sr-only">
                Chișinău
              </div>
            </div>
            <div className="md:mr-5">
              Stația,
              <br /> str. Pushkina 70
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
