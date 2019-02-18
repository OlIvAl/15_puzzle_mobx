import {IGameStore, ITile, ITilesState} from './interface';
import {observable} from 'mobx';

export default class GameStore implements IGameStore {
  @observable tiles: ITilesState;
  @observable hole: ITile;

  constructor() {
    this.tiles = [
      {
        title: 1,
        row: 0,
        col: 0
      },
      {
        title: 2,
        row: 0,
        col: 1
      },
      {
        title: 3,
        row: 0,
        col: 2
      },
      {
        title: 4,
        row: 0,
        col: 3
      },
      {
        title: 5,
        row: 1,
        col: 0
      },
      {
        title: 6,
        row: 1,
        col: 1
      },
      {
        title: 7,
        row: 1,
        col: 2
      },
      {
        title: 8,
        row: 1,
        col: 3
      },
      {
        title: 9,
        row: 2,
        col: 0
      },
      {
        title: 10,
        row: 2,
        col: 1
      },
      {
        title: 11,
        row: 2,
        col: 2
      },
      {
        title: 12,
        row: 2,
        col: 3
      },
      {
        title: 13,
        row: 3,
        col: 0
      },
      {
        title: 14,
        row: 3,
        col: 1
      },
      {
        title: 15,
        row: 3,
        col: 2
      }
    ];
    this.hole = {
      title: 0,
      row: 3,
      col: 3
    }
  }
}