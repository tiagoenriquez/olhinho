import { Periodos } from 'redux/modules/Periodos';

// eslint-disable-next-line import/prefer-default-export
export function somarPeriodos(periodos: Periodos): number {
  let periodoSomatorio = 0;
  periodos.somatorio.forEach((aMais) => {
    periodoSomatorio += aMais.periodo;
  });
  let periodoDescontos = 0;
  periodos.descontos.forEach((desconto) => {
    periodoDescontos += desconto.periodo;
  });
  return periodoSomatorio - periodoDescontos;
}
