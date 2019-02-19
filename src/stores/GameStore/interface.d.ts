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

export interface ITimerState {
  time: number;
  intervalID: number | undefined;
}

export interface IGameStore {
  tiles: ITilesState;
  hole: IHoleModel;

  counter: number;

  modal: string;

  move: (tile: ITileModel) => void;
  keypressMove: (code: string) => void;
  initNewGame: () => void;
  openModal: (modal: string) => void;
  closeModal: () => void;
}