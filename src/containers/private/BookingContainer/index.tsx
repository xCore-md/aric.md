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

export const BookingContainer: React.FC<{
  message: string;
}> = ({ message }) => {
  const t = useTranslations();
  const locale = useLocale();
  const { formatUTC } = useFormatUTCToLocal();
  const { per_page, page, updateLimit, updatePage } = usePagination();

  const { data: drafts, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.drafts, page, per_page],
    queryFn: () => bookingService.getDrafts({ page, per_page }),
  });

  if (message === "success") {
    return (
      <Card className="ring-platinum ring ring-inset">
        <CardContent className="py-10">
          <svg viewBox="0 0 80 80" className="fill-green mx-auto mb-6 size-20">
            <path d="M40 0a40 40 0 1 0 40 40A40.042 40.042 0 0 0 40 0Zm17.562 32.946L36.023 54.485a3.077 3.077 0 0 1-4.354 0l-9.23-9.231a3.078 3.078 0 1 1 4.353-4.354l7.054 7.058 19.362-19.366a3.08 3.08 0 0 1 5.255 2.177 3.08 3.08 0 0 1-.901 2.177Z" />
          </svg>

          <div className="h3 text-center">
            Plata dumneavoastră a fost efectuată cu succes!
          </div>

          <div className="mt-12">
            <div className="mx-auto w-full max-w-3xl space-y-6 rounded-2xl border border-dashed px-16 py-8 shadow-xl shadow-black/5">
              <div className="h4">{t("$Bilet ID")} 07564</div>

              <div className="bg-back grid grid-cols-2 rounded-3xl px-6 py-4">
                <div className="">
                  <div className="font-semibold">{t("$Nr Invoice")}</div>
                  <div className="text-text-gray">INV567489240UI</div>
                </div>

                <div className="text-right">
                  <div className="font-semibold">{t("$Metoda de plată")}</div>
                  <div className="text-text-gray">MAIB</div>
                </div>
              </div>

              <div className="bg-back grid grid-cols-2 rounded-3xl px-6 py-4">
                <div className="">
                  <div className="font-semibold">{t("$Nr Invoice")}</div>
                  <div className="text-text-gray">INV567489240UI</div>
                </div>

                <div className="text-right">
                  <div className="font-semibold">{t("$Metoda de plată")}</div>
                  <div className="text-text-gray">MAIB</div>
                </div>
              </div>

              <div className="flex items-center justify-between gap-10 border-t pt-6">
                <Button asChild><Link href="/tickets">{t("$Vezi biletele")}</Link></Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (message === "error") {
    return (
      <Card className="ring-platinum ring ring-inset">
        <CardContent className="py-10">
          <svg viewBox="0 0 80 80" className="fill-red mx-auto mb-6 size-20">
            <path
              d="M40 0C17.909 0 0 17.909 0 40s17.909 40 40 40 40-17.909 40-40S62.091 0 40 0ZM25.172 25.172a4 4 0 0 1 5.656 0L40 34.343l9.172-9.171a4 4 0 1 1 5.656 5.656L45.657 40l9.171 9.172a4 4 0 0 1-5.656 5.656L40 45.657l-9.172 9.171a4 4 0 0 1-5.656-5.656L34.343 40l-9.171-9.172a4 4 0 0 1 0-5.656Z"
              clipRule="evenodd"
              fillRule="evenodd"
            />
          </svg>

          <div className="h3 text-center">
            Plata dumneavoastră a eșuat.
            <br /> Vă rugăm să încercați din nou.
          </div>

          <div className="mx-auto mt-12 max-w-2xl text-center text-2xl">
            Vă rugăm să verificați datele introduse sau să încercați din nou.
            Dacă problema persistă, contactați-ne pentru asistență.
          </div>
        </CardContent>
      </Card>
    );
  }

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
