import { ChangeEvent } from 'react';
import { Input, Label, TextFieldStyled } from './styles';

interface TextFieldProp {
  onChange(event: ChangeEvent<HTMLInputElement>): void;
  label: string;
  type: string;
  readOnly: boolean;
  value: string;
}

const TextField = (props: TextFieldProp) => {
  const { onChange, label, type, readOnly, value } = props;

  return (
    <TextFieldStyled>
      <Label>{label}</Label>
      <Input
        onChange={onChange}
        type={type}
        readOnly={readOnly}
        value={value}
      />
    </TextFieldStyled>
  );
};

export default TextField;
