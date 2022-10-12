import { Image, PeriodoTable } from 'components';
import { useSelector } from 'react-redux';
import { Periodos } from 'redux/modules/Periodos';
import olhinho from '../../assets/olhinho.png';
import { PaginaTabelaSomatorioStyled } from './styles';

const PaginaTabelaSomatorio = () => {
  interface RootsState {
    periodos: Periodos;
  }
  const periodos = useSelector((state: RootsState) => state.periodos);

  return (
    <PaginaTabelaSomatorioStyled>
      <Image alt="olhinho" src={olhinho} />
      <h1>Tabela de Somatório</h1>
      <PeriodoTable periodos={periodos.somatorio} />
    </PaginaTabelaSomatorioStyled>
  );
};

export default PaginaTabelaSomatorio;
