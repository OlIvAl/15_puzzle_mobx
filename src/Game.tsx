import React from 'react';

import Wrapper from './components/Wrapper';
import Bord from './components/Board';
import Button from './components/Button';
import Tile from './components/Tile';
import Counter from './components/Counter';
import TopConsole from './components/TopConsole';
import BottomConsole from './components/BottomConsole';

import {IInjectedProps} from './App';
import {ITileModel} from './stores/interface';
import {observer} from 'mobx-react';
import {WIN_MODAL} from './constants/modals';
import Modal from './components/Modal';
import Timer from './components/Timer';

class Game extends React.Component<IInjectedProps> {
  constructor(props: IInjectedProps) {
    super(props);

    this.keypressHandler = this.keypressHandler.bind(this);
  }

  keypressHandler(event: KeyboardEvent): void {
    this.props.keypressMove(event.code);
  }

  componentDidMount(): void {
    document.addEventListener('keydown', this.keypressHandler, false);
  }

  componentWillUnmount(): void {
    document.removeEventListener('keydown', this.keypressHandler, false);
  }

  render(): React.ReactNode {
    const {
      tiles,
      counter,
      formedTime,
      initNewGame,
      undo,
      modal,
      closeModal
    } = this.props;

    return (
      <Wrapper>
        <TopConsole>
          <Counter
            count={counter}
          />
          <Timer
            time={formedTime}
          />
        </TopConsole>
        <Bord>
          {tiles.map((tile: ITileModel): JSX.Element => (
            <Tile
              tile={tile}
              key={tile.title}
            />
          ))}
        </Bord>
        <BottomConsole>
          <Button
            onClick={initNewGame}
          >
            New game
          </Button>
          <Button
            onClick={undo}
            disabled={!counter}
          >
            Undo
          </Button>
        </BottomConsole>

        {modal === WIN_MODAL
          ? <Modal
            onClose={closeModal}
          >
            <strong>Count: </strong>{counter}<br/>
            <strong>Time: </strong>{0}
          </Modal>
          : null
        }
      </Wrapper>
    );
  }
}

export default observer(Game);