import type { Prices, RoutePrice, Station } from "@/types";

/**
 * Calculate the price between two stations using route's station list and route_prices.
 *
 * @param route - Route object with stations and route_prices (цены на все участки)
 * @param fromStationId - ID станции отправления (первая выбранная станция)
 * @param toStationId - ID станции назначения (конечная выбранная станция)
 * @returns Prices - сумма по всем участкам между from и to (включая все промежуточные)
 */
export const calculateTripPrices = (
  route: { stations: Station[]; route_prices: RoutePrice[] },
  fromStationId: number,
  toStationId: number,
): Prices => {
  // Найти индексы начальной и конечной станции в массиве
  const fromIndex = route.stations.findIndex((s) => s.id === fromStationId);
  const toIndex = route.stations.findIndex((s) => s.id === toStationId);

  // Если не найдены или путь построен некорректно — цена 0
  if (fromIndex === -1 || toIndex === -1 || fromIndex >= toIndex) {
    return { price_mdl: 0, price_uah: 0 };
  }

  let price_mdl = 0;
  let price_uah = 0;

  // Суммируем стоимость всех сегментов между станциями (по порядку следования!)
  for (let i = fromIndex; i < toIndex; i++) {
    const from = route.stations[i].id;
    const to = route.stations[i + 1].id;
    const price = route.route_prices.find(
      (p) => p.from_station_id === from && p.to_station_id === to
    );
    if (price) {
      price_mdl += price.price_mdl;
      price_uah += price.price_uah;
    }
  }

  return { price_mdl, price_uah };
};
