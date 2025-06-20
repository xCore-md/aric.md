import type {
  Bus,
  BusWithFacilities,
  DepartureArrivalTime,
  Route,
  RouteWithStations,
  Station,
  Timestamps,
} from "@/types";

export interface Trip extends Timestamps, DepartureArrivalTime {
  id: number;
  route_id: number;
  bus_id: number;
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

export type Currency = "mdl" | "uah";

export type Prices = {
  [K in Currency as `price_${K}`]?: number;
};

export interface TripSegment extends DepartureArrivalTime {
  id: number;
  bus: BusWithFacilities;
  route: Route & { stations: Station[] };
  seats_available: number;
  seats_taken: number;
  seats_total: number;
}

export interface TripItem {
  type: "round-trip" | "one-way";
  prices: Prices;
  route_departure: TripSegment;
  routes_return: TripSegment[];
  duration_minutes: number;
}
