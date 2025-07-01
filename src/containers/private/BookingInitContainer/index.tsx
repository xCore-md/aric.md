"use client";
import { useBookingDraft } from "@/hooks/useBookingDraft";
import { useRouter } from "@/i18n/navigation";
import { bookingService } from "@/services/booking.service";
import { useMutation } from "@tanstack/react-query";
import React from "react";

export const BookingInitContainer = () => {
  const { push } = useRouter();
  const { getBookingDraft, clearBookingDraft } = useBookingDraft();

  const bookingInit = useMutation({
    mutationFn: bookingService.init,
    onSuccess: (data) => {
      clearBookingDraft();
      push(`/booking/${data?.booking_id}`);
    },
    onError: () => {
      push("/booking");
    },
  });

  React.useEffect(() => {
    const payload = getBookingDraft();

    console.log({ payload });
    payload && bookingInit.mutate(payload);
  }, [getBookingDraft]);

  return (
    <div className="flex justify-center pt-20">
      <div className="loader" />
    </div>
  );
};
