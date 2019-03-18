import styled from "styled-components";

export const Wrapper = styled.div`
  margin-top: 0;
  margin-bottom: 0;
  width: 100%;
  --infos-width: 200px;
  --casting-width: calc(${props => props.theme.maxWidth} - var(--infos-width));
`;

export const ColumnWrapper = styled.div`
  width: 100%;
  display: flex;
  align-content: flex-start;
  section {
    padding-top: 40px;
    display: flex;
    flex-wrap: wrap;
    box-sizing: border-box;
  }
  @media screen and (max-width: ${props => props.theme.breakpoint}) {
    display: grid;
    grid-template-areas: "casting" "infos";
    grid-template-columns: 1fr;
    grid-template-rows: auto;
  }
`;

export const Casting = styled.div`
  width: calc(
    (100vw - ${props => props.theme.maxWidth}) / 2 + var(--casting-width)
  );
  min-height: calc(100vh - 795px);
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  padding-right: 40px;
  padding-bottom: 40px;
  box-sizing: border-box;
  section {
    display: block;
    width: calc(var(--casting-width) - 40px);
  }
  a.full-casting {
    width: 100%;
  }
  @media screen and (max-width: ${props => props.theme.breakpoint}) {
    grid-area: casting;
    width: 100vw;
    padding-right: 0;
    padding-bottom: 30px;
    section  {
      padding-top: 10px;
      width: 100vw;
    }
    section > h3,
    section > a {
      padding: 0 8px;
    }
  }
`;

export const Infos = styled.div`
  background-color: #fff3f3;
  width: calc(
    (100vw - ${props => props.theme.maxWidth}) / 2 + var(--infos-width)
  );
  padding-left: 40px;
  padding-bottom: 40px;
  box-sizing: border-box;
  display: flex;
  section {
    width: var(--infos-width);
  }
  @media screen and (max-width: ${props => props.theme.breakpoint}) {
    grid-area: infos;
    width: 100vw;
    padding: 0 8px;
    section {
      width: 100%;
      padding-top: 8px;
    }
  }
`;
