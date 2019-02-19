import {IRootStore, ITimerStore} from '../GameStore/interface';
import {action, computed, observable} from 'mobx';

export default
class TimerStore implements ITimerStore {
  rootStore: IRootStore;

  @observable time: number = 0;
  @observable intervalID: number | undefined = undefined;

  @computed get formedTime(): string {
    const time: number = this.time;
    const hour: number = Math.floor(time / 3600);
    const minute: number = Math.floor((time - hour * 3600) / 60);
    const second: number = time - hour * 3600 - minute * 60;

    return `${hour.toString().length < 2 ? `0${hour}` : hour}:`
      + `${minute.toString().length < 2 ? `0${minute}` : minute}:`
      + `${second.toString().length < 2 ? `0${second}` : second}`
  }

  constructor(rootStore: IRootStore) {
    this.rootStore = rootStore;
  }

  @action.bound
  incrementTime() {
    this.time = this.time + 1;
  }
}