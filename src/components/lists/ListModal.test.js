import React from 'react';
import { shallow } from 'enzyme';
import { Modal } from 'semantic-ui-react';
import { ListModal } from './ListModal';
import ListForm from './ListForm';

const defaultProps = {
  showNewListModal: () => {},
  closeNewListModal: () => {},
  showModal: true,
};
const setup = (props = {}) => {
  const propsPassed = { ...defaultProps, ...props };
  return shallow(<ListModal {...propsPassed} />);
};

describe('render', () => {
  it('should render a Header and ListForm', () => {
    const wrapper = setup();
    const header = wrapper.find(Modal.Header);
    expect(header.length).toBe(1);
    const listForm = wrapper.find(ListForm);
    expect(listForm.length).toBe(1);
  });
});
