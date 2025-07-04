"use client";

import { BookingStatusEnum } from "@/types";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

type TicketStatusBadgeProps = {
  status: BookingStatusEnum;
};

const text = "text-black";

const statusStyleMap: Record<BookingStatusEnum, { bg: string; text: string }> =
  {
    [BookingStatusEnum.Draft]: {
      bg: "bg-gray-100",
      text,
    },
    [BookingStatusEnum.Reserved]: {
      bg: "bg-blue",
      text,
    },
    [BookingStatusEnum.Paid]: {
      bg: "bg-green",
      text,
    },
    [BookingStatusEnum.Cancelled]: {
      bg: "bg-red",
      text,
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
