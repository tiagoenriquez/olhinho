import styled from 'styled-components';

export const MenuStyled = styled.div`
  display: flex;
  flex-direction: row;
  background-color: ${(props) => props.theme.colors.background};
  width: 100vw;
`;

export const MenuItemStyled = styled.div`
  background-color: ${(props) => props.theme.colors.background};
  color: white;
  padding: 10px 20px 10px 20px;
  :hover {
    background-color: ${(props) => props.theme.colors.hover};
  }
  :active {
    background-color: ${(props) => props.theme.colors.active};
  }
`;
