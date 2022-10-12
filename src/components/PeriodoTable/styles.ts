import styled from 'styled-components';

export const PeriodoTableStyled = styled.table`
  margin: 5px 5px 5px 5px;
`;

export const THeadStyled = styled.thead`
  background-color: rgb(230, 221, 216);
  text-transform: uppercase;
  font-weight: bold;
`;

export const TBodyStyled = styled.tbody`
  background-color: white;
`;

export const TdTHeadStyled = styled.td`
  padding: 10px 20px 10px 20px;
  text-align: center;
`;

export const TrTbodyStyled = styled.tr`
  :hover {
    background-color: rgb(242, 238, 236);
  }
`;

export const TdTBodyStyled = styled.td`
  padding: 10px 20px 10px 20px;
  text-align: center;
`;

export const ExcluirButtonStyled = styled.button`
  background-color: ${(props) => props.theme.colors.background};
  margin: 5px 5px 5px 5px;
  height: 30px;
  width: 30px;
  :hover {
    background-color: ${(props) => props.theme.colors.hover};
  }
  :active {
    background-color: ${(props) => props.theme.colors.active};
  }
`;

export const AlterarButtonStyled = styled.button`
  background-color: ${(props) => props.theme.colors.background};
  color: white;
  margin: 5px 5px 5px 5px;
  height: 30px;
  width: 30px;
  :hover {
    background-color: ${(props) => props.theme.colors.hover};
  }
  :active {
    background-color: ${(props) => props.theme.colors.active};
  }
`;

export const ImageTable = styled.img`
  height: 20px;
  width: auto;
  color: white;
`;
