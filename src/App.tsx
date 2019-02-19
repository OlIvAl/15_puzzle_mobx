import React from 'react';
import { inject } from 'mobx-react';
import DevTools from 'mobx-react-devtools';
import {ICounterStore, IGameStore, IModalStore, IRootStore, ITimerStore} from './stores/GameStore/interface';
import Game from './Game';

export interface IAppProps extends Pick<IGameStore, 'tiles' | 'keypressMove' | 'initNewGame'>,
  Pick<ICounterStore, 'counter'>,
  Pick<ITimerStore, 'formedTime'>,
  Pick<IModalStore, 'modal' | 'closeModal'>{

}

// ToDo: fix it!!!
const App: React.FC<any> = ({
  tiles = [],
  counter = 0,
  keypressMove,
  initNewGame,
  modal,
  formedTime,
  closeModal
}): JSX.Element => (
  <>
    <Game
      tiles={tiles}
      counter={counter}
      formedTime={formedTime}
      keypressMove={keypressMove}
      initNewGame={initNewGame}
      modal={modal}
      closeModal={closeModal}
    />
    {
      process.env.NODE_ENV !== 'production'
        ? <DevTools />
        : null
    }
  </>
);

export default inject(({
  gameStore: {
    tiles,
    keypressMove,
    initNewGame
  },
  counterStore: {
    counter
  },
  timerStore: {
    formedTime
  },
  modalStore: {
    modal,
    closeModal
  }
}: IRootStore): IAppProps => ({
  tiles,
  keypressMove,
  initNewGame,
  counter,
  formedTime,
  modal,
  closeModal
}))(App);
