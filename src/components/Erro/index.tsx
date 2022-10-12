import Button from 'components/Button';
import { ErroStyled, LabelStyled } from './styles';

interface ErroProp {
  children: string;
  fechar(): void;
}

const Erro = (props: ErroProp) => {
  const { children, fechar } = props;

  return (
    <ErroStyled>
      <LabelStyled>{children}</LabelStyled>
      <Button onClick={fechar}>OK</Button>
    </ErroStyled>
  );
};

export default Erro;
