import { Image, PeriodoTable } from 'components';
import { useSelector } from 'react-redux';
import { Periodos } from 'redux/modules/Periodos';
import olhinho from '../../assets/olhinho.png';
import { PaginaTabelaDescontosStyled } from './styles';

const PaginaTabelaDescontos = () => {
  interface RootsState {
    periodos: Periodos;
  }
  const periodos = useSelector((state: RootsState) => state.periodos);

  return (
    <PaginaTabelaDescontosStyled>
      <Image alt="olhinho" src={olhinho} />
      <h1>Tabela de Descontos</h1>
      <PeriodoTable periodos={periodos.descontos} />
    </PaginaTabelaDescontosStyled>
  );
};

export default PaginaTabelaDescontos;
