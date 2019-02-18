import React, { Component } from 'react';

import Wrapper from './components/Wrapper';
import Bord from './components/Board';

import {IAppProps} from './App';
import {ITile} from './stores/GameStore/interface';
import {TILE_MARGIN, TILE_SIZE} from './constants/config';
import Tile from './components/Tile';

const Game: React.FC<IAppProps> = ({tiles}) => (
  <Wrapper>
    <Bord>
      {tiles.map(({title, row, col}: ITile): JSX.Element => (
        <Tile
          title={title}
          top={row * TILE_SIZE + row * TILE_MARGIN}
          left={col * TILE_SIZE + col * TILE_MARGIN}
          key={title}
        />
      ))}
    </Bord>
  </Wrapper>
);

export default Game;