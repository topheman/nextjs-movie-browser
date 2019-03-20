import { observable, action } from "mobx";

class UIStore {
  @observable loading = false;
  @observable menuOpen = false;
  @action setLoadingState({ loading }: { loading: boolean }) {
    this.loading = loading;
  }
  @action setMenuOpen(menuOpen: boolean) {
    this.menuOpen = menuOpen;
  }
  @action toggleMenuOpen() {
    this.menuOpen = !this.menuOpen;
  }
}

export default UIStore;
