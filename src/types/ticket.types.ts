import { Booking, BookingStatus, Timestamps } from ".";

export interface Ticket extends Timestamps {
  id: number;
  ticket_code: string;
  passenger_name: string;
  status: BookingStatus;
  price_mdl: string;
  price_uah: string;
  created_at: string;

  booking: Pick<
    Booking,
    "trip" | "return_trip" | "total_amount_mdl" | "total_amount_uah"
  >;
}
