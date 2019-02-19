import {IHoleModel, ITileModel} from './interface';
import {BOARD_TILE_SIZE} from '../../constants/config';

export default
class StoreHelpers {
  static shuffleArr<T>(a: T[]): T[] {
    for (let i: number = a.length - 1; i > 0; i--) {
      const randI: number = Math.floor(Math.random() * (i + 1));
      [a[i], a[randI]] = [a[randI], a[i]];
    }

    return a;
  }

  static checkMovableTile (tile: ITileModel, hole: IHoleModel): boolean {
    return (Math.abs(hole.col - tile.col) === 1) && (hole.row === tile.row)
    || (Math.abs(hole.row - tile.row) === 1) && (hole.col === tile.col)
  };

  static getActiveTileForKeypress (code: string, tiles: ITileModel[], hole: IHoleModel): ITileModel | undefined {
    if ((code === 'ArrowUp') && ((hole.row + 1) < BOARD_TILE_SIZE)) {
      return tiles.find((tile: ITileModel): boolean => (
        (tile.row === (hole.row + 1)) && (tile.col === hole.col)
      ));
    }
    else if ((code === 'ArrowDown') && ((hole.row) > 0)) {
      return tiles.find((tile: ITileModel): boolean => (
        (tile.row === (hole.row - 1)) && (tile.col === hole.col)
      ));
    }
    else if ((code === 'ArrowLeft') && ((hole.col + 1) < BOARD_TILE_SIZE)) {
      return tiles.find((tile: ITileModel): boolean => (
        (tile.row === hole.row) && (tile.col === (hole.col + 1))
      ));
    }
    else if ((code === 'ArrowRight') && (hole.col > 0)) {
      return tiles.find((tile: ITileModel): boolean => (
        (tile.row === hole.row) && (tile.col === (hole.col - 1))
      ));
    }

    return undefined;
  };

  static checkWinGame(tiles: ITileModel[]): boolean {
    return tiles.every(({title, row, col}: ITileModel): boolean => (
      (col + 1 + BOARD_TILE_SIZE * row) === title
    ))
  }
}