import { useStaticRendering } from "mobx-react";

const isServer = typeof window === "undefined";
useStaticRendering(isServer);

import TranslationsStore, {
  TranslationsStoreInitialState
} from "./TranslationsStore";

export interface MyMobxStore {
  translationsStore: TranslationsStore;
}

export const createStore = (
  initialState: {
    translationsStore?: TranslationsStoreInitialState;
  } = {}
): MyMobxStore => {
  const store = {
    translationsStore: new TranslationsStore(initialState.translationsStore)
  };
  return store;
};
