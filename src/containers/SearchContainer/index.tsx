"use client";
import React from "react";
import { FAQSection } from "@/components/sections/FAQ";
import { DiscountSection } from "@/components/sections/Discount";

import { Button } from "@/components/ui/button";
import { TripRouteDetails } from "@/components/shared/TripRouteDetails";
import { SearchTicketForm } from "@/components/shared/SearchTicketForm";
import { useTicketForm } from "@/hooks/useTicketForm";

import type { SearchResponse, TicketFormValues } from "@/types";
import { searchService } from "@/services/search.service";
import { TicketDetailsCollapsible } from "@/components/shared/TicketDetailsCollapsible";
import { toApiDate } from "@/utils/format-date";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { getLocalizedField } from "@/utils/getLocalizedField";
import { useLocale, useTranslations } from "next-intl";
import { getAmountByCurrency } from "@/utils/getAmountByCurrency";
import { useCurrency } from "@/hooks/useCurrency";
import { Label } from "@/components/ui/label";
import { BookingButton } from "@/components/shared/BookingButton";

export const SearchContainer: React.FC = () => {
  const locale = useLocale();
  const t = useTranslations();
  const { formatCurrency } = useCurrency();
  const { updateTicketSearchParams } = useTicketForm();

  const [searchData, setSearchData] = React.useState<SearchResponse>();
  const [searchParams, setSearchParams] = React.useState<TicketFormValues>();
  const [selectedFacilities, setSelectedFacilities] = React.useState<number[]>([]);
  const [selectedDepartureTimes, setSelectedDepartureTimes] = React.useState<string[]>([]);
  const [order, setOrder] = React.useState<"asc" | "desc">("asc");
  const [isLoading, setLoading] = React.useState(false);

  const toggleFacility = (id: number, checked: boolean | string) => {
    setSelectedFacilities((prev) =>
      checked ? [...prev, id] : prev.filter((f) => f !== id),
    );
  };

  const toggleDepartureTime = (time: string, checked: boolean | string) => {
    setSelectedDepartureTimes((prev) =>
      checked ? [...prev, time] : prev.filter((t) => t !== time),
    );
  };

  const fetchData = React.useCallback(
    async (params: TicketFormValues) => {
      setLoading(true);

      const { departure_date, return_date } = params;

      const formattedDepartureDate = toApiDate(departure_date);
      const formattedReturnDate = toApiDate(return_date || "");

      try {
        const result = await searchService.getAll({
          ...params,
          departure_date: String(formattedDepartureDate),
          ...(formattedReturnDate && { return_date: formattedReturnDate }),
          ...(order && { order }),
          ...(selectedFacilities.length && { facilities: selectedFacilities }),
          ...(selectedDepartureTimes.length && {
            departure_time: selectedDepartureTimes,
          }),
        });

        setSearchData(result);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    },
    [order, selectedFacilities, selectedDepartureTimes],
  );

  async function handleSearch(data: TicketFormValues) {
    updateTicketSearchParams(data);
    setSearchParams(data);
    setSelectedFacilities([]);
    setSelectedDepartureTimes([]);
    await fetchData(data);
  }

  React.useEffect(() => {
    if (searchParams) {
      fetchData(searchParams);
    }
  }, [fetchData, searchParams, order, selectedFacilities, selectedDepartureTimes]);

  return (
    <>
      <section className="section">
        <div className="container">
          <div className="mb-10">
            <SearchTicketForm onSubmit={handleSearch} isLoading={isLoading} />
          </div>

          {isLoading ? (
            <div className="mt-8 flex flex-col-reverse gap-8 lg:flex-row">
              <ul className="space-y-4 lg:w-2/3">
                {Array.from({ length: 3 }).map((_, index) => (
                  <li key={index} className="skeleton h-40 rounded-xl" />
                ))}
              </ul>

              <div className="flex-none lg:w-1/3">
                <div className="skeleton h-80 rounded-xl" />
              </div>
            </div>
          ) : (
            <>
              {searchData && (
                <div className="items-center justify-between gap-6 sm:flex">
                  <h1 className="h3">
                    {[
                      getLocalizedField(
                        searchData?.metadata?.from_station,
                        "name",
                        locale,
                      ),
                      getLocalizedField(
                        searchData?.metadata?.to_station,
                        "name",
                        locale,
                      ),
                    ].join(" - ")}
                  </h1>

                  <div className="flex items-center justify-between gap-4">
                    <div className="text-text-gray">{t("$Au fost găsite")}</div>
                    <div className="bg-green rounded-full px-2.5 py-0.5">
                      <span>{searchData?.meta?.total}</span> {t("$bilete")}
                    </div>
                  </div>
                </div>
              )}

              {Boolean(searchData?.data?.length) ? (
                <div className="mt-8 flex flex-col-reverse gap-8 lg:flex-row">
                  <ul className="space-y-4">
                    {searchData?.data?.map((item, index) => {
                      const {
                        route_departure,
                        prices,
                        duration_minutes,
                        type,
                      } = item;

                      return (
                        <li
                          key={index}
                          className="border-platinum rounded-xl border bg-white p-4 md:p-6"
                        >
                          <div className="grid grid-cols-1 items-center justify-between gap-x-8 gap-y-2 sm:grid-cols-2 md:flex">
                            <div className="space-y-1">
                              <div className="text-text-gray bg-back flex max-w-max items-center gap-2 rounded-full px-3 py-1 text-sm">
                                <div className="text-text-gray">
                                  {route_departure?.seats_total}{" "}
                                  {t("$pasageri")}
                                </div>
                                <div className="text-green">
                                  / {route_departure?.seats_available}
                                  {t("$rămase")}
                                </div>
                              </div>

                              <div className="bg-yellow max-w-max rounded-full px-2.5 py-0.5">
                                <span>{t(`trip_type.${type}`)}</span>
                              </div>
                            </div>

                            <div className="sm:ml-auto">
                              <div className="text-2xl font-medium">
                                {formatCurrency(getAmountByCurrency(prices))}
                              </div>
                            </div>

                            <BookingButton
                              trip_id={route_departure?.id}
                              from_station_id={
                                searchData?.metadata?.from_station?.id
                              }
                              to_station_id={
                                searchData?.metadata?.to_station?.id
                              }
                              return_trip_id={null}
                              draft_booking_id={
                                route_departure?.draft_booking_id
                              }
                            />
                          </div>

                          <div className="my-6 w-full border-b border-dashed" />

                          <TripRouteDetails
                            data={searchData}
                            route={route_departure}
                            duration={duration_minutes}
                          />

                          <TicketDetailsCollapsible
                            data={item}
                            route={route_departure}
                          />
                        </li>
                      );
                    })}
                  </ul>

                  {/* Filters */}
                  <div className="flex-none lg:w-1/3">
                    <Card>
                      <CardHeader className="border-platinum relative -mt-6 gap-0 rounded-t-xl border bg-[#F9F9F9] py-6">
                        <CardTitle className="h4">
                          {t("$Filtru bilete")} 🔎
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="divide-card divide-y">
                          <div className="">
                          <div className="mb-4 font-semibold">
                              {t("$Filtrează după")}:
                            </div>
                            <div>
                              <RadioGroup value={order} onValueChange={(v) => setOrder(v as "asc" | "desc")}> 
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="asc" id="order-asc" />
                                  <Label htmlFor="order-asc">
                                    {t("$Dată: crescător")}
                                  </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="desc" id="order-desc" />
                                  <Label htmlFor="order-desc">
                                    {t("$Dată: descrescător")}
                                  </Label>
                                </div>
                              </RadioGroup>
                            </div>
                          </div>

                          {Boolean(searchData?.filters?.facilities?.length) && (
                            <div className="pt-4">
                              <div className="mb-4 font-semibold">
                                {t("$Facilități")}:
                              </div>
                              <div className="space-y-2">
                                {searchData?.filters?.facilities?.map((f) => (
                                  <div key={f.id} className="flex items-center space-x-2">
                                    <Checkbox
                                      id={`facility-${f.id}`}
                                      checked={selectedFacilities.includes(f.id)}
                                      onCheckedChange={(checked) => toggleFacility(f.id, checked)}
                                    />
                                    <Label htmlFor={`facility-${f.id}`}>{getLocalizedField(f, "name", locale)}</Label>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {Boolean(searchData?.filters?.departure_times?.length) && (
                            <div className="pt-4">
                              <div className="mb-4 font-semibold">
                                {t("$Ora plecării")}:
                              </div>
                              <div className="space-y-2">
                                {searchData?.filters?.departure_times?.map((time, index) => (
                                  <div key={index} className="flex items-center space-x-2">
                                    <Checkbox
                                      id={`dtime-${index}`}
                                      checked={selectedDepartureTimes.includes(time)}
                                      onCheckedChange={(checked) => toggleDepartureTime(time, checked)}
                                    />
                                    <Label htmlFor={`dtime-${index}`}>{time}</Label>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ) : (
                <Card className="mt-8 border">
                  <CardContent>
                    <div className="flex flex-col items-center gap-10">
                      <div className="flex flex-col items-center gap-4 text-center md:flex-row">
                        <svg
                          className="size-10 flex-none fill-black"
                          viewBox="0 0 41 34"
                        >
                          <path
                            d="M32.7 17.6a8 8 0 1 1 0 16 8 8 0 0 1 0-16Zm-2.4 4.2a1.1 1.1 0 0 0-.9 2l2 2-2 2a1.1 1.1 0 0 0 .8 1.9 1.1 1.1 0 0 0 .9-.4l1.8-1.9 1.8 2a1.1 1.1 0 0 0 1.4.1 1.1 1.1 0 0 0 .2-1.7l-1.9-2 2-2a1.1 1.1 0 0 0-1.7-1.6L32.9 24l-1.8-2a1.1 1.1 0 0 0-.8-.3Z"
                            fillRule="evenodd"
                            clipRule="evenodd"
                          />
                          <path d="M9.5 22.5a1.1 1.1 0 0 1 .8 2l-8.4 8.3a1.1 1.1 0 0 1-1.6-1.6L8.6 23a1.1 1.1 0 0 1 .9-.4Z" />
                          <path d="M17.5.3a13.1 13.1 0 0 1 15.6 14.6 1.1 1.1 0 0 1-2.2-.3v-1.5a10.8 10.8 0 1 0-9 10.7 1.2 1.2 0 0 1 .3 2.3l-2 .1a13.1 13.1 0 0 1-2.7-26Z" />
                        </svg>

                        <div className="h4">
                          {t(
                            "$Nu a fost găsit nici un bilet pentru această rută!",
                          )}
                        </div>
                      </div>

                      <Button>{t("$Modifică căutarea")}</Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </>
          )}
        </div>
      </section>

      <DiscountSection />
      <FAQSection />
    </>
  );
};
