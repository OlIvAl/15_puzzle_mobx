import React from 'react';
import { inject } from 'mobx-react';
import DevTools from 'mobx-react-devtools';
import {ICounterStore, IGameStore, IModalStore, IRootStore, ITimerStore} from './stores/interface';
import Game from './Game';

interface IProps {

}

export interface IInjectedProps extends
  Pick<IRootStore, 'initNewGame'>,
  Pick<IGameStore, 'tiles' | 'keypressMove' | 'undo'>,
  Pick<ICounterStore, 'counter'>,
  Pick<ITimerStore, 'formedTime'>,
  Pick<IModalStore, 'modal' | 'closeModal'>,
  Partial<IProps>{
}

class App extends React.PureComponent<IProps> {
  get injected() {
    return this.props as IInjectedProps;
  }

  render(): React.ReactNode {
    const {
      tiles = [],
      counter = 0,
      formedTime = '00:00:00',
      modal = '',

      keypressMove,
      initNewGame,
      undo,
      closeModal
    } = this.injected;

    return (
      <>
        <Game
          tiles={tiles}
          counter={counter}
          formedTime={formedTime}
          keypressMove={keypressMove}
          initNewGame={initNewGame}
          undo={undo}
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
  }
}

export default inject(({
  initNewGame,
  gameStore: {
    tiles,
    keypressMove,
    undo
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
}: IRootStore): IInjectedProps => ({
  tiles,
  keypressMove,
  initNewGame,
  undo,
  counter,
  formedTime,
  modal,
  closeModal
}))(App);
