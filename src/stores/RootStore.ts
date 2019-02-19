import {ICounterStore, IGameStore, IModalStore, IRootStore, ISavedState, ITimerStore} from './GameStore/interface';
import GameStore from './GameStore';
import CounterStore from './CounterStore';
import TimerStore from './TimerStore';
import ModalStore from './ModalStore';

export default
class RootStore implements IRootStore {
  gameStore: IGameStore;
  counterStore: ICounterStore;
  timerStore: ITimerStore;
  modalStore: IModalStore;

  constructor() {
    this.gameStore = new GameStore(this);
    this.counterStore = new CounterStore(this);
    this.timerStore = new TimerStore(this);
    this.modalStore = new ModalStore(this);
  }

  saveGame(): void {
    debugger;

    const state: ISavedState = {
      tiles: this.gameStore.tiles,
      hole: this.gameStore.hole,
      counter: this.counterStore.counter,
      time: this.timerStore.time,
      intervalID: this.timerStore.intervalID,
    };

    localStorage.setItem(
      'state',
      JSON.stringify(state)
    )
  }
}