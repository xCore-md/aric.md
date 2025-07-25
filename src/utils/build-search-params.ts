export function buildSearchParams(params?: Record<string, unknown>): URLSearchParams {
  const searchParams = new URLSearchParams();
  if (!params) return searchParams;

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null) return;
    if (Array.isArray(value)) {
      value.forEach((v) => searchParams.append(key, String(v)));
    } else {
      searchParams.set(key, String(value));
    }
  });

  return searchParams;
}
