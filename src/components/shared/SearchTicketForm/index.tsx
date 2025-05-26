"use client";
import React from "react";
import { useQueryState } from "nuqs";
import { ChevronRightIcon, Search } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const SearchTicketForm: React.FC = () => {
  const [departureCity, setDepartureCity] = useQueryState("departure");
  const [arrivalCity, setArrivalCity] = useQueryState("arrival");

  console.log({ departureCity, arrivalCity, setDepartureCity, setArrivalCity });

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      <SelectCity placeholder="Orașul de pornire" />
      <SelectCity placeholder="Orașul de sosire" />

      <SelectDate placeholder="Data plecării" />
      <SelectDate placeholder="Data retur" />

      <div className="col-span-full flex w-full flex-col gap-4 sm:flex-row lg:col-span-1">
        <SelectPassengers />

        <Button className="h-16 flex-none lg:size-16">
          <span className="lg:sr-only">Căutare</span>
          <Search />
        </Button>
      </div>
    </div>
  );
};

const SelectCity: React.FC<{ placeholder?: string }> = ({
  placeholder = "",
}) => {
  const [value, setValue] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);

  const inputRef = React.useRef<HTMLInputElement>(null);

  console.log(value);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <div className="relative">
        <PopoverTrigger asChild>
          <div
            className={cn(
              "flex h-16 items-center gap-3 rounded-full border bg-white px-4",
              isOpen &&
                "border-blue text-blue [&[data-state=open]>svg]:rotate-90",
            )}
          >
            <div>📍</div>
            <input
              ref={inputRef}
              type="text"
              placeholder={placeholder}
              className="focus:placeholder:text-platinum placeholder:text-text-gray text-text-gray h-full w-full focus:outline-none"
            />
            <ChevronRightIcon className="size-5 flex-none" />
          </div>
        </PopoverTrigger>
      </div>

      <PopoverContent
        align="start"
        className="w-full p-0"
        onOpenAutoFocus={(event) => {
          event.preventDefault();
          inputRef.current?.focus();
        }}
      >
        <button
          onClick={() => setValue("Chișinău")}
          type="button"
          className="hover:text-blue w-full px-4 py-2 text-left transition"
        >
          Chișinău Chișinău Chișinău
        </button>
      </PopoverContent>
    </Popover>
  );
};

import { useMaskito } from "@maskito/react";
import { Calendar } from "@/components/ui/calendar";

const SelectDate: React.FC<{ placeholder?: string }> = ({
  placeholder = "",
}) => {
  const maskedInputRef = useMaskito({
    options: {
      mask: [
        /\d/,
        /\d/,
        "/", // zi
        /\d/,
        /\d/,
        "/", // lună
        /\d/,
        /\d/,
        /\d/,
        /\d/, // an
      ],
    },
  });
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  return (
    <Popover>
      <div className="relative w-full">
        <PopoverTrigger asChild>
          <div
            className={cn(
              "flex h-16 items-center gap-3 rounded-full border bg-white px-4",
              "focus-within:border-blue focus-within:text-blue",
            )}
          >
            <div>🗓️</div>
            <div className="">
              <div className="text-sm">{placeholder}</div>
              <input
                ref={maskedInputRef}
                type="text"
                placeholder="31/12/2020"
                className="focus:placeholder:text-platinum placeholder:text-text-gray text-text-gray h-full w-full focus:outline-none"
              />
            </div>
          </div>
        </PopoverTrigger>
      </div>
      <PopoverContent
        className="w-auto p-0"
        onOpenAutoFocus={(event) => {
          event.preventDefault();
          // maskedInputRef?.current?.focus();
        }}
      >
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
        />
      </PopoverContent>
    </Popover>
  );
};

const SelectPassengers: React.FC = () => {
  return (
    <div
      className={cn(
        "flex h-16 w-full items-center gap-3 rounded-full border bg-white px-4",
        "focus-within:border-blue focus-within:text-blue",
      )}
    >
      <div>👤</div>
      <div className="">
        <div className="text-sm">Pasageri</div>
        <input
          type="text"
          placeholder="1"
          className="focus:placeholder:text-platinum placeholder:text-text-gray text-text-gray h-full w-full focus:outline-none"
        />
      </div>
    </div>
  );
};
