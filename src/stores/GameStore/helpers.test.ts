import {IGameStore, IHoleModel, IRootStore, ISerializeTile, ITileModel} from '../interface';
import TileModel from './TileModel';
import GameStore from './index';
import RootStore from '../RootStore';
import HoleModel from './HoleModel';
import StoreHelpers from './helpers';

describe('StoreHelpers', () => {
  const rootStore: IRootStore = new RootStore();
  const gameStore: IGameStore = new GameStore(rootStore);

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

  const notOrderedTiles: ITileModel[] = [
    {
      title: 1,
      row: 0,
      col: 1
    },
    {
      title: 2,
      row: 2,
      col: 1
    },
    {
      title: 3,
      row: 3,
      col: 1
    },
    {
      title: 4,
      row: 3,
      col: 3
    },
    {
      title: 5,
      row: 2,
      col: 3
    },
    {
      title: 6,
      row: 1,
      col: 3
    },
    {
      title: 7,
      row: 1,
      col: 2
    },
    {
      title: 8,
      row: 0,
      col: 2
    },
    {
      title: 9,
      row: 2,
      col: 0
    },
    {
      title: 10,
      row: 0,
      col: 0
    },
    {
      title: 11,
      row: 3,
      col: 0
    },
    {
      title: 12,
      row: 3,
      col: 2
    },
    {
      title: 13,
      row: 1,
      col: 0
    },
    {
      title: 14,
      row: 2,
      col: 2
    },
    {
      title: 15,
      row: 0,
      col: 3
    },
  ].map(({title, row, col}: ISerializeTile): ITileModel =>
    (new TileModel(gameStore, title, row, col))
  );

  const currentHole: IHoleModel = new HoleModel(gameStore, 1, 1);

  const rightTileTop: ITileModel = notOrderedTiles
    .find(({title}: ITileModel): boolean => (title === 1)) as ITileModel;
  const rightTileBottom: ITileModel = notOrderedTiles
    .find(({title}: ITileModel): boolean => (title === 2)) as ITileModel;
  const rightTileLeft: ITileModel = notOrderedTiles
    .find(({title}: ITileModel): boolean => (title === 13)) as ITileModel;
  const rightTileRight: ITileModel = notOrderedTiles
    .find(({title}: ITileModel): boolean => (title === 7)) as ITileModel;

  const rightTiles: ITileModel[] = [
    rightTileTop,
    rightTileBottom,
    rightTileLeft,
    rightTileRight
  ];

  const cornerTileTopLeft: ITileModel = notOrderedTiles
    .find(({title}: ITileModel): boolean => (title === 10)) as ITileModel;
  const cornerTileTopRight: ITileModel = notOrderedTiles
    .find(({title}: ITileModel): boolean => (title === 8)) as ITileModel;
  const cornerTileBottomLeft: ITileModel = notOrderedTiles
    .find(({title}: ITileModel): boolean => (title === 9)) as ITileModel;
  const cornerTileBottomRight: ITileModel = notOrderedTiles
    .find(({title}: ITileModel): boolean => (title === 14)) as ITileModel;

  const cornerTiles: ITileModel[] = [
    cornerTileTopLeft,
    cornerTileTopRight,
    cornerTileBottomLeft,
    cornerTileBottomRight
  ];

  const wrongTiles: ITileModel[] = [
    notOrderedTiles.find(({title}: ITileModel): boolean => (title === 15)) as ITileModel,
    notOrderedTiles.find(({title}: ITileModel): boolean => (title === 6)) as ITileModel,
    notOrderedTiles.find(({title}: ITileModel): boolean => (title === 5)) as ITileModel,
    notOrderedTiles.find(({title}: ITileModel): boolean => (title === 4)) as ITileModel,
    notOrderedTiles.find(({title}: ITileModel): boolean => (title === 12)) as ITileModel,
    notOrderedTiles.find(({title}: ITileModel): boolean => (title === 3)) as ITileModel,
    notOrderedTiles.find(({title}: ITileModel): boolean => (title === 11)) as ITileModel,
  ];

  const rightCodes: {[key: string]: string} = {
    up: 'ArrowUp',
    down: 'ArrowDown',
    left: 'ArrowLeft',
    right: 'ArrowRight',
  };

  describe('shuffleArr', () => {
    it('перемешивает элементы массива', () => {
      const arr: number[] = [0,1,2,3,4,5,6,7,8,9];

      const expectArr: number[] = StoreHelpers.shuffleArr<number>([0,1,2,3,4,5,6,7,8,9]);

      expect(expectArr).not.toEqual(arr);
      expect(expectArr.every((num: number): boolean => arr.includes(num)))
        .toEqual(true);
    });
  });
  describe('checkMovableTile', () => {
    it('черепки, расположенные по сторонам от дырки, доступны для передвижения', () => {
      rightTiles.forEach((tile: ITileModel): void => {
        expect(StoreHelpers.checkMovableTile(tile, currentHole)).toEqual(true);
      });
    });
    it('черепки, расположенные по углам от дырки, не доступны для передвижения', () => {
      cornerTiles.forEach((tile: ITileModel): void => {
        expect(StoreHelpers.checkMovableTile(tile, currentHole)).toEqual(false);
      });
    });
    it('черепки, расположенные не рядом с дыркой, не доступны для передвижения', () => {
      wrongTiles.forEach((tile: ITileModel): void => {
        expect(StoreHelpers.checkMovableTile(tile, currentHole)).toEqual(false);
      });
    });
  });
  describe('getActiveTileForKeypress', () => {
    it('при нажатии стрелки возвращается черепок, который будет перемещен', () => {
      expect(StoreHelpers.getActiveTileForKeypress(rightCodes.up, notOrderedTiles, currentHole))
        .toEqual(rightTileBottom);
      expect(StoreHelpers.getActiveTileForKeypress(rightCodes.down, notOrderedTiles, currentHole))
        .toEqual(rightTileTop);
      expect(StoreHelpers.getActiveTileForKeypress(rightCodes.right, notOrderedTiles, currentHole))
        .toEqual(rightTileLeft);
      expect(StoreHelpers.getActiveTileForKeypress(rightCodes.left, notOrderedTiles, currentHole))
        .toEqual(rightTileRight);
    });
    it('функция работает только с кодами клавиш стрелок', () => {
      expect(StoreHelpers.getActiveTileForKeypress('Delete', notOrderedTiles, currentHole))
        .toEqual(undefined);
    });
  });
  describe('checkWinGame', () => {
    it('когда черепки расположенны по порядку и дырка находится в нижнем крайнем углу, игра завершается', () => {
      expect(StoreHelpers.checkWinGame(orderedTiles)).toEqual(true);
    });
    it('когда черепки расположенны не по порядку и дырка находится не в нижнем крайнем углу, игра не завершается', () => {
      expect(StoreHelpers.checkWinGame(notOrderedTiles)).toEqual(false);
    });
  });
});