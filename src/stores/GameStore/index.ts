import {
  IGameStore,
  IHoleModel,
  IRootStore,
  ISavedState,
  ISerializeTile,
  IStack,
  ITileModel,
  ITilesState
} from './interface';
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

  constructor(rootStore: IRootStore) {
    this.rootStore = rootStore;

    const stringifyState: string | null = localStorage.getItem('state');

    if (stringifyState) {
      const {tiles, hole}: ISavedState = JSON.parse(stringifyState);

      this.tiles = tiles.map(({title, row, col}: ISerializeTile): ITileModel => (new TileModel(this, title, row, col)));
      this.hole = new HoleModel(this, hole.row, hole.col);
    } else {
      const {tiles, hole}: Pick<IGameStore, 'tiles' | 'hole'> = this._generateInitialTiesSet();

      this.tiles = tiles;
      this.hole = hole;
    }
  }

  private _generateInitialTiesSet(): Pick<IGameStore, 'tiles' | 'hole'> {
    return StoreHelpers.shuffleArr(
      Array(BOARD_TILE_SIZE ** 2)
        .fill(undefined)
        .map((_, index: number): number => (index))
    )
      .reduce<Pick<IGameStore, 'tiles' | 'hole'>>(
        (
          accumulator: Pick<IGameStore, 'tiles' | 'hole'>,
          currentValue: number,
          index: number
        ): Pick<IGameStore, 'tiles' | 'hole'> => {
          if (currentValue) {
            return {
              ...accumulator,
              tiles: accumulator.tiles.concat(
                new TileModel(
                  this,
                  currentValue,
                  Math.floor(index / BOARD_TILE_SIZE),
                  index % BOARD_TILE_SIZE)
              )
            };
          } else {
            return {
              ...accumulator,
              hole: new HoleModel(
                this,
                Math.floor(index / BOARD_TILE_SIZE),
                index % BOARD_TILE_SIZE
              )
            };
          }
        },
        {
          tiles: [],
          hole: new HoleModel(this, BOARD_TILE_SIZE - 1, BOARD_TILE_SIZE - 1)
        }
      );
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
  initNewGame(): void {
    const {tiles, hole}: Pick<IGameStore, 'tiles' | 'hole'> = this._generateInitialTiesSet();

    this.tiles = tiles;
    this.hole = hole;

    this.rootStore.timerStore.clearInterval();
    this.rootStore.timerStore.clearTime();

    this.rootStore.counterStore.clearCounter();

    localStorage.removeItem('state');
  }

  @action.bound
  move(tile: ITileModel): void {
    if (StoreHelpers.checkMovableTile(tile, this.hole)) {
      const newTileRow: number = this.hole.row;
      const newTileCol: number = this.hole.col;

      const newHoleRow: number = tile.row;
      const newHoleCol: number = tile.col;

      this._setTilesToPrevious();
      this._setHoleToPrevious();

      this.tiles[this.tiles.indexOf(tile)].changePosition(newTileRow, newTileCol);
      this.hole.changePosition(newHoleRow, newHoleCol);

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
      this.rootStore.modalStore.openModal(WIN_MODAL);

      this.rootStore.timerStore.clearInterval();

      localStorage.removeItem('state');
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