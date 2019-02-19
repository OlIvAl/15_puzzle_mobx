import {
  ICounterStore,
  IGameStore,
  IModalStore,
  IRootStore,
  ISavedState, ISerializeTile,
  ITileModel,
  ITimerStore
} from './GameStore/interface';
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
    const state: ISavedState = {
      tiles: this.gameStore.tiles.map(({title, row, col}: ITileModel): ISerializeTile => ({
        title,
        row,
        col
      })),
      hole: {
        title: this.gameStore.hole.title,
        row: this.gameStore.hole.row,
        col: this.gameStore.hole.col
      },
      counter: this.counterStore.counter,
      time: this.timerStore.time,
    };

    localStorage.setItem(
      'state',
      JSON.stringify(state)
    )
  }
}