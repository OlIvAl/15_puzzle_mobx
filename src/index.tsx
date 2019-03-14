import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import * as mobx from 'mobx';
import { Provider } from 'mobx-react';
import RootStore from './stores/RootStore';
import {IRootStore} from './stores/interface';

mobx.configure({ enforceActions: 'observed' });

const rootStore: IRootStore = new RootStore();

if (process.env.NODE_ENV !== 'production') {
  (window as any).__STORES__ = rootStore; // For Debug
}

ReactDOM.render(
  <Provider
    gameStore={rootStore.gameStore}
    counterStore={rootStore.counterStore}
    timerStore={rootStore.timerStore}
    modalStore={rootStore.modalStore}
  >
    <App />
  </Provider>,
  document.getElementById('root'),
  rootStore.startGame
);
