export function converterParaAnos(numeroDeDias: number): string {
  if (numeroDeDias <= 0) return '';
  const anos = Math.floor(numeroDeDias / 365);
  const stringAnos = anos > 1 ? 'anos' : 'ano';
  const meses = Math.floor((numeroDeDias % 365) / 30);
  const stringMeses = meses > 1 ? 'meses' : 'mês';
  const dias = (numeroDeDias % 365) % 30;
  const stringDias = dias > 1 ? 'dias' : 'dia';
  return `${anos} ${stringAnos}, ${meses} ${stringMeses} e ${dias} ${stringDias}`;
}

function getCentena(numero: number): string {
  const numeroString = numero.toString();
  const centenas = [
    '',
    'cento',
    'duzentos',
    'trezentos',
    'quatrocentos',
    'quinhentos',
    'seiscentos',
    'setecentos',
    'oitocentos',
    'novecentos',
  ];
  return centenas[Number(numeroString[numeroString.length - 3])];
}

function getDezena(numero: number): string {
  const numeroString = numero.toString();
  const dezenas = [
    '',
    'dez',
    'vinte',
    'trinta',
    'quarenta',
    'cinquenta',
    'sessenta',
    'setenta',
    'oitenta',
    'noventa',
  ];
  return dezenas[Number(numeroString[numeroString.length - 2])];
}

function getCasaDosDez(numero: number): string {
  const numeroString = numero.toString();
  const casaDosDez = [
    'dez',
    'onze',
    'doze',
    'treze',
    'catorze',
    'quinze',
    'dezesseis',
    'dezessete',
    'dezoito',
    'dezenove',
  ];
  return casaDosDez[Number(numeroString[numeroString.length - 1])];
}

function getUnidade(numero: number): string {
  const numeroString = numero.toString();
  const unidades = [
    '',
    'um',
    'dois',
    'três',
    'quatro',
    'cinco',
    'seis',
    'sete',
    'oito',
    'nove',
  ];
  return unidades[Number(numeroString[numeroString.length - 1])];
}

function getDuasPrimeirasCasas(numero: number): string {
  const duasPrimeirasCasas = numero % 100;
  if (duasPrimeirasCasas < 10) return getUnidade(duasPrimeirasCasas);
  if (duasPrimeirasCasas >= 10 && duasPrimeirasCasas < 20)
    return getCasaDosDez(duasPrimeirasCasas);
  if (duasPrimeirasCasas % 10 === 0) return getDezena(duasPrimeirasCasas);
  return `${getDezena(duasPrimeirasCasas)} e ${getUnidade(duasPrimeirasCasas)}`;
}

function getGrupoDeTresCasas(numero: number): string {
  const grupo = numero % 1000;
  if (grupo < 100) return getDuasPrimeirasCasas(grupo);
  if (grupo === 100) return 'cem';
  if (grupo % 100 === 0) return getCentena(numero);
  return `${getCentena(grupo)} e ${getDuasPrimeirasCasas(grupo)}`;
}

export function converterParaExtenso(numero: number): string {
  let convertido = '';
  if (numero < 1000) convertido = getGrupoDeTresCasas(numero);
  else if (numero === 1000) convertido = 'mil';
  else if (numero % 1000 === 0)
    convertido = `${getGrupoDeTresCasas(Math.floor(numero / 1000))} mil`;
  else if (numero % 1000 < 100 || (numero % 1000) % 100 === 0)
    convertido = `${getGrupoDeTresCasas(
      Math.floor(numero / 1000)
    )} mil e ${getGrupoDeTresCasas(numero % 1000)}`;
  else
    convertido = `${getGrupoDeTresCasas(
      Math.floor(numero / 1000)
    )} mil, ${getGrupoDeTresCasas(numero % 1000)}`;
  if (numero >= 1000 && numero < 2000)
    convertido = convertido.replace('um mil', 'mil');
  if (numero === 0) return '';
  if (numero === 1) return 'Um dia';
  return `${convertido.substring(0, 1).toUpperCase()}${convertido.substring(
    1,
    convertido.length
  )} dias`;
}
