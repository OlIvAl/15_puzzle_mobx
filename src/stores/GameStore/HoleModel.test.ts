import HoleModel from './HoleModel';
import {IGameStore, IHoleModel, IRootStore} from '../interface';
import RootStore from '../RootStore';
import GameStore from '.';

describe('HoleModel', () => {
  const rootStore: IRootStore = new RootStore();
  const gameStore: IGameStore = new GameStore(rootStore);

  const fakeRow: number = 5;
  const fakeCol: number = 12;

  describe('при инициализации', () => {
    const holeModel: IHoleModel = new HoleModel(gameStore, fakeRow, fakeCol);

    it('holeModel.title = 0', () => {
      expect(holeModel.title).toEqual(0);
    });
    it('holeModel.row = row', () => {
      expect(holeModel.row).toEqual(fakeRow);
    });
    it('holeModel.col = col', () => {
      expect(holeModel.col).toEqual(fakeCol);
    });
  });
});