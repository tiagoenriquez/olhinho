import { Buttons, Erro, Image, Label, TextField } from 'components';
import { ChangeEvent, MouseEvent, useCallback, useState } from 'react';
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

  const alterar = (event: MouseEvent) => {
    const { somatorio } = periodos;
    const { descontos } = periodos;
    const target = event.target as HTMLButtonElement | HTMLImageElement;
    const id = Number(target.id.replace('botao-alterar-', ''));
    let indice = somatorio.findIndex((element) => {
      return element.id === id;
    });
    if (indice >= 0) {
      const periodoAlterado = somatorio[indice];
      if (periodoAlterado) dispatch(setPeriodoAlterado(periodoAlterado));
    } else {
      indice = descontos.findIndex((element) => {
        return element.id === id;
      });
      const periodoAlterado = descontos[indice];
      if (periodoAlterado) dispatch(setPeriodoAlterado(periodoAlterado));
    }
    dispatch(setPagina('alterar-periodo'));
  };

  const excluir = (event: MouseEvent) => {
    const { somatorio } = periodos;
    const { descontos } = periodos;
    const target = event.target as HTMLButtonElement | HTMLImageElement;
    const id = Number(target.id.replace('botao-excluir-', ''));
    let indice = somatorio.findIndex((element) => {
      return element.id === id;
    });
    if (indice >= 0) {
      somatorio.splice(indice, 1);
      dispatch(setPeriodos({ somatorio, descontos }));
    } else {
      indice = descontos.findIndex((element) => {
        return element.id === id;
      });
      descontos.splice(indice, 1);
      dispatch(setPeriodos({ somatorio, descontos }));
    }
  };

  const adicionar = () => {
    if (!inicio) setErro('Informe a data de início.');
    else if (!fim) setErro('Informe a data final.');
    else if (inicio >= fim)
      setErro('A data final precisa ser maior que a de início');
    else {
      const intervalo = calcularPeriodo(inicio, fim);
      const id = periodos.somatorio.length + periodos.descontos.length + 1;
      const periodo: Periodo = {
        id,
        descricao,
        inicio: new Date(inicio),
        fim: new Date(fim),
        periodo: Number(intervalo),
        alterar,
        excluir,
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
    else if (inicio >= fim)
      setErro('A data final precisa ser maior que a de início');
    else {
      const intervalo = calcularPeriodo(inicio, fim);
      const id = periodos.somatorio.length + periodos.descontos.length + 1;
      const periodo: Periodo = {
        id,
        descricao,
        inicio: new Date(inicio),
        fim: new Date(fim),
        periodo: Number(intervalo),
        alterar,
        excluir,
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
