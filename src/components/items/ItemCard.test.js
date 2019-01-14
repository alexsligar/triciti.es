import React from 'react';
import { shallow } from 'enzyme';
import { Card } from 'semantic-ui-react';
import moment from 'moment';
import ItemCard from './ItemCard';
import DateString from './DateString';

const defaultProps = {
  id: 'abcd',
  name: 'Test Item',
  type: 'Activity',
  location: '1500 W. 1st Ave., Kennewick, WA 99336',
  start_date: moment()
    .add(1, 'days')
    .format('YYYY-MM-DD hh:mm:ss'),
  end_date: moment()
    .add(2, 'days')
    .format('YYYY-MM-DD hh:mm:ss'),
};
const setup = (props = {}) => {
  const propsPassed = { ...defaultProps, ...props };
  return shallow(<ItemCard {...propsPassed} />);
};

describe('render', () => {
  it('should render without error', () => {
    const wrapper = setup();
    const card = wrapper.find(Card);
    expect(card.length).toBe(1);
  });

  it('should render DateString component if type is event', () => {
    const props = {
      type: 'event',
    };
    const wrapper = setup(props);
    const dateString = wrapper.find(DateString);
    expect(dateString.length).toBe(1);
  });
});
