import { useDispatch } from 'react-redux';
import { setPagina } from 'redux/modules/Pagina';
import { MenuItemStyled, MenuStyled } from './styles';

const Menu = () => {
  const dispatch = useDispatch();

  const irParaCalcularPeriodo = () => {
    dispatch(setPagina('calcular-periodo'));
  };

  const irParaCalcularUltimaDataDePeriodo = () => {
    dispatch(setPagina('calcular-ultima-data-de-periodo'));
  };

  const irParaSomarVariosPeriodos = () => {
    dispatch(setPagina('somar-varios-periodos'));
  };

  const irParaCalculadora = () => {
    dispatch(setPagina('calculadora'));
  };

  return (
    <MenuStyled>
      <MenuItemStyled onClick={irParaCalcularPeriodo}>
        Calcular um período
      </MenuItemStyled>
      <MenuItemStyled onClick={irParaCalcularUltimaDataDePeriodo}>
        Calcular última data de um período
      </MenuItemStyled>
      <MenuItemStyled onClick={irParaSomarVariosPeriodos}>
        Somar vários períodos
      </MenuItemStyled>
      <MenuItemStyled onClick={irParaCalculadora}>Calculadora</MenuItemStyled>
    </MenuStyled>
  );
};

export default Menu;
