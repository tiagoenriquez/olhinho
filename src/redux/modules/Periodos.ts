import { Periodo } from '../../types/Perido';

export const Types = {
  SET_PERIODOS: 'datas/SET_PERIODOS',
};

export type Periodos = {
  somatorio: Periodo[];
  descontos: Periodo[];
};

const initialState = {
  somatorio: [],
  descontos: [],
};

export default function reducer(state = initialState, action: any) {
  switch (action.type) {
    case Types.SET_PERIODOS:
      return { ...state, nome: action.payload };
    default:
      return state;
  }
}

export function setPeriodos(periodos: Periodos) {
  return {
    type: Types.SET_PERIODOS,
    payload: periodos,
  };
}
