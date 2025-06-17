import React from "react";
import { useQueryStates, parseAsString, parseAsInteger } from "nuqs";
import { format, parse } from "date-fns";
import type { PaginationParams, TicketFormValues } from "@/types";
import { toApiDate } from "@/utils/format-date";

export const useTicketForm = () => {
  const [, setSearchQueryState] = useQueryStates(
    {
      from_station_id: parseAsInteger,
      to_station_id: parseAsInteger,
      departure_date: parseAsString,
      return_date: parseAsString,
      passengers: parseAsInteger.withDefault(1),
    },
    {
      history: "push",
    },
  );

  const [fromStationId, setFromStationId] = React.useState("");
  const [toStationId, setToStationId] = React.useState("");
  const [departureDate, setDepartureDate] = React.useState("");
  const [returnDate, setReturnDate] = React.useState("");
  const [passengers, setPassengers] = React.useState("1");

  console.log({
    fromStationId,
    toStationId,
    departureDate,
    returnDate,
    passengers,
  });

  const canSearch = React.useMemo(() => {
    return [fromStationId, toStationId, departureDate, passengers].every(
      Boolean,
    );
  }, [fromStationId, toStationId, departureDate, passengers]);

  const updateTicketSearchParams = React.useCallback(
    (v: TicketFormValues) => setSearchQueryState(v),
    [setSearchQueryState],
  );

  return {
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
    updateTicketSearchParams,
  };
};
