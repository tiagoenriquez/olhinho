import { Provider, useSelector } from 'react-redux';
import { Menu } from 'components';
import { ThemeProvider } from 'styled-components';
import './App.css';
import theme from 'theme';
import {
  PaginaAlterarPeriodo,
  PaginaCalculadora,
  PaginaCalcularPeriodo,
  PaginaCalcularUltimaDataDePeriodo,
  PaginaSomarVariosPeriodos,
  PaginaTabelaDescontos,
  PaginaTabelaSomatorio,
} from 'pages';
import { Pagina } from 'redux/modules/Pagina';
import store from '../redux/store';

const Page = () => {
  interface RootsState {
    pagina: Pagina;
  }
  const pagina = useSelector((state: RootsState) => state.pagina);

  switch (pagina.nome) {
    case 'calcular-periodo':
      return <PaginaCalcularPeriodo />;
    case 'calcular-ultima-data-de-periodo':
      return <PaginaCalcularUltimaDataDePeriodo />;
    case 'somar-varios-periodos':
      return <PaginaSomarVariosPeriodos />;
    case 'tabela-somatorio':
      return <PaginaTabelaSomatorio />;
    case 'tabela-descontos':
      return <PaginaTabelaDescontos />;
    case 'calculadora':
      return <PaginaCalculadora />;
    case 'alterar-periodo':
      return <PaginaAlterarPeriodo />;
    default:
      return null;
  }
};

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Menu />
        <Page />
      </ThemeProvider>
    </Provider>
  );
}
