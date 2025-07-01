"use client";
import React from "react";
import { ChevronDown, Check } from "lucide-react";
import { useTranslations } from "use-intl";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { QUERY_KEYS } from "@/utils/constants";
import { passengerService } from "@/services/passenger.service";
import { useQuery } from "@tanstack/react-query";
import { Passenger, PassengerType } from "@/types";

type Props = {
  type?: PassengerType;
  selected: Passenger[];
  onSelect: (passengers: Passenger[]) => void;
  defaultSelectedIds?: number[];
};

export const PassengerSelectExisting: React.FC<Props> = ({
  type = "adult",
  selected,
  onSelect,
  defaultSelectedIds,
}) => {
  const t = useTranslations();
  const [open, setOpen] = React.useState(false);

  const { data: passengers, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.passengers, type],
    queryFn: () => passengerService.getAll({ type }),
    enabled: open || !!defaultSelectedIds?.length,
  });

  // // Aplică defaultSelectedIds o singură dată când pasagerii sunt încărcați
  // React.useEffect(() => {
  //   if (!passengers?.data || !defaultSelectedIds?.length) return;

  //   const defaults = passengers.data.filter((p) =>
  //     defaultSelectedIds.includes(p.id),
  //   );

  //   if (defaults.length) {
  //     onSelect(defaults);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [passengers?.data, defaultSelectedIds]);

  const toggleSelection = (passenger: Passenger) => {
    const isSelected = selected?.some((p) => p.id === passenger.id);
    const newSelected = isSelected
      ? selected?.filter((p) => p.id !== passenger.id)
      : [...selected, passenger];

    onSelect(newSelected);
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
          <ChevronDown className="ml-1 size-4" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="max-h-96 w-80 space-y-2 overflow-y-auto">
        {isLoading ? (
          <div className="loader mx-auto scale-50" />
        ) : passengers?.data?.length === 0 ? (
          <div className="text-muted-foreground px-3 py-2 text-center text-sm">
            {t("$Nu există pasageri salvați")}
          </div>
        ) : (
          <ul className="space-y-1">
            {passengers?.data.map((passenger) => {
              const isSelected = selected.some((p) => p.id === passenger.id);
              return (
                <li
                  key={passenger.id}
                  onClick={() => toggleSelection(passenger)}
                  className={`flex cursor-pointer items-center justify-between rounded-md px-3 py-2 ${
                    isSelected
                      ? "bg-accent text-accent-foreground"
                      : "hover:bg-muted"
                  }`}
                >
                  <span>
                    {passenger.first_name} {passenger.last_name}
                  </span>
                  {isSelected && <Check className="size-4" />}
                </li>
              );
            })}
          </ul>
        )}
      </PopoverContent>
    </Popover>
  );
};
