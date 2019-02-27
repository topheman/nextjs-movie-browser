import MoviePreview from "./MoviePreview";
import MovieCast from "./MovieCast";
import { TmdbMovieEntity } from "../@types";

// TODO add metatags
// TODO refactor with others pages

interface MovieProps extends TmdbMovieEntity {
  basePath: string;
  pathname: string;
  media_type: "movie" | "tv";
}

const Cast = ({
  basePath: _,
  pathname: __,
  media_type,
  ...movieProps
}: MovieProps) => {
  return (
    <>
      <MoviePreview media_type={media_type} mode="preview" {...movieProps} />
      <MovieCast media_type={media_type} {...movieProps} />
    </>
  );
};

export const makeCast = ({ media_type }: { media_type: "movie" | "tv" }) => (
  props: any
) => <Cast media_type={media_type} {...props} />;
