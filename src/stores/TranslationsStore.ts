import { observable, computed, action } from "mobx";

import { TmdbTranslationEntity, TmdbTranslationEntityData } from "../@types";

export interface TranslationsStoreInitialState {
  rawData: (TmdbTranslationEntity)[] | null;
}

class TranslationsStore implements TranslationsStoreInitialState {
  @observable rawData: (TmdbTranslationEntity)[] | null = [];
  constructor(
    { rawData = [] }: { rawData: (TmdbTranslationEntity)[] | null } = {} as any
  ) {
    this.rawData = rawData;
  }
  @computed get availableLanguages() {
    return (this.rawData || []).map(translation => ({
      code: `${translation.iso_639_1}-${translation.iso_3166_1}`,
      label: `${translation.english_name}`
    }));
  }
  @action setTranslations(translations: (TmdbTranslationEntity)[]) {
    this.rawData = observable.array(translations);
  }
  @action resetTranslations() {
    this.rawData = observable.array([]);
  }
  /**
   * If no `translationLanguageFullCode` passed, will use the `defaultLanguageFullCode`
   * If `translationLanguageFullCode` is passed, will try to return translated data
   * then fallback to defaultLanguage
   * If no language matches, will return `data`
   */
  @action retrieveDataWithFallback(
    translationLanguageFullCode: string | undefined,
    defaultLanguageFullCode: string | undefined,
    data: TmdbTranslationEntityData
  ) {
    const match =
      this.rawData &&
      this.rawData.reduce(
        (acc, translation) => {
          if (
            translationLanguageFullCode ===
            `${translation.iso_639_1}-${translation.iso_3166_1}`
          ) {
            acc["translationData"] = {
              ...translation.data
            };
          }
          if (
            defaultLanguageFullCode ===
            `${translation.iso_639_1}-${translation.iso_3166_1}`
          ) {
            acc["defaultData"] = {
              ...translation.data
            };
          }
          return acc;
        },
        { translationData: {}, defaultData: {} }
      );
    if (match) {
      // any missing data will be replaced by the default language
      const result = {
        ...data,
        ...match.defaultData,
        ...match.translationData
      };
      return result;
    }
    return { ...data };
  }
}

export default TranslationsStore;
