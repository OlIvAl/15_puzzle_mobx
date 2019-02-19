import React from 'react';
import { inject } from 'mobx-react';
import DevTools from 'mobx-react-devtools';
import {IGameStore} from './stores/GameStore/interface';
import Game from './Game';

export interface IAppProps extends Pick<IGameStore, 'tiles' | 'counter' | 'keypressMove' | 'initNewGame' | 'modal' | 'closeModal'>{

}

// ToDo: fix it!!!
const App: React.FC<any> = ({
  tiles = [],
  counter = 0,
  keypressMove,
  initNewGame,
  modal,
  closeModal
}): JSX.Element => (
  <>
    <Game
      tiles={tiles}
      counter={counter}
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
    counter,
    keypressMove,
    initNewGame,
    modal,
    closeModal
  }
}: {gameStore: IGameStore}): IAppProps => ({
  tiles,
  counter,
  keypressMove,
  initNewGame,
  modal,
  closeModal
}))(App);
