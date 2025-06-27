"use client";
import React from "react";
import { useLocale, useTranslations } from "use-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { PRIVATE_LINK, QUERY_KEYS } from "@/utils/constants";
import { Link } from "@/i18n/navigation";

import { useQuery } from "@tanstack/react-query";
import { bookingService } from "@/services/booking.service";
import { useFormatUTCToLocal } from "@/hooks/useFormatUTCToLocal ";

import flagMD from "@/assets/images/languages/md.svg";
import flagUA from "@/assets/images/languages/ua.svg";
import logoMaib from "@/assets/images/bank/maib.svg";
import { TicketDetailsCollapsible } from "@/components/shared/TicketDetailsCollapsible";
import { PassengerForm } from "./PassengerForm";
import { getLocalizedField } from "@/utils/getLocalizedField";
import { FormProvider, useForm } from "react-hook-form";
import { useCurrency } from "@/hooks/useCurrency";
import { useBookingPrice } from "@/hooks/useBookingPrice ";

export const BookingByIdContainer: React.FC<{ id: number }> = ({ id }) => {
  const form = useForm({
    defaultValues: {
      passengers: {
        new: [],
        existing: [],
      },
      passengerCounts: {
        adults: 1,
        children: 0,
      },
    },
  });

  const { watch, handleSubmit } = form;

  const t = useTranslations();
  const locale = useLocale();
  const { formatUTC } = useFormatUTCToLocal();
  const { formatCurrency } = useCurrency();

  const { data: booking } = useQuery({
    queryKey: [QUERY_KEYS.booking, id],
    queryFn: () => bookingService.getById(id),
  });

  const passengerCounts = watch("passengerCounts");

  const { prices } = useBookingPrice({ bookingId: id, passengerCounts });

  console.log({ prices });

  console.log(booking);

  const onSubmit = (data) => console.log(data);

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="py-8">
          <h3 className="h3 !mb-0">{t(PRIVATE_LINK.booking.label)}</h3>
        </div>

        <div className="flex grid-cols-3 flex-col gap-8 lg:grid">
          <Card className="ring-platinum col-span-2 ring ring-inset">
            <CardHeader platinum>
              <CardTitle className="h4">
                {t("$Finalizează rezervarea")}
              </CardTitle>
            </CardHeader>

            <CardContent>
              <PassengerForm
                availableSeats={
                  booking?.trip?.route_departure?.seats_available || 0
                }
              />

              <div className="my-8 space-y-12 border-y border-dashed py-8">
                <div className="space-y-4">
                  <div className="text-lg font-semibold">
                    1. Alegeți moneda:
                  </div>

                  {booking?.trip?.prices?.price_mdl}

                  <RadioGroup defaultValue="mdl">
                    <div className="flex flex-wrap gap-6">
                      <label
                        htmlFor="currency_mdl"
                        className="bg-back flex items-center gap-2 rounded-full border p-4 font-bold"
                      >
                        <RadioGroupItem value="MDL" id="currency_mdl" />
                        <span>
                          {formatCurrency(booking?.trip?.prices?.price_mdl)}
                        </span>

                        <div className="relative ml-12 size-6 flex-none overflow-hidden rounded-full">
                          <Image
                            src={flagMD.src}
                            alt="MDL"
                            fill
                            className="object-cover"
                          />
                        </div>
                      </label>

                      <label
                        htmlFor="currency_uah"
                        className="bg-back flex items-center gap-2 rounded-full border p-4 font-bold"
                      >
                        <RadioGroupItem value="UAH" id="currency_uah" />
                        <span>
                          {formatCurrency(booking?.trip?.prices?.price_uah)} UAH
                        </span>

                        <div className="relative ml-12 size-6 flex-none overflow-hidden rounded-full">
                          <Image
                            src={flagUA.src}
                            alt="UAH"
                            fill
                            className="object-cover"
                          />
                        </div>
                      </label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-4">
                  <div className="text-lg font-semibold">
                    2. Metoda de plată:
                  </div>

                  <RadioGroup defaultValue="option-one123">
                    <div className="flex flex-wrap gap-x-6 gap-y-2">
                      <label
                        htmlFor="option-one"
                        className="flex items-center gap-2 font-bold"
                      >
                        <RadioGroupItem value="option-one" id="option-one" />
                        <span>Achitare online</span>
                      </label>
                      <label
                        htmlFor="option-one"
                        className="flex items-center gap-2 font-bold"
                      >
                        <RadioGroupItem value="option-one" id="option-one" />
                        <span>Rezervare</span>
                      </label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-4">
                  <div className="text-lg font-semibold">
                    3. Alegeți o poartă de plată:
                  </div>

                  <RadioGroup defaultValue="option-one">
                    <div className="flex flex-wrap gap-6">
                      <RadioGroupItem
                        value="maib"
                        id="maib"
                        className="sr-only data-[state=checked]:[&+label]:shadow data-[state=checked]:[&+label]:ring-2"
                      />

                      <label
                        htmlFor="maib"
                        className="bg-back ring-blue shadow-blue/10 flex h-14 items-center gap-2 rounded-full p-3 font-bold"
                      >
                        <div className="relative h-full w-28 flex-none overflow-hidden rounded-full">
                          <Image
                            src={logoMaib.src}
                            alt="MAIB"
                            fill
                            className="object-contain"
                          />
                        </div>
                      </label>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              <TicketDetailsCollapsible
                data={booking?.trip!}
                route={booking?.trip?.route_departure!}
              />
            </CardContent>
          </Card>

          <Card className="ring-blue max-h-max ring ring-inset">
            <CardHeader>
              <CardTitle className="h4">
                {t("$Comanda")} #{booking?.id}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="bg-back grid grid-cols-2 rounded-3xl px-6 py-4">
                  <div className="">
                    <div className="font-semibold">
                      {t("booking.departure_date")}:
                    </div>
                    <div className="text-text-gray">
                      {
                        formatUTC(booking?.departure_datetime!, {
                          dateFormat: "d MMMM yyyy",
                        }).date
                      }
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-semibold">{t("$Data sosirii")}:</div>
                    <div className="text-text-gray">
                      {
                        formatUTC(booking?.arrival_datetime!, {
                          dateFormat: "d MMMM yyyy",
                        }).date
                      }
                    </div>
                  </div>
                </div>

                <div className="bg-back rounded-3xl px-6 py-4">
                  <div className="font-semibold">{t("$Stații")}:</div>
                  <div className="mt-4 flex items-center justify-between gap-10">
                    <div className="">
                      <div className="flex items-center">
                        <div className="w-5 text-lg font-semibold">⚲</div>
                        <div className="text-lg font-medium">
                          {getLocalizedField(
                            booking?.station_from!,
                            "name",
                            locale,
                          )}
                        </div>
                      </div>

                      <div className="text-text-gray ml-5">
                        {getLocalizedField(
                          booking?.station_from!,
                          "address",
                          locale,
                        )}
                      </div>
                    </div>

                    <div className="font-semibold">
                      {formatUTC(booking?.departure_datetime!)?.time}
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-10">
                    <div className="">
                      <div className="flex items-center">
                        <div className="w-5 text-lg font-semibold">⚲</div>
                        <div className="text-lg font-medium">
                          {getLocalizedField(
                            booking?.station_to!,
                            "name",
                            locale,
                          )}
                        </div>
                      </div>

                      <div className="text-text-gray ml-5">
                        {getLocalizedField(
                          booking?.station_to!,
                          "address",
                          locale,
                        )}
                      </div>
                    </div>

                    <div className="font-semibold">
                      {formatUTC(booking?.arrival_datetime!)?.time}
                    </div>
                  </div>
                </div>

                <div className="border-blue bg-back flex items-center justify-between gap-2 rounded-full border px-6 py-4 font-semibold">
                  <div>Preț total:</div>
                  <div>777777 MDL</div>
                </div>

                <div className="flex gap-4 border-t py-6">
                  <Checkbox />

                  <p className="text-text-gray -mt-0.5">
                    Sunt de acord cu{" "}
                    <Link
                      className="text-blue underline-offset-2 transition hover:underline"
                      href="/legal/terms"
                    >
                      Termenii și condițiile generale
                    </Link>{" "}
                    conform{" "}
                    <Link
                      className="text-blue underline-offset-2 transition hover:underline"
                      href="/legal/privacy"
                    >
                      Politicii de confidențialitate
                    </Link>
                  </p>
                </div>

                <Button type="submit" size="lg" className="w-full">
                  Achită
                  <ChevronRightIcon />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </FormProvider>
  );
};
