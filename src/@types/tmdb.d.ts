/* tslint:disable */
/**
 * Based on generated types made with https://jvilk.com/MakeTypes/
 */
export interface TmdbMovieEntity {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection?: null;
  budget: number;
  genres?: (TmdbGenresEntity)[] | null;
  keywords?: { keywords: (TmdbKeywordsEntity)[] | null };
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies?: (TmdbProductionCompaniesEntity)[] | null;
  production_countries?: (TmdbProductionCountriesEntity)[] | null;
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages?: (TmdbSpokenLanguagesEntity)[] | null;
  status:
    | "Rumored"
    | "Planned"
    | "In Production"
    | "Post Production"
    | "Released"
    | "Canceled";
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  translations?: TmdbTranslations;
  credits?: TmdbCredits;
}
export interface TmdbGenresEntity {
  id: number;
  name: string;
}
export interface TmdbKeywordsEntity {
  id: number;
  name: string;
}
export interface TmdbProductionCompaniesEntity {
  id: number;
  logo_path?: string | null;
  name: string;
  origin_country: string;
}
export interface TmdbProductionCountriesEntity {
  iso_3166_1: string;
  name: string;
}
export interface TmdbSpokenLanguagesEntity {
  iso_639_1: string;
  name: string;
}
export interface TmdbTranslations {
  translations?: (TmdbTranslationEntity)[] | null;
}
export interface TmdbTranslationsEntity extends TmdbTranslations {
  id: number;
}
export interface TmdbTranslationEntity {
  iso_3166_1: string;
  iso_639_1: string;
  name: string;
  english_name: string;
  data: TmdbTranslationEntityData;
}
export interface TmdbTranslationEntityData {
  name?: string;
  title?: string;
  overview?: string;
  homepage?: string;
  biography?: string;
}
export interface TmdbCredits {
  cast?: (TmdbCastEntity)[] | null;
  crew?: (TmdbCrewEntity)[] | null;
}
export interface TmdbCreditsEntity extends TmdbCredits {
  id: number;
}
export interface TmdbCastEntity {
  cast_id: number;
  character: string;
  credit_id: string;
  gender: number;
  id: number;
  name: string;
  order: number;
  profile_path?: string | null;
}
export interface TmdbCrewEntity {
  credit_id: string;
  department: string;
  gender: number;
  id: number;
  job: string;
  name: string;
  profile_path?: string | null;
}
export interface TmdbPersonEntity {
  birthday: string;
  known_for_department: string;
  deathday?: null;
  id: number;
  name: string;
  movie_credits?: TmdbPersonMovieCredits;
  tv_credits?: TmdbPersonTvCredits;
  also_known_as?: (string)[] | null;
  gender: number;
  biography: string;
  popularity: number;
  place_of_birth: string;
  profile_path: string;
  adult: boolean;
  imdb_id: string;
  homepage?: string;
  translations?: TmdbTranslations;
}
export interface TmdbPersonMovieCredits {
  cast?: (TmdbPersonCastEntity)[] | null;
  crew?: (TmdbPersonCrewEntity)[] | null;
}
export interface TmdbPersonCastEntity {
  release_date: string;
  adult: boolean;
  vote_average: number;
  vote_count: number;
  video: boolean;
  title: string;
  popularity: number;
  genre_ids?: (number | null)[] | null;
  original_language: string;
  character: string;
  original_title: string;
  poster_path?: string | null;
  id: number;
  backdrop_path?: string | null;
  overview: string;
  credit_id: string;
}
export interface TmdbPersonCrewEntity {
  id: number;
  department: string;
  original_language: string;
  original_title: string;
  job: string;
  overview: string;
  genre_ids?: (number)[] | null;
  video: boolean;
  credit_id: string;
  poster_path: string;
  popularity: number;
  backdrop_path: string;
  vote_count: number;
  title: string;
  adult: boolean;
  vote_average: number;
  release_date: string;
}
export interface TmdbPersonTvCredits {
  cast?: (TmdbPersonTvCastEntity)[] | null;
  crew?: (TmdbPersonTvCrewEntity)[] | null;
}
export interface TmdbPersonTvCastEntity {
  origin_country?: (string | null)[] | null;
  original_name: string;
  genre_ids?: (number | null)[] | null;
  vote_count: number;
  backdrop_path?: string | null;
  name: string;
  first_air_date: string;
  original_language: string;
  popularity: number;
  character: string;
  episode_count: number;
  id: number;
  credit_id: string;
  vote_average: number;
  overview: string;
  poster_path?: string | null;
}
export interface TmdbPersonTvCrewEntity {
  id: number;
  department: string;
  original_language: string;
  episode_count: number;
  job: string;
  overview: string;
  origin_country?: (string)[] | null;
  original_name: string;
  vote_count: number;
  name: string;
  popularity: number;
  credit_id: string;
  backdrop_path?: string | null;
  first_air_date: string;
  vote_average: number;
  genre_ids?: (number)[] | null;
  poster_path: string;
}

