import { AxiosInstance } from "axios";
import { TmdbMovieEntity } from "../../../@types/tmdb";

export interface TmdbDecorateAPI {
  movie: (id: string | number) => Promise<TmdbMovieEntity>;
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
    movie: id => {
      const query = `/movie/${id}`;
      return client.get(query).then(({ data }) => data);
    }
  };
};

export default decorateApi;
