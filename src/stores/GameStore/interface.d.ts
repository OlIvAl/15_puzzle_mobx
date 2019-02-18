export interface ITile {
  title: number;

  row: number;
  col: number;

  //top: number;
  //left: number;
}

export interface ITileCoord {
  title: number;

  top: number;
  left: number;
}

export type ITilesState = ITile[];

export interface ITimerState {
  time: number;
  intervalID: number | undefined;
}

export interface IGameStore {
  tiles: ITilesState;
  hole: ITile;
}