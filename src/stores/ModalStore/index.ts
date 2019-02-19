import {IModalStore, IRootStore} from '../GameStore/interface';
import {action, observable} from 'mobx';

export default
class ModalStore implements IModalStore {
  rootStore: IRootStore;

  @observable modal: string = '';

  constructor(rootStore: IRootStore) {
    this.rootStore = rootStore;
  }

  @action.bound
  openModal(modalName: string): void {
    this.modal = modalName;
  }

  @action.bound
  closeModal(): void {
    this.modal = '';
  }
}