export function annualToMonthlyRate(annualRate: number): number {
  if (annualRate < 0) {
    throw new Error('Annual rate must be non-negative')
  }

  return Math.pow(1 + annualRate, 1 / 12) - 1
}
