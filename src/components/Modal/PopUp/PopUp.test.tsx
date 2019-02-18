import * as React from 'react';
import PopUp from '.';
import {shallow} from 'enzyme';
import {shallowToJson} from 'enzyme-to-json';

interface IProps {
  onClose: () => void;
}

describe('PopUp', () => {
  const onClose = jest.fn();
  const CONTENT: string = 'test content';

  it('он отображается', () => {
    const wrapper = shallow<React.FC<IProps>>(
      <PopUp
        onClose={onClose}
      >
        {CONTENT}
      </PopUp>
    );

    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('ссодержит, переданный в него, контент', () => {
    const wrapper = shallow<IProps>(
      <PopUp
        onClose={onClose}
      >
        {CONTENT}
      </PopUp>
    );

    expect(wrapper.contains(CONTENT)).toEqual(true);
  });

  it('при клике на кнопку вызовится onClose', () => {
    const wrapper = shallow<IProps>(
      <PopUp
        onClose={onClose}
      >
        {CONTENT}
      </PopUp>
    );

    wrapper.find('[type="button"]').simulate('click');

    expect(onClose).toHaveBeenCalled();
  });
});