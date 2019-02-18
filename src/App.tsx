import React, { Component } from 'react';
import { inject } from 'mobx-react';
import DevTools from 'mobx-react-devtools';
import {IGameStore, ITilesState} from './stores/GameStore/interface';
import Game from './Game';

export interface IAppProps {
  tiles: ITilesState;
}

// ToDo: fix it!!!
class App extends Component<any> {
  render() {
    const {
      tiles = [],
    } = this.props;

    return (
      <>
        <Game
          tiles={tiles}
        />
        { process.env.NODE_ENV !== 'production' ? <DevTools /> : null }
      </>
    );
  }
}

export default inject(({
  gameStore: {
    tiles
  }
}: {gameStore: IGameStore}): IAppProps => ({ tiles }))(App);
