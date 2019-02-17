import TranslationsStore from "../TranslationsStore";
import { TmdbMovieEntity } from "../../@types";
const movieFixture: TmdbMovieEntity = require("../../services/apis/__mocks__/tmdb/movie.fixtures.json");

describe("src/stores/TranslationsStore", () => {
  it("should store translations", () => {
    const store = new TranslationsStore();
    store.setTranslations(movieFixture.translations.translations);
    expect(store.rawData).toEqual(movieFixture.translations.translations);
  });
  it("should expose available languages", () => {
    const store = new TranslationsStore();
    store.setTranslations(movieFixture.translations.translations);
    expect(store.availableLanguages).toEqual(
      movieFixture.translations.translations.map(translation => ({
        code: `${translation.iso_639_1}-${translation.iso_3166_1}`,
        label: `${translation.english_name}`
      }))
    );
  });
  it("should epose available languages codes (sorted)", () => {
    const store = new TranslationsStore();
    store.setTranslations(movieFixture.translations.translations);
    expect(store.availableLanguagesCodes).toEqual(
      movieFixture.translations.translations
        .map(
          translation => `${translation.iso_639_1}-${translation.iso_3166_1}`
        )
        .sort()
    );
  });
  describe("retrieveDataWithFallback", () => {
    const defaultLanguageFullCode = "fr-FR";
    const translationLanguageFullCode = "es-ES";
    const fallbackLanguageFullCode = "en-US";
    it(`translationLanguageFullCode (${translationLanguageFullCode}) should take over`, () => {
      const store = new TranslationsStore();
      store.setTranslations(movieFixture.translations.translations);
      const translatedData = store.retrieveDataWithFallback(
        movieFixture,
        defaultLanguageFullCode,
        translationLanguageFullCode
      );
      expect({
        title: translatedData.title,
        overview: translatedData.overview
      }).toMatchSnapshot();
    });
    it(`partial fallback from translation language (${translationLanguageFullCode}) to default language (${defaultLanguageFullCode})`, () => {
      const store = new TranslationsStore();
      // remove the title from the es-ES translations
      store.setTranslations(
        movieFixture.translations.translations.map(translation => {
          if (
            `${translation.iso_639_1}-${translation.iso_3166_1}` !==
            translationLanguageFullCode
          ) {
            return translation;
          }
          return {
            ...translation,
            data: {
              ...translation.data,
              title: ""
            }
          };
        })
      );
      const translatedData = store.retrieveDataWithFallback(
        movieFixture,
        defaultLanguageFullCode,
        translationLanguageFullCode
      );
      expect({
        title: translatedData.title,
        overview: translatedData.overview
      }).toMatchSnapshot();
    });
    it(`full fallback from translation language (${translationLanguageFullCode}) to default language (${defaultLanguageFullCode}) - e.g. missing translations`, () => {
      const store = new TranslationsStore();
      // remove the es-ES translations
      store.setTranslations(
        movieFixture.translations.translations.filter(
          translation =>
            `${translation.iso_639_1}-${translation.iso_3166_1}` !==
            translationLanguageFullCode
        )
      );
      const translatedData = store.retrieveDataWithFallback(
        movieFixture,
        defaultLanguageFullCode,
        translationLanguageFullCode
      );
      expect({
        title: translatedData.title,
        overview: translatedData.overview
      }).toMatchSnapshot();
    });
    it(`partial fallback from default language (${defaultLanguageFullCode}) to fallback language (${fallbackLanguageFullCode})`, () => {
      const store = new TranslationsStore();
      // remove the es-ES translations and the title from the fr-FR
      store.setTranslations(
        movieFixture.translations.translations.map(translation => {
          if (
            `${translation.iso_639_1}-${translation.iso_3166_1}` !==
              translationLanguageFullCode &&
            `${translation.iso_639_1}-${translation.iso_3166_1}` !==
              defaultLanguageFullCode
          ) {
            return translation;
          }
          if (
            `${translation.iso_639_1}-${translation.iso_3166_1}` ===
            defaultLanguageFullCode
          ) {
            return {
              ...translation,
              data: {
                ...translation.data,
                title: ""
              }
            };
          }
        })
      );
      const translatedData = store.retrieveDataWithFallback(
        movieFixture,
        defaultLanguageFullCode,
        translationLanguageFullCode
      );
      expect({
        title: translatedData.title,
        overview: translatedData.overview
      }).toMatchSnapshot();
    });
    it(`full fallback from default language (${defaultLanguageFullCode}) to fallback language (${fallbackLanguageFullCode})`, () => {
      const store = new TranslationsStore();
      // remove the es-ES translations
      store.setTranslations(
        movieFixture.translations.translations.filter(
          translation =>
            `${translation.iso_639_1}-${translation.iso_3166_1}` !==
              translationLanguageFullCode &&
            `${translation.iso_639_1}-${translation.iso_3166_1}` !==
              defaultLanguageFullCode
        )
      );
      const translatedData = store.retrieveDataWithFallback(
        movieFixture,
        defaultLanguageFullCode,
        translationLanguageFullCode
      );
      expect({
        title: translatedData.title,
        overview: translatedData.overview
      }).toMatchSnapshot();
    });
  });
});
