export type ScenarioComparison = {
  scenarioId: string
  scenarioLabel: string
  rvFinalGross: number
  rvFinalNet: number
  diffGrossPct: number | null
  diffNetPct: number | null
}

function pctDiff(base: number, other: number): number | null {
  if (!Number.isFinite(base) || base === 0) return null
  return (other - base) / base
}

export function compareRfVsRvs(params: {
  rfFinalGross: number
  rfFinalNet: number
  rvs: Array<{
    scenarioId: string
    scenarioLabel: string
    finalGross: number
    finalNet: number
  }>
}): ScenarioComparison[] {
  return params.rvs.map((rv) => ({
    scenarioId: rv.scenarioId,
    scenarioLabel: rv.scenarioLabel,
    rvFinalGross: rv.finalGross,
    rvFinalNet: rv.finalNet,
    diffGrossPct: pctDiff(params.rfFinalGross, rv.finalGross),
    diffNetPct: pctDiff(params.rfFinalNet, rv.finalNet),
  }))
}
