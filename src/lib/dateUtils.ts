export function calculateDaysWorked(startDate?: string | Date | null, endDate?: string | Date | null): number {
  const start = startDate ? new Date(startDate) : new Date();
  const end = endDate ? new Date(endDate) : new Date();

  return Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
}
