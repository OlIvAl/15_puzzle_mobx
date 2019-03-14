import {IAbstractTileModel, IGameStore, IRootStore} from '../interface';
import AbstractTileModel from './AbstractTileModel';
import RootStore from '../RootStore';
import GameStore from './index';

describe('AbstractTileModel', () => {
  const rootStore: IRootStore = new RootStore();
  const gameStore: IGameStore = new GameStore(rootStore);

  const fakeTitle: number = 14;
  const fakeRow: number = 5;
  const fakeCol: number = 12;

  describe('при инициализации', () => {
    const abstractTileModel: IAbstractTileModel = new AbstractTileModel(gameStore, fakeTitle, fakeRow, fakeCol);

    it('abstractTileModel.title = title', () => {
      expect(abstractTileModel.title).toEqual(fakeTitle);
    });
    it('abstractTileModel.row = row', () => {
      expect(abstractTileModel.row).toEqual(fakeRow);
    });
    it('abstractTileModel.col = col', () => {
      expect(abstractTileModel.col).toEqual(fakeCol);
    });
  });
  describe('changePosition', () => {
    const fakeNewRow: number = 7;
    const fakeNewCol: number = 3;

    it('меняет позицию черепка', () => {
      const abstractTileModel: IAbstractTileModel = new AbstractTileModel(gameStore, fakeTitle, fakeRow, fakeCol);

      abstractTileModel.changePosition(fakeNewRow, fakeNewCol);

      expect(abstractTileModel.row).toEqual(fakeNewRow);
      expect(abstractTileModel.col).toEqual(fakeNewCol);
    });
  });
});