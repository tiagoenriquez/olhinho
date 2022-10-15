export function calcularPeriodo(inicio: string, fim: string): string {
  const periodo =
    (new Date(fim).getTime() - new Date(inicio).getTime()) /
      (24 * 60 * 60 * 1000) +
    1;
  return periodo.toString();
}

export function calcularUltimaData(inicio: string, periodo: string): string {
  const fim = new Date(
    new Date(inicio).getTime() + Number(periodo) * 24 * 60 * 60 * 1000 - 24
  );
  return fim.toISOString().substring(0, 10);
}
