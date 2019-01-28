import React from 'react';
import { shallow } from 'enzyme';
import { Modal } from 'semantic-ui-react';
import StarredItemsModal from './StarredItemsModal';
import UserStarredItems from '../users/UserStarredItems';

describe('render', () => {
  it('should render a Modal with a UserStarredItems child', () => {
    const wrapper = shallow(<StarredItemsModal />);
    const modal = wrapper.find(Modal);
    expect(modal.length).toBe(1);
    const userStarredItems = modal.find(UserStarredItems);
    expect(userStarredItems.length).toBe(1);
  });
});
