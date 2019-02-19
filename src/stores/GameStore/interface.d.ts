export interface IRootStore {
  gameStore: IGameStore;
  counterStore: ICounterStore;
  timerStore: ITimerStore;
  modalStore: IModalStore;
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

  generateInitialTiesSet: () => Pick<IGameStore, 'tiles' | 'hole'>
  move: (tile: ITileModel) => void;
  keypressMove: (code: string) => void;
  initNewGame: () => void;
}

export interface ICounterStore {
  rootStore: IRootStore;

  counter: number;
  incrementCounter: () => void;
}
export interface ITimerStore {
  rootStore: IRootStore;

  time: number;
  formedTime: string;

  intervalID: number | undefined;

  incrementTime: () => void;
}
export interface IModalStore {
  rootStore: IRootStore;

  modal: string;

  openModal: (modal: string) => void;
  closeModal: () => void;
}