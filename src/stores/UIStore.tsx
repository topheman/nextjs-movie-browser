import { observable, action } from "mobx";

class UIStore {
  @observable loading = false;
  @action setLoadingState({ loading }: { loading: boolean }) {
    this.loading = loading;
  }
}

export default UIStore;
