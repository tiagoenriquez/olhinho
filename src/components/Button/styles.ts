import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const ButtonStyled = styled.button`
  background-color: ${(props) => props.theme.colors.background};
  color: white;
  margin: 5px 5px 5px 5px;
  padding: 10px 20px 10px 20px;
  :hover {
    background-color: ${(props) => props.theme.colors.hover};
  }
  :active {
    background-color: ${(props) => props.theme.colors.active};
  }
`;
