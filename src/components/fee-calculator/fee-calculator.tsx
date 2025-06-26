import { FC, useState } from "react";
import { Container, SelectContainer, SectionPropertyValue } from "./styles";
import { maskCurrencyBRL } from "@/utils/format-currency";
import { calculateFinancing } from "@/utils/calculate-financing";

export const FeeCalculator: FC = () => {
  const [propertyValue, setPropertyValue] = useState(50_000);
  const [percentageValue, setPercentageValue] = useState(5);

  function calculateNecessarySalary(installmentValue: number): number {
    const percentage = installmentValue / 30;
    const salary = percentage * 100;

    return salary;
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
              <option key={idx} value={value} onChange={() => {}}>
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
      </SelectContainer>

      <SectionPropertyValue>
        <div>
          <span>Entrada</span>
          <input
            type="text"
            value={maskCurrencyBRL((propertyValue / 100) * percentageValue)}
            onChange={() => {}}
          />
        </div>

        <div>
          <span>Parcela</span>
          <input
            type="text"
            onChange={() => {}}
            value={maskCurrencyBRL(
              calculateFinancing(propertyValue, percentageValue, 360)
                .installment
            )}
          />
        </div>
        <div>
          <span>Renda mínima</span>
          <input
            type="text"
            onChange={() => {}}
            value={maskCurrencyBRL(
              calculateNecessarySalary(
                calculateFinancing(propertyValue, percentageValue, 360)
                  .installment
              )
            )}
          />
        </div>
      </SectionPropertyValue>
    </Container>
  );
};
