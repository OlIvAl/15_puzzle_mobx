export interface IStack<T> {
  push: (item: T) => T[];
  pop: () => T;

  size: () => number;
  peek: () => T;
  isEmpty: () => boolean;
  clear: () => void;
}

export interface ISerializeTile {
  title: number;
  row: number;
  col: number;
}

export interface ISavedState extends Pick<ICounterStore, 'counter'>, Pick<ITimerStore, 'time'>{
  tiles: ISerializeTile[];
  hole: ISerializeTile;
}

export interface IRootStore {
  gameStore: IGameStore;
  counterStore: ICounterStore;
  timerStore: ITimerStore;
  modalStore: IModalStore;

  saveGame: () => void;
}

export interface IAbstractTileModel {
  store: IGameStore;

  title: number;

  row: number;
  col: number;

  changePosition: (newRow: number, newCol: number) => void;
}

export interface IHoleModel extends IAbstractTileModel {

}

export interface ITileModel extends IAbstractTileModel {
  top: number;
  left: number;

  move: () => void;
}

export type ITilesState = ITileModel[];

export interface IGameStore {
  rootStore: IRootStore;

  tiles: ITilesState;
  hole: IHoleModel;

  previousTiles: IStack<ISerializeTile[]>;
  previousHole: IStack<ISerializeTile>;

  move: (tile: ITileModel) => void;
  keypressMove: (code: string) => void;
  initNewGame: () => void;
  undo: () => void;
}

export interface ICounterStore {
  rootStore: IRootStore;

  counter: number;
  incrementCounter: () => void;
  decrementCounter: () => void;
  clearCounter: () => void;
}
export interface ITimerStore {
  rootStore: IRootStore;

  time: number;
  formedTime: string;

  intervalID: number | undefined;

  incrementTime: () => void;
  createTimer: () => void;
  clearInterval: () => void;
  clearTime: () => void;
}
export interface IModalStore {
  rootStore: IRootStore;

  modal: string;

  openModal: (modal: string) => void;
  closeModal: () => void;
}