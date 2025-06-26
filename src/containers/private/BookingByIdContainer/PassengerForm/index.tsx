"use client";
import React from "react";
import { useLocale, useTranslations } from "use-intl";
import { PassengerCountSelect } from "./PassengerCountSelect ";

export const PassengerForm: React.FC = () => {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <>
      <div className="py-8">
        <div className="">PassengerForm</div>
        <PassengerCountSelect availableSeats={44} />
      </div>
    </>
  );
};
