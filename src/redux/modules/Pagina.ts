export const Types = {
  SET_PAGINA: 'datas/SET_PAGINA',
};

export type Pagina = {
  nome: string;
};

const initialState = {
  nome: 'calcular-periodo',
};

export default function reducer(state = initialState, action: any) {
  switch (action.type) {
    case Types.SET_PAGINA:
      return { ...state, nome: action.payload };
    default:
      return state;
  }
}

export function setPagina(nome: string) {
  return {
    type: Types.SET_PAGINA,
    payload: nome,
  };
}
