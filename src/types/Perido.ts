import { MouseEvent } from 'react';

export type Periodo = {
  id: number;
  descricao: string;
  inicio: Date;
  fim: Date;
  periodo: number;
  alterar(event: MouseEvent): void;
  excluir(event: MouseEvent): void;
};
