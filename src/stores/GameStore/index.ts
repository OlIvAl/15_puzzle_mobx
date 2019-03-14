import {
  IGameStore,
  IHoleModel,
  IRootStore,
  ISavedState,
  ISerializeTile,
  IStack,
  ITileModel,
  ITilesState
} from '../interface';
import {action, observable} from 'mobx';
import StoreHelpers from './helpers';
import {BOARD_TILE_SIZE} from '../../constants/config';
import TileModel from './TileModel';
import HoleModel from './HoleModel';
import {WIN_MODAL} from '../../constants/modals';
import Stack from './Stack';

export default class GameStore implements IGameStore {
  rootStore: IRootStore;

  @observable tiles: ITilesState;
  @observable hole: IHoleModel;

  previousTiles: IStack<ISerializeTile[]> = new Stack();
  previousHole: IStack<ISerializeTile> = new Stack();

  constructor(
    rootStore: IRootStore,
    serializeTiles: ISerializeTile[],
    serializeHole: ISerializeTile,
    previousTiles?: ISerializeTile[][],
    previousHole?: ISerializeTile[]
  ) {
    this.rootStore = rootStore;

    this.tiles = serializeTiles.map(({title, row, col}: ISerializeTile): ITileModel =>
      (new TileModel(this, title, row, col))
    );
    this.hole = new HoleModel(this, serializeHole.row, serializeHole.col);

    if(previousTiles && previousHole) {
      this.previousTiles = new Stack<ISerializeTile[]>(previousTiles);
      this.previousHole = new Stack<ISerializeTile>(previousHole);
    }
  }

  @action.bound
  initNewGame(serializeTiles: ISerializeTile[], serializeHole: ISerializeTile): void {
    this.tiles = serializeTiles.map(({title, row, col}: ISerializeTile): ITileModel =>
      (new TileModel(this, title, row, col))
    );
    this.hole = new HoleModel(this, serializeHole.row, serializeHole.col);

    this.previousTiles.clear();
    this.previousHole.clear();
  }

  @action.bound
  private _setTilesToPrevious(): void {
    const serializeTiles: ISerializeTile[] = this.tiles.map(({title, row, col}: ITileModel): ISerializeTile => ({
      title,
      row,
      col
    }));

    this.previousTiles.push(serializeTiles);
  }

  @action.bound
  private _setHoleToPrevious(): void {
    this.previousHole.push({
      title: this.hole.title,
      row: this.hole.row,
      col: this.hole.col
    });
  }

  @action.bound
  move(tile: ITileModel): void {
    if (StoreHelpers.checkMovableTile(tile, this.hole)) {
      this._setTilesToPrevious();
      this._setHoleToPrevious();

      this.tiles[this.tiles.indexOf(tile)].changePosition(
        this.hole.row,
        this.hole.col
      );
      this.hole.changePosition(
        tile.row,
        tile.col
      );

      this.rootStore.counterStore.incrementCounter();

      if (this.rootStore.counterStore.counter === 1) {
        this.rootStore.timerStore.createTimer();
      }

      this.checkWin();
    }
  }

  @action.bound
  keypressMove(code: string): void {
    const currTile: ITileModel | undefined = StoreHelpers.getActiveTileForKeypress(
      code,
      this.tiles,
      this.hole
    );

    if (currTile) {
      this.move(currTile);
    }
  }

  @action.bound
  checkWin(): void {
    if(StoreHelpers.checkWinGame(this.tiles)) {
      this.rootStore.winGame();
    } else {
      this.rootStore.saveGame();
    }
  }

  @action.bound
  undo(): void {
    if(!this.previousTiles.isEmpty() && !this.previousHole.isEmpty()) {
      const serializeTiles: ISerializeTile[] = this.previousTiles.pop();
      this.tiles = serializeTiles.map(({
                                         title,
                                         row,
                                         col
      }: ISerializeTile): ITileModel =>
          (new TileModel(this, title, row, col))
        );

      const serializeHole: ISerializeTile = this.previousHole.pop();
      this.hole = new HoleModel(this, serializeHole.row, serializeHole.col);

      this.rootStore.counterStore.decrementCounter();
    }
  }
}