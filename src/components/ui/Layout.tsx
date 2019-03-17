import styled from "styled-components";

export const MainWrapper = styled.div`
  top: 0;
  left: 0;
  padding: 0;
  section {
    margin: 0px auto;
    max-width: ${props => props.theme.maxWidth};
  }
  @media screen and (max-width: ${props => props.theme.breakpoint}) {
    section {
      padding: 0 8px;
    }
  }
`;
