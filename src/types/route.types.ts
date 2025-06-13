import type {
  DepartureArrivalTime,
  NamesDTO,
  Station,
  Timestamps,
} from "@/types";

export interface Route extends NamesDTO, Timestamps {
  id: number;
  from_station_id: number;
  to_station_id: number;
}

export interface RouteWithStations extends NamesDTO, Timestamps {
  id: number;
  from_station_id: number;
  to_station_id: number;
  from_station: Station;
  to_station: Station;
}

export interface RouteStation extends NamesDTO, DepartureArrivalTime {
  id: number;
  order: number;
}

export interface RoutePrice {
  from_station_id: number;
  to_station_id: number;
  price_mdl: number;
  price_uah: number;
}

export interface RouteWithDetails extends Route {
  stations: RouteStation[];
  route_prices: RoutePrice[];
}

export interface RouteCreateDto extends NamesDTO {
  from_station_id: number;
  to_station_id: number;
}

export interface RouteBulkDto extends RouteCreateDto {
  stations: {
    station_id: number;
    order: number;
    arrival_time: string | null;
    departure_time: string | null;
  }[];
  prices: RoutePrice[];
}

export interface RouteBulkUpdateDto extends RouteCreateDto {
  id: number;
  stations: {
    station_id: number;
    order: number;
    arrival_time: string | null;
    departure_time: string | null;
  }[];
  prices: RoutePrice[];
}

export interface RouteUpdateDto extends NamesDTO {
  id: number;
  from_station_id: number;
  to_station_id: number;
}
