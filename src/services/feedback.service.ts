import { apiInstance } from "@/utils/api";
import type { ApiResponse } from "@/types";

export interface FeedbackPayload {
  full_name: string;
  phone: string;
  email: string;
  comment: string;
}

class FeedbackService {
  private clientApi = apiInstance;

  send(payload: FeedbackPayload) {
    return this.clientApi
      .post("feedback-send", { json: payload })
      .json<ApiResponse<unknown>>();
  }
}

export const feedbackService = new FeedbackService();
