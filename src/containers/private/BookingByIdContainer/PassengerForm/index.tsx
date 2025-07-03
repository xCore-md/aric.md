"use client";
import React from "react";
import { PassengerCountSelect } from "./PassengerCountSelect ";
import { PassengerFields } from "./PassengerFields";
import { useTranslations } from "next-intl";

export const PassengerForm: React.FC<{
  availableSeats: number;
}> = ({ availableSeats }) => {
  const t = useTranslations();
  return (
    <>
      <div className="mb-6 flex flex-col gap-4">
        <div className="text-lg font-semibold">Date pasager:</div>

        <div className="flex items-center gap-4">
          <PassengerCountSelect availableSeats={availableSeats} />
          <span className="text-green rounded-full px-2 py-0.5 text-sm font-semibold">
            {availableSeats} {t("$locuri disponibile")}
          </span>
        </div>
      </div>

      <PassengerFields />
    </>
  );
};
