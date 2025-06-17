import { SUPORTED_LANGUAGES } from "@/utils/constants";
import ro from "../../messages/ro.json";
import { TripItem } from "./trip.types";

export type Messages = typeof ro;

export interface ILoginResponse {
  access: string;
  refresh: string;
  user: {
    pk: string;
    email: string;
  };
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IParams {
  routeId?: string;
}

export interface ISearchParams {
  [key: string]: string | string[] | undefined;
}

export interface IParamsAndSearchParams {
  params?: IParams;
  searchParams?: ISearchParams;
}

export interface PaginationParams {
  page?: number;
  per_page?: number;
  limit?: number;
  from_station_id?: number;
  to_station_id?: number;
  departure_date?: string;
  passengers?: number;
  search?: string;
}

export interface PaginatedResponse<T> {
  current_page: number;
  per_page: number;
  total: number;
  data: Array<T>;
}

export type TicketFormValues = {
  from_station_id: number;
  to_station_id: number;
  departure_date: string;
  return_date?: string;
  passengers: number;
};

export interface Timestamps {
  created_at: string;
  updated_at: string;
}

export type SupportedLanguages = (typeof SUPORTED_LANGUAGES)[number];

export type NamesDTO = {
  [K in SupportedLanguages as `name_${K}`]: string;
};

export type AddressDTO = {
  [K in SupportedLanguages as `address_${K}`]: string;
};

export interface Coordinates {
  latitude: string | null;
  longitude: string | null;
}

export interface DepartureArrivalTime {
  departure_time: string;
  arrival_time: string;
}

export interface SearchResponse extends PaginatedResponse<TripItem> {
  data: TripItem[];
  // filters: FiltersBlock;
}
