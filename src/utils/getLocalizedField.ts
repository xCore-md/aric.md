export function getLocalizedField<T extends Record<string, any>>(
  obj: T,
  key: string,
  locale: string,
): string | undefined {
  const localizedValue = obj?.[`${key}_${locale}`];

  if (localizedValue) return localizedValue;

  const fallbackEntry = Object.entries(obj).find(
    ([objKey, value]) =>
      objKey.startsWith(`${key}_`) && typeof value === "string" && value.trim(),
  );

  return fallbackEntry?.[1];
}
