export function calculateFinancing(
  valorImovel: number,
  porcentagemEntrada: number,
  prazoAnos: number,
  taxaJurosAnualPercentual: number = 11.9
): { installment: number; monthsQuantity: number } {
  const taxaJurosAnual = taxaJurosAnualPercentual / 100;
  const taxaJurosMensal = (1 + taxaJurosAnual) ** (1 / 12) - 1;
  const monthsQuantity = prazoAnos * 12;
  const valorEntrada = (porcentagemEntrada / 100) * valorImovel;
  const valorFinanciado = valorImovel - valorEntrada;

  const installment =
    (valorFinanciado * taxaJurosMensal) /
    (1 - Math.pow(1 + taxaJurosMensal, -monthsQuantity));

  return { installment, monthsQuantity };
}
