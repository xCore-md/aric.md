import { format, parse, isValid } from "date-fns";

export function toApiDate(
  input: string,
  fromFormat = "dd.MM.yyyy",
): string | undefined {
  const parsed = parse(input, fromFormat, new Date());
  return isValid(parsed) ? format(parsed, "yyyy/MM/dd") : undefined;
}
