import { Periodo } from 'types/Perido';
import {
  AlterarButtonStyled,
  ExcluirButtonStyled,
  ImageTable,
  PeriodoTableStyled,
  TBodyStyled,
  TdTBodyStyled,
  TdTHeadStyled,
  THeadStyled,
  TrTbodyStyled,
} from './styles';
import caneta from '../../assets/caneta.png';
import lixeira from '../../assets/lixeira.png';

interface PeriodoTableProp {
  periodos: Periodo[];
}

const PeriodoTable = (props: PeriodoTableProp) => {
  const { periodos } = props;
  const titles = ['Descrição', 'Início', 'Fim', 'Período', '', ''];

  const mostrarDate = (data: Date): string => {
    data.setHours(data.getHours() + 3);
    return data.toLocaleDateString();
  };

  return (
    <PeriodoTableStyled cellSpacing="0" border={1}>
      <THeadStyled>
        <tr>
          {titles.map((title) => (
            <TdTHeadStyled>{title}</TdTHeadStyled>
          ))}
        </tr>
      </THeadStyled>
      <TBodyStyled>
        {periodos.map((periodo) => (
          <TrTbodyStyled>
            <TdTBodyStyled>{periodo.descricao}</TdTBodyStyled>
            <TdTBodyStyled>{mostrarDate(periodo.inicio)}</TdTBodyStyled>
            <TdTBodyStyled>{mostrarDate(periodo.fim)}</TdTBodyStyled>
            <TdTBodyStyled>{periodo.periodo.toString()}</TdTBodyStyled>
            <TdTBodyStyled>
              <AlterarButtonStyled
                id={`botao-alterar-${periodo.id}`}
                onClick={periodo.alterar}
              >
                <ImageTable
                  id={`botao-alterar-${periodo.id}`}
                  onClick={periodo.alterar}
                  src={caneta}
                  alt="alterar"
                />
              </AlterarButtonStyled>
            </TdTBodyStyled>
            <TdTBodyStyled>
              <ExcluirButtonStyled
                id={`botao-excluir-${periodo.id}`}
                onClick={periodo.excluir}
              >
                <ImageTable
                  id={`botao-excluir-${periodo.id}`}
                  onClick={periodo.excluir}
                  src={lixeira}
                  alt="excluir"
                />
              </ExcluirButtonStyled>
            </TdTBodyStyled>
          </TrTbodyStyled>
        ))}
      </TBodyStyled>
    </PeriodoTableStyled>
  );
};

export default PeriodoTable;
