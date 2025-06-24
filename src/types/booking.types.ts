import { Timestamps, Currency, Prices, TotalAmounts } from "@/types";

export type BookingStatus = "draft" | "confirmed" | "cancelled";

export interface Booking extends Timestamps, TotalAmounts {
  id: number;
  customer_id: number;
  trip_id: number;
  return_trip_id: number | null;
  station_from_id: number | null;
  station_to_id: number | null;
  adult_count: number;
  child_count: number;
  passenger_count: number;
  currency: Currency;
  status: BookingStatus;
}

export interface BookingInitDto {
  trip_id: number;
  return_trip_id: number | null;
  from_station_id: number;
  to_station_id: number;
  currency: Currency;
}

export interface BookingInitResponse {
  booking_id: number | null;
  price: Prices | null;
  available_seats: number;
}
