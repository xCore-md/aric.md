"use client";
import React from "react";
import {
  Ban,
  ChevronRightIcon,
  CreditCard,
  Download,
  MoveRight,
  User,
  Wallet,
} from "lucide-react";
import { useLocale, useTranslations } from "use-intl";
import { PRIVATE_LINK, QUERY_KEYS } from "@/utils/constants";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import logo from "@/assets/images/logo-black.svg";
import { useQuery } from "@tanstack/react-query";
import { usePagination } from "@/hooks/usePagination";
import { PaginationUI } from "@/components/shared/pagination-ui";
import { TicketStatusBadge } from "@/components/shared/TicketStatusBadge";
import { useCurrency } from "@/hooks/useCurrency";
import { getAmountByCurrency } from "@/utils/getAmountByCurrency";
import { bookingService } from "@/services/booking.service";
import { getLocalizedField } from "@/utils/getLocalizedField";
import { useFormatUTCToLocal } from "@/hooks/useFormatUTCToLocal ";
import { DownloadTicketButton } from "@/components/shared/DownloadTicketButton";
import { BookingStatusEnum } from "@/types";

export const TicketsContainer: React.FC = () => {
  const t = useTranslations();
  const locale = useLocale();
  const { formatUTC } = useFormatUTCToLocal();
  const { formatCurrency } = useCurrency();
  const { per_page, page, updateLimit, updatePage } = usePagination();

  const { data: bookings, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.booking, page, per_page],
    queryFn: () => bookingService.getAll({ page, per_page }),
  });

  return (
    <>
      <div className="py-8">
        <h3 className="h3 !mb-0">{t(PRIVATE_LINK.tickets.label)}</h3>
      </div>

      {isLoading
        ? Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="skeleton h-40" />
          ))
        : bookings?.data?.map(
            (booking) =>
              booking?.status !== BookingStatusEnum.Draft && (
                <div key={booking.id} className="mb-16">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="border-platinum bg-card -mb-px flex h-full items-center gap-4 rounded-t-xl border-x border-t p-4 text-lg lg:max-w-max">
                      <div className="font-semibold">
                        <div>
                          {getLocalizedField(
                            booking?.station_from!,
                            "name",
                            locale,
                          )}
                        </div>

                        <div className="text-text-gray text-base font-normal">
                          {
                            formatUTC(booking?.departure_datetime, {
                              dateFormat: "d MMMM yyyy, HH:mm",
                            })?.date
                          }
                        </div>
                      </div>

                      <MoveRight className="text-blue flex-none" />

                      <div className="font-semibold">
                        <div>
                          {getLocalizedField(
                            booking?.station_to!,
                            "name",
                            locale,
                          )}
                        </div>

                        <div className="text-text-gray text-base font-normal">
                          {
                            formatUTC(booking?.arrival_datetime, {
                              dateFormat: "d MMMM yyyy, HH:mm",
                            })?.date
                          }
                        </div>
                      </div>
                    </div>

                    {booking?.tickets?.length > 1 && (
                      <div className="border-platinum bg-card flex flex-wrap gap-4 border-x border-t p-4 lg:flex-row-reverse lg:border-none lg:bg-transparent lg:p-0">
                        <Button>
                          Achită toate
                          <ChevronRightIcon />
                        </Button>

                        <DownloadTicketButton
                          mode="booking"
                          variant="reverse"
                          bookingId={booking?.id}
                        />

                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="link">Anulează biletele</Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader className="sr-only">
                              <DialogTitle />
                              <DialogDescription />
                            </DialogHeader>

                            <div className="mx-auto flex max-w-3xl flex-col items-center text-center md:p-16">
                              <Image
                                src={logo.src}
                                alt="Aric.md"
                                width={logo.width}
                                height={logo.height}
                                className="mb-12 w-24"
                              />

                              <div className="h2">
                                Doriți să anulați biletul?
                              </div>

                              <div className="text-text-gray mb-12 text-lg">
                                În funcție de timpul rămas până la plecare,
                                există o taxă de reținere pentru bilet – o sumă
                                care este reținută de la pasager în cazul
                                returnării biletului.
                              </div>

                              <div className="bg-back mb-6 grid w-full grid-cols-2 rounded-3xl px-6 py-4">
                                <div className="text-left">
                                  <div className="font-semibold">
                                    Nr. Invoice
                                  </div>
                                  <div className="text-text-gray">
                                    INV567489240UI
                                  </div>
                                </div>

                                <div className="text-right">
                                  <div className="font-semibold">
                                    Metoda de plată
                                  </div>
                                  <div className="text-text-gray">MAIB</div>
                                </div>
                              </div>

                              <Button size="lg" className="w-full">
                                Anulează biletul
                                <ChevronRightIcon />
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    )}
                  </div>

                  <Card className="ring-platinum rounded-tl-none rounded-tr-none ring ring-inset lg:rounded-tr-xl">
                    <CardContent className="space-y-4">
                      {booking?.tickets?.map((ticket) => (
                        <div key={ticket.id} className="space-y-4">
                          <div className="bg-back flex flex-wrap items-center justify-between gap-6 rounded-xl p-4 lg:flex-nowrap">
                            <div className="space-y-1">
                              <div className="text-text-gray text-sm">
                                ID #{ticket?.ticket_code}
                              </div>
                              <TicketStatusBadge status={ticket?.status} />
                            </div>

                            <Separator
                              orientation="vertical"
                              className="hidden !h-14 md:block"
                            />

                            <div className="xs:flex-row flex flex-col gap-2 sm:gap-8">
                              <div className="flex flex-none gap-4">
                                <div className="flex size-9 items-center justify-center rounded-md border bg-white">
                                  <User />
                                </div>
                                <div>
                                  <div className="text-text-gray text-xs">
                                    Pasager
                                  </div>
                                  <div className="-mt-1 text-lg font-semibold">
                                    {ticket?.passenger_name}
                                  </div>
                                </div>
                              </div>

                              <div className="flex flex-none gap-4">
                                <div className="flex size-9 items-center justify-center rounded-md border bg-white">
                                  <Wallet />
                                </div>
                                <div>
                                  <div className="text-text-gray text-xs">
                                    Preț
                                  </div>
                                  <div className="-mt-1 text-lg font-semibold">
                                    {formatCurrency(
                                      getAmountByCurrency(ticket),
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="ml-auto flex flex-wrap gap-4 sm:flex-nowrap lg:flex-col xl:flex-row">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <Ban />
                                    Anulează
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader className="sr-only">
                                    <DialogTitle />
                                    <DialogDescription />
                                  </DialogHeader>

                                  <div className="mx-auto flex max-w-3xl flex-col items-center text-center md:p-16">
                                    <Image
                                      src={logo.src}
                                      alt="Aric.md"
                                      width={logo.width}
                                      height={logo.height}
                                      className="mb-12 w-24"
                                    />

                                    <div className="h2">
                                      Doriți să anulați biletul?
                                    </div>

                                    <div className="text-text-gray mb-12 text-lg">
                                      În funcție de timpul rămas până la
                                      plecare, există o taxă de reținere pentru
                                      bilet – o sumă care este reținută de la
                                      pasager în cazul returnării biletului.
                                    </div>

                                    <div className="bg-back mb-6 grid w-full grid-cols-2 rounded-3xl px-6 py-4">
                                      <div className="text-left">
                                        <div className="font-semibold">
                                          Nr. Invoice
                                        </div>
                                        <div className="text-text-gray">
                                          INV567489240UI
                                        </div>
                                      </div>

                                      <div className="text-right">
                                        <div className="font-semibold">
                                          Metoda de plată
                                        </div>
                                        <div className="text-text-gray">
                                          MAIB
                                        </div>
                                      </div>
                                    </div>

                                    <Button size="lg" className="w-full">
                                      Anulează biletul
                                      <ChevronRightIcon />
                                    </Button>
                                  </div>
                                </DialogContent>
                              </Dialog>

                              <DownloadTicketButton
                                mode="ticket"
                                ticketId={ticket.id}
                                size="sm"
                                variant="outline"
                              />

                              <Button size="sm" variant="reverse">
                                Achită
                                <ChevronRightIcon />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              ),
          )}

      <PaginationUI
        totalItems={bookings?.meta?.total}
        page={page}
        perPage={per_page}
        onPageChange={updatePage}
        onPageSizeChange={updateLimit}
      />
    </>
  );
};

{
  /* <div key={ticket.id} className="space-y-4">
<div className="bg-back flex flex-wrap items-center justify-between gap-6 rounded-xl p-6 lg:flex-nowrap">
  <div>
    <div className="text-text-gray text-sm">
      ID #{ticket?.ticket_code}
    </div>
    <TicketStatusBadge status={ticket?.status} />
  </div>

  <Separator
    orientation="vertical"
    className="hidden !h-8 sm:block md:!h-14"
  />

  <div className="space-y-4">
    <div className="flex items-center gap-4">
      <div>
        <div className="text-text-gray mb-2">Chișinău</div>
        <div className="font-semibold">02 Mai 2025</div>
        <div>12:00 pm</div>
      </div>

      <MoveRight />

      <div>
        <div className="text-text-gray mb-2">Chișinău</div>
        <div className="font-semibold">02 Mai 2025</div>
        <div>12:00 pm</div>
      </div>
    </div>

    <div className="flex items-center gap-4">
      <div>
        <div className="font-semibold">02 Mai 2025</div>
        <div>12:00 pm</div>
      </div>

      <MoveRight />

      <div>
        <div className="font-semibold">02 Mai 2025</div>
        <div>12:00 pm</div>
      </div>
    </div>
  </div>

  <Separator
    orientation="vertical"
    className="hidden !h-14 lg:block"
  />

  <div className="xs:flex-row flex flex-col gap-2 sm:gap-8">
    <div className="flex flex-none gap-4">
      <div className="flex size-9 items-center justify-center rounded-md border bg-white">
        <User />
      </div>
      <div>
        <div className="text-text-gray text-xs">
          Pasageri
        </div>
        <div className="-mt-1 text-lg font-semibold">1</div>
      </div>
    </div>

    <div className="flex flex-none gap-4">
      <div className="flex size-9 items-center justify-center rounded-md border bg-white">
        <Wallet />
      </div>
      <div>
        <div className="text-text-gray text-xs">Preț</div>
        <div className="-mt-1 text-lg font-semibold">
          {formatCurrency(getAmountByCurrency(ticket))}
        </div>
      </div>
    </div>
  </div>

  <Separator
    orientation="vertical"
    className="hidden !h-14 md:block"
  />

  <div className="flex flex-wrap gap-4 sm:flex-nowrap lg:flex-col xl:flex-row">
    <Button variant="reverse">Descarcă bilet</Button>

    <Button>
      Achită
      <ChevronRightIcon />
    </Button>

    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link">Anulează</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="sr-only">
          <DialogTitle />
          <DialogDescription />
        </DialogHeader>

        <div className="mx-auto flex max-w-3xl flex-col items-center text-center md:p-16">
          <Image
            src={logo.src}
            alt="Aric.md"
            width={logo.width}
            height={logo.height}
            className="mb-12 w-24"
          />

          <div className="h2">
            Doriți să anulați biletul?
          </div>

          <div className="text-text-gray mb-12 text-lg">
            În funcție de timpul rămas până la plecare,
            există o taxă de reținere pentru bilet – o sumă
            care este reținută de la pasager în cazul
            returnării biletului.
          </div>

          <div className="bg-back mb-6 grid w-full grid-cols-2 rounded-3xl px-6 py-4">
            <div className="text-left">
              <div className="font-semibold">
                Nr. Invoice
              </div>
              <div className="text-text-gray">
                INV567489240UI
              </div>
            </div>

            <div className="text-right">
              <div className="font-semibold">
                Metoda de plată
              </div>
              <div className="text-text-gray">MAIB</div>
            </div>
          </div>

          <Button size="lg" className="w-full">
            Anulează biletul
            <ChevronRightIcon />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  </div>
</div>
</div> */
}
