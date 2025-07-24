import { apiInstance } from "@/utils/api";
import type { FaqItem, LanguageEnum } from "@/types";

class FAQService {
  private clientApi = apiInstance;

  getAll(language: LanguageEnum) {
    return this.clientApi
      .get("faq", { headers: { "X-language": language } })
      .json<FaqItem[]>();
  }
}

export const faqService = new FAQService();
