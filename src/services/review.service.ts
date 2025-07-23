import { apiInstance } from "@/utils/api";
import type { PaginatedResponse, PaginationParams, Review } from "@/types";

class ReviewService {
  private clientApi = apiInstance;

  getAll(params?: PaginationParams) {
    return this.clientApi
      .get("reviews", { searchParams: { ...params } })
      .json<PaginatedResponse<Review>>();
  }
}

export const reviewService = new ReviewService();
