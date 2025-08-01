import { Booking, BookingStatusEnum, Timestamps } from ".";

export interface Ticket extends Timestamps {
  id: number;
  ticket_code: string;
  passenger_name: string;
  direction: "forward" | "return";
  status: BookingStatusEnum;
  price_mdl: string;
  price_uah: string;
  created_at: string;

  booking: Pick<
    Booking,
    | "trip"
    | "return_trip"
    | "total_amount_mdl"
    | "total_amount_uah"
    | "payment"
  >;
}
