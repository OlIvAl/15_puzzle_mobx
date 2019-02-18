import React from 'react';
import {BORD_SIZE} from '../../constants/config';
import {StyledTile} from './StyledComponents';

import {ITile} from '../../stores/GameStore/interface';

interface IProps extends Pick<ITile, 'title'> {
  top: number;
  left: number;
 //  move: IMoveTileAsyncActionCreator;
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
    //this.onClick = this.onClick.bind(this);
  }

  mediaQueryListener(event: MediaQueryListEvent): void {
    if (event.matches) {
      this.setState({coef: 1.5});
    } else {
      this.setState({coef: 1});
    }
  }

  /*onClick(): void {
    const {
      tile,
      // move
    } = this.props;

    move(tile);
  }*/

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
      title,
      top,
      left
    } = this.props;

    const {coef} = this.state;

    return (
      <StyledTile
        top={top / coef}
        left={left / coef}
      >
        {title}
      </StyledTile>
    );
  }
}

export default Tile;