"use client";
import React from "react";
import { useTranslations } from "use-intl";
import { FieldArrayWithId, useFormContext } from "react-hook-form";

import { subYears } from "date-fns/subYears";
import { subDays } from "date-fns/subDays";
import { PassengerRow } from "./PassengerRow";
import { PassengerSelectExisting } from "./PassengerSelectExisting";

type PassengerGroupProps = {
  type?: "adults" | "children";
  title: string;
  count: number;
  offset: number;
  fields: FieldArrayWithId<any, "passengers.new", "id">[];
  passengerCounts: { adults: number; children: number };
  remove: (index: number) => void;
};

export const PassengerGroup: React.FC<PassengerGroupProps> = ({
  title,
  count,
  offset,
  fields,
  passengerCounts,
  remove,
  type = "adults",
}) => {
  const t = useTranslations();

  const today = new Date();
  const minDateChild = subYears(today, 11);
  const maxDateChild = subDays(today, 1);
  const maxDateAdult = subYears(today, 12);
  const minDateAdult = new Date(1900, 0, 1);

  return (
    !!count && (
      <div className="space-y-2 rounded-lg bg-gray-50 p-3 ring-2 ring-gray-100">
        <div className="flex justify-between">
          <div className="font-semibold">
            <div>{title}</div>
            <div className="text-text-gray text-sm font-normal">
              {t(
                type === "adults"
                  ? "passengers.adults_hint"
                  : "passengers.children_hint",
              )}
            </div>
          </div>
          <PassengerSelectExisting />
        </div>

        {fields.slice(offset, offset + count).map((field) => {
          const realIndex = fields.findIndex((f) => f.id === field.id);
          const isAdult = realIndex < passengerCounts.adults;
          const minDate = isAdult ? minDateAdult : minDateChild;
          const maxDate = isAdult ? maxDateAdult : maxDateChild;

          return (
            <PassengerRow
              key={field.id}
              index={realIndex}
              minDate={minDate}
              maxDate={maxDate}
              onRemove={() => remove(realIndex)}
            />
          );
        })}
      </div>
    )
  );
};
