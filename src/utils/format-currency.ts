export const formatCurrency = (amount: string): string =>
  `R$ ${amount
    .replace(/\D/g, "") // permite digitar apenas números
    .replace(/[0-9]{14}/, "inválido") // limita pra máximo 999.999.999,9999
    .replace(/(\d{1})(\d{10})$/, "$1.$2") // coloca ponto antes dos últimos 10 digitos
    .replace(/(\d{1})(\d{7})$/, "$1.$2") // coloca ponto antes dos últimos 7 digitos
    .replace(/(\d{1})(\d{1,2})$/, "$1,$2")}`;

export function maskCurrencyBRL(value: number) {
  if (!value || value < 0) {
    return "R$ 0.00";
  }
  return value
    .toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
    .replace("R$", "R$ "); // Ensure space after R$
}
