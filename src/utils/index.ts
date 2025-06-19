export function removeMoldovaPrefix(phone: string) {
  return phone.replace(/^(\+?373)/, "");
}

export const formatTime = (seconds: number) => {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
};
