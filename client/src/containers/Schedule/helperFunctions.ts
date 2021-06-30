export function lastFiveElements<T>(list: T[]): T[] {
  const reversed = [...list].reverse();
  const endIndex = list.length % 6;
  return reversed.slice(0, endIndex);
}

export const a = 1;
