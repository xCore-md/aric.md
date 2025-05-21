"use client";
import React from "react";

export const TripRouteDetails: React.FC = () => {
  return (
    <div className="grid grid-cols-5 gap-4 items-center">
      <div className="col-span-2 ">
        <div className="flex items-center gap-5 mb-6">
          <div className="font-semibold text-lg">01:00</div>
          <div className="text-text-gray">02 Mai 2025</div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center">
            <div className="font-semibold text-xl w-5">⚲</div>
            <div className="text-2xl font-medium">Chișinău</div>
          </div>
          <div className="ml-5">
            Stația &#34;NORD&#34;,
            <br /> str. Calea Mosilor 2/1
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center">
        <div className="relative h-px min-w-12 w-full bg-platinum after:size-2 after:block after:bg-white after:absolute after:left-0 after:top-1/2 after:-translate-y-1/2 after:rounded-full after:border after:border-blue after:flex-none" />
        <div className="px-2 py-1 font-medium text-sm rounded-md bg-platinum flex-none">
          Durata 12 ore
        </div>
        <div className="relative h-px min-w-12 w-full bg-platinum after:size-2 after:block after:bg-blue after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:rounded-full after:border after:border-blue after:flex-none" />
      </div>

      <div className="col-span-2 ">
        <div className="flex items-center justify-end gap-5 mb-6">
          <div className="font-semibold text-lg">01:00</div>
          <div className="text-text-gray">02 Mai 2025</div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-end">
            <div className="text-2xl font-medium">Chișinău</div>
            <div className="font-semibold text-xl text-right w-5 ">⚲</div>
          </div>
          <div className="mr-5 text-right">
            Stația &#34;NORD&#34;,
            <br /> str. Calea Mosilor 2/1
          </div>
        </div>
      </div>
    </div>
  );
};
