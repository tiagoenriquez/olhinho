import { Button, Image, TextField } from 'components';
import { ChangeEvent, useCallback, useState } from 'react';
import { calcularUltimaData } from 'services/DataService';
import olhinho from '../../assets/olhinho.png';
import { PaginaCalcularUltimaDataDePeriodoStyled } from './styles';

const PaginaCalcularUltimaDataDePeriodo = () => {
  const [inicio, setInicio] = useState<string>('');
  const [periodo, setPeriodo] = useState<string>('');
  const [fim, setFim] = useState<string>('');

  const handleInicio = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setInicio(event.target.value);
  }, []);

  const handlePeriodo = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const algorismos = '0123456789';
    const digito = event.target.value;
    if (algorismos.includes(digito[digito.length - 1])) setPeriodo(digito);
  }, []);

  const getFim = useCallback(() => {
    if (inicio) setFim(calcularUltimaData(inicio, periodo));
  }, [inicio, periodo]);

  return (
    <PaginaCalcularUltimaDataDePeriodoStyled>
      <Image src={olhinho} alt="olhinho" />
      <h1>Calcular última data de período</h1>
      <TextField
        label="Data de início"
        onChange={handleInicio}
        readOnly={false}
        type="date"
        value={inicio}
      />
      <TextField
        label="Período"
        onChange={handlePeriodo}
        readOnly={false}
        type="text"
        value={periodo}
      />
      <Button onClick={getFim}>Calcular</Button>
      <TextField
        label="Data final"
        onChange={() => {}}
        readOnly
        type="date"
        value={fim}
      />
    </PaginaCalcularUltimaDataDePeriodoStyled>
  );
};

export default PaginaCalcularUltimaDataDePeriodo;
