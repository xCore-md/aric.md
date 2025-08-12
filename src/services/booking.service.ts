import { apiInstance } from "@/utils/api";
import {
  Booking,
  BookingCompleteDto,
  BookingCompleteResponse,
  BookingInitDto,
  BookingInitResponse,
  BookingRecalculatePricePayload,
  PaginatedResponse,
  PaginationParams,
  Prices,
} from "@/types";

class BookingService {
  private clientApi = apiInstance;

  getAll(params?: PaginationParams) {
    return this.clientApi
      .get("customer/bookings/bulk", { searchParams: { ...params } })
      .json<PaginatedResponse<Booking>>();
  }

  getDrafts(params?: PaginationParams) {
    return this.clientApi
      .get("customer/bookings/bulk", {
        searchParams: { ...params, status: "draft" },
      })
      .json<PaginatedResponse<Booking>>();
  }

  recalculate = ({ booking_id, ...params }: BookingRecalculatePricePayload) => {
    return this.clientApi
      .get(`customer/bookings/${booking_id}/recalculate`, {
        searchParams: { ...params },
      })
      .json<Prices>();
  };

  getById = (id: number) => {
    return this.clientApi.get(`customer/bookings/bulk/${id}`).json<Booking>();
  };

  init = (data: BookingInitDto) => {
    return this.clientApi
      .post("customer/bookings/init", { json: data })
      .json<BookingInitResponse>();
  };

  complete = ({ booking_id, ...data }: BookingCompleteDto) => {
    return this.clientApi
      .post(`customer/bookings/${booking_id}/complete`, { json: data })
      .json<BookingCompleteResponse>();
  };

  cleanup = () => {
    return this.clientApi
      .delete("customer/bookings/cleanup")
      .json<{ deleted: number }>();
  };
}

export const bookingService = new BookingService();
