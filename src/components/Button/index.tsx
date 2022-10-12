import { ButtonStyled } from './styles';

export interface ButtonProp {
  children: string;
  onClick(): void;
}

const Button = (props: ButtonProp) => {
  const { children, onClick } = props;
  return <ButtonStyled onClick={onClick}>{children}</ButtonStyled>;
};

export default Button;
