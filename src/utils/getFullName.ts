export function getFullName(
  firstName?: string | null,
  lastName?: string | null,
): string | null {
  const first = firstName?.trim();
  const last = lastName?.trim();

  if (!first && !last) {
    return null;
  }

  return [first, last].filter(Boolean).join(" ");
}
