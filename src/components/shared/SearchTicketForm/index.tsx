"use client";
import React from "react";
import { useQueryState } from "nuqs";
import { Check, ChevronRightIcon, CalendarIcon, Search } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AuthForm } from "@/components/shared/AuthForm";

export const SearchTicketForm: React.FC = () => {
  const [departureCity, setDepartureCity] = useQueryState("departure");
  const [arrivalCity, setArrivalCity] = useQueryState("arrival");

  return (
    <div className="flex items-center gap-4 rounded-2xl border bg-white p-8 shadow-lg">
      <SelectCity placeholder="Orașul de pornire" />
      <SelectCity placeholder="Orașul de sosire" />

      <SelectDate placeholder="Data plecării" />
      <SelectDate placeholder="Data retur" />

      <SelectPassengers />

      <Dialog>
        <DialogTrigger asChild>
          <Button size="icon">
            <Search />
          </Button>
        </DialogTrigger>
        <DialogContent className="min-h-[90vh]">
          <DialogHeader className="sr-only">
            <DialogTitle />
            <DialogDescription />
          </DialogHeader>

          <div className="p-20">
            <AuthForm />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const SelectCity: React.FC<{ placeholder?: string }> = ({
  placeholder = "",
}) => {
  const [value, setValue] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);

  const inputRef = React.useRef<HTMLInputElement>(null);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <div className="relative">
        <PopoverTrigger asChild>
          <div
            className={cn(
              "flex h-16 w-3xs items-center gap-3 rounded-full border bg-white px-4",
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
        className="w-3xs p-0"
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
          Chișinău
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
                placeholder="1"
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
          maskedInputRef.current?.focus();
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
        "flex h-16 items-center gap-3 rounded-full border bg-white px-4",
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
