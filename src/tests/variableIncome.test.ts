import { describe, it, expect } from 'vitest'
import { simulateVariableIncome } from '../lib/calculations/variableIncome'
import { RV_SCENARIOS } from '../lib/calculations/rvScenarios'

describe('simulateVariableIncome', () => {
  it('simulates RV scenarios with different outcomes', () => {
    const input = {
      initialAmount: 1000,
      monthlyContribution: 100,
      months: 12,
    }

    const results = RV_SCENARIOS.map(s =>
      simulateVariableIncome(input, s)
    )

    expect(results.length).toBe(3)
    expect(results[0].finalAmount).toBeGreaterThan(0)
  })

  it('with zero volatility, higher return produces higher final amount', () => {
  const input = {
    initialAmount: 1000,
    monthlyContribution: 100,
    months: 24,
  }

  const rvLowVol1 = simulateVariableIncome(input, {
    ...RV_SCENARIOS[0],
    annualVolatility: 0,
  })

  const rvLowVol3 = simulateVariableIncome(input, {
    ...RV_SCENARIOS[2],
    annualVolatility: 0,
  })

  expect(rvLowVol3.finalAmount).toBeGreaterThan(rvLowVol1.finalAmount)
})
})
