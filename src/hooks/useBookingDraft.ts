import { useCallback } from "react";

export type BookingDraft = {
  trip_id: number;
  from_station_id: number;
  to_station_id: number;
  return_trip_id: number | null;
};

const STORAGE_KEY = "draft-booking";

export const useBookingDraft = () => {
  const saveBookingDraft = useCallback((draft: BookingDraft) => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
  }, []);

  const getBookingDraft = useCallback((): BookingDraft | null => {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (!stored) return null;

      const parsed = JSON.parse(stored);
      if (
        typeof parsed?.trip_id === "number" &&
        typeof parsed?.from_station_id === "number" &&
        typeof parsed?.to_station_id === "number" &&
        (typeof parsed?.return_trip_id === "number" ||
          parsed?.return_trip_id === null)
      ) {
        return parsed;
      }

      return null;
    } catch {
      return null;
    }
  }, []);

  const clearBookingDraft = useCallback(() => {
    sessionStorage.removeItem(STORAGE_KEY);
  }, []);

  const hasBookingDraft = useCallback(() => {
    return !!sessionStorage.getItem(STORAGE_KEY);
  }, []);

  return {
    saveBookingDraft,
    getBookingDraft,
    clearBookingDraft,
    hasBookingDraft,
  };
};
