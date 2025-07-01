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
import { PassengerType } from "@/types";

type Props = {
  type?: PassengerType;
  selectedIds: number[];
  onSelect: (ids: number[]) => void;
};

export const PassengerSelectExisting: React.FC<Props> = ({
  type = "adult",
  selectedIds,
  onSelect,
}) => {
  const t = useTranslations();
  const [open, setOpen] = React.useState(false);

  const { data: passengers, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.passengers, type],
    queryFn: () => passengerService.getAll({ type }),
  });

  const toggleSelection = (id: number) => {
    const newSelected = selectedIds.includes(id)
      ? selectedIds.filter((i) => i !== id)
      : [...selectedIds, id];
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
            {passengers?.data?.map((passenger) => {
              const selected = selectedIds.includes(passenger.id);
              return (
                <li
                  key={passenger.id}
                  onClick={() => toggleSelection(passenger.id)}
                  className={`flex cursor-pointer items-center justify-between rounded-md px-3 py-2 ${
                    selected
                      ? "bg-accent text-accent-foreground"
                      : "hover:bg-muted"
                  }`}
                >
                  <span>
                    {passenger.first_name} {passenger.last_name}
                  </span>
                  {selected && <Check className="size-4" />}
                </li>
              );
            })}
          </ul>
        )}
      </PopoverContent>
    </Popover>
  );
};
