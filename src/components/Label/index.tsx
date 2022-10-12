import { LabelStyled } from './styled';

interface LabelProp {
  children: string;
}

const Label = (props: LabelProp) => {
  const { children } = props;

  return <LabelStyled>{children}</LabelStyled>;
};

export default Label;
