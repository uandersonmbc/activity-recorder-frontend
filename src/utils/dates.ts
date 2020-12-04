export function hour(hour: { hours: number; minutes: number }): string {
  const h = hour.hours ? hour.hours : 0;
  const m = hour.minutes ? hour.minutes : 0;
  return (h < 9 ? '0' + h : h) + ':' + (m < 9 ? '0' + m : m);
}
