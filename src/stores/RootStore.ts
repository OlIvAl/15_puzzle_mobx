import {
  ICounterStore,
  IGameStore,
  IModalStore,
  IRootStore,
  ISavedState, ISerializeTile, IStack,
  ITileModel,
  ITimerStore
} from './interface';
import GameStore from './GameStore';
import CounterStore from './CounterStore';
import TimerStore from './TimerStore';
import ModalStore from './ModalStore';
import {action} from 'mobx';
import StoreHelpers from './GameStore/helpers';
import {BOARD_TILE_SIZE} from '../constants/config';
import TileModel from './GameStore/TileModel';
import HoleModel from './GameStore/HoleModel';
import {WIN_MODAL} from '../constants/modals';

export default
class RootStore implements IRootStore {
  gameStore: IGameStore;
  counterStore: ICounterStore;
  timerStore: ITimerStore;
  modalStore: IModalStore;

  constructor() {
    const stringifyState: string | null = localStorage.getItem('state');

    if (stringifyState) {
      const {tiles, hole, counter, time}: ISavedState = JSON.parse(stringifyState);

      this.gameStore = new GameStore(this, tiles, hole);
      this.counterStore = new CounterStore(this, counter);
      this.timerStore = new TimerStore(this, time);
    } else {
      const {
        tiles: serializeTiles,
        hole: serializeHole
      }: Pick<ISavedState, 'tiles' | 'hole'> = StoreHelpers.generateShuffleSerializeTilesSet();

      this.gameStore = new GameStore(this, serializeTiles, serializeHole);

      this.counterStore = new CounterStore(this);
      this.timerStore = new TimerStore(this);
    }

    this.modalStore = new ModalStore(this);
  }

  @action.bound
  initNewGame(): void {
    const {
      tiles: serializeTiles,
      hole: serializeHole
    }: Pick<ISavedState, 'tiles' | 'hole'> = StoreHelpers.generateShuffleSerializeTilesSet();

    this.gameStore.initNewGame(
      serializeTiles,
      serializeHole
    );

    this.timerStore.clearInterval();
    this.timerStore.clearTime();

    this.counterStore.clearCounter();

    localStorage.removeItem('state');
  }

  @action.bound
  startGame(): void {
    const stringifyState: string | null = localStorage.getItem('state');

    if (stringifyState) {
      this.timerStore.createTimer();
    }
  }

  saveGame(): void {
    const state: ISavedState = {
      tiles: this.gameStore.tiles.map(({
                                         title,
                                         row,
                                         col
      }: ITileModel): ISerializeTile => ({
        title,
        row,
        col
      })),
      hole: {
        title: this.gameStore.hole.title,
        row: this.gameStore.hole.row,
        col: this.gameStore.hole.col
      },
      previousTiles: this.gameStore.previousTiles.toArray(),
      previousHole: this.gameStore.previousHole.toArray(),
      counter: this.counterStore.counter,
      time: this.timerStore.time,
    };

    localStorage.setItem(
      'state',
      JSON.stringify(state)
    )
  }

  @action.bound
  winGame(): void {
    this.modalStore.openModal(WIN_MODAL);

    this.timerStore.clearInterval();

    localStorage.removeItem('state');
  }
}