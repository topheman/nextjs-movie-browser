import { observable, computed, action } from "mobx";

import { TmdbTranslationEntity } from "../@types";

export interface TranslationsStoreInitialState {
  rawData: (TmdbTranslationEntity)[] | null;
}

const removeFalsy = <T>(obj: T): T => {
  let newObj: T = {} as T;
  Object.keys(obj).forEach(prop => {
    const key = prop as keyof typeof obj; // needed for typescript
    if (obj[key]) {
      newObj[key] = obj[key];
    }
  });
  return newObj;
};

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
   * Retrieve missing translated parts of `data` using the tranlation infos.
   * 1) Injects data in `translationLanguageFullCode` if parameter passed and translation available in the language
   * 2) Injects data in `defaultLanguageFullCode` if data available in the language
   * 3) Injects data in `fallbackLanguageFullCode` if data available in the language
   */
  @action retrieveDataWithFallback<TData, TTranslationData>(
    data: TData,
    defaultLanguageFullCode: string,
    translationLanguageFullCode: string | undefined,
    fallbackLanguageFullCode = "en-US"
  ) {
    const match =
      this.rawData &&
      this.rawData.reduce(
        (acc, translation) => {
          [
            ["translationData", translationLanguageFullCode],
            ["defaultData", defaultLanguageFullCode],
            ["fallbackData", fallbackLanguageFullCode]
          ].forEach(([accumulatorKey, languageCode]) => {
            if (
              translation &&
              languageCode ===
                `${translation.iso_639_1}-${translation.iso_3166_1}`
            ) {
              (acc as any)[accumulatorKey as string] = removeFalsy(
                translation.data as TTranslationData
              );
            }
          });
          return acc;
        },
        { translationData: {}, defaultData: {}, fallbackData: {} } as {
          translationData: TTranslationData;
          defaultData: TTranslationData;
          fallbackData: TTranslationData;
        }
      );
    if (match) {
      // any missing data will be replaced by the default language
      const result = {
        ...data,
        ...match.fallbackData,
        ...match.defaultData,
        ...match.translationData
      };
      return result;
    }
    return { ...data };
  }
}

export default TranslationsStore;
