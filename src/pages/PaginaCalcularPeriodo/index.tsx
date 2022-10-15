import { Button, Erro, Image, TextField } from 'components';
import { ChangeEvent, useCallback, useState } from 'react';
import { calcularPeriodo } from 'services/DataService';
import { PaginaCalcularPeriodoStyled } from './styles';
import olhinho from '../../assets/olhinho.png';

const PaginaCalcularPeriodo = () => {
  const [inicio, setInicio] = useState<string>('');
  const [fim, setFim] = useState<string>('');
  const [periodo, setPeriodo] = useState<string>('');
  const [erro, setErro] = useState<string>('');

  const handleInicio = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setInicio(event.target.value);
  }, []);

  const handleFim = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setFim(event.target.value);
  }, []);

  const getPeriodo = useCallback(() => {
    if (!inicio) setErro('Informe a data de início.');
    else if (!fim) setErro('Informe a data final.');
    else if (inicio > fim)
      setErro('A data final precisa ser maior que a de início');
    else setPeriodo(calcularPeriodo(inicio, fim));
  }, [inicio, fim]);

  const fecharErro = () => {
    setErro('');
  };

  return (
    <PaginaCalcularPeriodoStyled>
      <Image src={olhinho} alt="Olhinho" />
      <h1>Calcular um período</h1>
      {erro ? <Erro fechar={fecharErro}>{erro}</Erro> : null}
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
      <Button onClick={getPeriodo}>Calcular</Button>
      <TextField
        label="Período"
        onChange={() => {}}
        readOnly
        type="text"
        value={periodo}
      />
    </PaginaCalcularPeriodoStyled>
  );
};

export default PaginaCalcularPeriodo;
