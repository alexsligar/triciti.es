import React from 'react';
import { shallow } from 'enzyme';
import { Card } from 'semantic-ui-react';
import ItemDetails from './ItemDetails';
import DateString from './DateString';
import moment from 'moment';

const setup = (props = {}) => {
  return shallow(<ItemDetails {...props} />);
};

describe('render', () => {
  it('should render component without error', () => {
    const wrapper = setup({
      item: {
        type: 'event',
        location: '123 W. 3rd Ave.',
        start_date: moment().format(),
      },
    });
    const card = wrapper.find(Card);
    expect(card.length).toBe(1);
    const dateString = wrapper.find(DateString);
    expect(dateString.length).toBe(1);
  });

  it('should not render a DateString if not an event', () => {
    const wrapper = setup({
      item: { type: 'activity', location: '123 W. 3rd Ave.' },
    });
    const card = wrapper.find(Card);
    expect(card.length).toBe(1);
    const dateString = wrapper.find(DateString);
    expect(dateString.length).toBe(0);
  });
});
