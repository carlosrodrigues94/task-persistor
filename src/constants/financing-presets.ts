export type FinancingPreset = {
  id: string;
  label: string;
  annualRate: number;
};

export const FINANCING_PRESETS: FinancingPreset[] = [
  { id: "bradesco", label: "Bradesco", annualRate: 11.9 },
  { id: "itau", label: "Itaú", annualRate: 12.5 },
  { id: "santander", label: "Santander", annualRate: 12.0 },
  { id: "caixa", label: "Caixa", annualRate: 10.5 },
  { id: "custom", label: "Personalizado", annualRate: 11.9 },
];

export const CUSTOM_FINANCING_PRESET_ID = "custom";

export function getFinancingAnnualRate(
  presetId: string,
  customAnnualRate: number
): number {
  if (presetId === CUSTOM_FINANCING_PRESET_ID) {
    return customAnnualRate;
  }

  const preset = FINANCING_PRESETS.find((item) => item.id === presetId);
  return preset?.annualRate ?? FINANCING_PRESETS[0].annualRate;
}

export function formatAnnualRate(rate: number): string {
  return `${rate.toLocaleString("pt-BR", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 2,
  })}% ao ano`;
}
