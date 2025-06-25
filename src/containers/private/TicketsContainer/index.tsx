"use client";
import React from "react";
import { ChevronRightIcon, MoveRight, User, Wallet } from "lucide-react";
import { useTranslations } from "use-intl";
import { PRIVATE_LINK, QUERY_KEYS } from "@/utils/constants";
import { Card, CardContent } from "@/components/ui/card";
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
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { usePagination } from "@/hooks/usePagination";
import { ticketService } from "@/services/ticket.service";
import { PaginationUI } from "@/components/shared/pagination-ui";
import { bookingService } from "@/services/booking.service";

export const TicketsContainer: React.FC = () => {
  const queryClient = useQueryClient();
  const t = useTranslations();
  // const { per_page, page, updateLimit, updatePage } = usePagination();

  // const { data: tickets, isLoading } = useQuery({
  //   queryKey: [QUERY_KEYS.tickets, page, per_page],
  //   queryFn: () => ticketService.getAll({ page, per_page }),
  // });

  const { per_page, page, updateLimit, updatePage } = usePagination();

  const { data: tickets, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.tickets, page, per_page],
    queryFn: () => ticketService.getAll({ page, per_page }),
  });

  console.log({ tickets });

  return (
    <>
      <div className="py-8">
        <h3 className="h3 !mb-0">{t(PRIVATE_LINK.tickets.label)}</h3>
      </div>

      {isLoading ? (
        Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="skeleton h-56" />
        ))
      ) : (
        <>
          <Card className="ring-platinum p-1 ring ring-inset sm:py-4">
            <CardContent className="space-y-4 p-1 sm:px-4">
              {tickets?.data?.map((ticket) => (
                <div key={ticket.id} className="space-y-4">
                  <div className="bg-back flex flex-wrap items-center justify-between gap-6 rounded-xl p-6 lg:flex-nowrap">
                    <div className="">
                      <div className="text-text-gray text-sm">ID #0234</div>
                      <div className="bg-yellow max-w-max rounded-full px-2.5">
                        {ticket?.status}
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
                          <div className="-mt-1 text-lg font-semibold">
                            120 MDL
                          </div>
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

                            <div className="h2">Doriți să anulați biletul?</div>

                            <div className="text-text-gray mb-12 text-lg">
                              În funcție de timpul rămas până la plecare, există
                              o taxă de reținere pentru bilet – o sumă care este
                              reținută de la pasager în cazul returnării
                              biletului.
                            </div>

                            <div className="bg-back mb-6 grid w-full grid-cols-2 rounded-3xl px-6 py-4">
                              <div className="text-left">
                                <div className="font-semibold">Nr. Invoice</div>
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
                </div>
              ))}
            </CardContent>
          </Card>

          <PaginationUI
            totalItems={tickets?.meta?.total}
            page={page}
            perPage={per_page}
            onPageChange={updatePage}
            onPageSizeChange={updateLimit}
          />
        </>
      )}
    </>
  );
};
