import styled from "styled-components";

import Link from "./Link";
import { filterHtmlProps } from "../utils/helpers";
import { makeImageTmdbUrl, BasicCreditsEntity } from "../utils/tmdb";

const Wrapper = styled.div`
  width: 140px;
  box-sizing: border-box;
  img {
    border-radius: 5px;
  }
  p {
    padding: 0 10px;
    font-size: 0.8rem;
    text-align: center;
  }
  @media screen and (max-width: ${props => props.theme.breakpoint}) {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    background-color: #fff;
  }
`;

interface Props {
  data: BasicCreditsEntity;
}

const CastingCardFull: React.FunctionComponent<Props> = ({
  data,
  ...remainingProps
}) => {
  return (
    <Wrapper {...filterHtmlProps(remainingProps)}>
      <Link tmdbEntity={data}>
        <a>
          <img
            width={140}
            src={
              (data.poster_path &&
                makeImageTmdbUrl(data.poster_path, "w138_and_h175_face")) ||
              ""
            }
          />
        </a>
      </Link>
      <p>{data.title}</p>
    </Wrapper>
  );
};

export default CastingCardFull;
