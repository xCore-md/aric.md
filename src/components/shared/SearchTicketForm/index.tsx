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
import { useTranslations } from "next-intl";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/utils/constants";
import { searchService } from "@/services/search.service";

const options = maskitoDateOptionsGenerator({
  mode: "dd/mm/yyyy",
  min: new Date(),
});

interface IProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  placeholder?: string;
  disabled?: boolean;
}

interface SelectCityProps extends IProps {
  data: {
    value: string;
    label: string;
  }[];
}

export const SearchTicketForm: React.FC<{
  onSubmit: (data: TicketFormValues) => void;
}> = ({ onSubmit }) => {
  const t = useTranslations();
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

  const { data: stations } = useQuery({
    queryKey: [QUERY_KEYS.searchStations],
    queryFn: () => searchService.getStations(),
  });

  const { data: stationsDestinations } = useQuery({
    queryKey: [QUERY_KEYS.searchStationsDestinations, departureCity],
    queryFn: () =>
      searchService.getStationsDestinations({
        from_station_id: Number(departureCity),
      }),
    enabled: !!departureCity,
  });

  const { data: tripDates } = useQuery({
    queryKey: [QUERY_KEYS.searchTripDates, departureCity, arrivalCity],
    queryFn: () =>
      searchService.getTripDates({
        from_station_id: Number(departureCity),
        to_station_id: Number(arrivalCity),
      }),
    enabled: !!arrivalCity && !!departureCity,
  });

  const { data: returnTripDates } = useQuery({
    queryKey: [
      QUERY_KEYS.searchReturnTripDates,
      departureCity,
      arrivalCity,
      departureDate,
    ],
    queryFn: () =>
      searchService.getReturnTripDates({
        from_station_id: Number(departureCity),
        to_station_id: Number(arrivalCity),
        departure_date: departureDate,
      }),
    enabled: !!arrivalCity && !!departureCity && !!departureDate,
  });

  console.log("✅ tripDates:", tripDates);

  return (
    <Card className="ring-platinum ring ring-inset">
      <CardContent className="">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <SelectCity
            placeholder={t("booking.departure_city")}
            value={departureCity}
            setValue={setDepartureCity}
            data={
              stations?.map((s) => ({
                value: String(s.id),
                label: s.name_ru,
              })) || []
            }
          />

          <SelectCity
            placeholder={t("booking.arrival_city")}
            value={arrivalCity}
            setValue={setArrivalCity}
            data={
              stationsDestinations?.map((s) => ({
                value: String(s.id),
                label: s.name_ru,
              })) || []
            }
            disabled={!departureCity}
          />

          <SelectDate
            placeholder={t("booking.departure_date")}
            value={departureDate}
            setValue={setDepartureDate}
            disabled={!arrivalCity}
            allowedDates={tripDates?.dates}
          />

          <SelectDate
            placeholder={t("booking.return_date")}
            value={returnDate}
            setValue={setReturnDate}
            disabled={!departureDate}
            allowedDates={returnTripDates?.dates}
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

const SelectCity: React.FC<SelectCityProps> = ({
  value,
  setValue,
  placeholder = "",
  data,
  disabled,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState(
    data?.find((item) => item.value === value)?.label || "",
  );
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (value) {
      setInputValue(data?.find((item) => item.value === value)?.label || "");
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
              disabled && "bg-muted pointer-events-none opacity-50",
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
            onClick={() => setValue(String(item?.value))}
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

const SelectDate: React.FC<IProps & { allowedDates?: string[] }> = ({
  placeholder = "",
  setValue,
  value,
  disabled,
  allowedDates,
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

  const allowedDatesMap = allowedDates?.map((d) => new Date(d));

  const isDayDisabled = React.useCallback(
    (date: Date) => {
      return !allowedDatesMap?.some(
        (allowedDate) => allowedDate.toDateString() === date.toDateString(),
      );
    },
    [allowedDatesMap],
  );

  return (
    <Popover>
      <div className="relative w-full">
        <PopoverTrigger asChild>
          <div
            className={cn(
              "flex h-16 items-center gap-3 rounded-full border bg-white px-4",
              "focus-within:border-blue focus-within:text-blue",
              disabled && "bg-muted pointer-events-none opacity-50",
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

                  if (isValid(parsedDate)) {
                    setValue(format(parsedDate, "dd.MM.yyyy"));
                  }
                }}
                type="text"
                placeholder="31.12.2020"
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
        }}
      >
        <Calendar
          mode="single"
          selected={parse(inputValue, "dd.MM.yyyy", new Date())}
          onSelect={handleChange}
          className="rounded-md border"
          disabled={isDayDisabled}
        />
      </PopoverContent>
    </Popover>
  );
};

const SelectPassengers: React.FC<IProps> = ({ value, setValue, disabled }) => {
  const t = useTranslations();
  return (
    <div
      className={cn(
        "flex h-16 w-full items-center gap-3 rounded-full border bg-white px-4",
        "focus-within:border-blue focus-within:text-blue",
        disabled && "bg-muted pointer-events-none opacity-50",
      )}
    >
      <div>👤</div>
      <div className="w-full">
        <div className="text-sm">{t("booking.passengers")}</div>
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
