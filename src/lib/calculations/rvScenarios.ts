export type RVScenarioId = 'RV1' | 'RV2' | 'RV3'

export type RVScenario = {
  id: RVScenarioId
  label: string
  annualReturn: number      // decimal (ex: 0.12)
  annualVolatility: number  // decimal (ex: 0.20)
}

export const RV_SCENARIOS: RVScenario[] = [
  { id: 'RV1', label: 'Conservador', annualReturn: 0.08, annualVolatility: 0.10 },
  { id: 'RV2', label: 'Balanceado', annualReturn: 0.12, annualVolatility: 0.18 },
  { id: 'RV3', label: 'Agressivo',  annualReturn: 0.16, annualVolatility: 0.25 },
]
