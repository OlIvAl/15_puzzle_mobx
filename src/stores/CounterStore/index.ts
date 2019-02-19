import {ICounterStore, IRootStore, ISavedState} from '../GameStore/interface';
import {action, observable} from 'mobx';

export default
class CounterStore implements ICounterStore {
  rootStore: IRootStore;

  @observable counter: number = 0;

  constructor(rootStore: IRootStore) {
    this.rootStore = rootStore;

    const stringifyState: string | null = localStorage.getItem('state');

    if (stringifyState) {
      this.counter = (JSON.parse(stringifyState) as ISavedState).counter
    }
  }

  @action.bound
  incrementCounter(): void {
    this.counter = this.counter + 1;
  }
}