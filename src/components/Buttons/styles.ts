import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const ButtonsStyled = styled.div`
  dispaly: flex;
  flex-drection: row;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.main};
`;
