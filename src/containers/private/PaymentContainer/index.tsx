"use client";
import React from "react";
import { useTranslations } from "use-intl";
import { useQueryState, parseAsString } from "nuqs";
import { PRIVATE_LINK, QUERY_KEYS } from "@/utils/constants";
import { Card, CardContent } from "@/components/ui/card";
import { DownloadPaymentButton } from "@/components/shared/DownloadPaymentButton";
import { useQuery } from "@tanstack/react-query";
import { paymentService } from "@/services/payment.service";
import { usePagination } from "@/hooks/usePagination";
import { PaginationUI } from "@/components/shared/pagination-ui";
import { useFormatUTCToLocal } from "@/hooks/useFormatUTCToLocal ";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const PaymentContainer: React.FC = () => {
  const t = useTranslations();
  const tPaymentStatus = useTranslations("payment_status");
  const { per_page, page, updateLimit, updatePage } = usePagination({
    defaultLimit: 5,
  });
  const { formatUTC } = useFormatUTCToLocal();
  const [status, setStatus] = useQueryState(
    "status",
    parseAsString.withDefault("")
  );

  const { data: payments, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.payments, page, per_page, status],
    queryFn: () =>
      paymentService.getAll({
        page,
        per_page,
        ...(status ? { status } : {}),
      }),
  });

  const totalPayments = payments?.meta?.total ?? payments?.total;

  return (
    <>
      <div className="py-8">
        <h3 className="h3 !mb-0">{t(PRIVATE_LINK.payments.label)}</h3>
      </div>

      <Card className="ring-platinum ring ring-inset">
        <CardContent>
          <div className="mb-4 flex justify-end">
            <Select
              value={status || "all"}
              onValueChange={(v) => setStatus(v === "all" ? null : v)}
            >
              <SelectTrigger className="w-40">
                <SelectValue placeholder={tPaymentStatus("all") || undefined} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{tPaymentStatus("all")}</SelectItem>
                <SelectItem value="success">
                  {tPaymentStatus("success")}
                </SelectItem>
                <SelectItem value="pending">
                  {tPaymentStatus("pending")}
                </SelectItem>
                <SelectItem value="failed">
                  {tPaymentStatus("failed")}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <table className="table">
            <thead className="thead">
              <tr>
                <th>ID</th>
                <th>{t("$Data tranzacției")}</th>
                <th>{t("$Suma")}</th>
                <th>{t("$Statut")}</th>
                <th>{t("$Acțiuni")}</th>
              </tr>
            </thead>
            <tbody className="tbody">
              {isLoading ? (
                Array.from({ length: 5 }).map((_, index) => (
                  <tr key={index} className="h-12">
                    <td colSpan={5} className="skeleton" />
                  </tr>
                ))
              ) : payments?.data?.length ? (
                payments.data.map((payment) => (
                  <tr key={payment.id}>
                    <td>{payment.id}</td>
                    <td>
                      {formatUTC(payment.paid_at || payment.created_at, {
                        dateFormat: "dd/MM/yyyy",
                      })?.date}
                    </td>
                    <td>
                      {payment.amount} {payment.currency.toUpperCase()}
                    </td>
                    <td>{tPaymentStatus(payment.status as any)}</td>
                    <td>
                      <DownloadPaymentButton
                        paymentId={payment.id}
                        size="sm"
                        variant="outline"
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-6 text-center text-lg">
                    {t("$Nu există plăți")}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {totalPayments ? (
        <div className="mt-6">
          <PaginationUI
            totalItems={totalPayments}
            page={page}
            perPage={per_page}
            onPageChange={updatePage}
            onPageSizeChange={updateLimit}
            pageSizeOptions={[5, 10, 15]}
            showPageSize
          />
        </div>
      ) : null}
    </>
  );
};
