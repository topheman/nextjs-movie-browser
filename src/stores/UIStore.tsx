import { observable, action } from "mobx";

class UIStore {
  @observable loading = false;
  @observable error = false;
  @action setLoadingState({
    loading,
    error
  }: {
    loading: boolean;
    error: boolean;
  }) {
    this.error = error;
    this.loading = loading;
  }
}

export default UIStore;
