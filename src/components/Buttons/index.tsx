import Button, { ButtonProp } from 'components/Button';
import { ButtonsStyled } from './styles';

interface ButtonsProp {
  buttons: ButtonProp[];
}

const Buttons = (props: ButtonsProp) => {
  const { buttons } = props;

  return (
    <ButtonsStyled>
      {buttons.map((button) => (
        <Button onClick={button.onClick}>{button.children}</Button>
      ))}
    </ButtonsStyled>
  );
};

export default Buttons;
