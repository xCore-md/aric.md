"use client";
import React from "react";
import { ChevronRightIcon, Search } from "lucide-react";
import { useMaskito } from "@maskito/react";
import { maskitoDateOptionsGenerator } from "@maskito/kit";
import { format, isValid, parse } from "date-fns";

import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTicketForm } from "@/hooks/useTicketForm";
import type { TicketFormValues } from "@/types";

const options = maskitoDateOptionsGenerator({
  mode: "dd/mm/yyyy",
  min: new Date(),
});

interface IProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  placeholder?: string;
}

export const SearchTicketForm: React.FC<{
  onSubmit: (data: TicketFormValues) => void;
}> = ({ onSubmit }) => {
  const {
    departureCity,
    setDepartureCity,
    arrivalCity,
    setArrivalCity,
    departureDate,
    setDepartureDate,
    returnDate,
    setReturnDate,
    passengers,
    setPassengers,
    canSearch,
  } = useTicketForm();

  const handleSubmit = () => {
    if (!canSearch) return;
    onSubmit({
      departureCity,
      arrivalCity,
      departureDate,
      returnDate,
      passengers,
    });
  };

  return (
    <Card className="ring-platinum ring ring-inset">
      <CardContent className="">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <SelectCity
            placeholder="Orașul de pornire"
            value={departureCity}
            setValue={setDepartureCity}
          />
          <SelectCity
            placeholder="Orașul de sosire"
            value={arrivalCity}
            setValue={setArrivalCity}
          />

          <SelectDate
            placeholder="Data plecării"
            value={departureDate}
            setValue={setDepartureDate}
          />
          <SelectDate
            placeholder="Data retur"
            value={returnDate}
            setValue={setReturnDate}
          />

          <div className="col-span-full flex w-full flex-col gap-4 sm:flex-row lg:col-span-1">
            <SelectPassengers value={passengers} setValue={setPassengers} />

            <Button
              className="h-16 flex-none lg:size-16"
              type="button"
              disabled={!canSearch}
              onClick={handleSubmit}
            >
              <span className="lg:sr-only">Căutare</span>
              <Search />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const SelectCity: React.FC<IProps> = ({
  value,
  setValue,
  placeholder = "",
}) => {
  const data = [
    {
      id: 1,
      label: "Chisinau",
    },
    {
      id: 2,
      label: "Balti",
    },
    {
      id: 3,
      label: "Bucuresti",
    },
    {
      id: 4,
      label: "Kiev",
    },
  ];

  const [isOpen, setIsOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState(value);
  const inputRef = React.useRef<HTMLInputElement>(null);

  console.log(value);

  React.useEffect(() => {
    if (value) {
      setInputValue(value);
    }
  }, [value]);

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
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
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
        className="p-2"
        onOpenAutoFocus={(event) => {
          event.preventDefault();
          inputRef.current?.focus();
        }}
      >
        {data?.map((item, index) => (
          <button
            key={index}
            onClick={() => setValue(String(item?.label))}
            type="button"
            className="hover:text-blue flex w-full p-2 text-left transition"
          >
            {item?.label}
          </button>
        ))}
      </PopoverContent>
    </Popover>
  );
};

const SelectDate: React.FC<IProps> = ({
  placeholder = "",
  setValue,
  value,
}) => {
  const maskedInputRef = useMaskito({
    options,
  });
  const [inputValue, setInputValue] = React.useState(value);

  const handleChange = (date: Date | undefined) => {
    if (date) {
      setValue(format(date, "dd.MM.yyyy"));
    }
  };

  React.useEffect(() => {
    if (value) {
      setInputValue(value);
    }
  }, [value]);
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
                value={inputValue}
                onInput={(e) => {
                  const value = e.currentTarget.value;
                  setInputValue(value);

                  if (value.length !== 10) return;

                  const parsedDate = parse(value, "dd.MM.yyyy", new Date());
                  console.log({ value });
                  console.log({ parsedDate });

                  if (isValid(parsedDate)) {
                    setValue(format(parsedDate, "dd.MM.yyyy"));
                  }
                }}
                type="text"
                placeholder="31/12/2020"
                className="focus:placeholder:text-platinum placeholder:text-text-gray text-text-gray h-full w-full text-black focus:outline-none"
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
          selected={parse(inputValue, "dd.MM.yyyy", new Date())}
          onSelect={handleChange}
          className="rounded-md border"
        />
      </PopoverContent>
    </Popover>
  );
};

const SelectPassengers: React.FC<IProps> = ({ value, setValue }) => {
  return (
    <div
      className={cn(
        "flex h-16 w-full items-center gap-3 rounded-full border bg-white px-4",
        "focus-within:border-blue focus-within:text-blue",
      )}
    >
      <div>👤</div>
      <div className="w-full">
        <div className="text-sm">Pasageri</div>
        <input
          value={value || "1"}
          onChange={(event) => setValue(event?.target.value)}
          type="number"
          min={1}
          placeholder="1"
          className="focus:placeholder:text-platinum h-full w-full text-black focus:outline-none"
        />
      </div>
    </div>
  );
};
