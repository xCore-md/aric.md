import { useMemo } from "react";

export function usePassengerPricing({
  passengerCounts,
  basePrice,
  childDiscount = 0.5,
}: {
  passengerCounts: { adults: number; children: number };
  basePrice: number;
  childDiscount?: number;
}) {
  const { adults, children } = passengerCounts;

  return useMemo(() => {
    const adultTotal = adults * basePrice;
    const childTotal = children * basePrice * (1 - childDiscount);
    const total = adultTotal + childTotal;

    return {
      adults,
      children,
      adultTotal,
      childTotal,
      total,
    };
  }, [adults, children, basePrice, childDiscount]);
}
