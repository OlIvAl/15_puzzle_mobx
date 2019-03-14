import Stack from './Stack';
import {IStack} from '../interface';

describe('Stack', () => {
  const fakeStackItem: number = 59;
  const fakeStack: number[] = [0,1,2,3,4,5,6,7,8,9];

  describe('при инициализации', () => {
    it('stack по умолчанию => []', () => {
      const stack: IStack<number> = new Stack();

      // @ts-ignore
      expect(stack._items).toEqual([]);
    });
    it('stack при передаче [0,1,2,3] => [0,1,2,3]', () => {
      const stack: IStack<number> = new Stack(...fakeStack);

      // @ts-ignore
      expect(stack._items).toEqual(fakeStack);
    });
  });
  describe('push', () => {
    it('добавляет элемент в конец стека', () => {
      const stack: IStack<number> = new Stack();

      stack.push(fakeStackItem);

      // @ts-ignore
      expect(stack._items[stack._items.length - 1]).toEqual(fakeStackItem);
    });
    it('возвращает стек', () => {
      const stack: IStack<number> = new Stack();

      stack.push(fakeStackItem);

      // @ts-ignore
      expect(stack._items).toEqual([fakeStackItem]);
    });
  });
  describe('pop', () => {
    it('возвращает последний элемент стека', () => {
      const stack: IStack<number> = new Stack();

      // @ts-ignore
      stack._items = fakeStack;

      // @ts-ignore
      expect(stack.pop()).toEqual(fakeStack[fakeStack.length - 1]);
    });
    it('удаляет последний элемент стека', () => {
      const stack: IStack<number> = new Stack();

      // @ts-ignore
      stack._items = fakeStack;

      stack.pop();

      // @ts-ignore
      expect(stack._items).toEqual([0,1,2,3,4,5,6,7,8]);
    });
  });
  describe('size', () => {
    it('возвращает размер стека', () => {
      const stack: IStack<number> = new Stack(...fakeStack);

      // @ts-ignore
      expect(stack.size()).toEqual(fakeStack.length);
    });
  });
  describe('peek', () => {
    it('возвращает последний элемент стека', () => {
      const stack: IStack<number> = new Stack(...fakeStack);

      // @ts-ignore
      expect(stack.peek()).toEqual(fakeStack[fakeStack.length - 1]);
    });
    it('не меняет стек', () => {
      const stack: IStack<number> = new Stack(...fakeStack);

      // @ts-ignore
      expect(stack._items).toEqual(fakeStack);

      stack.peek();

      // @ts-ignore
      expect(stack._items).toEqual(fakeStack);
    });
  });
  describe('isEmpty', () => {
    it('проверяет, не пустой ли стек', () => {
      const stackNotEmpty: IStack<number> = new Stack(...fakeStack);

      expect(stackNotEmpty.isEmpty()).toEqual(false);

      const stackEmpty: IStack<number> = new Stack();

      expect(stackEmpty.isEmpty()).toEqual(true);
    });
  });
  describe('clear', () => {
    it('очищает стек', () => {
      const stack: IStack<number> = new Stack(...fakeStack);

      stack.clear();

      // @ts-ignore
      expect(stack._items).toEqual([]);
    });
  });
});