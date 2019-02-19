import {IAbstractTileModel, IGameStore} from './interface';
import {action, observable} from 'mobx';
import {TILE_MARGIN, TILE_SIZE} from '../../constants/config';

export default
class AbstractTileModel implements IAbstractTileModel {
  store: IGameStore;

  title: number;
  @observable col: number;
  @observable row: number;

  constructor(store: IGameStore, title: number, row: number, col: number) {
    this.store = store;

    this.title = title;

    this.row = row;
    this.col = col;
  }

  @action.bound
  changePosition(newRow: number, newCol: number): void {
    this.row = newRow;
    this.col = newCol;
  }
}