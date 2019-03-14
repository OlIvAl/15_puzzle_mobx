import {IGameStore, IHoleModel, IRootStore, ISerializeTile, ITileModel} from '../interface';
import RootStore from '../RootStore';
import GameStore from './index';
import TileModel from './TileModel';
import HoleModel from './HoleModel';

describe('GameStore', () => {
  const rootStore: IRootStore = new RootStore();
  let gameStore: IGameStore;

  /*beforeEach(() => {
    gameStore = new GameStore(rootStore);
  });*/

  afterEach(() => {
    jest.clearAllTimers();

    localStorage.clear();
  });

  describe('при инициализации', () => {
    describe('и пустом значении в localStorage,', () => {
      gameStore = new GameStore(rootStore);

      const orderedTiles: ITileModel[] = [
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
        },
      ].map(({title, row, col}: ISerializeTile): ITileModel =>
        (new TileModel(gameStore, title, row, col))
      );

      it('tiles - перемешанный массив черепков', () => {
        const titles:

        gameStore.tiles.forEach((tile: ITileModel): void => {
          expect(orderedTiles).toContain(tile);
        });
      });
      it('hole - на оставшемся случайном месте', () => {

      });
    });
    describe('и непустом значении в localStorage,', () => {
      it('', () => {

      });
      it('', () => {

      });
      it('', () => {

      });
      it('', () => {

      });
      it('', () => {

      });
      it('', () => {

      });
      it('', () => {

      });
    });
  });
  describe('_generateInitialTiesSet', () => {

  });
  describe('_setTilesToPrevious', () => {

  });
  describe('_setHoleToPrevious', () => {

  });
  describe('initNewGame', () => {

  });
  describe('move', () => {

  });
  describe('keypressMove', () => {

  });
  describe('checkWin', () => {

  });
  describe('undo', () => {

  });
});