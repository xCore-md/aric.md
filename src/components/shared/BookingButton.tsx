"use client";

import React from "react";
import { flushSync } from "react-dom";
import { useMutation } from "@tanstack/react-query";
import { Link } from "@/i18n/navigation";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";

import { useBookingDraft } from "@/hooks/useBookingDraft";
import { bookingService } from "@/services/booking.service";
import { DraftBookingPayload } from "@/types";

import { Button } from "@/components/ui/button";
import { useRouter } from "@/i18n/navigation";

export const BookingButton: React.FC<DraftBookingPayload> = ({
  trip_id,
  from_station_id,
  to_station_id,
  return_trip_id,
  draft_booking_id,
}) => {
  const t = useTranslations();
  const { status } = useSession();
  const { push } = useRouter();
  const { saveBookingDraft } = useBookingDraft();

  const [isCompleted, setIsCompleted] = React.useState(false);

  const bookingInit = useMutation({
    mutationFn: bookingService.init,
    onSuccess: (data) => {
      flushSync(() => {
        setIsCompleted(true);
      });
      push(`/booking/${data?.booking_id}`);
    },
    onError: () => {
      setIsCompleted(false);
    },
  });

  const handleClick = () => {
    const payload = { trip_id, from_station_id, to_station_id, return_trip_id };

    if (status !== "authenticated") {
      saveBookingDraft(payload);
      push(`/login?callbackUrl=${encodeURIComponent("/booking/init")}`);
      return;
    }

    bookingInit.mutate(payload);
  };

  return draft_booking_id ? (
    <Button variant="reverse" className="col-span-full" asChild>
      <Link href={"/booking/" + draft_booking_id}>
        {t("action.book_now")}
      </Link>
    </Button>
  ) : (
    <Button
      variant="reverse"
      className="col-span-full"
      onClick={handleClick}
      disabled={bookingInit.isPending || isCompleted}
    >
      {bookingInit.isPending || isCompleted
        ? t("action.processing") + "..."
        : t("action.book_now")}
    </Button>
  );
};
