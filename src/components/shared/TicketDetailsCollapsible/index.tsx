"use client";
import React from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { TripItem, TripSegment } from "@/types";
import { Check, ChevronRightIcon } from "lucide-react";
import { useLocale } from "next-intl";
import { getLocalizedField } from "@/utils/getLocalizedField";
import { cn } from "@/lib/utils";
import { QUERY_KEYS } from "@/utils/constants";
import { refundPolicyService } from "@/services/refund-policy.service";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";


export const TicketDetailsCollapsible: React.FC<{
  data: TripItem;
  route: TripSegment;
}> = ({ data, route: routeData }) => {
  const locale = useLocale();
  const [open, setOpen] = React.useState(false);

  const {
    data: refoundPolicy,
    isLoading,
    refetch,
    isFetched,
  } = useQuery({
    queryKey: [QUERY_KEYS.refundPolicy, data?.prices?.price_mdl],
    queryFn: () =>
      refundPolicyService.getAll({
        price: String(data?.prices?.price_mdl),
        language: locale,
      }),
    enabled: false,
  });

  React.useEffect(() => {
    if (open && data?.prices?.price_mdl && !isFetched) {
      refetch();
    }
  }, [open, data?.prices?.price_mdl, isFetched, refetch]);

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger className="hover:text-blue data-[state=open]:text-blue bg-back mt-6 flex w-full cursor-pointer items-center justify-between gap-1 rounded-full px-6 py-4 font-semibold transition data-[state=open]:rounded-t-2xl data-[state=open]:rounded-b-none [&[data-state=open]>svg]:rotate-90">
        <span>Informații despre bilet</span>
        <ChevronRightIcon className="size-5" />
      </CollapsibleTrigger>
      <CollapsibleContent className="bg-back rounded-b-2xl px-6 pb-4">
        <div className="space-y-6">
          <div className="space-y-4">
            <div>1. Traseu</div>
            <div className="border-platinum ml-4 space-y-4 border-l pl-4 md:ml-8 md:pl-8">
              {routeData?.route?.stations?.map((station, index) => (
                <div
                  key={station?.id}
                  className="relative flex flex-col gap-2 md:flex-row"
                >
                  <div className="mr-4 -ml-5 flex w-44 items-center gap-4 md:mr-8 md:-ml-9 md:gap-8">
                    <div
                      className={cn(
                        "border-blue bg-blue size-2 flex-none rounded-full border",
                        index === 0 && "bg-white",
                      )}
                    />
                    {index === 0 && (
                      <div className="bg-back absolute top-0 hidden h-[calc(50%_-_theme(spacing.1))] w-2 md:block" />
                    )}

                    <div
                      className={cn(
                        (index === 0 ||
                          index === routeData?.route?.stations?.length - 1) &&
                          "font-semibold",
                      )}
                    >
                      {getLocalizedField(station, "name", locale)}
                    </div>

                    {index === routeData?.route?.stations?.length - 1 && (
                      <div className="bg-back absolute bottom-0 hidden h-[calc(50%_-_theme(spacing.1))] w-2 md:block" />
                    )}
                  </div>

                  <div className="flex flex-col items-start md:flex-row md:items-center md:gap-6">
                    <div className="text-text-gray">
                      {getLocalizedField(station, "address", locale)}
                    </div>

                    <Button
                      size="sm"
                      variant="link"
                      className="text-text-gray h-auto flex-none !px-0 text-xs text-nowrap"
                      asChild
                    >
                      <a
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        href={`https://www.google.com/maps?q=${station?.latitude},${station?.longitude}`}
                      >
                        Vezi pe hartă
                      </a>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div>2. Servicii disponibile:</div>
            <ul className="flex flex-wrap gap-2 gap-x-6">
              {routeData?.bus?.facilities?.map((item, index) => (
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
            <div className="">
              {isLoading ? (
                <div className="space-y-2">
                  <div className="skeleton h-5 w-full rounded-full" />
                  <div className="skeleton h-5 w-3/4 rounded-full" />
                  <div className="skeleton h-5 w-2/3 rounded-full" />
                </div>
              ) : (
                refoundPolicy?.map((item, index) => (
                  <p key={index} className="text-text-gray">
                    {item?.description}
                  </p>
                ))
              )}
            </div>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};
