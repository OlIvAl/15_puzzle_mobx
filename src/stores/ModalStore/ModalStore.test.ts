import ModalStore from '.';
import {IModalStore, IRootStore} from '../interface';
import RootStore from '../RootStore';

describe('ModalStore', () => {
  const rootStore: IRootStore = new RootStore();
  const fakeModal: string = 'fakeModal';

  describe('при инициализации', () => {
    it('инициализирует поле modal пустой строкой', () => {
      const modalStore: IModalStore = new ModalStore(rootStore);

      expect(modalStore.modal).toEqual('');
    });
  });
  describe('openModal', () => {
    it('выставляет поле modal', () => {
      const modalStore: IModalStore = new ModalStore(rootStore);

      modalStore.openModal(fakeModal);

      expect(modalStore.modal).toEqual(fakeModal);
    });
  });
  describe('closeModal', () => {
    it('очищает поле modal', () => {
      const modalStore: IModalStore = new ModalStore(rootStore);

      modalStore.modal = fakeModal;
      modalStore.closeModal();

      expect(modalStore.modal).toEqual('');
    });
  });
});