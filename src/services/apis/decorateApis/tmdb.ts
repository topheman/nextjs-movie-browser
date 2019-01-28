import { AxiosInstance } from "axios";
import { TmdbMovieEntity } from "../../../@types";

export interface TmdbDecorateAPI {
  movie: (
    id: number | string,
    { language }: { language: string }
  ) => Promise<TmdbMovieEntity>;
}

const decorateApi = ({
  client /* key */
}: {
  client: AxiosInstance;
}): TmdbDecorateAPI => {
  client.defaults.params = {
    api_key: process.env.NEXTJS_APP_CLIENT_TMDB_API_KEY
  };
  return {
    movie: (id, { language }) => {
      const query = `/movie/${id}`;
      return client
        .get(query, {
          params: {
            language: language || "en"
          }
        })
        .then(({ data }) => data);
    }
  };
};

export default decorateApi;
