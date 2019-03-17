import {
  TmdbCrewEntity,
  Omit,
  TmdbPersonMovieCredits,
  TmdbPersonTvCredits,
  TmdbPersonTvCrewEntity,
  TmdbPersonTvCastEntity,
  TmdbPersonCastEntity,
  TmdbPersonCrewEntity
} from "../@types";

/**
 * More infos:
 * https://developers.themoviedb.org/4/getting-started/images
 * https://api.themoviedb.org/3/configuration
 */
export const makeImageTmdbUrl = (imagePath: string, imageSize: string) => {
  return `${
    process.env.NEXTJS_APP_CLIENT_TMDB_IMAGE_CDN_BASE_URL
  }/${imageSize}${imagePath}`;
};

type CrewListWithJobs = (Omit<
  TmdbCrewEntity & {
    jobs: string[];
  },
  "credit_id" | "job" | "department"
>)[];

export const makeCrewListWithJobs = (
  crew: TmdbCrewEntity[]
): CrewListWithJobs => {
  return crew.reduce<CrewListWithJobs>(
    (acc, currentCrewEntity) => {
      const existingCrewEntity = acc.find(
        entity => entity.id === currentCrewEntity.id
      );
      if (existingCrewEntity) {
        existingCrewEntity.jobs.push(currentCrewEntity.job);
        return acc;
      }

      const newCrewEntity = {
        ...currentCrewEntity,
        jobs: [currentCrewEntity.job]
      };
      delete newCrewEntity.credit_id;
      delete newCrewEntity.job;
      delete newCrewEntity.department;
      acc.push(newCrewEntity);
      return acc;
    },
    [] as CrewListWithJobs
  );
};

export type CastOrCrewEntity = TmdbPersonCastEntity &
  TmdbPersonCrewEntity &
  TmdbPersonTvCastEntity &
  TmdbPersonTvCrewEntity & { media_type: "tv" | "movie" };

export const makeCreditsList = (
  {
    movie_credits,
    tv_credits
  }: {
    movie_credits?: TmdbPersonMovieCredits;
    tv_credits?: TmdbPersonTvCredits;
  },
  limit?: number
): CastOrCrewEntity[] => {
  const result = []
    .concat(
      (movie_credits &&
        movie_credits.cast &&
        movie_credits.cast.map(movie => ({ ...movie, media_type: "movie" }))) ||
        ([] as any)
    )
    .concat(
      (movie_credits &&
        movie_credits.crew &&
        movie_credits.crew.map(movie => ({ ...movie, media_type: "movie" }))) ||
        ([] as any)
    )
    .concat(
      (tv_credits &&
        tv_credits.cast &&
        tv_credits.cast.map(movie => ({ ...movie, media_type: "tv" }))) ||
        ([] as any)
    )
    .concat(
      (tv_credits &&
        tv_credits.crew &&
        tv_credits.crew.map(movie => ({ ...movie, media_type: "tv" }))) ||
        ([] as any)
    )
    .sort((a, b) => {
      if (
        (a as CastOrCrewEntity).popularity > (b as CastOrCrewEntity).popularity
      ) {
        return -1;
      }
      return 1;
    });
  if (limit) {
    return result.splice(0, limit);
  }
  return result;
};
