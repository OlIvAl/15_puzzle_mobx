import {ICounterStore, IRootStore, ISavedState} from '../interface';
import {action, observable} from 'mobx';

export default
class CounterStore implements ICounterStore {
  rootStore: IRootStore;

  @observable counter: number = 0;

  constructor(rootStore: IRootStore, counter: number = 0) {
    this.rootStore = rootStore;

    this.counter = counter;
  }

  @action.bound
  incrementCounter(): void {
    this.counter = this.counter + 1;
  }

  @action.bound
  decrementCounter(): void {
    if(this.counter) {
      this.counter = this.counter - 1;
    }
  }

  @action.bound
  clearCounter(): void {
    this.counter = 0;
  }
}