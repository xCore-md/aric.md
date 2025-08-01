import type {
  Timestamps,
  Currency,
  Prices,
  TotalAmounts,
  Trip,
  Station,
  User,
  Ticket,
  DepartureArrivalTime,
  TripItem,
  PassengerCreateDto,
  CurrencyEnum,
} from "@/types";
import { PaymentInput, Payment } from "./payment.types";

export enum BookingStatusEnum {
  Draft = "draft",
  Reserved = "reserved",
  Paid = "paid",
  Cancelled = "cancelled",
}

export interface Booking
  extends Timestamps,
    TotalAmounts,
    DepartureArrivalTime {
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
  status: BookingStatusEnum;

  customer: User;
  trip: TripItem;
  return_trip: Trip | null;
  station_from: Station | null;
  station_to: Station | null;
  tickets: Ticket[];
  payment?: Payment | null;
}

export interface BookingInitDto {
  trip_id: number;
  return_trip_id: number | null;
  from_station_id: number;
  to_station_id: number;
}

export interface BookingInitResponse {
  booking_id: number | null;
  price: Prices | null;
  available_seats: number;
}

export type DraftBookingPayload = {
  trip_id: number;
  from_station_id: number;
  to_station_id: number;
  return_trip_id: number | null;
  draft_booking_id: number | null;
};

export type BookingRecalculatePricePayload = {
  booking_id: number;
  adult_count: number;
  child_count: number;
};

export type BookingPayload = {
  currency: CurrencyEnum;
  passengers: {
    new: PassengerCreateDto[];
    existing: number[];
  };
  payment: PaymentInput;
};

export interface BookingCompleteDto extends BookingPayload {
  booking_id: number;
  recaptcha_token: string;
}

export interface BookingCompleteResponse {
  booking_id: number;
  redirect_url: string;
}
