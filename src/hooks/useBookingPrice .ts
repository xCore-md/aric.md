import { useQuery } from "@tanstack/react-query";
import { bookingService } from "@/services/booking.service";
import { QUERY_KEYS } from "@/utils/constants";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";

type Params = {
  bookingId?: number;
  passengerCounts: { adult: number; child: number };
};

const DEFAULT_ADULT_COUNT = 1;

export const useBookingPrice = ({ bookingId, passengerCounts }: Params) => {
  const debouncedPassengerCounts = useDebouncedValue(passengerCounts, 1000);

  const { adult = DEFAULT_ADULT_COUNT, child = 0 } = debouncedPassengerCounts;

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: [QUERY_KEYS.bookingPrice, bookingId, adult, child],
    queryFn: () =>
      bookingService.recalculate({
        booking_id: bookingId!,
        adult_count: adult,
        child_count: child,
      }),
    enabled: !!bookingId && (adult > DEFAULT_ADULT_COUNT || child > 0),
  });

  return {
    recalculatedPrices: data,
    isRecalculatingPrice: isLoading,
    isRecalculateError: isError,
    recalculateError: error,
    refetchRecalculatePrices: refetch,
  };
};
