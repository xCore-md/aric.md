"use client";
import React from "react";
import { Ban, ChevronRightIcon, MoveRight, User, Wallet } from "lucide-react";
import { useLocale, useTranslations } from "use-intl";
import { PRIVATE_LINK, QUERY_KEYS, RECAPTCHA_SITE_KEY } from "@/utils/constants";
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
import { useQuery } from "@tanstack/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usePagination } from "@/hooks/usePagination";
import { PaginationUI } from "@/components/shared/pagination-ui";
import { TicketStatusBadge } from "@/components/shared/TicketStatusBadge";
import { useCurrency } from "@/hooks/useCurrency";
import { getAmountByCurrency } from "@/utils/getAmountByCurrency";
import { bookingService } from "@/services/booking.service";
import { paymentService } from "@/services/payment.service";
import { getLocalizedField } from "@/utils/getLocalizedField";
import { useFormatUTCToLocal } from "@/hooks/useFormatUTCToLocal ";
import { DownloadTicketButton } from "@/components/shared/DownloadTicketButton";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { toast } from "sonner";
import { BookingStatusEnum } from "@/types";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Script from "next/script";
import { Link } from "@/i18n/navigation";
import logoMaib from "@/assets/images/bank/maib.svg";

export const TicketsContainer: React.FC = () => {
  const t = useTranslations();
  const locale = useLocale();
  const { formatUTC } = useFormatUTCToLocal();
  const { formatCurrency } = useCurrency();
  const { per_page, page, updateLimit, updatePage } = usePagination({
    defaultLimit: 5,
  });
  const queryClient = useQueryClient();

  const [openBookingId, setOpenBookingId] = React.useState<number | null>(null);
  const [openTicketId, setOpenTicketId] = React.useState<number | null>(null);
  const [payBookingId, setPayBookingId] = React.useState<number | null>(null);
  const [payTicketId, setPayTicketId] = React.useState<number | null>(null);

  const bookingRefund = useMutation({
    mutationFn: paymentService.refundBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.booking] });
      toast.success("Cancelled");
      setOpenBookingId(null);
    },
    onError: () => toast.error("Error"),
  });

  const ticketRefund = useMutation({
    mutationFn: paymentService.refundTicket,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.booking] });
      toast.success("Cancelled");
      setOpenTicketId(null);
    },
    onError: () => toast.error("Error"),
  });

  const { data: bookings, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.booking, page, per_page],
    queryFn: () => bookingService.getAll({ page, per_page }),
  });

  const PayForm: React.FC<{
    id: number;
    mode: "ticket" | "booking" | "unpaid";
    onClose: () => void;
  }> = ({ id, mode, onClose }) => {
    const [consent, setConsent] = React.useState(false);
    const [url, setUrl] = React.useState<string | null>(null);

    const payMutation = useMutation({
      mutationFn: async () => {
        const token = await window.grecaptcha.execute(RECAPTCHA_SITE_KEY, {
          action: "payment",
        });
        const payload = { gateway: "maib", recaptcha_token: token };
        if (mode === "ticket") return paymentService.payTicket(id, payload);
        if (mode === "booking") return paymentService.payBooking(id, payload);
        return paymentService.payUnpaidBooking(id, payload);
      },
      onSuccess: (data) => {
        const redirect = (data as any).redirect_url as string | undefined;
        if (redirect) setUrl(redirect);
        else onClose();
      },
      onError: () => toast.error("Error"),
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      payMutation.mutate();
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-6">
        <Script src={`https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`} strategy="lazyOnload" />
        <div className="space-y-4">
          <div className="text-lg font-semibold">
            {t("$Alegeți o poartă de plată")}:
          </div>
          <RadioGroup defaultValue="maib">
            <div className="flex flex-wrap gap-6">
              <RadioGroupItem
                value="maib"
                id={`maib-${id}`}
                className="sr-only data-[state=checked]:[&+label]:shadow data-[state=checked]:[&+label]:ring-2"
              />
              <label
                htmlFor={`maib-${id}`}
                className="bg-back ring-blue shadow-blue/10 flex h-14 items-center gap-2 rounded-full p-3 font-bold"
              >
                <div className="relative h-full w-28 flex-none overflow-hidden rounded-full">
                  <Image src={logoMaib.src} alt="MAIB" fill className="object-contain" />
                </div>
              </label>
            </div>
          </RadioGroup>
        </div>

        <div className="flex gap-4 border-t pt-6">
          <Checkbox checked={consent} onCheckedChange={(v) => setConsent(Boolean(v))} />
          <div className="text-text-gray -mt-0.5">
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
          </div>
        </div>

        {url ? (
          <Button asChild size="lg" className="w-full">
            <a href={url} target="_blank" rel="noopener noreferrer">
              {t("$Achită")}
            </a>
          </Button>
        ) : (
          <Button type="submit" size="lg" className="w-full" disabled={payMutation.isPending || !consent}>
            {payMutation.isPending ? (
              <>
                {t("$Формирование")}
                <LoadingSpinner className="ml-2" />
              </>
            ) : (
              t("$Сформировать платёж")
            )}
          </Button>
        )}
      </form>
    );
  };

  return (
    <>
      <div className="py-8">
        <h3 className="h3 !mb-0">{t(PRIVATE_LINK.tickets.label)}</h3>
      </div>

      {isLoading
        ? Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="skeleton h-40" />
          ))
        : bookings?.data?.map((booking) => {
            if (booking?.status === BookingStatusEnum.Draft) return null;

             const forwardTickets =
               booking.tickets?.filter((t) => t.direction === "forward") || [];
             const returnTickets =
               booking.tickets?.filter((t) => t.direction === "return") || [];

             const forwardSegment = {
               from: booking?.station_from!,
               to: booking?.station_to!,
               departure: booking?.departure_datetime,
               arrival: booking?.arrival_datetime,
             };

             let returnSegment: typeof forwardSegment | undefined;
             if (booking?.return_trip && returnTickets.length) {
               const stations = booking.return_trip.route?.stations;
               returnSegment = {
                 from: stations?.[0],
                 to: stations?.[stations.length - 1],
                 departure: booking.return_trip.departure_datetime,
                 arrival: booking.return_trip.arrival_datetime,
               };
             }

              const showPayActions = booking?.tickets?.some(
                (t) => t.status === BookingStatusEnum.Reserved,
              );
              const hasCancelledTicket = booking?.tickets?.some(
                (t) => t.status === BookingStatusEnum.Cancelled,
              );

               const renderTicket = (ticket: any) => (
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
                             {t("$Pasager")}
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
                             {t("$Preț")}
                           </div>
                           <div className="-mt-1 text-lg font-semibold">
                             {formatCurrency(getAmountByCurrency(ticket))}
                           </div>
                         </div>
                       </div>
                     </div>

                     <div className="ml-auto flex flex-wrap gap-4 sm:flex-nowrap lg:flex-col xl:flex-row">
                       {ticket.status !== BookingStatusEnum.Cancelled && (
                         <Dialog
                           open={openTicketId === ticket.id}
                           onOpenChange={(o) =>
                             setOpenTicketId(o ? ticket.id : null)
                           }
                         >
                           <DialogTrigger asChild>
                             <Button
                               variant="ghost"
                               size="sm"
                               onClick={() => setOpenTicketId(ticket.id)}
                             >
                               <Ban />
                               {t("$Anulează")}
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
                                 {t("$Doriți să anulați biletul?")}
                               </div>

                               <div className="text-text-gray mb-12 text-lg">
                                 {t(
                                   "$În funcție de timpul rămas până la plecare, există o taxă de reținere pentru bilet – o sumă care este reținută de la pasager în cazul returnării biletului",
                                 )}
                               </div>

                               <div className="bg-back mb-6 grid w-full grid-cols-2 rounded-3xl px-6 py-4">
                                 <div className="text-left">
                                   <div className="font-semibold">
                                     {t("$Nr Invoice")}
                                   </div>
                                   <div className="text-text-gray">
                                     {ticket?.booking?.payment?.external_id || ticket.id}
                                   </div>
                                 </div>

                                 <div className="text-right">
                                   <div className="font-semibold">
                                     {t("$Metoda de plată")}
                                   </div>
                                   <div className="text-text-gray">
                                     {ticket?.booking?.payment?.method?.toUpperCase()}
                                   </div>
                                 </div>
                               </div>

                               <Button
                                 size="lg"
                                 className="w-full"
                                 onClick={() => ticketRefund.mutate(ticket.id)}
                                 disabled={ticketRefund.isPending}
                               >
                                 {ticketRefund.isPending ? (
                                   <LoadingSpinner />
                                 ) : (
                                   <>
                                     {t("$Anulează biletul")}
                                     <ChevronRightIcon />
                                   </>
                                 )}
                               </Button>
                             </div>
                           </DialogContent>
                         </Dialog>
                       )}

                       <DownloadTicketButton
                         mode="ticket"
                         ticketId={ticket.id}
                         size="sm"
                         variant="outline"
                       />

                       {ticket.status === BookingStatusEnum.Reserved && (
                         <Dialog
                           open={payTicketId === ticket.id}
                           onOpenChange={(o) =>
                             setPayTicketId(o ? ticket.id : null)
                           }
                         >
                           <DialogTrigger asChild>
                             <Button
                               size="sm"
                               variant="reverse"
                               onClick={() => setPayTicketId(ticket.id)}
                             >
                               {t("$Achită")}
                               <ChevronRightIcon />
                             </Button>
                           </DialogTrigger>
                           <DialogContent>
                             <DialogHeader className="sr-only">
                               <DialogTitle />
                               <DialogDescription />
                             </DialogHeader>
                             <PayForm
                               id={ticket.id}
                               mode="ticket"
                               onClose={() => setPayTicketId(null)}
                             />
                           </DialogContent>
                         </Dialog>
                       )}
                     </div>
                   </div>
                 </div>
               );

               return (
                 <div key={booking.id} className="mb-16 space-y-16">
                   {forwardTickets.length > 0 && (
                     <div>
                       <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                         <div>
                           <div className="font-semibold mb-4">{t("$Bilete dus")}</div>
                           <div className="border-platinum bg-card flex h-full items-center gap-4 border-x border-t p-4 text-lg lg:max-w-max rounded-t-xl -mb-px">
                             <div className="font-semibold">
                               <div>{getLocalizedField(forwardSegment.from!, "name", locale)}</div>
                               <div className="text-text-gray text-base font-normal">
                                 {formatUTC(forwardSegment.departure, { dateFormat: "d MMMM yyyy, HH:mm" })?.date}
                               </div>
                             </div>
                             <MoveRight className="text-blue flex-none" />
                             <div className="font-semibold">
                               <div>{getLocalizedField(forwardSegment.to!, "name", locale)}</div>
                               <div className="text-text-gray text-base font-normal">
                                 {formatUTC(forwardSegment.arrival, { dateFormat: "d MMMM yyyy, HH:mm" })?.date}
                               </div>
                             </div>
                           </div>
                         </div>

                        <div className="border-platinum bg-card flex flex-wrap gap-4 border-x border-t p-4 lg:flex-row-reverse lg:border-none lg:bg-transparent lg:p-0">
                          {showPayActions && (
                            <Dialog
                              open={payBookingId === booking.id}
                              onOpenChange={(o) => setPayBookingId(o ? booking.id : null)}
                            >
                              <DialogTrigger asChild>
                                <Button onClick={() => setPayBookingId(booking.id)}>
                                  {t("$Achită toate")}
                                  <ChevronRightIcon />
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader className="sr-only">
                                  <DialogTitle />
                                  <DialogDescription />
                                </DialogHeader>
                                <PayForm
                                  id={booking.id}
                                  mode={booking.tickets.every((t) => t.status === BookingStatusEnum.Reserved) ? "booking" : "unpaid"}
                                  onClose={() => setPayBookingId(null)}
                                />
                              </DialogContent>
                            </Dialog>
                          )}

                          <DownloadTicketButton
                            mode="booking"
                            variant="reverse"
                            bookingId={booking?.id}
                          />

                          {!hasCancelledTicket && (
                            <Dialog
                              open={openBookingId === booking.id}
                              onOpenChange={(o) => setOpenBookingId(o ? booking.id : null)}
                            >
                              <DialogTrigger asChild>
                                <Button
                                  variant="link"
                                  onClick={() => setOpenBookingId(booking.id)}
                                >
                                  {t("$Anulează biletele")}
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

                                  <div className="h2">{t("$Doriți să anulați biletele?")}</div>

                                  <div className="text-text-gray mb-12 text-lg">
                                    {t(
                                      "$În funcție de timpul rămas până la plecare, există o taxă de reținere pentru bilet – o sumă care este reținută de la pasager în cazul returnării biletului",
                                    )}
                                  </div>

                                  <div className="bg-back mb-6 grid w-full grid-cols-2 rounded-3xl px-6 py-4">
                                    <div className="text-left">
                                      <div className="font-semibold">{t("$Nr Invoice")}</div>
                                      <div className="text-text-gray">
                                        {booking?.payment?.external_id || booking.id}
                                      </div>
                                    </div>

                                    <div className="text-right">
                                      <div className="font-semibold">{t("$Metoda de plată")}</div>
                                      <div className="text-text-gray">
                                        {booking?.payment?.method?.toUpperCase()}
                                      </div>
                                    </div>
                                  </div>

                                  <Button
                                    size="lg"
                                    className="w-full"
                                    onClick={() => bookingRefund.mutate(booking.id)}
                                    disabled={bookingRefund.isPending}
                                  >
                                    {bookingRefund.isPending ? (
                                      <LoadingSpinner />
                                    ) : (
                                      <>
                                        {t("$Anulează biletul")}
                                        <ChevronRightIcon />
                                      </>
                                    )}
                                  </Button>
                                </div>
                              </DialogContent>
                            </Dialog>
                          )}
                        </div>
                       </div>

                       <Card className="ring-platinum rounded-tl-none rounded-tr-none ring ring-inset lg:rounded-tr-xl">
                         <CardContent className="space-y-4">
                           {forwardTickets.map(renderTicket)}
                         </CardContent>
                       </Card>
                     </div>
                   )}

                   {returnTickets.length > 0 && returnSegment && (
                     <div>
                       <div className="font-semibold mb-4">{t("$Bilete retur")}</div>
                       <div className="border-platinum bg-card flex h-full items-center gap-4 border-x border-t p-4 text-lg lg:max-w-max rounded-t-xl -mb-px">
                         <div className="font-semibold">
                           <div>{getLocalizedField(returnSegment.from!, "name", locale)}</div>
                           <div className="text-text-gray text-base font-normal">
                             {formatUTC(returnSegment.departure, { dateFormat: "d MMMM yyyy, HH:mm" })?.date}
                           </div>
                         </div>
                         <MoveRight className="text-blue flex-none" />
                         <div className="font-semibold">
                           <div>{getLocalizedField(returnSegment.to!, "name", locale)}</div>
                           <div className="text-text-gray text-base font-normal">
                             {formatUTC(returnSegment.arrival, { dateFormat: "d MMMM yyyy, HH:mm" })?.date}
                           </div>
                         </div>
                       </div>

                       <Card className="ring-platinum rounded-tl-none rounded-tr-none ring ring-inset lg:rounded-tr-xl">
                         <CardContent className="space-y-4">
                           {returnTickets.map(renderTicket)}
                         </CardContent>
                       </Card>
                     </div>
                   )}
                 </div>
               );
                })
        }

        <PaginationUI
          totalItems={bookings?.meta?.total}
          page={page}
          perPage={per_page}
          onPageChange={updatePage}
          onPageSizeChange={updateLimit}
          pageSizeOptions={[5, 10, 15]}
          showPageSize
        />
    </>
  );
};

