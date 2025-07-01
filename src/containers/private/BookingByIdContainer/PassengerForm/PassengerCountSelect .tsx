"use client";
import React from "react";
import { ChevronDown, Minus, Plus, TriangleAlert } from "lucide-react";
import { useTranslations } from "use-intl";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useFormContext, useWatch } from "react-hook-form";
import { PassengerType } from "@/types";

export const PassengerCountSelect: React.FC<{
  availableSeats: number;
}> = ({ availableSeats }) => {
  const t = useTranslations();
  const [open, setOpen] = React.useState(false);
  const { setValue, control } = useFormContext();
  const passengerCounts = useWatch({ control, name: "passengerCounts" }) || {
    adult: 1,
    child: 0,
  };

  const totalPassengers = passengerCounts.adult + passengerCounts.child;
  const isAtLimit = totalPassengers >= availableSeats;

  const updateCount = (type: PassengerType, value: number) => {
    setValue("passengerCounts", {
      ...passengerCounts,
      [type]: value,
    });
  };

  const totalLabel = () => {
    const parts = [
      passengerCounts?.adult > 0
        ? t("passengers.adult", { count: passengerCounts?.adult })
        : null,
      passengerCounts?.child > 0
        ? t("passengers.child", { count: passengerCounts?.child })
        : null,
    ].filter(Boolean);

    return parts.join(", ") || t("passengers.none");
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={open ? "secondary" : "outline"}
          size="lg"
          className="w-full max-w-80 justify-between px-6"
        >
          <div className="text-left">
            <div className="text-muted-foreground text-xs">
              {t("passengers.label")}
            </div>
            <div className="text-sm">{totalLabel()}</div>
          </div>

          <ChevronDown />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-80 space-y-4">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-6">
            <div>
              <div className="font-medium">{t("passengers.adults")}</div>
              <div className="text-muted-foreground text-sm">
                {t("passengers.adults_hint")}
              </div>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <ControlButton
                onClick={() =>
                  updateCount("adult", Math.max(1, passengerCounts.adult - 1))
                }
                disabled={passengerCounts.adult <= 1}
              />
              <span className="flex size-10 flex-none items-center justify-center">
                {passengerCounts.adult}
              </span>
              <ControlButton
                onClick={() => updateCount("adult", passengerCounts.adult + 1)}
                disabled={isAtLimit}
                icon="plus"
              />
            </div>
          </div>

          <div className="flex items-center justify-between gap-6">
            <div>
              <div className="font-medium">
                {t("passengers.children")}
                <span className="bg-green ml-2 max-w-max rounded-full px-2.5 py-0.5 text-base">
                  -50%
                </span>
              </div>
              <div className="text-muted-foreground text-sm">
                {t("passengers.children_hint")}
              </div>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <ControlButton
                onClick={() =>
                  updateCount("child", Math.max(0, passengerCounts.child - 1))
                }
                disabled={passengerCounts.child <= 0}
              />
              <span className="flex size-10 flex-none items-center justify-center">
                {passengerCounts.child}
              </span>
              <ControlButton
                onClick={() => updateCount("child", passengerCounts.child + 1)}
                disabled={isAtLimit}
                icon="plus"
              />
            </div>
          </div>
        </div>

        {isAtLimit && (
          <div className="mt-2 flex items-center justify-center gap-2 text-center text-xs text-red-500">
            <TriangleAlert className="size-4 flex-none" />
            {t("passengers.max_seats_reached", {
              count: availableSeats,
            })}
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

const ControlButton: React.FC<{
  onClick: () => void;
  disabled?: boolean;
  icon?: "plus" | "minus";
}> = ({ onClick, disabled, icon = "minus" }) => {
  const Icon = icon === "plus" ? Plus : Minus;
  return (
    <Button
      variant="black"
      size="icon"
      className={cn("rounded-full", disabled && "opacity-40")}
      onClick={onClick}
      disabled={disabled}
      type="button"
    >
      <Icon className="h-4 w-4" />
    </Button>
  );
};
