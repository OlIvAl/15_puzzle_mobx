import {IRootStore, ISavedState, ITimerStore} from '../interface';
import {action, computed, observable} from 'mobx';

export default
class TimerStore implements ITimerStore {
  rootStore: IRootStore;

  time: number = 0;
  intervalID: number | undefined = undefined;

  @computed get formedTime(): string {
    const time: number = this.time;
    const hour: number = Math.floor(time / 3600);
    const minute: number = Math.floor((time - hour * 3600) / 60);
    const second: number = time - hour * 3600 - minute * 60;

    return `${hour.toString().length < 2 ? `0${hour}` : hour}:`
      + `${minute.toString().length < 2 ? `0${minute}` : minute}:`
      + `${second.toString().length < 2 ? `0${second}` : second}`
  }

  constructor(rootStore: IRootStore, time: number = 0) {
    this.rootStore = rootStore;

    this.time = time;
  }

  @action.bound
  incrementTime() {
    this.time = this.time + 1;
  }

  @action.bound
  createTimer(): void {
    if(!this.intervalID) {
      this.intervalID = setInterval(
        this.incrementTime,
        1000
      );
    }
  }

  @action.bound
  clearInterval(): void {
    if(this.intervalID) {
      clearInterval(this.intervalID);

      this.intervalID = undefined;
    }
  }

  @action.bound
  clearTime(): void {
    this.time = 0;
  }
}