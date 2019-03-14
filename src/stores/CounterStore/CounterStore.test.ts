import CounterStore from '.';
import {ICounterStore, IRootStore} from '../interface';
import RootStore from '../RootStore';

describe('CounterStore', () => {
  const rootStore: IRootStore = new RootStore();
  const fakeCounter: number = 6;

  beforeEach(() => {

  });
  afterEach(() => {
    localStorage.clear();
  });

  describe('при инициализации', () => {
    it('counter = 0', () => {
      const counterStore: ICounterStore = new CounterStore(rootStore);

      expect(counterStore.counter).toEqual(0);
    });
    it('и непустом значении в localStorage, counter = localStorage.counter', () => {
      localStorage.setItem('state', JSON.stringify({counter: fakeCounter}));

      const counterStore: ICounterStore = new CounterStore(rootStore);

      expect(counterStore.counter).toEqual(fakeCounter);
    });
  });
  describe('incrementCounter', () => {
    it('увеличивает counter на 1', () => {
      const counterStore: ICounterStore = new CounterStore(rootStore);

      counterStore.counter = fakeCounter;
      counterStore.incrementCounter();

      expect(counterStore.counter).toEqual(fakeCounter + 1);
    });
    it('уменьшает counter на 1, если он больше 0', () => {
      const counterStore: ICounterStore = new CounterStore(rootStore);

      counterStore.counter = fakeCounter;
      counterStore.decrementCounter();

      expect(counterStore.counter).toEqual(fakeCounter - 1);
    });
  });
  describe('decrementCounter', () => {
    it('не меняет counter, если он равен 0', () => {
      const counterStore: ICounterStore = new CounterStore(rootStore);

      counterStore.decrementCounter();

      expect(counterStore.counter).toEqual(0);
    });
  });
  describe('clearCounter', () => {
    it('обнуляет counter', () => {
      const counterStore: ICounterStore = new CounterStore(rootStore);

      counterStore.counter = fakeCounter;
      counterStore.clearCounter();

      expect(counterStore.counter).toEqual(0);
    });
  });
});