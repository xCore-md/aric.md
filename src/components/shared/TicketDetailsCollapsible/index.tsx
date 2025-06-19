"use client";
import React from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { TripSegment } from "@/types";
import { Check, ChevronRightIcon } from "lucide-react";
import { useLocale } from "next-intl";
import { getLocalizedField } from "@/utils/getLocalizedField";
import { cn } from "@/lib/utils";

export const TicketDetailsCollapsible: React.FC<{ data: TripSegment }> = ({
  data,
}) => {
  const locale = useLocale();
  return (
    <Collapsible>
      <CollapsibleTrigger className="hover:text-blue data-[state=open]:text-blue bg-back mt-6 flex w-full cursor-pointer items-center justify-between gap-1 rounded-full px-6 py-4 font-semibold transition data-[state=open]:rounded-t-2xl data-[state=open]:rounded-b-none [&[data-state=open]>svg]:rotate-90">
        <span>Informații despre bilet</span>
        <ChevronRightIcon className="size-5" />
      </CollapsibleTrigger>
      <CollapsibleContent className="bg-back rounded-b-2xl px-6 pb-4">
        <div className="space-y-6">
          <div className="space-y-4">
            <div>1. Traseu</div>
            <div className="border-platinum ml-8 space-y-4 border-l pl-8">
              {data?.route?.stations?.map((station, index) => (
                <div key={station?.id} className="flex items-center gap-2">
                  <div className="-ml-9 flex w-32 items-center gap-8">
                    <div className="bg-blue size-2 flex-none rounded-full" />
                    <div
                      className={cn(
                        (index === 0 ||
                          index === data?.route?.stations?.length - 1) &&
                          "font-semibold",
                      )}
                    >
                      {getLocalizedField(station, "name", locale)}
                    </div>
                  </div>

                  <div className="text-text-gray">
                    {getLocalizedField(station, "address", locale)}
                  </div>
                </div>
              ))}

              {/* ******************* */}
              <div className="relative flex items-center gap-2">
                <div className="-ml-9 flex w-32 items-center gap-8">
                  <div className="bg-back absolute top-0 h-[calc(50%_-_theme(spacing.1))] w-2" />
                  <div className="border-blue size-2 rounded-full border bg-white" />
                  <div className="font-semibold">Chișinău</div>
                </div>

                <div className="text-text-gray">
                  Stația &#34;NORD&#34;, str. Calea Mosilor 2/1
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="-ml-9 flex w-32 items-center gap-8">
                  <div className="bg-blue size-2 rounded-full" />
                  <div>Chișinău</div>
                </div>

                <div className="text-text-gray">
                  Stația &#34;NORD&#34;, str. Calea Mosilor 2/1
                </div>
              </div>

              <div className="relative flex items-center gap-2">
                <div className="-ml-9 flex w-32 items-center gap-8">
                  <div className="bg-back absolute bottom-0 h-[calc(50%_-_theme(spacing.1))] w-2" />
                  <div className="bg-blue size-2 rounded-full" />
                  <div className="font-semibold">Chișinău</div>
                </div>

                <div className="text-text-gray">
                  Stația &#34;NORD&#34;, str. Calea Mosilor 2/1
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>2. Servicii disponibile:</div>
            <ul className="flex flex-wrap gap-2 gap-x-6">
              {data?.bus?.facilities?.map((item, index) => (
                <li key={index} className="flex items-center gap-2">
                  <div className="bg-yellow flex size-5 items-center justify-center rounded-full">
                    <Check className="size-4 stroke-white" />
                  </div>
                  <div className="text-sm font-medium">
                    {getLocalizedField(item, "name", locale)}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <div>3. Condiții de returnare:</div>
            <p className="text-text-gray">
              Pînă la 24 ora, pînă la plecare: 150 MDL
              <br />
              Din 24 ora. pînă la 12 ora. pînă la plecare: 90 MDL
              <br />
              Mai puțin 12 ora. pînă la plecare: biletul nu se întoarce
            </p>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};
