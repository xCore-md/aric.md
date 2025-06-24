import { apiInstance } from "@/utils/api";
import { BookingInitDto, BookingInitResponse } from "@/types/booking.types";

class BookingService {
  private clientApi = apiInstance;

  // getAll(params?: PaginationParams) {
  //   return this.clientApi
  //     .get("customer/passengers", { searchParams: { ...params } })
  //     .json<PaginatedResponse<Passenger>>();
  // }

  // create = (data: PassengerCreateDto) => {
  //   return this.clientApi
  //     .post("customer/passengers", { json: data })
  //     .json<Passenger>();
  // };

  init = (data: BookingInitDto) => {
    return this.clientApi
      .post("customer/bookings/init", { json: data })
      .json<BookingInitResponse>();
  };

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
