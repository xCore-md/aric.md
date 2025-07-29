import React from "react";
import { useQueryStates, parseAsString, parseAsInteger } from "nuqs";
import type { TicketFormValues } from "@/types";
import { useRouter } from "@/i18n/navigation";

export const useTicketForm = () => {
  const { replace } = useRouter();
  const [searchQueryState, setSearchQueryState] = useQueryStates(
    {
      from_station_id: parseAsInteger.withDefault(0),
      to_station_id: parseAsInteger.withDefault(0),
      departure_date: parseAsString.withDefault(""),
      return_date: parseAsString.withDefault(""),
      passengers: parseAsInteger.withDefault(1),
    },
    {
      history: "push",
    },
  );

  const [fromStationId, setFromStationId] = React.useState(
    searchQueryState?.from_station_id,
  );
  const [toStationId, setToStationId] = React.useState(
    searchQueryState?.to_station_id,
  );
  const [departureDate, setDepartureDate] = React.useState(
    searchQueryState?.departure_date,
  );
  const [returnDate, setReturnDate] = React.useState(
    searchQueryState?.return_date,
  );
  const [passengers, setPassengers] = React.useState(
    searchQueryState?.passengers,
  );

  React.useEffect(() => {
    setFromStationId(searchQueryState.from_station_id);
  }, [searchQueryState.from_station_id]);

  React.useEffect(() => {
    setToStationId(searchQueryState.to_station_id);
  }, [searchQueryState.to_station_id]);

  React.useEffect(() => {
    setDepartureDate(searchQueryState.departure_date);
  }, [searchQueryState.departure_date]);

  React.useEffect(() => {
    setReturnDate(searchQueryState.return_date);
  }, [searchQueryState.return_date]);

  React.useEffect(() => {
    setPassengers(searchQueryState.passengers);
  }, [searchQueryState.passengers]);

  const canSearch = React.useMemo(() => {
    return [fromStationId, toStationId, departureDate, passengers].every(
      Boolean,
    );
  }, [fromStationId, toStationId, departureDate, passengers]);

  const updateTicketSearchParams = React.useCallback(
    (v: TicketFormValues) => {
      replace({ pathname: "/search", query: v });
    },
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
