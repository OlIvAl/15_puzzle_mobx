import AbstractTileModel from './AbstractTileModel';
import {IGameStore} from '../interface';

export default
class HoleModel extends AbstractTileModel {
  constructor(store: IGameStore, row: number, col: number) {
    super(store, 0, row, col);
  }
}