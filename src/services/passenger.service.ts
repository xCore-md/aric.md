import { apiInstance } from "@/utils/api";
import type {
  ApiResponse,
  PaginatedResponse,
  PaginationParams,
  User,
} from "@/types";
import type {
  Passenger,
  PassengerCreateDto,
  PassengerUpdateDto,
} from "@/types/passenger.types";

class PassengerService {
  private clientApi = apiInstance;

  getAll(params?: PaginationParams) {
    return this.clientApi
      .get("customer/passengers", { searchParams: { ...params } })
      .json<PaginatedResponse<Passenger>>();
  }

  create = (data: PassengerCreateDto) => {
    return this.clientApi
      .post("customer/passengers", { json: data })
      .json<Passenger>();
  };

  update = ({ id, ...data }: PassengerUpdateDto) => {
    return this.clientApi
      .put(`customer/passengers/${id}`, { json: data })
      .json<Passenger>();
  };

  delete = (id: number) => {
    return this.clientApi.delete(`customer/passengers/${id}`);
  };
}

export const passengerService = new PassengerService();
