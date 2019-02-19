import {ICounterStore, IRootStore} from '../GameStore/interface';
import {action, observable} from 'mobx';

export default
class CounterStore implements ICounterStore {
  rootStore: IRootStore;

  @observable counter: number = 0;

  constructor(rootStore: IRootStore) {
    this.rootStore = rootStore;
  }


  @action.bound
  incrementCounter(): void {
    this.counter = this.counter + 1;
  }
}