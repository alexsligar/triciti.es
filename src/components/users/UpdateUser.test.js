import React from 'react';
import { shallow } from 'enzyme';
import UpdateUser from './UpdateUser';
import UserProfileForm from './UserProfileForm';

describe('render', () => {
  it('should render the correct child components', () => {
    const wrapper = shallow(<UpdateUser />);
    const userProfileForm = wrapper.find(UserProfileForm);
    expect(userProfileForm.length).toBe(1);
  });
});
