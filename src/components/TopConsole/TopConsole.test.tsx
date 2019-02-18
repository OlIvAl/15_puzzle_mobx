import * as React from 'react';
import TopConsole from '.';
import renderer from 'react-test-renderer';

describe('TopConsole', () => {
  it('он отображается', () => {
    const tree = renderer.create(<TopConsole />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});