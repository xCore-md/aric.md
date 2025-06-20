import { apiInstance } from "@/utils/api";
import type { RefundCondition } from "@/types";

class RefundPolicyService {
  private clientApi = apiInstance;

  getAll(params: { price: string; language: string }) {
    return this.clientApi
      .get("refund-policy/rendered", { searchParams: params })
      .json<RefundCondition[]>();
  }
}

export const refundPolicyService = new RefundPolicyService();
