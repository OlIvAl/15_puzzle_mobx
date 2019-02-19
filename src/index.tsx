import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import * as mobx from 'mobx';
import { Provider } from 'mobx-react';
import GameStore from './stores/GameStore';
import {IGameStore} from './stores/GameStore/interface';

mobx.configure({ enforceActions: 'observed' });

const gameStore: IGameStore = new GameStore();

if (process.env.NODE_ENV !== 'production') {
  (window as any).__STORE__ = gameStore; // For Debug
}

ReactDOM.render(
  <Provider
    gameStore={gameStore}
  >
    <App />
  </Provider>,
  document.getElementById('root')
);
