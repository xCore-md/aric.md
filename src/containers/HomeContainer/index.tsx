"use client";
import React, { useMemo, useRef, useTransition } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { ChevronRightIcon } from "lucide-react";
import { Header } from "@/components/shared/Header";

import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { FAQSection } from "@/components/sections/FAQ";
import { DiscountSection } from "@/components/sections/Discount";
import { SearchTicketForm } from "@/components/shared/SearchTicketForm";
import { ReviewsCarouselSection } from "@/components/sections/ReviewsCarousel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmailSubscriptionSection } from "@/components/sections/EmailSubscription";

import bgChairs from "@/assets/images/chairs.jpg";
import heroBackground from "@/assets/images/hero.jpg";
import { useTicketForm } from "@/hooks/useTicketForm";
import { Messages } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/utils/constants";
import { searchService } from "@/services/search.service";
import { getLocalizedField } from "@/utils/getLocalizedField";
import { BookingButton } from "@/components/shared/BookingButton";
import { getAmountByCurrency } from "@/utils/getAmountByCurrency";
import { TripRouteDetails } from "@/components/shared/TripRouteDetails";
import { useFormatUTCToLocal } from "@/hooks/useFormatUTCToLocal ";
import { useCurrency } from "@/hooks/useCurrency";
import { fromApiDate } from "@/utils/format-date";
import { useOnScreen } from "@/hooks/useOnScreen";
import { StationImage } from "@/components/shared/StationImage";

type FeatureKeys = keyof Messages["planning"];
type TitleDescription = {
  title: `planning.${FeatureKeys}.title`;
  description: `planning.${FeatureKeys}.description`;
};

export const planningData = [
  {
    title: "planning.feature1.title",
    description: "planning.feature1.description",
  },
  {
    title: "planning.feature2.title",
    description: "planning.feature2.description",
  },
  {
    title: "planning.feature3.title",
    description: "planning.feature3.description",
  },
] as const satisfies readonly TitleDescription[];

