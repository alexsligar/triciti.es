import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { Form, Message } from 'semantic-ui-react';
import ConnectedListForm, { ListForm } from './ListForm';
import { storeFactory } from '../../../test/testUtils';

const defaultProps = {
  addListProcessing: false,
  addListError: null,
  updateListProcessing: false,
  updateListError: null,
  handleAddList: () => {},
  removeAddListError: () => {},
  handleUpdateList: () => {},
  removeUpdateListError: () => {},
};
const setup = (props = {}) => {
  const propsPassed = { ...defaultProps, ...props };
  return shallow(<ListForm {...propsPassed} />);
};

describe('state', () => {
  it('should set the state to the list data if props list is provided', () => {
    const list = { name: 'Test List', description: 'A description' };
    const wrapper = setup({ list });
    expect(wrapper.state().fields.name).toBe(list.name);
    expect(wrapper.state().fields.description).toBe(list.description);
  });
});

describe('render', () => {
  it('should render a Form', () => {
    const wrapper = setup();
    const form = wrapper.find(Form);
    expect(form.length).toBe(1);
    expect(wrapper.state().formErrors).toBe(false);
  });

  it('should render a Form with props loading when addListProcessing is true', () => {
    const wrapper = setup({ addListProcessing: true });
    const form = wrapper.find(Form);
    expect(form.props().loading).toBe(true);
  });

  it('should render a Message with the error as content when addListError is not null', () => {
    const wrapper = setup({ addListError: 'Uh oh' });
    const form = wrapper.find(Form);
    expect(form.props().error).toBe(true);
    const message = wrapper.find(Message);
    expect(message.props().error).toBe(true);
    expect(message.props().content).toBe('Uh oh');
  });

  it('should render a Message with the error as content when updateListError is not null', () => {
    const wrapper = setup({ updateListError: 'Update Uh oh' });
    const form = wrapper.find(Form);
    expect(form.props().error).toBe(true);
    const message = wrapper.find(Message);
    expect(message.props().error).toBe(true);
    expect(message.props().content).toBe('Update Uh oh');
  });

  it('should display an error label when name error is present', () => {
    const wrapper = setup();
    wrapper.setState({ fieldErrors: { name: 'Name invalid' } });
    const errorLabel = wrapper.find('Label[basic]');
    expect(errorLabel.dive().text()).toBe('Name invalid');
  });

  it('should display an error label when description error is present', () => {
    const wrapper = setup();
    wrapper.setState({ fieldErrors: { description: 'Description invalid' } });
    const errorLabel = wrapper.find('Label[basic]');
    expect(errorLabel.dive().text()).toBe('Description invalid');
  });
});

describe('handleInputChange', () => {
  it('should set the state of fields, fieldErrors, and formErrors', () => {
    const wrapper = setup();
    wrapper
      .instance()
      .handleInputChange({ target: { name: 'name', value: 'tes' } });
    expect(wrapper.state().fields.name).toBe('tes');
    expect(wrapper.state().fieldErrors.name).toBe(
      'Name must be between 4 and 60 characters'
    );
    expect(wrapper.state().formErrors).toBe(true);
  });

  it('should call removeAddListError if addListError prop is not null', () => {
    const removeAddListError = jest.fn();
    const wrapper = setup({ addListError: 'Uh oh', removeAddListError });
    wrapper
      .instance()
      .handleInputChange({ target: { name: 'name', value: 'tes' } });
    expect(removeAddListError.mock.calls.length).toBe(1);
  });

  it('should call removeUpdateListError if updateListError prop is not null', () => {
    const removeUpdateListError = jest.fn();
    const wrapper = setup({ updateListError: 'Uh oh', removeUpdateListError });
    wrapper
      .instance()
      .handleInputChange({ target: { name: 'name', value: 'tes' } });
    expect(removeUpdateListError.mock.calls.length).toBe(1);
  });
});

