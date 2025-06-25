import { useMemo } from "react";
import { format, parseISO } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { useLocale } from "next-intl";
import { DATE_FNS_LOCALE_MAP } from "@/utils/constants";

type FormatOptions = {
  dateFormat?: string;
  timeFormat?: string;
};

export const useFormatUTCToLocal = () => {
  const locale = useLocale();

  const timeZone = useMemo(
    () => Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC",
    [],
  );

  const formatUTC = (utcString: string, options?: FormatOptions) => {
    try {
      const zonedDate = toZonedTime(parseISO(utcString), timeZone);

      return {
        date: format(zonedDate, options?.dateFormat || "dd.MM.yyyy", {
          locale: DATE_FNS_LOCALE_MAP[locale],
        }),
        time: format(zonedDate, options?.timeFormat || "HH:mm", {
          locale: DATE_FNS_LOCALE_MAP[locale],
        }),
      };
    } catch {
      return {
        date: "",
        time: "",
      };
    }
  };

  return { formatUTC };
};
