import {IGameStore, IHoleModel, IRootStore, ISavedState, ITileModel, ITilesState} from './interface';
import {action, observable, runInAction} from 'mobx';
import StoreHelpers from './helpers';
import {BOARD_TILE_SIZE} from '../../constants/config';
import TileModel from './TileModel';
import HoleModel from './HoleModel';
import {WIN_MODAL} from '../../constants/modals';

export default class GameStore implements IGameStore {
  rootStore: IRootStore;

  @observable tiles: ITilesState;
  @observable hole: IHoleModel;

  constructor(rootStore: IRootStore) {
    this.rootStore = rootStore;

    const stringifyState: string | null = localStorage.getItem('state');

    if (stringifyState) {
      const {tiles, hole}: ISavedState = JSON.parse(stringifyState);

      this.tiles = tiles;
      this.hole = hole;
    } else {
      const {tiles, hole}: Pick<IGameStore, 'tiles' | 'hole'> = this.generateInitialTiesSet();

      this.tiles = tiles;
      this.hole = hole;
    }
  }

  generateInitialTiesSet(): Pick<IGameStore, 'tiles' | 'hole'> {
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
  initNewGame(): void {
    const {tiles, hole}: Pick<IGameStore, 'tiles' | 'hole'> = this.generateInitialTiesSet();

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
    } else {
      // this.rootStore.saveGame();
    }
  }
}