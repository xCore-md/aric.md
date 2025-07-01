"use client";
import React from "react";
import { useTranslations } from "use-intl";
import { FieldArrayWithId, useFormContext } from "react-hook-form";

import { subYears } from "date-fns/subYears";
import { subDays } from "date-fns/subDays";
import { PassengerRow } from "./PassengerRow";
import { PassengerSelectExisting } from "./PassengerSelectExisting";
import { Passenger, PassengerType } from "@/types";
import { Button } from "@/components/ui/button";
import { CalendarCheck, Delete, PhoneCall } from "lucide-react";
import { useFormatUTCToLocal } from "@/hooks/useFormatUTCToLocal ";

type PassengerGroupProps = {
  type?: PassengerType;
  title: string;
  count: number;
  offset: number;
  fields: FieldArrayWithId<any, "passengers.new", "id">[];
  passengerCounts: { adult: number; child: number };
  remove: (index: number) => void;
};

export const PassengerGroup: React.FC<PassengerGroupProps> = ({
  title,
  count,
  offset,
  fields,
  passengerCounts,
  remove,
  type,
}) => {
  const t = useTranslations();
  const { formatUTC } = useFormatUTCToLocal();
  const { setValue } = useFormContext();
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
    setValue(
      "passengers.existing",
      selectedPassengers?.map((p) => p.id),
    );

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
            <div className="grid grid-cols-3 gap-4">
              {selectedPassengers?.map(
                ({ id, first_name, last_name, phone, birth_date }) => (
                  <div
                    key={id}
                    className="flex w-full items-center gap-2 rounded-lg bg-white px-3 py-2"
                  >
                    <div className="flex w-full flex-col gap-0.5 text-sm">
                      <div className="font-medium">
                        {first_name} {last_name}
                      </div>
                      <div className="text-muted-foreground flex items-center gap-1 text-sm">
                        <PhoneCall className="size-4" />
                        <span>{phone ? phone : "--- --- ---"}</span>
                      </div>
                      <div className="text-muted-foreground flex items-center gap-1 text-sm">
                        <CalendarCheck className="size-4" />{" "}
                        <span>
                          {birth_date
                            ? formatUTC(birth_date)?.date
                            : "-- --- ----"}
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm-icon"
                      type="button"
                      className="text-red disabled:text-gray-300"
                      onClick={() => onRemoveExistingPassenger(id)}
                    >
                      <Delete />
                    </Button>
                  </div>
                ),
              )}
            </div>
          )}
        </div>
      </div>
    )
  );
};
