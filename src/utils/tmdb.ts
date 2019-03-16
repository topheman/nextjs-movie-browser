import { TmdbCrewEntity, Omit } from "../@types";

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
