import { useStaticRendering } from "mobx-react";

const isServer = typeof window === "undefined";
useStaticRendering(isServer);

import TranslationsStore, {
  TranslationsStoreInitialState
} from "./TranslationsStore";
import UIStore from "./UIStore";

export interface MyMobxStore {
  translationsStore?: TranslationsStore;
  uiStore?: UIStore;
}
// ⚠️ TODO fix mixup between store / initialState
export const createStore = (
  initialState: {
    translationsStore?: TranslationsStoreInitialState;
  } = {}
): MyMobxStore => {
  const store = {
    translationsStore: new TranslationsStore(initialState.translationsStore),
    uiStore: new UIStore()
  };
  return store;
};
