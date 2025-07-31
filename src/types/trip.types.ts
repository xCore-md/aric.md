import type {
  Bus,
  BusWithFacilities,
  DepartureArrivalTime,
  Prices,
  Route,
  RouteWithStations,
  Station,
  Timestamps,
  RoutePrice,
} from "@/types";

export interface Trip extends Timestamps, DepartureArrivalTime {
  id: number;
  route_id: number;
  bus_id: number;
  recurring_trip_id: number;
  route: {
    stations: Station;
  };
}

export interface TripWithRelations extends Timestamps, DepartureArrivalTime {
  id: number;
  route_id: number;
  bus_id: number;
  bus: Bus;
  route: RouteWithStations;
}

export interface TripCreateDto extends DepartureArrivalTime {
  route_id: number;
  bus_id: number;
}

export interface TripUpdateDto extends DepartureArrivalTime {
  id: number;
  route_id: number;
  bus_id: number;
}

export interface TripSegment extends DepartureArrivalTime {
  id: number;
  bus: BusWithFacilities;
  route: Route & { stations: Station[]; route_prices: RoutePrice[] };
  seats_available: number;
  seats_taken: number;
  seats_total: number;
  draft_booking_id: number | null;
  departure_date: string;
  arrival_date: string;
}

export interface TripItem {
  type: "round-trip" | "one-way";
  prices: Prices;
  route_departure: TripSegment;
  routes_return: TripSegment[];
  duration_minutes: number;
}
