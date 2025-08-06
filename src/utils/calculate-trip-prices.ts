import type { Prices, RoutePrice, Station } from "@/types";

export const calculateTripPrices = (
  route: { stations: Station[]; route_prices: RoutePrice[] },
  fromStationId: number,
  toStationId: number,
): Prices => {
  const fromIndex = route.stations.findIndex((s) => s.id === fromStationId);
  const toIndex = route.stations.findIndex((s) => s.id === toStationId);

  let price_mdl = 0;
  let price_uah = 0;

  if (fromIndex === -1 || toIndex === -1 || fromIndex >= toIndex) {
    return { price_mdl, price_uah };
  }

  for (let i = fromIndex; i < toIndex; i++) {
    const from = route.stations[i].id;
    const to = route.stations[i + 1].id;
    const price = route.route_prices.find(
      (p) => p.from_station_id === from && p.to_station_id === to,
    );
    if (price) {
      price_mdl += price.price_mdl;
      price_uah += price.price_uah;
    }
  }

  return { price_mdl, price_uah };
};

