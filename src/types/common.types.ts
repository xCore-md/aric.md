import ro from "../../messages/ro.json";
import { AVAILABLE_LANGUAGES } from "@/utils/constants";
import type { Station, TripItem, Facility } from "@/types";

export type Messages = typeof ro;

export type Currency = "mdl" | "uah";

export type Prices = {
  [K in Currency as `price_${K}`]?: number;
};

export type TotalAmounts = {
  [K in Currency as `total_amount_${K}`]: number;
};

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
  bookingId?: string;
}

export interface ISearchParams {
  [key: string]: string | string[] | undefined;
}

export interface IParamsAndSearchParams {
  params?: Promise<IParams>;
  searchParams?: Promise<ISearchParams>;
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
  type?: string;
}

export interface PaginatedResponse<T> {
  current_page?: number;
  per_page?: number;
  total?: number;
  data: Array<T>;
  meta?: { current_page: number; per_page: number; total: number };
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

export type SupportedLanguages = (typeof AVAILABLE_LANGUAGES)[number];

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
  departure_datetime: string;
  arrival_datetime: string;
}

export interface FiltersBlock {
  facilities?: Facility[];
  departure_times?: string[];
}

export interface SearchResponse {
  data: TripItem[];
  filters?: FiltersBlock;
  meta: Omit<PaginatedResponse<null>, "data">;
  metadata: {
    from_station: Station;
    to_station: Station;
  };
}

export interface SearchWeklyTripsResponse {
  data: {
    [date: string]: TripItem[];
  };
  metadata: {
    from_station: Station;
    to_station: Station;
    from_station_image: string | null;
    to_station_image: string | null;
  };
}

export interface TripRouteDetailsData {
  data: TripItem[];
  metadata: {
    from_station: Station;
    to_station: Station;
  };
}

export interface User {
  id: number;
  phone: string;
  email: string | null;
  first_name: string | null;
  last_name: string | null;
  language: string;
  created_at: string;
  updated_at: string;
}

export interface TokenResponseData {
  token: string;
  user: User;
}

export interface ExpiresInResponseData {
  expires_in: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface SendCodePayload {
  phone: string;
  language: string;
}

export interface VerifyCodePayload {
  phone: string;
  code: string;
  language: string;
}

export interface RefundCondition {
  id: number;
  hours_before: number;
  percent: string;
  description: string;
}

export enum CurrencyEnum {
  MDL = "MDL",
  UAH = "UAH",
}

export enum LanguageEnum {
  RU = "ru",
  EN = "en",
  RO = "ro",
}

export interface PaginationUIProps {
  totalItems?: number;
  page: number;
  perPage: number;
  onPageChange: (newPage: number) => void;
  onPageSizeChange: (page: number, newLimit: number) => void;
  pageSizeOptions?: number[];
  maxPageButtons?: number;
}
