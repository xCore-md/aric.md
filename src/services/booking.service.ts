import { apiInstance } from "@/utils/api";
import {
  Booking,
  BookingInitDto,
  BookingInitResponse,
  PaginatedResponse,
  PaginationParams,
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

  getById = (id: number) => {
    return this.clientApi.get(`customer/bookings/bulk/${id}`).json<Booking>();
  };

  init = (data: BookingInitDto) => {
    return this.clientApi
      .post("customer/bookings/init", { json: data })
      .json<BookingInitResponse>();
  };

  // create = (data: PassengerCreateDto) => {
  //   return this.clientApi
  //     .post("customer/passengers", { json: data })
  //     .json<Passenger>();
  // };

  // update = ({ id, ...data }: PassengerUpdateDto) => {
  //   return this.clientApi
  //     .put(`customer/passengers/${id}`, { json: data })
  //     .json<Passenger>();
  // };

  // delete = (id: number) => {
  //   return this.clientApi.delete(`customer/passengers/${id}`);
  // };
}

export const bookingService = new BookingService();
