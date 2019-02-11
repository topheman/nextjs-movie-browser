/**
 * Based on generated types made with https://jvilk.com/MakeTypes/
 */
export interface TmdbMovieEntity {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection?: null;
  budget: number;
  genres?: (TmdbGenresEntity)[] | null;
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
  status: string;
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
  movie_credits: TmdbPersonMovieCredits;
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
  crew?: (TmdbPersonPersonCrewEntity)[] | null;
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
