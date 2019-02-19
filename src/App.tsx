import React from 'react';
import { inject } from 'mobx-react';
import DevTools from 'mobx-react-devtools';
import {IGameStore} from './stores/GameStore/interface';
import Game from './Game';

export interface IAppProps extends Pick<IGameStore, 'tiles' | 'counter' | 'keypressMove' | 'initNewGame'>{

}

// ToDo: fix it!!!
const App: React.FC<any> = ({
  tiles = [],
  counter = 0,
  keypressMove,
  initNewGame
}): JSX.Element => (
  <>
    <Game
      tiles={tiles}
      counter={counter}
      keypressMove={keypressMove}
      initNewGame={initNewGame}
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
    initNewGame
  }
}: {gameStore: IGameStore}): IAppProps => ({
  tiles,
  counter,
  keypressMove,
  initNewGame
}))(App);
