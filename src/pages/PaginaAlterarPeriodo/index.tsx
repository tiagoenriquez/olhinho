import { Button, Erro, Image, TextField } from 'components';
import { ChangeEvent, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPagina } from 'redux/modules/Pagina';
import { PeriodoAlterado } from 'redux/modules/PeriodoAlterado';
import { Periodos, setPeriodos } from 'redux/modules/Periodos';
import { calcularPeriodo } from 'services/DataService';
import { Periodo } from 'types/Perido';
import olhinho from '../../assets/olhinho.png';
import { PaginaAlterarPeriodoStyled } from './styles';

const PaginaAlterarPeriodo = () => {
  interface RootsState {
    periodoAlterado: PeriodoAlterado;
    periodos: Periodos;
  }
  const periodoAlterado = useSelector(
    (state: RootsState) => state.periodoAlterado
  );
  periodoAlterado.periodo.inicio.setHours(0);
  periodoAlterado.periodo.fim.setHours(0);
  const periodos = useSelector((state: RootsState) => state.periodos);
  const [descricao, setDescricao] = useState<string>(
    periodoAlterado.periodo.descricao
  );
  const [inicio, setInicio] = useState<string>(
    periodoAlterado.periodo.inicio.toISOString()
  );
  const [fim, setFim] = useState<string>(
    periodoAlterado.periodo.fim.toISOString()
  );
  const [intervalo, setIntervalo] = useState<string>(
    periodoAlterado.periodo.periodo.toString()
  );
  const [erro, setErro] = useState<string>('');
  const dispatch = useDispatch();

  const handleDescricao = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setDescricao(event.target.value);
    },
    []
  );

  const somar = useCallback(
    (inicioAlterado: string, fimAlterado: string) => {
      if (inicioAlterado && fimAlterado) {
        setIntervalo(
          calcularPeriodo(
            inicioAlterado.substring(0, 10),
            fimAlterado.substring(0, 10)
          )
        );
      }
    },
    [setIntervalo]
  );

  const handleInicio = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const inicioAlterado = event.target.value;
      somar(inicioAlterado, fim);
      setInicio(inicioAlterado);
    },
    [fim, somar]
  );

  const handleFim = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const fimAlterado = event.target.value;
      somar(inicio, fimAlterado);
      setFim(fimAlterado);
    },
    [inicio, somar]
  );

  const alterar = () => {
    if (!inicio) setErro('Informe a data de início.');
    else if (!fim) setErro('Informe a data final.');
    else if (inicio >= fim)
      setErro('A data final precisa ser maior que a de início');
    else {
      const { somatorio } = periodos;
      const { descontos } = periodos;
      const novoPeriodo: Periodo = {
        alterar: () => {},
        descricao,
        excluir: () => {},
        fim: new Date(fim),
        inicio: new Date(inicio),
        periodo: Number(intervalo),
        id: 0,
      };
      let indice = somatorio.findIndex((element) => {
        return element.id === periodoAlterado.periodo.id;
      });
      if (indice >= 0) {
        novoPeriodo.id = somatorio[indice].id;
        novoPeriodo.alterar = somatorio[indice].alterar;
        novoPeriodo.excluir = somatorio[indice].excluir;
        somatorio[indice] = novoPeriodo;
        dispatch(setPeriodos({ descontos, somatorio }));
        dispatch(setPagina('tabela-somatorio'));
      } else {
        indice = descontos.findIndex((element) => {
          return element.id === periodoAlterado.periodo.id;
        });
        novoPeriodo.id = descontos[indice].id;
        novoPeriodo.alterar = descontos[indice].alterar;
        novoPeriodo.excluir = descontos[indice].excluir;
        descontos[indice] = novoPeriodo;
        dispatch(setPeriodos({ descontos, somatorio }));
        dispatch(setPagina('tabela-descontos'));
      }
    }
  };

  const fecharErro = () => {
    setErro('');
  };

  return (
    <PaginaAlterarPeriodoStyled>
      <Image alt="olhinho" src={olhinho} />
      <h1>Alterar Período</h1>
      {erro ? <Erro fechar={fecharErro}>{erro}</Erro> : null}
      <TextField
        label="Descrição"
        onChange={handleDescricao}
        readOnly={false}
        type="text"
        value={descricao}
      />
      <TextField
        label="Início"
        onChange={handleInicio}
        readOnly={false}
        type="date"
        value={inicio.substring(0, 10)}
      />
      <TextField
        label="Fim"
        onChange={handleFim}
        readOnly={false}
        type="date"
        value={fim.substring(0, 10)}
      />
      <Button onClick={alterar}>Alterar</Button>
      <TextField
        label="Período"
        onChange={() => {}}
        readOnly
        type="text"
        value={intervalo}
      />
    </PaginaAlterarPeriodoStyled>
  );
};

export default PaginaAlterarPeriodo;
