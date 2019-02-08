import { observable, computed, action } from "mobx";

import { TmdbTranslationEntity } from "../@types";

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
}

export default TranslationsStore;
