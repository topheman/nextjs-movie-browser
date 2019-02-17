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
