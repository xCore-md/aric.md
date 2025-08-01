"use client";
import React from "react";
import { useTranslations } from "use-intl";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import { useFormatUTCToLocal } from "@/hooks/useFormatUTCToLocal ";
import type { PaymentRedirect } from "@/types";

export const BookingResultContainer: React.FC<{ type: "success" | "error" }> = ({ type }) => {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const { formatUTC } = useFormatUTCToLocal();

  const payment: PaymentRedirect = {
    id: Number(searchParams.get("id") || 0),
    gateway: searchParams.get("gateway"),
    currency: searchParams.get("currency") || "",
    amount: Number(searchParams.get("amount") || 0),
    paid_at: searchParams.get("paid_at"),
  };

  const formattedPaidAt = payment.paid_at
    ? formatUTC(payment.paid_at, { dateFormat: "d MMMM yyyy, HH:mm" })?.date
    : "";
    if (type === "success") {
      return (
        <Card className="ring-platinum ring ring-inset">
          <CardContent className="py-10">
            <svg viewBox="0 0 80 80" className="fill-green mx-auto mb-6 size-20">
              <path d="M40 0a40 40 0 1 0 40 40A40.042 40.042 0 0 0 40 0Zm17.562 32.946L36.023 54.485a3.077 3.077 0 0 1-4.354 0l-9.23-9.231a3.078 3.078 0 1 1 4.353-4.354l7.054 7.058 19.362-19.366a3.08 3.08 0 0 1 5.255 2.177 3.08 3.08 0 0 1-.901 2.177Z" />
            </svg>
            <div className="h3 text-center">{t("$Plata dumneavoastră a fost efectuată cu succes!")}</div>
            <div className="mt-12">
              <div className="mx-auto w-full max-w-3xl space-y-6 rounded-2xl border border-dashed px-16 py-8 shadow-xl shadow-black/5">
                {payment.id ? (
                  <div className="h4">{t("$Bilet ID")} {payment.id}</div>
                ) : null}
                <div className="bg-back grid grid-cols-2 rounded-3xl px-6 py-4">
                  <div>
                    <div className="font-semibold">{t("$Suma")}</div>
                    <div className="text-text-gray">
                      {payment.amount} {payment.currency.toUpperCase()}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">{t("$Metoda de plată")}</div>
                    <div className="text-text-gray">{payment.gateway}</div>
                  </div>
                </div>
                {payment.paid_at && (
                  <div className="bg-back grid grid-cols-2 rounded-3xl px-6 py-4">
                    <div>
                      <div className="font-semibold">{t("$Data tranzacției")}</div>
                      <div className="text-text-gray">{formattedPaidAt}</div>
                    </div>
                  </div>
                )}
                <div className="bg-back grid grid-cols-2 rounded-3xl px-6 py-4">
                  <div>
                    <div className="font-semibold">{t("$Website")}</div>
                    <div className="text-text-gray">
                      {t("site.url").replace(/^https?:\/\//, "")}
                    </div>
                  </div>
                </div>
                <div className="bg-back grid grid-cols-2 rounded-3xl px-6 py-4">
                  <div>
                    <div className="font-semibold">{t("$Comerciant")}</div>
                    <div className="text-text-gray">{t("site.name")}</div>
                  </div>
                </div>
                <div className="bg-back grid grid-cols-2 rounded-3xl px-6 py-4">
                  <div>
                    <div className="font-semibold">{t("$Descriere")}</div>
                    <div className="text-text-gray">{t("site.description")}</div>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-10 border-t pt-6">
                  <Button asChild>
                    <Link href="/tickets">{t("$Vezi biletele")}</Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href="/">{t("$Pagina principală")}</Link>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      );
    }

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
          {t("$Plata dumneavoastră a eșuat")}
          <br /> {t("$Vă rugăm să încercați din nou")}
        </div>
        <div className="mx-auto mt-12 max-w-2xl text-center text-2xl">
          {t(
            "$Vă rugăm să verificați datele introduse sau să încercați din nou Dacă problema persistă, contactați-ne pentru asistență",
          )}
        </div>
        <div className="mt-12">
          <div className="mx-auto w-full max-w-3xl space-y-6 rounded-2xl border border-dashed px-16 py-8 shadow-xl shadow-black/5">
            {payment.id ? (
              <div className="h4">{t("$Bilet ID")} {payment.id}</div>
            ) : null}
            <div className="bg-back grid grid-cols-2 rounded-3xl px-6 py-4">
              <div>
                <div className="font-semibold">{t("$Suma")}</div>
                <div className="text-text-gray">
                  {payment.amount} {payment.currency.toUpperCase()}
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold">{t("$Metoda de plată")}</div>
                <div className="text-text-gray">{payment.gateway}</div>
              </div>
            </div>
            {payment.paid_at && (
              <div className="bg-back grid grid-cols-2 rounded-3xl px-6 py-4">
                <div>
                  <div className="font-semibold">{t("$Data tranzacției")}</div>
                  <div className="text-text-gray">{formattedPaidAt}</div>
                </div>
              </div>
            )}
            <div className="pt-6 text-center text-sm text-text-gray">
              <div>
                <a href={t("site.url")} target="_blank" rel="noopener noreferrer">
                  {t("site.url")}
                </a>
              </div>
              <div className="font-semibold">{t("site.name")}</div>
              <div>{t("site.description")}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

