import React from 'react';
import {BORD_SIZE} from '../../constants/config';
import {StyledTile} from './StyledComponents';

import {ITileModel} from '../../stores/GameStore/interface';
import {observer} from 'mobx-react';

interface IProps {
  tile: ITileModel
}

interface IState {
  coef: number;
}

class Tile extends React.Component<IProps, IState> {
  state: IState = {
    coef: 1
  };

  mql: MediaQueryList = window.matchMedia(`(max-width: ${BORD_SIZE * 1.2}px)`);

  constructor(props: IProps) {
    super(props);

    this.mediaQueryListener = this.mediaQueryListener.bind(this);
  }

  mediaQueryListener(event: MediaQueryListEvent): void {
    if (event.matches) {
      this.setState({coef: 1.5});
    } else {
      this.setState({coef: 1});
    }
  }

  componentDidMount(): void {
    this.mql.addListener(this.mediaQueryListener);

    if (this.mql.matches) {
      this.setState({coef: 1.5});
    }
  }

  componentWillUnmount(): void {
    this.mql.removeListener(this.mediaQueryListener);
  }

  render(): React.ReactNode {
    const {
      tile
    } = this.props;

    const {coef} = this.state;

    const top: number = tile.top / coef;
    const left: number = tile.left / coef;

    return (
      <StyledTile
        top={top}
        left={left}
        onClick={tile.move}
      >
        {tile.title}
      </StyledTile>
    );
  }
}

export default observer(Tile);