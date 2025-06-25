"use client";
import { PaginationUI } from "@/components/shared/pagination-ui";
import { usePagination } from "@/hooks/usePagination";
import { bookingService } from "@/services/booking.service";
import { QUERY_KEYS } from "@/utils/constants";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useTranslations } from "use-intl";

export const BookingContainer: React.FC = () => {
  const t = useTranslations();

  const { per_page, page, updateLimit, updatePage } = usePagination();

  const { data: bookings, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.booking, page, per_page],
    queryFn: () => bookingService.getAll({ page, per_page }),
  });

  return (
    <>
      Booking list
      <PaginationUI
        totalItems={bookings?.total}
        page={page}
        perPage={per_page}
        onPageChange={updatePage}
        onPageSizeChange={updateLimit}
      />
    </>
  );
};
