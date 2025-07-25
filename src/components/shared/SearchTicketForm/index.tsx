"use client";
import React from "react";
import { CalendarSearch, ChevronRightIcon, Search } from "lucide-react";
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
import { LoadingSpinner } from "../LoadingSpinner";

const options = maskitoDateOptionsGenerator({
  mode: "dd/mm/yyyy",
  min: new Date(),
});

interface IProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  placeholder?: string;
  disabled?: boolean;
  loading?: boolean;
  messages?: {
    noData?: string;
  };
}

interface SelectCityProps extends IProps {
  data: {
    value: string;
    label: string;
  }[];
}

export const SearchTicketForm: React.FC<{
  onSubmit: (data: TicketFormValues) => void;
  isLoading?: boolean;
}> = ({ onSubmit, isLoading }) => {
  const t = useTranslations();
  const {
    fromStationId,
    setFromStationId,
    toStationId,
    setToStationId,
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
      from_station_id: Number(fromStationId),
      to_station_id: Number(toStationId),
      departure_date: departureDate,
      ...(returnDate && { return_date: returnDate }),
      passengers: Number(passengers),
    });
  };

  const { data: stations, isFetching: isStationsLoading } = useQuery({
    queryKey: [QUERY_KEYS.searchStations],
    queryFn: () => searchService.getStations(),
    refetchOnWindowFocus: false,
  });

  const {
    data: stationsDestinations,
    refetch: refetchStationsDestinations,
    isFetching: isStationsDestinationsLoading,
  } = useQuery({
    queryKey: [QUERY_KEYS.searchStationsDestinations, fromStationId],
    queryFn: () =>
      searchService.getStationsDestinations({
        from_station_id: Number(fromStationId),
      }),
    enabled: !!fromStationId,
    refetchOnWindowFocus: false,
  });

  const {
    data: tripDates,
    refetch: refetchTripDates,
    isFetching: isTripDatesLoading,
  } = useQuery({
    queryKey: [QUERY_KEYS.searchTripDates, fromStationId, toStationId],
    queryFn: () =>
      searchService.getTripDates({
        from_station_id: Number(fromStationId),
        to_station_id: Number(toStationId),
      }),
    enabled: !!toStationId,
    refetchOnWindowFocus: false,
  });

  const { data: returnTripDates, isFetching: isReturnTripDatesLoading } = useQuery({
    queryKey: [
      QUERY_KEYS.searchReturnTripDates,
      fromStationId,
      toStationId,
      departureDate,
    ],
    queryFn: () =>
      searchService.getReturnTripDates({
        from_station_id: Number(fromStationId),
        to_station_id: Number(toStationId),
        departure_date: format(
          parse(departureDate, "dd.MM.yyyy", new Date()),
          "yyyy/MM/dd",
        ),
      }),
    enabled: !!departureDate,
    refetchOnWindowFocus: false,
  });

  React.useEffect(() => {
    if (fromStationId) {
      refetchStationsDestinations();
    }
  }, [fromStationId]);

  const isFirstToStationRef = React.useRef(true);
  React.useEffect(() => {
    if (isFirstToStationRef.current) {
      isFirstToStationRef.current = false;
      return;
    }
    if (toStationId) {
      setDepartureDate("");
      refetchTripDates();
    }
  }, [toStationId]);

  React.useEffect(() => {
    if (canSearch) {
      handleSubmit();
    }
  }, []);

  return (
    <Card className="ring-platinum ring ring-inset">
      <CardContent className="">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <SelectCity
            placeholder={t("booking.departure_city")}
            value={String(fromStationId)}
            setValue={(value) => setFromStationId(+value)}
            data={
              stations?.map((s) => ({
                value: String(s.id),
                label: s.name_ru,
              })) || []
            }
            loading={isStationsLoading}
          />

          <SelectCity
            placeholder={t("booking.arrival_city")}
            value={String(toStationId)}
            setValue={(value) => setToStationId(+value)}
            data={
              stationsDestinations?.map((s) => ({
                value: String(s.id),
                label: s.name_ru,
              })) || []
            }
            disabled={!fromStationId}
            loading={isStationsDestinationsLoading}
          />

          <SelectDate
            placeholder={t("booking.departure_date")}
            value={departureDate}
            setValue={setDepartureDate}
            disabled={!toStationId}
            allowedDates={tripDates?.dates}
            loading={isTripDatesLoading}
          />

          <SelectDate
            placeholder={t("booking.return_date")}
            value={returnDate}
            setValue={setReturnDate}
            disabled={!departureDate}
            allowedDates={returnTripDates?.dates}
            loading={isReturnTripDatesLoading}
          />

          <div className="col-span-full flex w-full flex-col gap-4 sm:flex-row lg:col-span-1">
            <SelectPassengers
              value={String(passengers)}
              setValue={(value) => setPassengers(+value)}
            />

            <Button
              className="h-16 flex-none lg:size-16"
              type="button"
              disabled={!canSearch || isLoading}
              onClick={handleSubmit}
            >
              <span className="lg:sr-only">{t("action.search")}</span>
              {isLoading ? <LoadingSpinner /> : <Search />}
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
  loading,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    if (loading || disabled) {
      setIsOpen(false);
    }
  }, [loading, disabled]);
  const [inputValue, setInputValue] = React.useState(
    data?.find((item) => item.value === value)?.label || "",
  );
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (value) {
      setInputValue(data?.find((item) => item.value === value)?.label || "");
    }
  }, [value, data]);

  return (
    <Popover
      open={isOpen}
      onOpenChange={(open) => {
        if (!loading && !disabled) {
          setIsOpen(open);
        }
      }}
    >
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
              className="focus:placeholder:text-platinum placeholder:text-text-gray h-full w-full text-black focus:outline-none"
            />
            {!loading && <ChevronRightIcon className="size-5 flex-none" />}
            {loading && <LoadingSpinner className="ml-2" />}
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
        {loading ? (
          <div className="flex justify-center p-2">
            <LoadingSpinner />
          </div>
        ) : (
          data?.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                setValue(String(item?.value));
                setIsOpen(false);
              }}
              type="button"
              className="hover:text-blue flex w-full p-2 text-left transition"
            >
              {item?.label}
            </button>
          ))
        )}
      </PopoverContent>
    </Popover>
  );
};

