import { AxiosInstance, CancelToken } from "axios";
import {
  TmdbMovieEntity,
  TmdbPersonEntity,
  TmdbTvEntity,
  TmdbSearchResults,
  TmdbTrendingResults
} from "../../../@types";
import {
  AxiosMockManagerSetupRecorder,
  AxiosMockManagerProcessResponseBeforeSave
} from "../../../libs/axios-mock-manager/recorder";

let setupRecorder: AxiosMockManagerSetupRecorder;
let processResponseBeforeSave: AxiosMockManagerProcessResponseBeforeSave;
if (process.env.RECORD_MOCKS === "true" && typeof window !== "undefined") {
  setupRecorder = require("../../../libs/axios-mock-manager/recorder")
    .setupRecorder;
  processResponseBeforeSave = require("../../../libs/axios-mock-manager/recorder")
    .processResponseBeforeSave;
}

export interface TmdbDecorateAPI {
  movie: (
    id: number | string,
    { language, append }: { language: string; append?: string[] }
  ) => Promise<TmdbMovieEntity>;
  person: (
    id: number | string,
    { language, append }: { language: string; append?: string[] }
  ) => Promise<TmdbPersonEntity>;
  tv: (
    id: number | string,
    { language, append }: { language: string; append?: string[] }
  ) => Promise<TmdbTvEntity>;
  searchMulti: (
    queryValue: string,
    {
      language,
      page,
      cancelToken
    }: { language: string; page?: number; cancelToken?: CancelToken }
  ) => Promise<TmdbSearchResults>;
  trending: (
    media_type: "tv" | "movie" | "person" | "all",
    time_window: "day" | "week",
    { language, append }: { language: string; append?: string[] }
  ) => Promise<TmdbTrendingResults>;
}

const decorateApi = ({
  client /* key */
}: {
  client: AxiosInstance;
}): TmdbDecorateAPI => {
  client.defaults.params = {
    api_key: process.env.NEXTJS_APP_CLIENT_TMDB_API_KEY
  };
  if (process.env.RECORD_MOCKS === "true" && typeof window !== "undefined") {
    console.log("setupRecorder");
    const mockRecorder = setupRecorder(client, {
      processResponse: response => {
        // obfuscate api key at recording time
        let result = processResponseBeforeSave(response);
        result = {
          ...result,
          match: result.match.replace(
            process.env.NEXTJS_APP_CLIENT_TMDB_API_KEY as string,
            "$API_KEY"
          ),
          req: {
            ...result.req,
            params: {
              ...result.req.params,
              api_key: "$API_KEY"
            }
          }
        };
        return result;
      }
    });
    mockRecorder.init();
    // expose on the global scope
    (window as any).mockRecorder = mockRecorder;
  }
  return {
    movie: (id, { language, append = ["credits", "translations"] }) => {
      const query = `/movie/${id}`;
      return client
        .get(query, {
          params: {
            language: language || "en",
            append_to_response: append.join(",")
          }
        })
        .then(({ data }) => data);
    },
    person: (
      id,
      { language, append = ["movie_credits", "tv_credits", "translations"] }
    ) => {
      const query = `/person/${id}`;
      return client
        .get(query, {
          params: {
            language: language || "en",
            append_to_response: append.join(",")
          }
        })
        .then(({ data }) => data);
    },
    tv: (id, { language, append = ["credits", "translations"] }) => {
      const query = `/tv/${id}`;
      return client
        .get(query, {
          params: {
            language: language || "en",
            append_to_response: append.join(",")
          }
        })
        .then(({ data }) => data);
    },
    searchMulti: (queryValue, { language, page = 1, cancelToken }) => {
      const query = "/search/multi";
      return client
        .get(query, {
          params: {
            query: queryValue,
            language: language || "en",
            page
          },
          cancelToken
        })
        .then(({ data }) => data);
    },
    trending: (media_type, time_window, { language }) => {
      const query = `/trending/${media_type}/${time_window}`;
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
