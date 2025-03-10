export function calculateFinancing(
  valorImovel: number,
  porcentagemEntrada: number,
  prazoAnos: number
): { installment: number; monthsQuantity: number } {
  // Taxa de juros anual do Bradesco para financiamento imobiliário (2025) - Exemplo 11,90%
  const taxaJurosAnual = 11.9 / 100;
  // Convertendo a taxa anual para mensal
  const taxaJurosMensal = (1 + taxaJurosAnual) ** (1 / 12) - 1;
  // Convertendo o prazo de anos para meses
  const monthsQuantity = prazoAnos * 12;
  // Calculando o valor da entrada
  const valorEntrada = (porcentagemEntrada / 100) * valorImovel;
  // Calculando o valor financiado
  const valorFinanciado = valorImovel - valorEntrada;

  // Aplicando a fórmula de financiamento PRICE
  const installment =
    (valorFinanciado * taxaJurosMensal) /
    (1 - Math.pow(1 + taxaJurosMensal, -monthsQuantity));

  return { installment, monthsQuantity };
}
