"use client";
import React from "react";
import { PassengerCountSelect } from "./PassengerCountSelect";
import { PassengerFields } from "./PassengerFields";
import type { Passenger } from "@/types";
import { useTranslations } from "next-intl";

export const PassengerForm: React.FC<{
  availableSeats: number;
  existingCounts?: { adult: number; child: number };
  onExistingChange?: (passengers: Passenger[]) => void;
}> = ({ availableSeats, existingCounts, onExistingChange }) => {

  const t = useTranslations();
  return (
    <>
      <div className="mb-6 flex flex-col gap-4">
        <div className="text-lg font-semibold">{t("passengerData")}</div>

        <div className="flex items-center gap-4">
          <PassengerCountSelect
            availableSeats={availableSeats}
            existingCounts={existingCounts}
          />
          <span className="text-green rounded-full px-2 py-0.5 text-sm font-semibold">
            {availableSeats} {t("$locuri disponibile")}
          </span>
        </div>
      </div>

      <PassengerFields onExistingChange={onExistingChange} />
    </>
  );
};
