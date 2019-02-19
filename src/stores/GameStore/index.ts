import {IGameStore, IHoleModel, ITileModel, ITilesState} from './interface';
import {action, observable, runInAction} from 'mobx';
import StoreHelpers from './helpers';
import {BOARD_TILE_SIZE} from '../../constants/config';
import TileModel from './TileModel';
import HoleModel from './HoleModel';
import {WIN_MODAL} from '../../constants/modals';

export default class GameStore implements IGameStore {
  @observable tiles: ITilesState = [];
  // ToDo: fix it
  @observable hole: IHoleModel = new HoleModel(this, BOARD_TILE_SIZE - 1, BOARD_TILE_SIZE - 1);

  @observable counter: number = 0;
  @observable modal: string = '';

  constructor() {
    this.initNewGame();
  }

  @action.bound
  initNewGame(): void {
    let tiles: ITileModel[] = [];
    // ToDo: fix it
    let hole: IHoleModel = new HoleModel(this, BOARD_TILE_SIZE - 1, BOARD_TILE_SIZE - 1);

    StoreHelpers.shuffleArr(
      Array(BOARD_TILE_SIZE ** 2)
        .fill(undefined)
        .map((_, index: number): number => (index))
    )
      .forEach((title: number, index: number): void => {
        if (title) {
          tiles.push(new TileModel(
            this,
            title,
            Math.floor(index / BOARD_TILE_SIZE),
            index % BOARD_TILE_SIZE
          ));
        } else {
          hole = new HoleModel(
            this,
            Math.floor(index / BOARD_TILE_SIZE),
            index % BOARD_TILE_SIZE
          );
        }
      });
    runInAction(
      'set initial tiles',
      () => {
        this.tiles = tiles;
      },
    );
    runInAction(
      'set initial hole',
      () => {
        this.hole = hole;
      },
    );
  }

  @action.bound
  move(tile: ITileModel): void {
    if (StoreHelpers.checkMovableTile(tile, this.hole)) {
      const newTileRow: number = this.hole.row;
      const newTileCol: number = this.hole.col;

      const newHoleRow: number = tile.row;
      const newHoleCol: number = tile.col;

      this.tiles[this.tiles.indexOf(tile)].changePosition(newTileRow, newTileCol);
      this.hole.changePosition(newHoleRow, newHoleCol);

      this.incrementCounter();
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
  incrementCounter(): void {
    this.counter = this.counter + 1;
  }

  @action.bound
  checkWin(): void {
    if(StoreHelpers.checkWinGame(this.tiles)) {
      this.openModal(WIN_MODAL);
    }
  }

  @action.bound
  openModal(modalName: string): void {
    this.modal = modalName;
  }

  @action.bound
  closeModal(): void {
    this.modal = '';
  }
}