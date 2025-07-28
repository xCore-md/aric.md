"use client";
import React from "react";
import { useTranslations } from "use-intl";
import { FieldArrayWithId } from "react-hook-form";

import { subYears } from "date-fns/subYears";
import { subDays } from "date-fns/subDays";
import { PassengerRow } from "./PassengerRow";
import { PassengerSelectExisting } from "./PassengerSelectExisting";
import { Passenger, PassengerType } from "@/types";
import { PassengerRowReadonly } from "./PassengerRowReadonly";

type PassengerGroupProps = {
  type?: PassengerType;
  title: string;
  count: number;
  offset: number;
  fields: FieldArrayWithId<any, "passengers.new", "id">[];
  passengerCounts: { adult: number; child: number };
  remove: (index: number) => void;
  onExistingChange?: (type: PassengerType, passengers: Passenger[]) => void;
};

export const PassengerGroup: React.FC<PassengerGroupProps> = ({
  title,
  count,
  offset,
  fields,
  passengerCounts,
  remove,
  type,
  onExistingChange,
}) => {
  const t = useTranslations();
  const [selectedPassengers, setSelectedPassengers] = React.useState<
    Passenger[]
  >([]);

  const today = new Date();
  const minDateChild = subYears(today, 11);
  const maxDateChild = subDays(today, 1);
  const maxDateAdult = subYears(today, 12);
  const minDateAdult = new Date(1900, 0, 1);

  // const removeLastAdult = () => {
  //   if (passengerCounts.adult > 1) {
  //     remove(passengerCounts.adult - 1);
  //   }
  // };

  // const removeLastChild = () => {
  //   const lastChildIndex = passengerCounts.adult + passengerCounts.child - 1;
  //   if (passengerCounts.child > 0) {
  //     remove(lastChildIndex);
  //   }
  // };

  const onRemoveExistingPassenger = (id: number) => {
    setSelectedPassengers((prev) => prev?.filter((p) => p?.id !== id));

    // const isAdult = type === "adult";
    // setValue("passengerCounts", {
    //   adult: isAdult ? passengerCounts.adult - 1 : passengerCounts.adult,
    //   child: isAdult ? passengerCounts.child : passengerCounts.child - 1,
    // });
  };

  React.useEffect(() => {
    if (type) {
      onExistingChange?.(type, selectedPassengers);
    }

    // type === "adult" ? removeLastAdult() : removeLastChild();
  }, [selectedPassengers]);

  return (
    (!!count || selectedPassengers?.length > 0) && (
      <div className="space-y-2 rounded-lg bg-gray-50 p-3 ring-2 ring-gray-100">
        <div className="flex justify-between">
          <div className="font-semibold">
            <div>{title}</div>
            <div className="text-text-gray text-sm font-normal">
              {t(
                type === "adult"
                  ? "passengers.adults_hint"
                  : "passengers.children_hint",
              )}
            </div>
          </div>

          <PassengerSelectExisting
            type={type}
            defaultSelectedIds={selectedPassengers?.map((p) => p.id)}
            selected={selectedPassengers}
            onSelect={setSelectedPassengers}
          />
        </div>

        <div className="space-y-4">
          {fields.slice(offset, offset + count).map((field, index) => {
            const realIndex = fields.findIndex((f) => f.id === field.id);
            const isAdult = realIndex < passengerCounts.adult;
            const minDate = isAdult ? minDateAdult : minDateChild;
            const maxDate = isAdult ? maxDateAdult : maxDateChild;

            return (
              <PassengerRow
                key={field.id}
                realIndex={realIndex}
                index={index}
                minDate={minDate}
                maxDate={maxDate}
                onRemove={() => remove(realIndex)}
                hideRemoveButton={type === "adult" && index === 0}
              />
            );
          })}

          {selectedPassengers?.length > 0 && (
            <div className="grid grid-cols-1 gap-4">
              {selectedPassengers?.map(({ id, first_name, last_name, phone, birth_date }, index) => (
                <PassengerRowReadonly
                  key={id}
                  index={fields.slice(offset, offset + count).length + index}
                  first_name={first_name}
                  last_name={last_name}
                  phone={phone}
                  birth_date={birth_date}
                  onRemove={() => onRemoveExistingPassenger(id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    )
  );
};
