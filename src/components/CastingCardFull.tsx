import styled from "styled-components";

import Link from "./Link";
import { TmdbCastEntity } from "../@types";
import { filterHtmlProps } from "../utils/helpers";
import { makeImageTmdbUrl } from "../utils/tmdb";

const Wrapper = styled.div`
  width: 140px;
  background-color: #fff;
  box-sizing: border-box;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  a {
    font-weight: bold;
    text-decoration: none;
    font-size: 0.9rem;
  }
  p {
    padding: 0 10px;
    font-size: 0.8rem;
  }
`;

interface Props {
  person: TmdbCastEntity;
}

const CastingCardFull: React.FunctionComponent<Props> = ({
  person,
  ...remainingProps
}) => {
  return (
    <Wrapper {...filterHtmlProps(remainingProps)}>
      <Link tmdbEntity={{ ...person, media_type: "person" }}>
        <a>
          <img
            width={140}
            src={
              (person.profile_path &&
                makeImageTmdbUrl(person.profile_path, "w138_and_h175_face")) ||
              ""
            }
          />
        </a>
      </Link>
      <p>
        <Link tmdbEntity={{ ...person, media_type: "person" }}>
          <a>{person.name}</a>
        </Link>
      </p>
      <p>{person.character}</p>
    </Wrapper>
  );
};

export default CastingCardFull;
