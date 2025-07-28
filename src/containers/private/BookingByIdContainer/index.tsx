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
import { Link, useRouter } from "@/i18n/navigation";

import { useMutation, useQuery } from "@tanstack/react-query";
import { bookingService } from "@/services/booking.service";
import { useFormatUTCToLocal } from "@/hooks/useFormatUTCToLocal ";

import flagMD from "@/assets/images/languages/md.svg";
import flagUA from "@/assets/images/languages/ua.svg";
import logoMaib from "@/assets/images/bank/maib.svg";
import { TicketDetailsCollapsible } from "@/components/shared/TicketDetailsCollapsible";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { PassengerForm } from "./PassengerForm";
import { getLocalizedField } from "@/utils/getLocalizedField";
import { FormProvider, useForm } from "react-hook-form";
import { useCurrency } from "@/hooks/useCurrency";
import { useBookingPrice } from "@/hooks/useBookingPrice ";
import { getAmountByCurrency } from "@/utils/getAmountByCurrency";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { isValidPhoneNumber } from "libphonenumber-js";

import {
  CurrencyEnum,
  PaymentMethodEnum,
  Passenger,
} from "@/types";

import { formatISO, differenceInYears } from "date-fns";

export const phoneNumberSchema = z.string().refine(
  (val) => {
    return isValidPhoneNumber(val);
  },
  {
    message: "Numărul de telefon este invalid",
  },
);

export const passengerFormSchema = z.object({
  passengers: z.object({
    new: z
      .array(
        z.object({
          first_name: z.string().min(3),
          last_name: z.string().min(3),
          birth_date: z.date(),
          phone: phoneNumberSchema,
        }),
      )
      .min(1),
    existing: z.array(z.number()),
  }),

  passengerCounts: z.object({
    adult: z.number().min(0),
    child: z.number().min(0),
  }),

  payment: z.object({
    method: z.nativeEnum(PaymentMethodEnum),
  }),
});

const defaultValues: Partial<PassengerFormSchema> = {
  passengers: {
    new: [
      {
        first_name: "",
        last_name: "",
        phone: "",
        birth_date: new Date(),
      },
    ],
    existing: [],
  },
  passengerCounts: {
    adult: 1,
    child: 0,
  },
  payment: {
    method: PaymentMethodEnum.Cash,
  },
};

export type PassengerFormSchema = z.infer<typeof passengerFormSchema>;

