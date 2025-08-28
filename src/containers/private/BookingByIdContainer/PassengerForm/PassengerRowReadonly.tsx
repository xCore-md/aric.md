"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Delete } from "lucide-react";
import { useFormatUTCToLocal } from "@/hooks/useFormatUTCToLocal ";

type Props = {
  index: number;
  first_name: string;
  last_name: string;
  phone?: string | null;
  birth_date?: string | null;
  onRemove: () => void;
};

export const PassengerRowReadonly: React.FC<Props> = ({
  index,
  first_name,
  last_name,
  phone,
  birth_date,
  onRemove,
}) => {
  const { formatUTC } = useFormatUTCToLocal();
  return (
    <div className="flex h-full w-full items-center gap-2 rounded-lg bg-white p-2">
      <div className="bg-blue/10 flex h-7 min-w-7 items-center justify-center rounded-full text-sm font-medium">
        {index + 1}
      </div>
      <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2">
        <Input value={last_name} disabled />
        <Input value={first_name} disabled />
        <Input value={phone || "--- --- ---"} disabled />
        <Input
          value={birth_date ? formatUTC(birth_date)?.date : "-- --- ----"}
          disabled
        />
      </div>
      <Button
        variant="ghost"
        size="sm-icon"
        type="button"
        className="text-red disabled:text-gray-300"
        onClick={onRemove}
      >
        <Delete />
      </Button>
    </div>
  );
};
