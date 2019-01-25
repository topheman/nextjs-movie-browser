import { AxiosInstance } from "axios";
import { TmdbMovieEntity } from "../../../@types/tmdb";

export interface TmdbDecorateAPI {
  movie: (id: string | number) => Promise<TmdbMovieEntity>;
}

const decorateApi = ({
  client /* , cache, key */
}: {
  client: AxiosInstance;
}): TmdbDecorateAPI => ({
  movie: id => {
    const query = `/movie/${id}`;
    return client.get(query).then(({ data }) => data);
  }
});

export default decorateApi;
