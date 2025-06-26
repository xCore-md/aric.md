"use client";
import { PaginationUI } from "@/components/shared/pagination-ui";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useFormatUTCToLocal } from "@/hooks/useFormatUTCToLocal ";
import { usePagination } from "@/hooks/usePagination";
import { Link } from "@/i18n/navigation";
import { bookingService } from "@/services/booking.service";
import { QUERY_KEYS } from "@/utils/constants";
import { getLocalizedField } from "@/utils/getLocalizedField";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, TriangleAlert } from "lucide-react";
import React from "react";
import { useLocale, useTranslations } from "use-intl";

export const BookingContainer: React.FC = () => {
  const t = useTranslations();
  const locale = useLocale();
  const { formatUTC } = useFormatUTCToLocal();

  const { per_page, page, updateLimit, updatePage } = usePagination();

  const { data: drafts, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.drafts, page, per_page],
    queryFn: () => bookingService.getDrafts({ page, per_page }),
  });

  console.log(!drafts?.data?.length);

  return (
    <>
      {!isLoading && drafts?.data?.length === 0 ? (
        <Card className="mt-8 border">
          <CardContent>
            <div className="flex flex-col items-center gap-10">
              <div className="flex flex-col items-center gap-4 text-center md:flex-row">
                <TriangleAlert />
                <div className="h4">
                  {t("$Nu a fost găsit nici o rezervare!")}
                </div>
              </div>

              <Button asChild>
                <Link href="/search">{t("$Căută bilet")}</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="py-8">
            <h3 className="h3 !mb-0">{t("$Rezervări nefinalizate")}</h3>
          </div>

          <Card className="ring-platinum p-1 ring ring-inset sm:py-4">
            <CardContent>
              <table className="table">
                <thead className="thead hidden lg:table-header-group [&_th]:first:!pl-4">
                  <tr>
                    <th>{t("booking.departure_city")}</th>
                    <th>{t("booking.arrival_city")}</th>
                    <th>{t("$Data creării")}</th>
                    <th />
                  </tr>
                </thead>
                <tbody className="tbody lg:table-row-group [&_td]:first:!pl-4">
                  {isLoading ? (
                    Array.from({ length: 5 }).map((_, index) => (
                      <tr
                        key={index}
                        className="relative h-16 rounded-xl lg:table-row lg:rounded-none"
                      >
                        <td colSpan={6} className="skeleton lg:table-cell" />
                      </tr>
                    ))
                  ) : (
                    <>
                      {drafts?.data?.map((draft) => (
                        <tr
                          key={draft?.id}
                          className="mb-4 block rounded-xl lg:table-row lg:rounded-none"
                        >
                          <td className="flex flex-col justify-between px-4 lg:table-cell lg:px-0">
                            <span className="text-text-gray w-full max-w-36 text-sm font-normal lg:hidden">
                              {t("booking.departure_city")}
                            </span>

                            <div>
                              <div>
                                {getLocalizedField(
                                  draft?.station_from!,
                                  "name",
                                  locale,
                                )}
                              </div>

                              <div className="text-text-gray text-sm">
                                {getLocalizedField(
                                  draft?.station_from!,
                                  "address",
                                  locale,
                                )}
                              </div>
                            </div>
                          </td>

                          <td className="flex flex-col justify-between px-4 lg:table-cell lg:px-0">
                            <span className="text-text-gray w-full max-w-36 text-sm font-normal lg:hidden">
                              {t("booking.arrival_city")}
                            </span>

                            <div>
                              <div>
                                {getLocalizedField(
                                  draft?.station_to!,
                                  "name",
                                  locale,
                                )}
                              </div>

                              <div className="text-text-gray text-sm">
                                {getLocalizedField(
                                  draft?.station_to!,
                                  "address",
                                  locale,
                                )}
                              </div>
                            </div>
                          </td>

                          <td className="flex flex-col justify-between px-4 lg:table-cell lg:px-0">
                            <span className="text-text-gray w-full max-w-36 text-sm font-normal lg:hidden">
                              {t("$Data creării")}
                            </span>

                            <div>{formatUTC(draft?.created_at)?.date}</div>
                          </td>

                          <td className="px-4 text-right lg:table-cell">
                            <Button variant="reverse" asChild>
                              <Link href={`/booking/${draft.id}`}>
                                {t("$Continuă rezervarea")}
                                <ArrowRight />
                              </Link>
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </>
                  )}
                </tbody>
              </table>
            </CardContent>
          </Card>

          <div className="mt-6">
            <PaginationUI
              totalItems={drafts?.meta?.total}
              page={page}
              perPage={per_page}
              onPageChange={updatePage}
              onPageSizeChange={updateLimit}
            />
          </div>
        </>
      )}
    </>
  );
};