export const BookingByIdContainer: React.FC<{ id: number }> = ({ id }) => {
  const t = useTranslations();
  const locale = useLocale();
  const { formatUTC } = useFormatUTCToLocal();
  const { formatCurrency, setCurrency, currency } = useCurrency();

  const form = useForm<PassengerFormSchema>({
    resolver: zodResolver(passengerFormSchema),
    defaultValues,
  });

  const { watch, setValue, handleSubmit } = form;

  console.warn(form.formState.errors);

  const { data: booking, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.booking, id],
    queryFn: () => bookingService.getById(id),
  });

  const stationFrom =
    booking?.station_from ||
    booking?.trip?.route_departure?.route?.stations?.[0];
  const stationTo =
    booking?.station_to ||
    booking?.trip?.route_departure?.route?.stations?.[
      (booking?.trip?.route_departure?.route?.stations?.length || 1) - 1
    ];

  const passengerCounts = watch("passengerCounts");
  const paymentMethod = watch("payment.method");

  const [existingCounts, setExistingCounts] = React.useState({ adult: 0, child: 0 });

  const handleExistingChange = React.useCallback((passengers: Passenger[]) => {
    const today = new Date();
    const counts = passengers.reduce(
      (acc, p) => {
        if (!p.birth_date) return acc;
        const birth = new Date(p.birth_date);
        const age = differenceInYears(today, birth);
        if (age <= 11) acc.child += 1;
        else acc.adult += 1;
        return acc;
      },
      { adult: 0, child: 0 },
    );
    setExistingCounts(counts);
  }, []);

  const passengerCountsForPrice = React.useMemo(
    () => ({
      adult: passengerCounts.adult + existingCounts.adult,
      child: passengerCounts.child + existingCounts.child,
    }),
    [passengerCounts, existingCounts],
  );

  const { recalculatedPrices, isRecalculatingPrice } = useBookingPrice({
    bookingId: id,
    passengerCounts: passengerCountsForPrice,
  });

  const { push } = useRouter();

  const bookingComplete = useMutation({
    mutationFn: bookingService.complete,
    onSuccess: (data) => {
      if (data.redirect_url) {
        window.location.href = data.redirect_url;
      } else {
        push("/booking/success");
      }
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const onSubmit = (data: PassengerFormSchema) => {
    const { passengers, payment } = data;
    bookingComplete.mutate({
      booking_id: id,
      passengers: {
        new: passengers?.new?.map((p) => ({
          ...p,
          birth_date: formatISO(p?.birth_date),
        })),
        existing: passengers?.existing || [],
      },
      payment: {
        method: payment.method,
        ...(payment.method === PaymentMethodEnum.Card && { gateway: "maib" }),
      },
      currency,
    });
    console.log(data);
  };

  return isLoading ? (
    <div className="flex justify-center pt-20">
      <div className="loader" />
    </div>
  ) : (
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
                
                existingCounts={existingCounts}
                onExistingChange={handleExistingChange}
              />

              <div className="my-8 space-y-12 border-y border-dashed py-8">
                {/* First step form */}
                <div className="space-y-4">
                  <div className="text-lg font-semibold">
                    1. {t("$Alegeți moneda")}:
                  </div>

                  <RadioGroup
                    value={currency}
                    onValueChange={(value: CurrencyEnum) => {
                      setCurrency(value);
                      console.log(value);
                    }}
                  >
                    <div className="flex flex-wrap gap-6">
                      <label
                        htmlFor="currency_mdl"
                        className="bg-back flex items-center gap-2 rounded-full border p-4 font-bold"
                      >
                        <RadioGroupItem
                          value={CurrencyEnum.MDL}
                          id="currency_mdl"
                        />

                        {isRecalculatingPrice ? (
                          <div className="skeleton mr-2 h-5 w-20 rounded-full" />
                        ) : (
                          <div className="pr-6">
                            {recalculatedPrices?.price_mdl ||
                              booking?.trip?.prices?.price_mdl}{" "}
                            MDL
                          </div>
                        )}

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
                        <RadioGroupItem
                          value={CurrencyEnum.UAH}
                          id="currency_uah"
                        />

                        {isRecalculatingPrice ? (
                          <div className="skeleton mr-2 h-5 w-20 rounded-full" />
                        ) : (
                          <div className="pr-6">
                            {recalculatedPrices?.price_uah ||
                              booking?.trip?.prices?.price_uah}{" "}
                            UAH
                          </div>
                        )}
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

                {/* Second step form */}
                <div className="space-y-4">
                  <div className="text-lg font-semibold">
                    2. {t("$Metoda de plată")}:
                  </div>

                  <RadioGroup
                    value={paymentMethod || PaymentMethodEnum.Cash}
                    onValueChange={(value: PaymentMethodEnum) =>
                      setValue("payment.method", value)
                    }
                  >
                    <div className="flex flex-wrap gap-x-6 gap-y-2">
                      <label
                        htmlFor="payment-method-card"
                        className="flex items-center gap-2 font-bold"
                      >
                        <RadioGroupItem
                          value={PaymentMethodEnum.Card}
                          id="payment-method-card"
                        />
                        <span>{t("$Achitare online")}</span>
                      </label>

                      <label
                        htmlFor="payment-method-cash"
                        className="flex items-center gap-2 font-bold"
                      >
                        <RadioGroupItem
                          value={PaymentMethodEnum.Cash}
                          id="payment-method-cash"
                        />
                        <span>{t("$Rezervare")}</span>
                      </label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Third step form */}
                {paymentMethod === PaymentMethodEnum.Card && (
                  <div className="space-y-4">
                    <div className="text-lg font-semibold">
                      3. {t("$Alegeți o poartă de plată")}:
                    </div>

                    <RadioGroup defaultValue="maib">
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
                )}
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
                      }, {formatUTC(booking?.departure_datetime!)?.time}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-semibold">{t("$Data sosirii")}:</div>
                    <div className="text-text-gray">
                      {
                        formatUTC(booking?.arrival_datetime!, {
                          dateFormat: "d MMMM yyyy",
                        }).date
                      }, {formatUTC(booking?.arrival_datetime!)?.time}
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
                          {getLocalizedField(stationFrom!, "name", locale)}
                        </div>
                      </div>

                      <div className="text-text-gray ml-5">
                        {getLocalizedField(stationFrom!, "address", locale)}
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
                          {getLocalizedField(stationTo!, "name", locale)}
                        </div>
                      </div>

                      <div className="text-text-gray ml-5">
                        {getLocalizedField(stationTo!, "address", locale)}
                      </div>
                    </div>

                    <div className="font-semibold">
                      {formatUTC(booking?.arrival_datetime!)?.time}
                    </div>
                  </div>
                </div>

                <div className="border-blue bg-back flex items-center justify-between gap-2 rounded-full border font-semibold">
                  <div className="py-4 pl-6">{t("$Preț total")}:</div>
                  {isRecalculatingPrice ? (
                    <div className="skeleton mr-2 h-10 w-32 rounded-full" />
                  ) : (
                    <div className="pr-6">
                      {formatCurrency(
                        getAmountByCurrency(
                          recalculatedPrices || booking?.trip?.prices,
                        ),
                      )}
                    </div>
                  )}
                </div>

                <div className="flex gap-4 border-t py-6">
                  <Checkbox />
                  
                  <p className="text-text-gray -mt-0.5">
                    {t.rich("consentText", {
                      terms: () => (
                        <Link
                          className="text-blue underline-offset-2 transition hover:underline"
                          href={t("legal_links.terms")}
                        >
                          {t("legal_info.terms")}
                        </Link>
                      ),
                      privacyPolicy: () => (
                        <Link
                          className="text-blue underline-offset-2 transition hover:underline"
                          href={t("legal_links.privacy")}
                        >
                          {t("legal_info.privacy")}
                        </Link>
                      ),
                    })}
                  </p>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={bookingComplete.isPending || isRecalculatingPrice}
                >
                  {isRecalculatingPrice ? (
                    <>
                      {t("$Пересчёт")}
                      <LoadingSpinner className="ml-2" />
                    </>
                  ) : bookingComplete.isPending ? (
                    <>
                      {t("$Формирование")}
                      <LoadingSpinner className="ml-2" />
                    </>
                  ) : (
                    <>
                      {paymentMethod === "cash" ? t("$Rezervare") : t("$Achită")}
                      <ChevronRightIcon />
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </FormProvider>
  );
};
