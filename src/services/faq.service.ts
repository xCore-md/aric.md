import { apiInstance } from "@/utils/api";
import type { FaqItem, LanguageEnum } from "@/types";

class FAQService {
  private clientApi = apiInstance;

  async getAll(language: LanguageEnum) {
    const response = await this.clientApi
      .get("faq", { headers: { "X-language": language } })
      .json<{ data: FaqItem[] }>();
    return response.data;
  }
}

export const faqService = new FAQService();
