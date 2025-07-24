import { apiInstance } from "@/utils/api";
import type { ApiResponse } from "@/types";

export interface ContactPayload {
  full_name: string;
  phone: string;
}

class ContactService {
  private clientApi = apiInstance;

  send(payload: ContactPayload) {
    return this.clientApi
      .post("contact-send", { json: payload })
      .json<ApiResponse<unknown>>();
  }
}

export const contactService = new ContactService();
