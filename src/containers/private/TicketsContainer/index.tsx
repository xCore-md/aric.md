"use client";
import React from "react";
import { ChevronRightIcon, MoveRight, User, Wallet } from "lucide-react";
import { useTranslations } from "use-intl";
import { PRIVATE_LINK } from "@/utils/constants";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export const TicketsContainer: React.FC = () => {
  const t = useTranslations();

  return (
    <>
      <div className="py-8">
        <h3 className="h3 !mb-0">{t(PRIVATE_LINK.tickets.label)}</h3>
      </div>

      <Card className="ring-platinum p-1 ring ring-inset sm:py-4">
        <CardContent className="p-1 sm:px-4">
          <div className="space-y-4">
            <div className="bg-back flex flex-wrap items-center justify-between gap-6 rounded-xl p-6 lg:flex-nowrap">
              <div className="">
                <div className="text-text-gray text-sm">ID #0234</div>
                <div className="bg-yellow max-w-max rounded-full px-2.5">
                  Rezervat
                </div>
              </div>

              <Separator
                orientation="vertical"
                className="hidden !h-8 sm:block md:!h-14"
              />

              <div className="xs:flex-row flex flex-col gap-2 sm:gap-8">
                <div className="flex flex-none gap-4">
                  <div className="flex size-9 items-center justify-center rounded-md border bg-white">
                    <User />
                  </div>
                  <div className="">
                    <div className="text-text-gray text-xs">Pasageri</div>
                    <div className="-mt-1 text-lg font-semibold">1</div>
                  </div>
                </div>

                <div className="flex flex-none gap-4">
                  <div className="flex size-9 items-center justify-center rounded-md border bg-white">
                    <Wallet />
                  </div>
                  <div className="">
                    <div className="text-text-gray text-xs">Preț</div>
                    <div className="-mt-1 text-lg font-semibold">120 MDL</div>
                  </div>
                </div>
              </div>

              <Separator
                orientation="vertical"
                className="hidden !h-14 md:block"
              />

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div>
                    <div className="text-text-gray mb-2">Chișinău</div>
                    <div className="font-semibold">02 Mai 2025</div>
                    <div className="">12:00 pm</div>
                  </div>

                  <MoveRight />

                  <div>
                    <div className="text-text-gray mb-2">Chișinău</div>
                    <div className="font-semibold">02 Mai 2025</div>
                    <div className="">12:00 pm</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div>
                    <div className="font-semibold">02 Mai 2025</div>
                    <div className="">12:00 pm</div>
                  </div>

                  <MoveRight />

                  <div>
                    <div className="font-semibold">02 Mai 2025</div>
                    <div className="">12:00 pm</div>
                  </div>
                </div>
              </div>

              <Separator
                orientation="vertical"
                className="hidden !h-14 lg:block"
              />

              <div className="flex flex-wrap gap-4 sm:flex-nowrap lg:flex-col xl:flex-row">
                <Button variant="reverse">Descarcă bilet</Button>

                <Button>
                  Achită
                  <ChevronRightIcon />
                </Button>

                <Button variant="link">Anulează</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};
