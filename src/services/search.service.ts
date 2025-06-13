import { apiInstance } from "@/utils/api";
import type { PaginationParams, SearchResponse, SearchStation } from "@/types";

class SearchService {
  private clientApi = apiInstance;

  getAll(params?: PaginationParams) {
    return this.clientApi
      .get("search", { searchParams: { ...params } })
      .json<SearchResponse>();
  }

  getStations(params?: PaginationParams) {
    return this.clientApi
      .get("search/stations", { searchParams: { ...params } })
      .json<SearchStation[]>();
  }

  getStationsDestinations(params?: PaginationParams) {
    return this.clientApi
      .get("search/stations/destinations", { searchParams: { ...params } })
      .json<SearchStation[]>();
  }

  getTripDates(params?: PaginationParams) {
    return this.clientApi
      .get("search/trip-dates", { searchParams: { ...params } })
      .json<{ dates: string[] }>();
  }

  getReturnTripDates(params?: PaginationParams) {
    return this.clientApi
      .get("search/return-trip-dates", { searchParams: { ...params } })
      .json<{ dates: string[] }>();
  }
}

export const searchService = new SearchService();
