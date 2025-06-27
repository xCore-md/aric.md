import { useQuery } from "@tanstack/react-query";
import { bookingService } from "@/services/booking.service";
import { QUERY_KEYS } from "@/utils/constants";

type Params = {
  bookingId?: number;
  passengerCounts: { adults: number; children: number };
};

const DEFAULT_ADULT_COUNT = 1;

export const useBookingPrice = ({ bookingId, passengerCounts }: Params) => {
  const { adults = DEFAULT_ADULT_COUNT, children = 0 } = passengerCounts;

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: [QUERY_KEYS.bookingPrice, bookingId, adults, children],
    queryFn: () =>
      bookingService.getPrice({
        booking_id: bookingId!,
        adults,
        children,
      }),
    enabled: !!bookingId && (adults > DEFAULT_ADULT_COUNT || children > 0),
  });

  return {
    prices: data,
    isLoading,
    isError,
    error,
    refetch,
  };
};
