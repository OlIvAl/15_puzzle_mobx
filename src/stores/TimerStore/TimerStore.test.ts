import TimerStore from '.';
import {ITimerStore, IRootStore} from '../interface';
import RootStore from '../RootStore';

jest.useFakeTimers();

describe('TimerStore', () => {
  const rootStore: IRootStore = new RootStore();
  const fakeTime: number = 3666;
  const fakeIntervalID: number = 123456;

  beforeEach(() => {

  });
  afterEach(() => {
    jest.clearAllTimers();

    localStorage.clear();
  });

  describe('при инициализации', () => {
    it('time = 0', () => {
      const timerStore: ITimerStore = new TimerStore(rootStore);

      expect(timerStore.time).toEqual(0);
    });
    it('formedTime = 00:00:00', () => {
      const timerStore: ITimerStore = new TimerStore(rootStore);

      expect(timerStore.formedTime).toEqual('00:00:00');
    });
    it('intervalID = undefined', () => {
      const timerStore: ITimerStore = new TimerStore(rootStore);

      expect(timerStore.intervalID).toEqual(undefined);
    });
    it('и непустом значении в localStorage, time = localStorage.time', () => {
      localStorage.setItem('state', JSON.stringify({time: fakeTime}));

      const timerStore: ITimerStore = new TimerStore(rootStore);

      expect(timerStore.time).toEqual(fakeTime);
    });
    /*it('и непустом значении в localStorage, таймер автоматически продолжается', () => {
      localStorage.setItem('state', JSON.stringify({time: fakeTime}));

      const timerStore: ITimerStore = new TimerStore(rootStore);

      const spy = jest.spyOn(timerStore, 'createTimer');

      expect(spy).toHaveBeenCalled();
    });*/
  });
  describe('formedTime', () => {
    it('при измкенении time перещитывается в формат 99:99:99', () => {
      const timerStore: ITimerStore = new TimerStore(rootStore);

      timerStore.time = fakeTime;

      expect(timerStore.formedTime).toEqual('01:01:06');
    });
  });
  describe('incrementTime', () => {
    it('увеличивает time на 1', () => {
      const timerStore: ITimerStore = new TimerStore(rootStore);

      timerStore.time = fakeTime;

      timerStore.incrementTime();

      expect(timerStore.time).toEqual(fakeTime + 1);
    });
  });
  describe('createTimer', () => {
    it('если timer не запущен, запускает timer', () => {
      const timerStore: ITimerStore = new TimerStore(rootStore);

      timerStore.createTimer();

      expect(setInterval).toHaveBeenCalled();
    });
    it('каждую секунду будет вызывать incrementTime', () => {
      const timerStore: ITimerStore = new TimerStore(rootStore);

      const spy = jest.spyOn(timerStore, 'incrementTime');

      timerStore.time = fakeTime;

      timerStore.createTimer();

      jest.runTimersToTime(1000);

      expect(spy).toHaveBeenCalled();
    });
    it('если timer не запущен, заполняет поле intervalID', () => {
      const timerStore: ITimerStore = new TimerStore(rootStore);

      timerStore.createTimer();

      expect(timerStore.intervalID).toEqual(expect.any(Number));
    });
  });
  describe('clearInterval', () => {
    it('если timer запущен, останавливает timer', () => {
      const timerStore: ITimerStore = new TimerStore(rootStore);

      timerStore.intervalID = fakeIntervalID;

      timerStore.clearInterval();

      expect(clearInterval).toHaveBeenCalledWith(fakeIntervalID);
    });
    it('если timer запущен, очищает поле intervalID', () => {
      const timerStore: ITimerStore = new TimerStore(rootStore);

      timerStore.intervalID = fakeIntervalID;

      timerStore.clearInterval();

      expect(timerStore.intervalID).toEqual(undefined);
    });
  });
  describe('clearTime', () => {
    it('обнуляет time', () => {
      const timerStore: ITimerStore = new TimerStore(rootStore);

      timerStore.time = fakeTime;

      timerStore.clearTime();

      expect(timerStore.time).toEqual(0);
    });
  });
});