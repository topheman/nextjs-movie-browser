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

// Accepts any kind of credits
export type AnyCreditsEntity = Omit<
  Partial<
    TmdbPersonCastEntity &
      TmdbPersonCrewEntity &
      TmdbPersonTvCastEntity &
      TmdbPersonTvCrewEntity
  >,
  "id"
> & { id: number; media_type: "tv" | "movie" };

// Only nececarry infos to deduplicate
export type BasicCreditsEntity = Pick<
  AnyCreditsEntity,
  | "id"
  | "title"
  | "original_title"
  | "poster_path"
  | "media_type"
  | "popularity"
>;
const toBasicCredits = (credit: AnyCreditsEntity): BasicCreditsEntity => {
  const {
    id,
    name,
    title,
    original_name,
    original_title,
    poster_path,
    media_type,
    popularity
  } = credit;
  return {
    id,
    poster_path,
    media_type,
    popularity,
    original_title: original_name || original_title,
    title: name || title
  };
};

export const makeCreditsList = (
  {
    movie_credits,
    tv_credits
  }: {
    movie_credits?: TmdbPersonMovieCredits;
    tv_credits?: TmdbPersonTvCredits;
  },
  {
    deduplicate = false,
    limit
  }: { deduplicate?: boolean; limit?: number } = {} as any
): BasicCreditsEntity[] => {
  let result: BasicCreditsEntity[] = []
    .concat(
      (movie_credits &&
        movie_credits.cast &&
        movie_credits.cast.map(movie =>
          toBasicCredits({
            ...(movie as TmdbPersonCastEntity),
            media_type: "movie"
          })
        )) ||
        ([] as any)
    )
    .concat(
      (movie_credits &&
        movie_credits.crew &&
        movie_credits.crew.map(movie =>
          toBasicCredits({ ...movie, media_type: "movie" })
        )) ||
        ([] as any)
    )
    .concat(
      (tv_credits &&
        tv_credits.cast &&
        tv_credits.cast.map(movie =>
          toBasicCredits({ ...movie, media_type: "tv" })
        )) ||
        ([] as any)
    )
    .concat(
      (tv_credits &&
        tv_credits.crew &&
        tv_credits.crew.map(movie =>
          toBasicCredits({ ...movie, media_type: "tv" })
        )) ||
        ([] as any)
    );

  if (deduplicate) {
    result = result.reduce<BasicCreditsEntity[]>((
      acc,
      cur: BasicCreditsEntity
    ) => {
      if (
        !acc.find(el => el.id === cur.id && el.media_type === cur.media_type)
      ) {
        acc.push(cur);
      }
      return acc;
    }, []);
  }

  result.sort((a, b) => {
    if (
      ((a as BasicCreditsEntity).popularity || 0) >
      ((b as BasicCreditsEntity).popularity || 0)
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

export const makeFilmography = ({
  movie_credits,
  tv_credits
}: {
  movie_credits?: TmdbPersonMovieCredits;
  tv_credits?: TmdbPersonTvCredits;
}) => {
  let result: { [key: string]: AnyCreditsEntity[] } = {};
  if (movie_credits && movie_credits.cast) {
    result = movie_credits.cast.reduce((acc, cur) => {
      if (!acc.Acting) {
        acc.Acting = [];
      }
      acc.Acting.push({ ...cur, media_type: "movie" });
      return acc;
    }, result);
  }
  if (movie_credits && movie_credits.crew) {
    result = movie_credits.crew.reduce((acc, cur) => {
      if (!acc[cur.department]) {
        acc[cur.department] = [];
      }
      acc[cur.department].push({ ...cur, media_type: "movie" });
      return acc;
    }, result);
  }
  if (tv_credits && tv_credits.cast) {
    result = tv_credits.cast.reduce((acc, cur) => {
      if (!acc.Acting) {
        acc.Acting = [];
      }
      acc.Acting.push({ ...cur, media_type: "tv" });
      return acc;
    }, result);
  }
  if (tv_credits && tv_credits.crew) {
    result = tv_credits.crew.reduce((acc, cur) => {
      if (!acc[cur.department]) {
        acc[cur.department] = [];
      }
      acc[cur.department].push({ ...cur, media_type: "tv" });
      return acc;
    }, result);
  }
  Object.keys(result).forEach(key => {
    result[key].sort((a, b) => {
      if (
        ((a.first_air_date || a.release_date) as string) >
        ((b.first_air_date || b.release_date) as string)
      ) {
        return -1;
      }
      return 1;
    });
  });
  return result;
};
