import TileModel from './TileModel';
import {IGameStore, ITileModel, IRootStore} from '../interface';
import RootStore from '../RootStore';
import GameStore from '.';

describe('TileModel', () => {
  const rootStore: IRootStore = new RootStore();
  const gameStore: IGameStore = new GameStore(rootStore);

  const fakeTitle: number = 3;
  const fakeRow: number = 5;
  const fakeCol: number = 12;

  describe('при инициализации', () => {
    let tileModel: ITileModel;

    beforeEach(() => {
      tileModel = new TileModel(gameStore, fakeTitle, fakeRow, fakeCol);
    });

    it('tileModel.top', () => {
      expect(tileModel.title).toEqual(0);
    });
    it('tileModel.left', () => {
      expect(tileModel.row).toEqual(fakeRow);
    });
    it('move have been called with this', () => {
      const spy = jest.spyOn(tileModel.store, 'move');

      tileModel.move();

      expect(spy).toHaveBeenCalledWith(tileModel);
    });
  });
});