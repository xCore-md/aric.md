"use client";
import React from "react";
import { useTranslations } from "use-intl";
import { PRIVATE_LINK, QUERY_KEYS } from "@/utils/constants";
import { Card, CardContent } from "@/components/ui/card";
import { DownloadPaymentButton } from "@/components/shared/DownloadPaymentButton";
import { useQuery } from "@tanstack/react-query";
import { paymentService } from "@/services/payment.service";
import { usePagination } from "@/hooks/usePagination";
import { PaginationUI } from "@/components/shared/pagination-ui";
import { useFormatUTCToLocal } from "@/hooks/useFormatUTCToLocal ";

export const PaymentContainer: React.FC = () => {
  const t = useTranslations();
  const { per_page, page, updateLimit, updatePage } = usePagination();
  const { formatUTC } = useFormatUTCToLocal();

  const { data: payments, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.payments, page, per_page],
    queryFn: () => paymentService.getAll({ page, per_page }),
  });

  return (
    <>
      <div className="py-8">
        <h3 className="h3 !mb-0">{t(PRIVATE_LINK.payments.label)}</h3>
      </div>

      <Card className="ring-platinum ring ring-inset">
        <CardContent>
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
                    <td>
                      {payment.status === "pending"
                        ? t("$Se procesează")
                        : payment.status}
                    </td>
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

      {payments?.meta?.total ? (
        <div className="mt-6">
          <PaginationUI
            totalItems={payments.meta.total}
            page={page}
            perPage={per_page}
            onPageChange={updatePage}
            onPageSizeChange={updateLimit}
          />
        </div>
      ) : null}
    </>
  );
};
