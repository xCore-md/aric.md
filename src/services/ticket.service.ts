import { apiInstance } from "@/utils/api";
import {
  LanguageEnum,
  PaginatedResponse,
  PaginationParams,
  Ticket,
} from "@/types";

class TicketService {
  private clientApi = apiInstance;

  getAll(params?: PaginationParams) {
    return this.clientApi
      .get("customer/tickets", { searchParams: { ...params } })
      .json<PaginatedResponse<Ticket>>();
  }

  async download(id: number, language: string = LanguageEnum.RO) {
    const blob = await this.clientApi
      .get(`customer/tickets/${id}/download`, {
        searchParams: { language },
      })
      .blob();

    return blob;
  }
}

export const ticketService = new TicketService();
