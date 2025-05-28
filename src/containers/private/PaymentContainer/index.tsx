"use client";
import React from "react";
import { useTranslations } from "use-intl";
import { PRIVATE_LINK } from "@/utils/constants";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

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
                <th>Nume</th>
                <th>Prenume</th>
                <th>Data rezervării</th>
                <th>ID Bilet</th>
                <th>Modifică</th>
                <th>Șterge</th>
              </tr>
            </thead>
            <tbody className="tbody [&_td]:last:[&_button]:mx-auto">
              <tr>
                <td>January</td>
                <td>$100</td>
                <td>$100</td>
                <td>$100</td>
                <td>
                  <Button variant="reverse">Modifică nume</Button>
                </td>
                <td>
                  <button className="flex size-10 items-center justify-center rounded-lg border bg-white">
                    <Trash2 />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </CardContent>
      </Card>
    </>
  );
};
