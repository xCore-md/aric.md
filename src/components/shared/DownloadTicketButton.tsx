"use client";

import React from "react";
import { Download, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ticketService } from "@/services/ticket.service";
import { LanguageEnum } from "@/types";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

type Props = {
  ticketId: number;
  language?: LanguageEnum;
};

export const DownloadTicketButton: React.FC<Props> = ({ ticketId }) => {
  const t = useTranslations();
  const [loading, setLoading] = React.useState(false);

  const handleDownload = async () => {
    try {
      setLoading(true);
      const blob = await ticketService.download(ticketId);

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `ticket-${ticketId}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
      toast.error(t("$Eroare la descărcarea biletului."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleDownload}
      disabled={loading}
      variant="outline"
      size="sm"
    >
      {loading ? (
        <>
          <LoaderCircle className="size-4 animate-spin" />
          {t("$Se descarcă...")}
        </>
      ) : (
        <>
          <Download className="size-4" />
          {t("$Descarcă bilet")}
        </>
      )}
    </Button>
  );
};
