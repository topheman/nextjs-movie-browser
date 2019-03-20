import { observable, action } from "mobx";

class UIStore {
  @observable loading = false;
  @observable menuOpen = false;
  @action setLoadingState({ loading }: { loading: boolean }) {
    this.loading = loading;
  }
  @action setMenuOpen(menuOpen: boolean) {
    console.log("setMenuOpen", this.menuOpen);
    this.menuOpen = menuOpen;
  }
  @action toggleMenuOpen() {
    console.log("toggleMenuOpen", this.menuOpen);
    this.menuOpen = !this.menuOpen;
  }
}

export default UIStore;
