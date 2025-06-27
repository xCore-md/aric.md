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

export const PassengerSelectExisting: React.FC = () => {
  const t = useTranslations();
  const [open, setOpen] = React.useState(false);
  const { setValue, control } = useFormContext();
  const passengerCounts = useWatch({ control, name: "passengerCounts" }) || {
    adults: 1,
    children: 0,
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={open ? "default" : "reverse"}
          size="sm"
          className="rounded-full"
        >
          {t("$Alege din lista")}
          <ChevronDown />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-80 space-y-4"></PopoverContent>
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
