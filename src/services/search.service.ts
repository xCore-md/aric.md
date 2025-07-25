import { apiInstance } from "@/utils/api";
import { buildSearchParams } from "@/utils/build-search-params";
import type {
  PaginationParams,
  SearchResponse,
  SearchStation,
  SearchWeklyTripsResponse,
  TripItem,
} from "@/types";

class SearchService {
  private clientApi = apiInstance;

  getAll(params?: PaginationParams) {
    const searchParams = buildSearchParams(params);
    return this.clientApi
      .get("search", { searchParams })
      .json<SearchResponse>();
  }

  getWeeklyTrips(params?: PaginationParams) {
    const searchParams = buildSearchParams(params);
    return this.clientApi
      .get("search/weekly-trips", { searchParams })
      .json<SearchWeklyTripsResponse>();
  }

  getNearestTrips(params?: PaginationParams) {
    const searchParams = buildSearchParams(params);
    return this.clientApi
      .get("search/nearest-trips", { searchParams })
      .json<{ data: TripItem[] }>();
  }

  getStations(params?: PaginationParams) {
    const searchParams = buildSearchParams(params);
    return this.clientApi
      .get("search/stations", { searchParams })
      .json<SearchStation[]>();
  }

  getStationsDestinations(params?: PaginationParams) {
    const searchParams = buildSearchParams(params);
    return this.clientApi
      .get("search/stations/destinations", { searchParams })
      .json<SearchStation[]>();
  }

  getTripDates(params?: PaginationParams) {
    const searchParams = buildSearchParams(params);
    return this.clientApi
      .get("search/trip-dates", { searchParams })
      .json<{ dates: string[] }>();
  }

  getReturnTripDates(params?: PaginationParams) {
    const searchParams = buildSearchParams(params);
    return this.clientApi
      .get("search/return-trip-dates", { searchParams })
      .json<{ dates: string[] }>();
  }
}

export const searchService = new SearchService();