export const HomeContainer: React.FC = () => {
  const t = useTranslations();
  const locale = useLocale();
  const { formatCurrency } = useCurrency();
  const { formatUTC } = useFormatUTCToLocal();
  const { updateTicketSearchParams } = useTicketForm();
  const [isSearching, startTransition] = useTransition();

  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useOnScreen<HTMLDivElement>(
    containerRef as React.RefObject<HTMLDivElement>,
  );

  const { data: weeklyTrips, isLoading: isLoadingWeeklyTrips } = useQuery({
    queryKey: [QUERY_KEYS.weeklyTrips],
    queryFn: () => searchService.getWeeklyTrips(),
    enabled: isInView,
  });

  const isWeeklyTripsReady = Boolean(
    weeklyTrips?.metadata?.from_station && weeklyTrips?.metadata?.to_station,
  );

  const stationLabel = useMemo(() => {
    const fromName = getLocalizedField(
      weeklyTrips?.metadata?.from_station!,
      "name",
      locale,
    );

    const toName = getLocalizedField(
      weeklyTrips?.metadata?.to_station!,
      "name",
      locale,
    );

    return `${fromName || "?"} - ${toName || "?"}`;
  }, [
    weeklyTrips?.metadata?.from_station,
    weeklyTrips?.metadata?.to_station,
    locale,
  ]);

  const weeklyTripsEntries = useMemo(
    () =>
      Object.entries(weeklyTrips?.data || {}).filter(
        ([, trips]) => trips.length > 0,
      ),
    [weeklyTrips],
  );

  const [selectedDate, setSelectedDate] = React.useState<string>("");

  React.useEffect(() => {
    if (weeklyTripsEntries.length) {
      setSelectedDate(weeklyTripsEntries[0][0]);
    }
  }, [weeklyTripsEntries]);

  const searchHref = React.useMemo(() => {
    if (!selectedDate || !isWeeklyTripsReady) return "/search";
    const params = new URLSearchParams({
      from_station_id: String(weeklyTrips?.metadata?.from_station?.id || ""),
      to_station_id: String(weeklyTrips?.metadata?.to_station?.id || ""),
      departure_date: fromApiDate(selectedDate) || selectedDate,
      passengers: "1",
    });
    return `/search?${params.toString()}`;
  }, [selectedDate, weeklyTrips, isWeeklyTripsReady]);

  const hasTrips = weeklyTripsEntries.length > 0;
  return (
    <>
      <div className="relative mx-auto w-full max-w-[1600px] overflow-hidden rounded-b-3xl">
        <div className="relative z-10 pb-14">
          <Header isHomePage />

          <div className="container">
            <div className="mt-10 md:mt-18">
              <h1 className="h1 mb-4 max-w-xl text-white">
                {t("booking.buy_ticket_slogan")}
              </h1>

              <p className="sr-only mt-4 max-w-md text-xl text-white sm:not-sr-only md:text-2xl">
                {t("booking.additional_info")}
              </p>
            </div>

            <div className="mt-20 lg:mt-44">
            <SearchTicketForm
              onSubmit={(data) =>
                startTransition(() => updateTicketSearchParams(data))
              }
              isLoading={isSearching}
            />
            </div>
          </div>
        </div>

        <Image
          src={heroBackground.src}
          alt="Description of image"
          fill
          className="!h-1/2 object-cover object-right sm:!h-full"
        />
      </div>

      <section className="section">
        <div className="container">
          <h2 className="h2">{t("planning.title")}</h2>
          <p className="subtitle">{t("planning.subtitle")}</p>

          <div className="relative mt-10 grid gap-4 md:grid-cols-3 xl:gap-8">
            {planningData.map(({ title, description }, index) => (
              <div
                key={index}
                className="flex items-center gap-4 rounded-xl sm:bg-white sm:p-4 sm:shadow-[0_4px_16px_rgba(17,34,17,0.05)]"
              >
                <div className="relative hidden size-28 flex-none overflow-hidden rounded-lg xl:block">
                  <Image
                    src="https://placehold.co/600x400/png"
                    alt="Image"
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex flex-col gap-3">
                  <h3 className="flex items-center gap-2 text-lg font-semibold">
                    <svg viewBox="0 0 20 20" className="fill-yellow size-5">
                      <path d="M10 0a10 10 0 1 0 0 20 10 10 0 0 0 0-20ZM7.3 14.3l-3.6-3.6a1 1 0 0 1 1.4-1.4L8 12.2l6.9-7a1 1 0 0 1 1.4 1.5l-7.6 7.6a1 1 0 0 1-1.4 0Z" />
                    </svg>
                    <span>{t(title)}</span>
                  </h3>
                  <div className="text-text-gray hidden text-sm sm:flex">
                    {t(description)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container !p-0 md:!px-6">
          <div className="relative flex min-h-[90vh] flex-col p-6 2xl:flex-row 2xl:justify-between 2xl:pr-0">
            <div className="absolute top-0 left-0 h-full w-full overflow-hidden md:rounded-xl 2xl:w-2/3">
              <Image
                src={bgChairs.src}
                alt="Image"
                fill
                className="object-leftmd:rounded-xl !h-[30%] min-h-96 object-cover lg:!h-full"
              />
            </div>

            <div className="relative z-10 flex h-full flex-col lg:p-16">
              <div className="max-w-xs">
                <h2 className="h1 text-white">{t("reservation.title")}</h2>
                <p className="text-2xl text-white/90">
                  {t("reservation.subtitle")}: <br />
                  {isLoadingWeeklyTrips || !isWeeklyTripsReady ? (
                    <span className="skeleton rounded-xl inline-block h-6 w-32" />
                  ) : (
                    stationLabel
                  )}
                </p>

                <Button className="mt-8 mb-12" variant="white" asChild>
                  <Link href="/search">{t("reservation.button")}</Link>
                </Button>
              </div>

              <div className="relative mt-80 -ml-28 hidden gap-18 2xl:flex">
                <div className="flex flex-col items-center gap-4">
                  <div className="flex items-center gap-2 text-2xl text-white">
                    <svg viewBox="0 0 15 18" className="size-5 fill-white">
                      <path
                        fillRule="evenodd"
                        d="M7.3.2C3.3.2 0 3.5 0 7.6c0 3 2.7 6 5 8.3l1.3 1.4a1.4 1.4 0 0 0 2 0L9.7 16c2.2-2.3 5-5.2 5-8.3 0-4-3.3-7.4-7.4-7.4Zm0 4.2a2.7 2.7 0 1 1 0 5.4 2.7 2.7 0 0 1 0-5.4Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>
                      {isLoadingWeeklyTrips || !isWeeklyTripsReady ? (
                        <span className="skeleton rounded-xl inline-block h-6 w-20" />
                      ) : (
                        stationLabel.split("-")[0]
                      )}
                    </span>
                  </div>
                  <div className="relative aspect-[5/4] h-[208px] flex-none overflow-hidden rounded-lg border-2 border-white">
                    {(isLoadingWeeklyTrips || !isWeeklyTripsReady) && (
                      <div className="skeleton absolute inset-0 rounded-lg" />
                    )}
                    <StationImage
                      src={weeklyTrips?.metadata?.from_station_image}
                      alt="From Station"
                      skeleton={isLoadingWeeklyTrips || !isWeeklyTripsReady}
                    />

                  </div>
                </div>

                <div className="flex flex-col items-center gap-4">
                  <div className="flex items-center gap-2 text-2xl text-white">
                    <svg viewBox="0 0 15 18" className="size-5 fill-white">
                      <path
                        fillRule="evenodd"
                        d="M7.3.2C3.3.2 0 3.5 0 7.6c0 3 2.7 6 5 8.3l1.3 1.4a1.4 1.4 0 0 0 2 0L9.7 16c2.2-2.3 5-5.2 5-8.3 0-4-3.3-7.4-7.4-7.4Zm0 4.2a2.7 2.7 0 1 1 0 5.4 2.7 2.7 0 0 1 0-5.4Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>
                      {isLoadingWeeklyTrips || !isWeeklyTripsReady ? (
                        <span className="skeleton rounded-full inline-block h-6 w-20" />
                      ) : (
                        stationLabel.split("-")[1]
                      )}
                    </span>
                  </div>
                  <div className="relative aspect-[5/4] h-[208px] flex-none overflow-hidden rounded-lg border-2 border-white">
                    {(isLoadingWeeklyTrips || !isWeeklyTripsReady) && (
                      <div className="skeleton absolute inset-0 rounded-lg" />
                    )}
                    <StationImage
                      src={weeklyTrips?.metadata?.to_station_image}
                      alt="To Station"
                      skeleton={isLoadingWeeklyTrips || !isWeeklyTripsReady}
                    />
                  </div>
                </div>

                <svg
                  viewBox="0 0 116 40"
                  className="absolute top-0 left-1/2 h-10 -translate-x-1/2 fill-white"
                >
                  <path d="M63.3 36.5a1 1 0 0 1 .5 2h-.5c-2.3.7-4.2.8-5.8.2l-.3-.1H57a1 1 0 0 1 .7-1.9h.1l.2.1c1.2.4 2.8.4 5.1-.3h.1Zm7.4-4.7a1 1 0 0 1 2 .7c-.5 1.1-1.1 2.1-2 2.7l-.2.1-2.8 1.6a1 1 0 0 1-.9-1.8l2.7-1.5.2-.1c.4-.3.7-.8 1-1.7Zm-17-3.3a1 1 0 0 1 2 .4c-.4 2.1-.4 3.9 0 5.2l.1.3v.1a1 1 0 0 1-1.8.7V35l-.2-.4c-.5-1.7-.5-3.9 0-6.2Zm18.8-6.2c.5 2.2.8 4.2.8 6a1 1 0 0 1-2 0 21 21 0 0 0-.8-5.5l2-.5Zm-15-3.6a1 1 0 0 1 1.8 1l-.4.7a34 34 0 0 0-2.1 4.7 1 1 0 0 1-2-.7c.7-1.8 1.6-3.8 2.7-5.7ZM2.9 20.9A1 1 0 1 1 4 22.5l-2.4 1.8a1 1 0 0 1-1.2-1.6l2.4-1.8Zm68.5.7a1 1 0 0 1 1.2.7l-2 .5a1 1 0 0 1 .8-1.2Zm-60.5-6.2A1 1 0 0 1 12 17c-1.6 1-3.2 2-4.8 3.2H7a1 1 0 0 1-1-1.7l1.2-.8 3.6-2.4Zm56-2.4a1 1 0 0 1 1.4.3c1.2 1.7 2.2 3.4 3 5.2a1 1 0 0 1-1.9.8c-.7-1.6-1.6-3.3-2.7-4.9a1 1 0 0 1 .2-1.4Zm45 1a1 1 0 0 1 1.3-.1l.6.6 1.6 1.8-1.6 1.3-1.5-1.7-.5-.6a1 1 0 0 1 0-1.4Zm-50.4 2.4a1 1 0 0 1-1.6-1.2l1.6 1.2Zm-1.9-9.7a1 1 0 0 1 1.4-.3l.6.4a25 25 0 0 1 3.6 2.9l.5.5a1 1 0 0 1-.4 1.6c-1.4 1.5-2.7 3-3.8 4.6l-1.6-1.2c1-1.5 2.3-3 3.6-4.4-1-1-2.3-1.9-3.6-2.7a1 1 0 0 1-.3-1.4Zm-40.1 3.7a1 1 0 0 1 .8 1.8l-1.2.6-3.8 2.2a1 1 0 1 1-1-1.7l5-2.9h.2ZM104 7.3a1 1 0 0 1 1.4-.3c1.4 1 2.8 2.2 4.2 3.5l.6.6h.1a1 1 0 0 1-1.4 1.5l-.6-.6a50.8 50.8 0 0 0-4-3.3 1 1 0 0 1-.3-1.4Zm-75.7-1a1 1 0 0 1 .6 1.9l-1.3.5a81 81 0 0 0-4 1.8 1 1 0 0 1-.8-1.8L24 8l4-1.7h.2ZM72 3.9a1 1 0 0 1 1 1.7H73c-1.7 1-3.4 2.2-4.9 3.5a1 1 0 0 1-1.3-1.6C68.4 6.2 70.2 5 72 4Zm-34.3.5.2 1-5.5 1.5h-.1a1 1 0 0 1-.5-2l.7-.1c1.7-.6 3.4-1 5-1.4l.2 1ZM96.4 2c1.6.6 3.2 1.4 4.9 2.3l.7.4v.1a1 1 0 0 1-1 1.7l-.7-.4c-1.6-1-3.1-1.7-4.7-2.3l.4-1 .4-.8ZM57.3 4.6a1 1 0 0 1-.8 1.8l.8-1.8Zm-6-1.7h.2l.8.2c1.8.3 3.4.8 5 1.5l-.4 1-.4.8c-1.4-.6-3-1-4.6-1.4H51v-.1a1 1 0 0 1 .3-2Zm-13.7.5a1 1 0 0 1 .4 2l-.4-2Zm4.7-.7c1.8-.2 3.5-.2 5.2-.2a1 1 0 1 1-.1 2c-1.8 0-3.6 0-5.6.3h-.1a1 1 0 0 1-.2-2h.8ZM76.5 4a1 1 0 0 1-.7-1.8l.7 1.8ZM82 .3a1 1 0 0 1 .3 2l-.8.2c-1.7.3-3.3.8-4.9 1.4l-.7-1.8c1.9-.8 4-1.4 6-1.8h.1Zm13.2 2.2a1 1 0 0 1 1.3-.5l-.8 1.8a1 1 0 0 1-.5-1.3ZM86 0c1.7 0 3.6.2 5.4.5l.8.2h.1a1 1 0 0 1-.4 2h-.1l-.8-.2c-1.7-.3-3.4-.5-5-.5a1 1 0 0 1 0-2Z" />
                </svg>
              </div>
            </div>

            <div
              className="relative z-10 mx-auto w-full lg:max-w-3xl"
              ref={containerRef}
            >
              {isLoadingWeeklyTrips || !isWeeklyTripsReady ? (
                <Card className="gap-4 pb-4 sm:gap-6 sm:pb-6">
                  <CardHeader
                    className="relative rounded-t-xl border bg-[#F9F9F9] p-3 sm:py-6"
                    platinum
                  >
                    <CardTitle className="!w-1/2 text-center text-xl font-normal sm:text-left md:text-2xl">
                      <div className="skeleton rounded-full mx-auto h-6 w-1/2 sm:mx-0" />
                    </CardTitle>
                    <div className="bg-mentol mx-auto mt-3 max-w-max space-x-2 rounded-full px-4 py-2 sm:absolute sm:top-1/2 sm:right-0 sm:mt-0 sm:-translate-y-1/2 sm:rounded-l-full sm:rounded-r-none">
                      <span className="text-xl">🔥</span>
                      <span className="font-semibold md:text-lg">
                        {t("general.nearest_routes")}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="px-2 sm:px-6">
                    <Tabs defaultValue="first" className="items-center">
                      <TabsList>
                        <TabsTrigger value="first">
                          {formatUTC(new Date().toISOString(), { dateFormat: "E, dd MMMM" })?.date}
                        </TabsTrigger>
                      </TabsList>

                      <TabsContent value="first" className="w-full">
                        <ul className="space-y-4">
                          {Array.from({ length: 3 }).map((_, index) => (
                            <li key={index} className="skeleton h-40 rounded-xl" />
                          ))}
                        </ul>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              ) : hasTrips ? (
                <Card className="gap-4 pb-4 sm:gap-6 sm:pb-6">
                  <CardHeader
                    className="relative rounded-t-xl border bg-[#F9F9F9] p-3 sm:py-6"
                    platinum
                  >
                    <CardTitle className="!w-1/2 text-center text-xl font-normal sm:text-left md:text-2xl">
                      {isLoadingWeeklyTrips || !isWeeklyTripsReady ? (
                        <span className="skeleton rounded-xl inline-block h-6 w-32" />
                      ) : (
                        stationLabel
                      )}
                    </CardTitle>
                    <div className="bg-mentol mx-auto mt-3 max-w-max space-x-2 rounded-full px-4 py-2 sm:absolute sm:top-1/2 sm:right-0 sm:mt-0 sm:-translate-y-1/2 sm:rounded-l-full sm:rounded-r-none">
                      <span className="text-xl">🔥</span>
                      <span className="font-semibold md:text-lg">
                        {t("general.nearest_routes")}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="px-2 sm:px-6">
                    <Tabs
                      value={selectedDate || (weeklyTripsEntries[0]?.[0] ?? "")}
                      onValueChange={setSelectedDate}
                      className="items-center"
                    >
                      <TabsList>
                        {weeklyTripsEntries.map(([date]) => (
                          <TabsTrigger key={date} value={date}>
                            {formatUTC(date, { dateFormat: "E, dd MMMM" })?.date}
                          </TabsTrigger>
                        ))}
                      </TabsList>

                      {weeklyTripsEntries.map(([date, trips]) => (
                        <TabsContent key={date} value={date} className="w-full">
                          <ul className="space-y-4">
                            {trips?.map((trip, index) => (
                              <li
                                key={index}
                                className="border-platinum relative rounded-xl border p-3 pb-16 md:px-10 md:py-6"
                              >
                                <div className="flex items-center justify-between gap-8">
                                  <div className="text-2xl font-medium">
                                    {formatCurrency(
                                      getAmountByCurrency(trip?.prices),
                                    )}
                                  </div>

                                  <BookingButton
                                    trip_id={trip?.route_departure?.id}
                                    from_station_id={
                                      weeklyTrips?.metadata?.from_station?.id!
                                    }
                                    to_station_id={
                                      weeklyTrips?.metadata?.to_station?.id!
                                    }
                                    return_trip_id={null}
                                    draft_booking_id={
                                      trip?.route_departure?.draft_booking_id
                                    }
                                  />
                                </div>

                                <div className="my-4 w-full border-b border-dashed md:my-6" />

                                {weeklyTrips && (
                                  <TripRouteDetails
                                    data={{
                                      ...weeklyTrips,
                                      data: Object.values(
                                        weeklyTrips?.data || {},
                                      ).flatMap((dayTrips) => dayTrips),
                                    }}
                                    route={trip?.route_departure}
                                    duration={trip?.duration_minutes}
                                    className="text-[0.75rem]"
                                    showShort={true}
                                  />
                                )}
                              </li>
                            ))}
                          </ul>
                        </TabsContent>
                      ))}
                    </Tabs>

                    <Button asChild className="mt-4">
                      <Link href={searchHref}>
                        {t("action.see_all_routes")}
                        <ChevronRightIcon />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <Card className="gap-4 pb-4 sm:gap-6 sm:pb-6">
                  <CardHeader
                    className="relative rounded-t-xl border bg-[#F9F9F9] p-3 sm:py-6"
                    platinum
                  >
                    <CardTitle className="!w-1/2 text-center text-xl font-normal sm:text-left md:text-2xl">
                      {isLoadingWeeklyTrips || !isWeeklyTripsReady ? (
                        <span className="skeleton rounded-xl inline-block h-6 w-32" />
                      ) : (
                        stationLabel
                      )}
                    </CardTitle>
                    <div className="bg-mentol mx-auto mt-3 max-w-max space-x-2 rounded-full px-4 py-2 sm:absolute sm:top-1/2 sm:right-0 sm:mt-0 sm:-translate-y-1/2 sm:rounded-l-full sm:rounded-r-none">
                      <span className="text-xl">🔥</span>
                      <span className="font-semibold md:text-lg">
                        {t("general.nearest_routes")}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="px-2 py-10 text-center sm:px-6">
                    {t("general.no_weekly_trips")}
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>

      <EmailSubscriptionSection />

      <ReviewsCarouselSection />

      <DiscountSection />

      <FAQSection />
    </>
  );
};