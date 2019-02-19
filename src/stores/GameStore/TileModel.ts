import {action, computed, observable} from 'mobx';
import AbstractTileModel from './AbstractTileModel';
import {IGameStore, ITileModel} from './interface';
import {TILE_MARGIN, TILE_SIZE} from '../../constants/config';

export default
class TileModel extends AbstractTileModel {
  static TILE_MARGIN = TILE_MARGIN;
  static TILE_SIZE = TILE_SIZE;

  @computed get top() {
    return this.row * TileModel.TILE_SIZE + this.row * TileModel.TILE_MARGIN;
  }
  @computed get left() {
    return this.col * TileModel.TILE_SIZE + this.col * TileModel.TILE_MARGIN;
  }

  @action.bound
  move(): void {
    this.store.move(this);
  }
}