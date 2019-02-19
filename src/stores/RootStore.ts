import {ICounterStore, IGameStore, IModalStore, IRootStore, ITimerStore} from './GameStore/interface';
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
}