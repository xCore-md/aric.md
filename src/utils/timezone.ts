import { format } from "date-fns";
import { toZonedTime, fromZonedTime } from "date-fns-tz";

function getCurrentTimeZone() {
  return Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
}

export function utcTimeToLocal(
  time: string,
  timeZone = getCurrentTimeZone(),
  baseDate: Date = new Date(),
) {
  try {
    const [h, m] = time.split(":").map(Number);
    const utcDate = new Date(
      Date.UTC(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate(), h, m),
    );
    const zoned = toZonedTime(utcDate, timeZone);
    return format(zoned, "HH:mm");
  } catch {
    return time;
  }
}

export function localTimeToUtc(
  time: string,
  timeZone = getCurrentTimeZone(),
  baseDate: Date = new Date(),
) {
  try {
    const [h, m] = time.split(":").map(Number);
    const localDate = new Date(
      baseDate.getFullYear(),
      baseDate.getMonth(),
      baseDate.getDate(),
      h,
      m,
    );
    const utcDate = fromZonedTime(localDate, timeZone);
    return format(utcDate, "HH:mm");
  } catch {
    return time;
  }
}