describe('form validations', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup();
  });

  it('should validate name', () => {
    const nameInput = wrapper.find('[name="name"]');
    nameInput.simulate('change', { target: { name: 'name', value: '' } });
    expect(wrapper.state().fieldErrors.name).toBe('Name is required');
    nameInput.simulate('change', { target: { name: 'name', value: 'abc' } });
    expect(wrapper.state().fieldErrors.name).toBe(
      'Name must be between 4 and 60 characters'
    );
    const letters = 'abcde';
    nameInput.simulate('change', {
      target: { name: 'name', value: letters.repeat(13) },
    });
    expect(wrapper.state().fieldErrors.name).toBe(
      'Name must be between 4 and 60 characters'
    );
    nameInput.simulate('change', {
      target: { name: 'name', value: 'New Event' },
    });
    expect(wrapper.state().fieldErrors.name).toBeUndefined();
  });

  it('should validate description', () => {
    const descriptionInput = wrapper.find('[name="description"]');
    descriptionInput.simulate('change', {
      target: { name: 'description', value: 'abcde'.repeat(51) },
    });
    expect(wrapper.state().fieldErrors.description).toBe(
      'Description must be 250 characters or less'
    );
    descriptionInput.simulate('change', {
      target: { name: 'description', value: 'This is my list' },
    });
    expect(wrapper.state().fieldErrors.description).toBeUndefined();
  });
});

describe('validate', () => {
  it('should return true if there is a validation error', () => {
    const wrapper = setup();
    expect(wrapper.instance().validate()).toBe(true);
  });

  it('should return false if there is not a validation error', () => {
    const wrapper = setup();
    wrapper.setState({ fields: { name: 'Test List' } });
    expect(wrapper.instance().validate()).toBe(false);
  });
});

describe('handleSubmit', () => {
  it('should call handleAddList if validation passes', () => {
    const handleAddList = jest.fn();
    const wrapper = setup({ handleAddList });
    wrapper.instance().validate = jest.fn().mockReturnValue(false);
    wrapper.instance().handleSubmit({ preventDefault: () => {} });
    expect(handleAddList.mock.calls.length).toBe(1);
  });

  it('should not call handleAddList if validation fails', () => {
    const handleAddList = jest.fn();
    const wrapper = setup({ handleAddList });
    wrapper.instance().validate = jest.fn().mockReturnValue(true);
    wrapper.instance().handleSubmit({ preventDefault: () => {} });
    expect(handleAddList.mock.calls.length).toBe(0);
  });

  it('should call handleUpdateList if a list prop was provided', () => {
    const handleUpdateList = jest.fn();
    const wrapper = setup({
      list: { id: '1', name: 'Test List' },
      handleUpdateList,
    });
    wrapper.instance().validate = jest.fn().mockReturnValue(false);
    wrapper.instance().handleSubmit({ preventDefault: () => {} });
    expect(handleUpdateList.mock.calls.length).toBe(1);
  });
});

describe('connect', () => {
  it('should receive the correct props from connect', () => {
    const initialState = {
      lists: {
        addList: {
          processing: false,
          error: null,
        },
        updateList: {
          processing: false,
          error: null,
        },
      },
    };
    const list = { id: '1', name: 'Test List' };
    const store = storeFactory(initialState);
    const wrapper = mount(
      <Provider store={store}>
        <ConnectedListForm list={list} />
      </Provider>
    );
    const componentProps = wrapper.find(ListForm).props();
    expect(componentProps.addListProcessing).toBeDefined();
    expect(componentProps.addListError).toBeDefined();
    expect(componentProps.handleAddList).toBeInstanceOf(Function);
    expect(componentProps.removeAddListError).toBeInstanceOf(Function);
    expect(componentProps.updateListProcessing).toBeDefined();
    expect(componentProps.updateListError).toBeDefined();
    expect(componentProps.handleUpdateList).toBeInstanceOf(Function);
    expect(componentProps.removeUpdateListError).toBeInstanceOf(Function);
    expect(componentProps.list).toBeDefined();
  });
});
