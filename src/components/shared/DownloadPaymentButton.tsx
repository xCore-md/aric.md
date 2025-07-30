"use client";

import React from "react";
import { Download, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { paymentService } from "@/services/payment.service";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

export type DownloadPaymentButtonProps = React.ComponentPropsWithoutRef<typeof Button> & {
  paymentId: number;
};

export const DownloadPaymentButton: React.FC<DownloadPaymentButtonProps> = ({
  paymentId,
  ...buttonProps
}) => {
  const t = useTranslations();
  const [loading, setLoading] = React.useState(false);

  const handleDownload = async () => {
    try {
      setLoading(true);

      const blob = await paymentService.download(paymentId);

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `payment-${paymentId}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
      toast.error(t("$Eroare la descărcare"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button onClick={handleDownload} disabled={loading} {...buttonProps}>
      {loading ? (
        <>
          <LoaderCircle className="size-4 animate-spin" />
          {t("$Se formează")}
        </>
      ) : (
        <>
          <Download className="size-4" />
          {t("$Descarcă plată")}
        </>
      )}
    </Button>
  );
};
