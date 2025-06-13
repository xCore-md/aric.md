import type {
  Bus,
  BusWithFacilities,
  DepartureArrivalTime,
  Route,
  RouteWithStations,
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

export interface TripSegment extends DepartureArrivalTime {
  id: number;
  bus: BusWithFacilities;
  route: Route;
}

export interface TripItem {
  type: "round-trip" | "one-way";
  route_departure: TripSegment;
  routes_return: TripSegment[];
}
