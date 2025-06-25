"use client";

import { BookingStatus } from "@/types";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

type TicketStatusBadgeProps = {
  status: BookingStatus;
};

const statusStyleMap: Record<BookingStatus, { bg: string; text: string }> = {
  [BookingStatus.Draft]: {
    bg: "bg-gray-100",
    text: "text-gray-950",
  },
  [BookingStatus.Reserved]: {
    bg: "bg-blue",
    text: "text-black",
  },
  [BookingStatus.Paid]: {
    bg: "bg-green",
    text: "text-black",
  },
  [BookingStatus.Cancelled]: {
    bg: "bg-red",
    text: "text-black",
  },
};

export const TicketStatusBadge = ({ status }: TicketStatusBadgeProps) => {
  const t = useTranslations("booking_status");

  const { bg, text } = statusStyleMap[status] || {
    bg: "bg-gray-100",
    text: "text-gray-800",
  };

  return (
    <div
      className={cn("max-w-max rounded-full px-2.5 py-0.5 text-base", bg, text)}
    >
      {t(status)}
    </div>
  );
};