export const SelectDate: React.FC<IProps & { allowedDates?: string[] }> = ({
  placeholder = "",
  setValue,
  value,
  disabled,
  allowedDates,
  messages,
  loading,
}) => {
  const noDataMessage =
    messages?.noData ?? "Momentan nu sunt date disponibile.";

  const maskedInputRef = useMaskito({
    options,
  });

  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const combinedRef = React.useCallback(
    (el: HTMLInputElement | null) => {
      inputRef.current = el;
      maskedInputRef(el);
    },
    [maskedInputRef],
  );

  const allowedDatesMap = React.useMemo(
    () => allowedDates?.map((d) => new Date(d)),
    [allowedDates],
  );

  const isDayDisabled = React.useCallback(
    (date: Date) =>
      !allowedDatesMap?.some(
        (allowedDate) => allowedDate.toDateString() === date.toDateString(),
      ),
    [allowedDatesMap],
  );

  const handleChange = (date: Date | undefined) => {
    if (date) {
      setValue(format(date, "dd.MM.yyyy"));
      setIsOpen(false);
    }
  };
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    if (loading || disabled) {
      setIsOpen(false);
    }
  }, [loading, disabled]);

  return (
    <Popover
      open={isOpen}
      onOpenChange={(open) => {
        if (!loading && !disabled) {
          setIsOpen(open);
        }
      }}
    >
      <div className="relative w-full">
        <PopoverTrigger asChild>
          <div
            className={cn(
              "text-text-gray flex h-16 items-center gap-3 rounded-full border bg-white px-4",
              "focus-within:border-blue focus-within:text-blue",
              disabled && "bg-muted pointer-events-none opacity-50",
            )}
          >
            <div>🗓️</div>
            <div className="flex flex-col">
              <div className="text-sm">{placeholder}</div>
              <input
                ref={combinedRef}
                value={value}
                onInput={(e) => {
                  const val = e.currentTarget.value;
                  if (val.length !== 10) return;

                  const parsed = parse(val, "dd.MM.yyyy", new Date());
                  if (isValid(parsed)) {
                    setValue(format(parsed, "dd.MM.yyyy"));
                    setIsOpen(false);
                  }
                }}
                type="text"
                placeholder="31.12.2020"
                className="focus:placeholder:text-platinum placeholder:text-text-gray h-full w-full text-black focus:outline-none"
              />
            </div>
            {loading && <LoadingSpinner className="ml-2" />}
          </div>
        </PopoverTrigger>
      </div>
      <PopoverContent
        className={cn(
          "w-auto p-0",
          !loading && allowedDates !== undefined && !allowedDates.length && "w-56 p-4",
        )}
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        {loading ? (
          <div className="flex justify-center p-4">
            <LoadingSpinner />
          </div>
        ) : !allowedDates?.length && allowedDates !== undefined ? (
          <div className="text-muted-foreground flex flex-col items-center gap-1 text-center text-sm">
            <CalendarSearch className="size-6 flex-none" />
            <span>{noDataMessage}</span>
          </div>
        ) : (
          <Calendar
            mode="single"
            selected={parse(value, "dd.MM.yyyy", new Date())}
            onSelect={handleChange}
            className="rounded-md border"
            disabled={isDayDisabled}
          />
        )}
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
