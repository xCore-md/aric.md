"use client";
import React from "react";
import { useTranslations } from "use-intl";
import { PRIVATE_LINK } from "@/utils/constants";
import { Card, CardContent } from "@/components/ui/card";

export const PaymentContainer: React.FC = () => {
  const t = useTranslations();

  return (
    <>
      <div className="py-8">
        <h3 className="h3 !mb-0">{t(PRIVATE_LINK.payments.label)}</h3>
      </div>

      <Card className="ring-platinum ring ring-inset">
        <CardContent className="">
          <table className="table">
            <thead className="thead">
              <tr>
                <th>ID</th>
                <th>Ruta</th>
                <th>Data tranzacției</th>
                <th>Suma</th>
                <th>Statut</th>
              </tr>
            </thead>
            <tbody className="tbody">
              <tr>
                <td>257</td>
                <td>Chișinău - Ismail</td>
                <td>04/04/2025</td>
                <td>120 MDL</td>
                <td>
                  <div className="bg-yellow max-w-max rounded-full px-2.5 text-base font-normal">
                    Se procesează
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </CardContent>
      </Card>
    </>
  );
};
