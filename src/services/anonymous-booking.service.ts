import { apiInstance } from "@/utils/api";

export type AnonymousBookingInitResponse = {
  anonymous_booking_id: number;
  payment_id: number;
  redirect_url: string;
  status: string;
};

class AnonymousBookingService {
  private clientApi = apiInstance;

  init(data: { trip_id: number; amount: number; note?: string }) {
    return this.clientApi
      .post("anonymous-bookings/init", { json: data })
      .json<AnonymousBookingInitResponse>();
  }
}

export const anonymousBookingService = new AnonymousBookingService();
