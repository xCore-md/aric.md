"use client";
import React from "react";
import { useLocale, useTranslations } from "use-intl";
import { PassengerCountSelect } from "./PassengerCountSelect ";
import { FormProvider, useForm } from "react-hook-form";
import { PassengerFields } from "./PassengerFields";

export const PassengerForm: React.FC<{
  availableSeats: number;
}> = ({ availableSeats }) => {
  return (
    <>
      <div className="mb-6 flex flex-col gap-4">
        <div className="text-lg font-semibold">Date pasager:</div>

        <div className="flex items-center gap-4">
          <PassengerCountSelect availableSeats={availableSeats} />
          <span className="text-green rounded-full px-2 py-0.5 text-sm font-semibold">
            {availableSeats} locuri disponibile
          </span>
        </div>
      </div>

      <PassengerFields />
    </>
  );
};
