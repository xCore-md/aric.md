import { apiInstance } from "@/utils/api";
import type { ApiResponse, NewsletterSubscription } from "@/types";

class NewsletterService {
  private clientApi = apiInstance;

  subscribe(email: string) {
    return this.clientApi
      .post("newsletter/subscribe", { json: { email } })
      .json<ApiResponse<NewsletterSubscription>>();
  }
}

export const newsletterService = new NewsletterService();