export interface TmdbTvEntity {
  backdrop_path: string;
  created_by?: (TmdbTvCreatedByEntity)[] | null;
  episode_run_time?: (number)[] | null;
  first_air_date: string;
  genres?: (TmdbGenresEntity)[] | null;
  keywords?: { keywords: (TmdbKeywordsEntity)[] | null };
  homepage: string;
  id: number;
  in_production: boolean;
  languages?: (string)[] | null;
  last_air_date: string;
  last_episode_to_air: TmdbTvEpisode;
  name: string;
  next_episode_to_air: TmdbTvEpisode;
  networks?: (NetworksEntityOrProductionCompaniesEntity)[] | null;
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country?: (string)[] | null;
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies?:
    | (TmdbNetworksEntityOrProductionCompaniesEntity)[]
    | null;
  seasons?: (TmdbTvSeasonsEntity)[] | null;
  status:
    | "Returning Series"
    | "Planned"
    | "In Production"
    | "Ended"
    | "Canceled"
    | "Pilot";
  type: string;
  vote_average: number;
  vote_count: number;
  credits: TmdbTvCredits;
  translations: TmdbTranslations;
}
export interface TmdbTvCreatedByEntity {
  id: number;
  credit_id: string;
  name: string;
  gender: number;
  profile_path: string;
}
export interface TmdbTvEpisode {
  air_date: string;
  episode_number: number;
  id: number;
  name: string;
  overview: string;
  production_code: string;
  season_number: number;
  show_id: number;
  still_path: string;
  vote_average: number;
  vote_count: number;
}
export interface TmdbNetworksEntityOrProductionCompaniesEntity {
  name: string;
  id: number;
  logo_path: string;
  origin_country: string;
}
export interface TmdbTvSeasonsEntity {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
}
export interface TmdbTvCredits {
  cast?: (TmdbTvCastEntity)[] | null;
  crew?: (TmdbTvCrewEntity)[] | null;
}
export interface TmdbTvCastEntity {
  character: string;
  credit_id: string;
  id: number;
  name: string;
  gender: number;
  profile_path: string;
  order: number;
}
export interface TmdbTvCrewEntity {
  credit_id: string;
  department: string;
  id: number;
  name: string;
  gender: number;
  job: string;
  profile_path?: string | null;
}

export type TmdbSearchResultsList = (TmdbSearchResultsEntity)[];
export interface TmdbSearchResults {
  page: number;
  total_results: number;
  total_pages: number;
  results: TmdbSearchResultsList;
}
export interface TmdbSearchResultsEntity {
  original_name?: string;
  id: number;
  media_type: "movie" | "person" | "tv";
  name?: string;
  vote_count?: number;
  vote_average?: number;
  poster_path?: string;
  first_air_date?: string;
  popularity: number;
  genre_ids?: (number | null)[];
  original_language?: string;
  backdrop_path?: string;
  overview?: string;
  origin_country?: (string)[];
  video?: boolean;
  title?: string;
  original_title?: string;
  adult?: boolean;
  release_date?: string;
  profile_path?: string;
  known_for?: (TmdbSearchKnownForEntity)[];
}
export interface TmdbSearchKnownForEntity {
  vote_average: number;
  vote_count: number;
  id: number;
  video: boolean;
  media_type: "movie" | "person" | "tv";
  title: string;
  popularity: number;
  poster_path: string;
  original_language: string;
  original_title: string;
  genre_ids?: (number)[] | null;
  backdrop_path: string;
  adult: boolean;
  overview: string;
  release_date: string;
}

export type TmdbTrendingResultsList = (TmdbTrendingResultsEntity)[];
export interface TmdbTrendingResults {
  page: number;
  results: TmdbTrendingResultsList;
  total_pages: number;
  total_results: number;
}
export interface TmdbTrendingResultsEntity {
  adult?: boolean | null;
  backdrop_path: string;
  genre_ids?: (number)[] | null;
  id: number;
  original_language: string;
  original_title?: string | null;
  overview: string;
  poster_path: string;
  release_date?: string | null;
  title?: string | null;
  video?: boolean | null;
  vote_average: number;
  vote_count: number;
  popularity: number;
  original_name?: string | null;
  name?: string | null;
  first_air_date?: string | null;
  origin_country?: (string)[] | null;
}
