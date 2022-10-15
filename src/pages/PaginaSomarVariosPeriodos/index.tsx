import { Buttons, Erro, Image, Label, TextField } from 'components';
import { ChangeEvent, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Periodos, setPeriodos } from 'redux/modules/Periodos';
import { Periodo } from 'types/Perido';
import { somarPeriodos } from 'services/PeriodoService';
import { calcularPeriodo } from 'services/DataService';
import {
  converterParaAnos,
  converterParaExtenso,
} from 'services/ConverterDataService';
import { setPagina } from 'redux/modules/Pagina';
import { setPeriodoAlterado } from 'redux/modules/PeriodoAlterado';
import { PaginaSomarVariosPeriodosStyled } from './styled';
import olhinho from '../../assets/olhinho.png';

const PaginaSomarVariosPeriodos = () => {
  const [descricao, setDescricao] = useState<string>('');
  const [inicio, setInicio] = useState<string>('');
  const [fim, setFim] = useState<string>('');
  interface RootsState {
    periodos: Periodos;
  }
  const periodos = useSelector((state: RootsState) => state.periodos);
  const [erro, setErro] = useState<string>('');
  let id = 0;

  const dispatch = useDispatch();

  const limparCampos = () => {
    setDescricao('');
    setInicio('');
    setFim('');
  };

  const handleDescricao = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setDescricao(event.target.value);
    },
    []
  );

  const handleInicio = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setInicio(event.target.value);
  }, []);

  const handleFim = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setFim(event.target.value);
  }, []);

  const alterarPeriodo = () => {
    const { somatorio } = periodos;
    const indice = somatorio.findIndex((periodo) => {
      return periodo.id === id;
    });
    const periodoAlterado = somatorio[indice];
    if (periodoAlterado) dispatch(setPeriodoAlterado(periodoAlterado));
    dispatch(setPagina('alterar-periodo'));
  };

  const alterarDesconto = () => {
    const { descontos } = periodos;
    const indice = descontos.findIndex((desconto) => {
      return desconto.id === id;
    });
    const periodoAlterado = descontos[indice];
    if (periodoAlterado) dispatch(setPeriodoAlterado(periodoAlterado));
    dispatch(setPagina('alterar-periodo'));
  };

  const excluirUm = (periodosSubmetidos: Periodo[]) => {
    const index = periodosSubmetidos.findIndex((periodo) => {
      return periodo.id === id;
    });
    let periodoComExclusao: Periodo[] = [];
    if (index >= 0) periodoComExclusao = periodosSubmetidos.splice(index, 1);
    return periodoComExclusao;
  };

  const excluirPeriodo = () => {
    const { somatorio, descontos } = periodos;
    dispatch(setPeriodos({ somatorio: excluirUm(somatorio), descontos }));
  };

  const excluirDesconto = () => {
    const { somatorio, descontos } = periodos;
    dispatch(setPeriodos({ somatorio, descontos: excluirUm(descontos) }));
  };

  const adicionar = () => {
    if (!inicio) setErro('Informe a data de início.');
    else if (!fim) setErro('Informe a data final.');
    else if (inicio > fim)
      setErro('A data final precisa ser maior que a de início');
    else {
      const intervalo = calcularPeriodo(inicio, fim);
      id = periodos.somatorio.length + periodos.descontos.length + 1;
      const periodo: Periodo = {
        id,
        descricao,
        inicio: new Date(inicio),
        fim: new Date(fim),
        periodo: Number(intervalo),
        alterar: alterarPeriodo,
        excluir: excluirPeriodo,
      };
      limparCampos();
      const { somatorio, descontos } = periodos;
      somatorio.push(periodo);
      dispatch(setPeriodos({ descontos, somatorio }));
    }
  };

  const descontar = () => {
    if (!inicio) setErro('Informe a data de início.');
    else if (!fim) setErro('Informe a data final.');
    else if (inicio > fim)
      setErro('A data final precisa ser maior que a de início');
    else {
      const intervalo = calcularPeriodo(inicio, fim);
      id = periodos.somatorio.length + periodos.descontos.length + 1;
      const periodo: Periodo = {
        id,
        descricao,
        inicio: new Date(inicio),
        fim: new Date(fim),
        periodo: Number(intervalo),
        alterar: alterarDesconto,
        excluir: excluirDesconto,
      };
      limparCampos();
      const { somatorio, descontos } = periodos;
      descontos.push(periodo);
      dispatch(setPeriodos({ descontos, somatorio }));
    }
  };

  const irParaTabelaSomatorios = () => {
    dispatch(setPagina('tabela-somatorio'));
  };

  const irParaTabelaDescontos = () => {
    dispatch(setPagina('tabela-descontos'));
  };

  const resetar = () => {
    window.location.reload();
  };

  const fecharErro = () => {
    setErro('');
  };

  return (
    <PaginaSomarVariosPeriodosStyled>
      <Image src={olhinho} alt="Olhinho" />
      <h1>Somar vários períodos</h1>
      {erro ? <Erro fechar={fecharErro}>{erro}</Erro> : null}
      <TextField
        label="Descrição"
        onChange={handleDescricao}
        readOnly={false}
        type="text"
        value={descricao}
      />
      <TextField
        label="Data de início"
        onChange={handleInicio}
        readOnly={false}
        type="date"
        value={inicio}
      />
      <TextField
        label="Data final"
        onChange={handleFim}
        readOnly={false}
        type="date"
        value={fim}
      />
      <Buttons
        buttons={[
          {
            onClick: adicionar,
            children: 'Adicionar',
          },
          {
            onClick: descontar,
            children: 'Descontar',
          },
          {
            onClick: irParaTabelaSomatorios,
            children: 'Ver Somatório',
          },
          {
            onClick: irParaTabelaDescontos,
            children: 'Ver Descontos',
          },
          {
            onClick: resetar,
            children: 'Resetar',
          },
        ]}
      />
      <TextField
        label="Dias"
        onChange={() => {}}
        readOnly
        type="text"
        value={somarPeriodos(periodos).toString()}
      />
      <TextField
        label="Período em Anos"
        onChange={() => {}}
        readOnly
        type="text"
        value={converterParaAnos(somarPeriodos(periodos))}
      />
      <Label>{converterParaExtenso(somarPeriodos(periodos))}</Label>
    </PaginaSomarVariosPeriodosStyled>
  );
};

export default PaginaSomarVariosPeriodos;
