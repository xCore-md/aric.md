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
import { Label } from "@radix-ui/react-label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { getLocalizedField } from "@/utils/getLocalizedField";
import { useLocale } from "next-intl";

export const SearchContainer: React.FC = () => {
  const locale = useLocale();
  const { updateTicketSearchParams } = useTicketForm();
  const [searchData, setSearchData] = React.useState<SearchResponse>();
  const [isLoading, setLoading] = React.useState(false);

  async function handleSearch(data: TicketFormValues) {
    updateTicketSearchParams(data);
    setLoading(true);

    const { departure_date, return_date } = data;

    const formattedDepartureDate = toApiDate(departure_date);
    const formattedReturnDate = toApiDate(return_date || "");

    try {
      const result = await searchService.getAll({
        ...data,
        departure_date: String(formattedDepartureDate),
        ...(formattedReturnDate && { return_date: formattedReturnDate }),
      });

      setSearchData(result);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  console.log("🔍 search data:", searchData);

  return (
    <>
      <section className="section">
        <div className="container">
          <div className="mb-10">
            <SearchTicketForm onSubmit={handleSearch} isLoading={isLoading} />
          </div>

          {isLoading ? (
            <div className="flex justify-center">
              <div className="loader" />
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
                    <div className="text-text-gray">Au fost găsite</div>
                    <div className="bg-green rounded-full px-2.5 py-0.5">
                      <span>{searchData?.meta?.total}</span> bilete
                    </div>
                  </div>
                </div>
              )}

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
                        Nu a fost găsit nici un bilet pentru această rută!
                      </div>
                    </div>

                    <Button>Modifică căutarea</Button>
                  </div>
                </CardContent>
              </Card>

              <div className="mt-8 flex flex-col-reverse gap-8 lg:flex-row">
                <ul className="space-y-4">
                  {searchData?.data?.map((item, index) => {
                    const { route_departure, prices, duration_minutes } = item;

                    return (
                      <li
                        key={index}
                        className="border-platinum rounded-xl border bg-white p-4 md:px-10 md:py-6"
                      >
                        <div className="grid grid-cols-1 items-center justify-between gap-x-8 gap-y-2 sm:grid-cols-2 md:flex">
                          <div className="text-text-gray bg-back flex max-w-max items-center gap-2 rounded-full px-3 py-1 text-sm">
                            <div className="text-text-gray">
                              {route_departure?.seats_total} pasageri
                            </div>
                            <div className="text-green">
                              / {route_departure?.seats_available} rămase
                            </div>
                          </div>

                          <div className="sm:ml-auto">
                            <div className="text-2xl font-medium">
                              {prices?.price_mdl} MDL
                            </div>

                            <div className="text-text-gray flex items-center justify-end gap-2 text-sm">
                              <svg
                                viewBox="0 0 36 36"
                                className="size-4 flex-none"
                              >
                                <path
                                  fill="#005BBB"
                                  d="M32 5H4a4 4 0 0 0-4 4v9h36V9a4 4 0 0 0-4-4z"
                                />
                                <path
                                  fill="#FFD500"
                                  d="M36 27a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4v-9h36v9z"
                                />
                              </svg>
                              <div>{prices?.price_uah} UAH</div>
                            </div>
                          </div>

                          <Button variant="reverse" className="col-span-full">
                            Rezervează
                          </Button>
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
                      <CardTitle className="h4">Filtru bilete 🔎</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="divide-card divide-y">
                        <div className="">
                          <div className="mb-4 font-semibold">
                            Filtrează după:
                          </div>
                          <div className="">
                            <RadioGroup defaultValue="option-one">
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem
                                  value="option-one"
                                  id="option-one"
                                />
                                <Label htmlFor="option-one">
                                  Dată: crescător
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem
                                  value="option-two"
                                  id="option-two"
                                />
                                <Label htmlFor="option-two">
                                  Dată: descrescător
                                </Label>
                              </div>
                            </RadioGroup>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      <DiscountSection />
      <FAQSection />
    </>
  );
};
