"use client";
import React from "react";
import { useTranslations } from "use-intl";
import { useFieldArray, useFormContext } from "react-hook-form";
import { PassengerGroup } from "./PassengerGroup";

export const PassengerFields: React.FC = () => {
  const t = useTranslations();
  const { control, watch, setValue } = useFormContext();
  const passengerCounts = watch("passengerCounts") || {
    adults: 1,
    children: 0,
  };
  const total = passengerCounts.adults + passengerCounts.children;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "passengers.new",
  });

  const handleRemove = (index: number) => {
    const isAdult = index < (passengerCounts.adults || 0);
    remove(index);

    setValue("passengerCounts", {
      adults: isAdult ? passengerCounts.adults - 1 : passengerCounts.adults,
      children: isAdult
        ? passengerCounts.children
        : passengerCounts.children - 1,
    });
  };

  React.useEffect(() => {
    const diff = total - fields.length;
    if (diff > 0) {
      append(
        Array(diff).fill({
          last_name: "",
          first_name: "",
          phone: "",
          birth_date: "",
        }),
        {
          shouldFocus: false,
        },
      );
    } else if (diff < 0) {
      for (let i = 0; i < Math.abs(diff); i++) {
        remove(fields.length - 1 - i);
      }
    }
  }, [total]);

  return (
    <div className="space-y-4">
      <PassengerGroup
        title={t("passengers.adults")}
        count={passengerCounts.adults}
        offset={0}
        fields={fields}
        passengerCounts={passengerCounts}
        remove={handleRemove}
      />

      <PassengerGroup
        type="children"
        title={t("passengers.adults")}
        count={passengerCounts.children}
        offset={passengerCounts.adults}
        fields={fields}
        passengerCounts={passengerCounts}
        remove={handleRemove}
      />
    </div>
  );
};
