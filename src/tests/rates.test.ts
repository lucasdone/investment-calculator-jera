import { describe, it, expect } from 'vitest'
import { annualToMonthlyRate } from '../lib/calculations/rates'

describe('annualToMonthlyRate', () => {
  it('converts annual rate to monthly rate correctly', () => {
    const monthly = annualToMonthlyRate(0.12)
    expect(monthly).toBeGreaterThan(0)
    expect(monthly).toBeLessThan(0.12)
  })

  it('throws for negative rates', () => {
    expect(() => annualToMonthlyRate(-0.1)).toThrow()
  })
})
