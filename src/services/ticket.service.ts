import { apiInstance } from "@/utils/api";
import { PaginatedResponse, PaginationParams, Ticket } from "@/types";

class TicketService {
  private clientApi = apiInstance;

  getAll(params?: PaginationParams) {
    return this.clientApi
      .get("customer/tickets", { searchParams: { ...params } })
      .json<PaginatedResponse<Ticket>>();
  }

  async download(id: number) {
    const blob = await this.clientApi
      .get(`customer/tickets/${id}/download`)
      .blob();

    return blob;
  }

  async downloadAllBooking(id: number) {
    const blob = await this.clientApi
      .get(`customer/tickets/${id}/download-all-booking`)
      .blob();

    return blob;
  }
}

export const ticketService = new TicketService();
