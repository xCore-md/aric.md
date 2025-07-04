"use client";

import React from "react";
import { Download, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ticketService } from "@/services/ticket.service";
import { LanguageEnum } from "@/types";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

type ModeProps =
  | {
      mode: "ticket";
      ticketId: number;
      bookingId?: never;
      language?: LanguageEnum;
    }
  | {
      mode: "booking";
      bookingId: number;
      ticketId?: never;
      language?: LanguageEnum;
    };

type ButtonProps = React.ComponentPropsWithoutRef<typeof Button>;

type Props = ModeProps & ButtonProps;

export const DownloadTicketButton: React.FC<Props> = ({
  mode,
  ticketId,
  bookingId,
  ...buttonProps
}) => {
  const t = useTranslations();
  const [loading, setLoading] = React.useState(false);

  const handleDownload = async () => {
    try {
      setLoading(true);

      let blob: Blob;

      if (mode === "ticket" && ticketId != null) {
        blob = await ticketService.download(ticketId);
      } else if (mode === "booking" && bookingId != null) {
        blob = await ticketService.downloadAllBooking(bookingId);
      } else {
        throw new Error("Invalid download mode or missing ID");
      }

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download =
        mode === "ticket"
          ? `ticket-${ticketId}.pdf`
          : `booking-${bookingId}-tickets.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
      toast.error(t("$Eroare la descărcare."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button onClick={handleDownload} disabled={loading} {...buttonProps}>
      {loading ? (
        <>
          <LoaderCircle className="size-4 animate-spin" />
          {t("$Se descarcă...")}
        </>
      ) : (
        <>
          <Download className="size-4" />
          {t(mode === "ticket" ? "$Descarcă bilet" : "$Descarcă biletele")}
        </>
      )}
    </Button>
  );
};
