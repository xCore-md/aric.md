"use client";
import React from "react";
import { useTranslations } from "use-intl";
import { PRIVATE_LINK } from "@/utils/constants";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export const SettingContainer: React.FC = () => {
  const t = useTranslations();

  return (
    <>
      <div className="py-8">
        <h3 className="h3 !mb-0">{t(PRIVATE_LINK.settings.label)}</h3>
      </div>

      <Card className="ring-platinum ring ring-inset">
        <CardHeader platinum>
          <CardTitle className="h4">Datele tale personale</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-lg font-semibold">Datele tale personale:</div>

            <div className="grid grid-cols-2 gap-6">
              <Input className="h-16" placeholder="Telefon" />
              <Input className="h-16" placeholder="Email" />
              <Input className="h-16" placeholder="Nume *" />
              <Input className="h-16" placeholder="Prenume *" />
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};
