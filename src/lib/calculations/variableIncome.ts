import { RVScenario } from './rvScenarios'

type VariableIncomeInput = {
  initialAmount: number
  monthlyContribution: number
  months: number
}

type MonthlyPoint = {
  month: number
  value: number
}

type VariableIncomeResult = {
  scenarioId: string
  scenarioLabel: string
  series: MonthlyPoint[]
  finalAmount: number
  grossProfit: number
}

function pseudoRandom(month: number) {
  return Math.sin(month * 999) * 0.5
}

export function simulateVariableIncome(
  input: VariableIncomeInput,
  scenario: RVScenario
): VariableIncomeResult {
  if (input.initialAmount <= 0) throw new Error('invalid initial amount')
  if (input.months <= 0) throw new Error('invalid months')

  const monthlyReturn = scenario.annualReturn / 12
  const monthlyVolatility = scenario.annualVolatility / Math.sqrt(12)

  let value = input.initialAmount
  const series: MonthlyPoint[] = []

  for (let month = 1; month <= input.months; month++) {
    const noise = pseudoRandom(month) * monthlyVolatility
    const effectiveReturn = monthlyReturn + noise

    value = value * (1 + effectiveReturn) + input.monthlyContribution

    series.push({ month, value })
  }

  const totalInvested =
    input.initialAmount + input.monthlyContribution * input.months

  return {
    scenarioId: scenario.id,
    scenarioLabel: scenario.label,
    series,
    finalAmount: value,
    grossProfit: value - totalInvested,
  }
}
