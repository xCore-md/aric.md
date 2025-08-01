"use client";

import React from "react";
import { flushSync } from "react-dom";
import { useMutation } from "@tanstack/react-query";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

import { useBookingDraft } from "@/hooks/useBookingDraft";
import { bookingService } from "@/services/booking.service";
import { DraftBookingPayload } from "@/types";

import { Button } from "@/components/ui/button";
import { useRouter } from "@/i18n/navigation";

import { API_URL } from "@/utils/constants";

import { getCookie } from "cookies-next";

export const BookingButton: React.FC<DraftBookingPayload> = ({
  trip_id,
  from_station_id,
  to_station_id,
  return_trip_id,
  draft_booking_id,
}) => {
  const t = useTranslations();
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

  const handleClick = async () => {
    const payload = { trip_id, from_station_id, to_station_id, return_trip_id };
    const isAuthenticated = await checkCustomerAuth();

    if (!isAuthenticated) {
      saveBookingDraft(payload);
      push(`/login?callbackUrl=${encodeURIComponent("/booking/init")}`);
      return;
    }

    bookingInit.mutate(payload);
  };

  const labelKey = return_trip_id ? "action.book_tickets" : "action.book_now";

  return draft_booking_id ? (
    <Button variant="reverse" className="col-span-full" asChild>
      <Link href={"/booking/" + draft_booking_id}>
        {t(labelKey)}
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
        : t(labelKey)}
    </Button>
  );
};

async function checkCustomerAuth(): Promise<boolean> {
  const token = getCookie("token")?.toString() || "";
  if (!token) return false;

  const res = await fetch(`${API_URL}/customer/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
    credentials: "include",
  });
  return res.ok;
}