import { Periodo } from 'types/Perido';

export const Types = {
  SET_PERIODO_ALTERADO: 'datas/SET_PERIODO_ALTERADO',
};

export type PeriodoAlterado = {
  periodo: Periodo;
};

const initialState = {
  periodo: {
    id: 0,
    descricao: '',
    inicio: new Date(),
    fim: new Date(),
    periodo: 0,
    alterar: () => {},
    excluir: () => {},
  },
};

export default function reducer(state = initialState, action: any) {
  switch (action.type) {
    case Types.SET_PERIODO_ALTERADO:
      return { ...state, periodo: action.payload };
    default:
      return state;
  }
}

export function setPeriodoAlterado(periodo: Periodo) {
  return {
    type: Types.SET_PERIODO_ALTERADO,
    payload: periodo,
  };
}
