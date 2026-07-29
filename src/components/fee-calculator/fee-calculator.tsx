import { FC, useMemo, useState } from "react";
import { Container, CustomRateInput, SelectContainer, SectionPropertyValue } from "./styles";
import {
  CUSTOM_FINANCING_PRESET_ID,
  FINANCING_PRESETS,
  formatAnnualRate,
  getFinancingAnnualRate,
} from "@/constants/financing-presets";
import { maskCurrencyBRL } from "@/utils/format-currency";
import { calculateFinancing } from "@/utils/calculate-financing";

const LOAN_TERM_YEARS = 30;

export const FeeCalculator: FC = () => {
  const [propertyValue, setPropertyValue] = useState(50_000);
  const [percentageValue, setPercentageValue] = useState(5);
  const [financingPresetId, setFinancingPresetId] = useState("itau");
  const [customAnnualRate, setCustomAnnualRate] = useState(12.5);

  const annualRate = useMemo(
    () => getFinancingAnnualRate(financingPresetId, customAnnualRate),
    [customAnnualRate, financingPresetId]
  );

  const financingResult = useMemo(
    () =>
      calculateFinancing(
        propertyValue,
        percentageValue,
        LOAN_TERM_YEARS,
        annualRate
      ),
    [annualRate, percentageValue, propertyValue]
  );

  function calculateNecessarySalary(installmentValue: number): number {
    const percentage = installmentValue / 30;
    const salary = percentage * 100;

    return salary;
  }

  function handleCustomRateChange(value: string) {
    const normalized = value.replace(",", ".");
    const parsed = Number(normalized);

    if (!Number.isFinite(parsed)) return;

    setCustomAnnualRate(Math.min(Math.max(parsed, 0), 100));
  }

  return (
    <Container>
      <SelectContainer>
        <span>Valor do Imóvel</span>
        <select
          value={propertyValue}
          onChange={({ target }) => {
            setPropertyValue(Number(target.value));
          }}
        >
          {Array.from({
            length: 1_000_000 / 50_000,
          }).map((_, idx) => {
            const value = (idx + 1) * 50_000;
            return (
              <option key={idx} value={value}>
                {maskCurrencyBRL(value)}
              </option>
            );
          })}
        </select>
        <span>Porcentagem da Entrada</span>
        <select
          value={percentageValue}
          onChange={({ target }) => {
            setPercentageValue(Number(target.value));
          }}
        >
          {Array.from({
            length: 100 / 5,
          }).map((item, idx) => {
            const value = (idx + 1) * 5;
            return (
              <option key={idx} value={value}>
                {value} %
              </option>
            );
          })}
        </select>
        <span>Financiamento / Taxa anual</span>
        <select
          value={financingPresetId}
          onChange={({ target }) => {
            setFinancingPresetId(target.value);
          }}
        >
          {FINANCING_PRESETS.filter((preset) => preset.id !== CUSTOM_FINANCING_PRESET_ID).map(
            (preset) => (
              <option key={preset.id} value={preset.id}>
                {preset.label} — {formatAnnualRate(preset.annualRate)}
              </option>
            )
          )}
          <option value={CUSTOM_FINANCING_PRESET_ID}>Personalizado</option>
        </select>
        {financingPresetId === CUSTOM_FINANCING_PRESET_ID && (
          <>
            <span>Taxa personalizada (% ao ano)</span>
            <CustomRateInput
              type="number"
              min={0}
              max={100}
              step={0.1}
              value={customAnnualRate}
              onChange={({ target }) => handleCustomRateChange(target.value)}
            />
          </>
        )}
        <span className="selected-rate">Taxa aplicada: {formatAnnualRate(annualRate)}</span>
      </SelectContainer>

      <SectionPropertyValue>
        <div>
          <span>Entrada</span>
          <input
            type="text"
            value={maskCurrencyBRL((propertyValue / 100) * percentageValue)}
            onChange={() => {}}
            readOnly
          />
        </div>

        <div>
          <span>Parcela ({financingResult.monthsQuantity}x)</span>
          <input
            type="text"
            onChange={() => {}}
            value={maskCurrencyBRL(financingResult.installment)}
            readOnly
          />
        </div>
        <div>
          <span>Renda mínima</span>
          <input
            type="text"
            onChange={() => {}}
            value={maskCurrencyBRL(
              calculateNecessarySalary(financingResult.installment)
            )}
            readOnly
          />
        </div>
      </SectionPropertyValue>
    </Container>
  );
};
