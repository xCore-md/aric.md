import React from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "@/i18n/navigation";
import type { TicketFormValues } from "@/types";

export const useTicketForm = () => {
    const { replace } = useRouter();
    const searchParams = useSearchParams();
    const getParam = (key: string, def = "") => searchParams?.get(key) || def;

    const [departureCity, setDepartureCity] = React.useState(
      getParam("departureCity"),
    );
    const [arrivalCity, setArrivalCity] = React.useState(
      getParam("arrivalCity"),
    );
    const [departureDate, setDepartureDate] = React.useState(
      getParam("departureDate"),
    );
    const [returnDate, setReturnDate] = React.useState(getParam("returnDate"));
    const [passengers, setPassengers] = React.useState(
      getParam("passengers", "1"),
    );

    const canSearch = React.useMemo(
      () =>
        [
          departureCity,
          arrivalCity,
          departureDate,
          returnDate,
          passengers,
        ].every(Boolean),
      [departureCity, arrivalCity, departureDate, returnDate, passengers],
    );

    function updateTicketSearchParams(data: TicketFormValues) {
      const searchParams = new URLSearchParams(data);
      const queryString = searchParams.toString();

      replace(`/search?${queryString}`);
    }

    return {
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
      updateTicketSearchParams,
    };
  };
  