"use client";
import React from "react";
import { useTranslations } from "use-intl";
import { useFieldArray, useFormContext } from "react-hook-form";
import { PassengerGroup } from "./PassengerGroup";

import { Passenger, PassengerType } from "@/types";

type Props = {
  onExistingChange?: (passengers: Passenger[]) => void;
};

export const PassengerFields: React.FC<Props> = ({ onExistingChange }) => {
  const t = useTranslations();
  const { control, watch, setValue } = useFormContext();
  const passengerCounts = watch("passengerCounts") || {
    adult: 1,
    child: 0,
  };

  const total = passengerCounts.adult + passengerCounts.child;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "passengers.new",
  });

  const [existingByType, setExistingByType] = React.useState<{
    adult: Passenger[];
    child: Passenger[];
  }>({ adult: [], child: [] });

  const handleExistingChangeInternal = React.useCallback(
    (type: PassengerType, passengers: Passenger[]) => {
      setExistingByType((prev) => ({ ...prev, [type]: passengers }));
    },
    [],
  );

  React.useEffect(() => {
    const all = [...existingByType.adult, ...existingByType.child];
    setValue(
      "passengers.existing",
      all.map((p) => p.id),
    );
    onExistingChange?.(all);
  }, [existingByType, onExistingChange, setValue]);
  const handleRemove = (index: number) => {
    const isAdult = index < (passengerCounts.adult || 0);
    remove(index);

    setValue("passengerCounts", {
      adult: isAdult ? passengerCounts.adult - 1 : passengerCounts.adult,
      child: isAdult ? passengerCounts.child : passengerCounts.child - 1,
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
        type="adult"
        title={t("passengers.adults")}
        count={passengerCounts.adult}
        offset={0}
        fields={fields}
        passengerCounts={passengerCounts}
        remove={handleRemove}
        onExistingChange={handleExistingChangeInternal}
      />

      <PassengerGroup
        type="child"
        title={t("passengers.children")}
        count={passengerCounts.child}
        offset={passengerCounts.adult}
        fields={fields}
        passengerCounts={passengerCounts}
        remove={handleRemove}
        onExistingChange={handleExistingChangeInternal}
      />
    </div>
  );
};
