import { Buttons, Image, TextField } from 'components';
import { ChangeEvent, useCallback, useState } from 'react';
import { PaginaCalculadoraStyled } from './styles';
import olhinho from '../../assets/olhinho.png';

const PaginaCalculadora = () => {
  const [numero1, setNumero1] = useState<string>('');
  const [numero2, setNumero2] = useState<string>('');
  const [resultado, setResultado] = useState<string>('');
  const algorismos = '0123456789';

  const handleNumero1 = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const digitado = event.target.value;
    if (algorismos.includes(digitado[digitado.length - 1])) {
      setNumero1(digitado);
    }
  }, []);

  const handleNumero2 = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const digitado = event.target.value;
    if (algorismos.includes(digitado[digitado.length - 1])) {
      setNumero2(digitado);
    }
  }, []);

  const somar = () => {
    if (numero1 && numero2) {
      setResultado((Number(numero1) + Number(numero2)).toString());
    }
  };

  const subtrair = () => {
    if (numero1 && numero2) {
      setResultado((Number(numero1) - Number(numero2)).toString());
    }
  };

  return (
    <PaginaCalculadoraStyled>
      <Image src={olhinho} alt="Olhinho" />
      <h1>Calculadora</h1>
      <TextField
        label="1º número"
        onChange={handleNumero1}
        readOnly={false}
        type="text"
        value={numero1}
      />
      <TextField
        label="2º número"
        onChange={handleNumero2}
        readOnly={false}
        type="text"
        value={numero2}
      />
      <Buttons
        buttons={[
          {
            children: 'Somar',
            onClick: somar,
          },
          {
            children: 'Subtrair',
            onClick: subtrair,
          },
        ]}
      />
      <TextField
        label="Resultado"
        onChange={() => {}}
        readOnly
        type="text"
        value={resultado}
      />
    </PaginaCalculadoraStyled>
  );
};

export default PaginaCalculadora;
