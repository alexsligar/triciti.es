import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import ConnectedAddTag, { AddTag } from './AddTag';
import { Input, Label, Button } from 'semantic-ui-react';
import { storeFactory } from '../../../test/testUtils';

const defaultProps = {
  tags: [{ title: 'university' }, { title: 'kid-friendly' }],
  processing: false,
  error: null,
  handleAddTag: () => {},
  removeAddTagError: () => {},
};

const setup = (props = {}) => {
  const propsPassed = { ...defaultProps, ...props };
  const wrapper = shallow(<AddTag {...propsPassed} />);
  return wrapper;
};

describe('render', () => {
  it('should render an Input component without error', () => {
    const wrapper = setup();
    const input = wrapper.find(Input);
    expect(input.length).toBe(1);
    const label = wrapper.find(Label);
    expect(label.length).toBe(0);
    const button = input.dive().find(Button);
    expect(button.props().content).toBe('Add Tag');
  });

  it('should render a Label with the correct text if tagExists is true', () => {
    const wrapper = setup();
    wrapper.setState({ value: 'new', tagExists: true });
    const label = wrapper.find(Label);
    expect(label.length).toBe(1);
    expect(label.dive().text()).toBe('Tag already exists');
  });

  it('should render a Label with correct text if error prop is true', () => {
    const wrapper = setup({ error: 'Uh oh' });
    const label = wrapper.find(Label);
    expect(label.length).toBe(1);
    expect(label.dive().text()).toBe('Error adding tag. Try again.');
  });

  it('should render a loading button if processing prop is true', () => {
    const wrapper = setup({ processing: true });
    const input = wrapper.find(Input).dive();
    const button = input.find(Button);
    expect(button.props().loading).toBe(true);
  });
});

describe('handleInputChange', () => {
  it('should set the value state to the target value', () => {
    const wrapper = setup();
    expect(wrapper.state().value).toBe('');
    wrapper.instance().handleInputChange({ target: { value: 'a' } });
    expect(wrapper.state().value).toBe('a');
  });

  it('should call removeAddTagError if error prop is true', () => {
    const removeAddTagError = jest.fn();
    const wrapper = setup({ removeAddTagError, error: 'Uh oh' });
    wrapper.instance().handleInputChange({ target: { value: 'a' } });
    expect(removeAddTagError.mock.calls.length).toBe(1);
  });

  it('should set tagExists to true if the value already exists', () => {
    const wrapper = setup();
    expect(wrapper.state().tagExists).toBe(false);
    wrapper.instance().handleInputChange({ target: { value: 'university' } });
    expect(wrapper.state().tagExists).toBe(true);
  });

  it('should set tagExists to false if it was true and the value doesnt exist', () => {
    const wrapper = setup();
    wrapper.setState({ tagExists: true });
    expect(wrapper.state().tagExists).toBe(true);
    wrapper.instance().handleInputChange({ target: { value: 'a' } });
    expect(wrapper.state().tagExists).toBe(false);
  });
});

describe('handleAddClick', () => {
  const handleAddTag = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should not call handleAddTag when tagExists is true', () => {
    const wrapper = setup({ handleAddTag });
    wrapper.setState({ tagExists: true, value: 'a' });
    wrapper.instance().handleAddClick();
    expect(handleAddTag.mock.calls.length).toBe(0);
  });

  it('should not call handleAddTag when value is blank', () => {
    const wrapper = setup({ handleAddTag });
    wrapper.instance().handleAddClick();
    expect(handleAddTag.mock.calls.length).toBe(0);
  });

  it('should call handleAddTag with the value state as the param and reset state value', () => {
    const wrapper = setup({ handleAddTag });
    wrapper.setState({ value: 'test' });
    wrapper.instance().handleAddClick();
    expect(handleAddTag.mock.calls[0][0]).toBe('test');
    expect(handleAddTag.mock.calls.length).toBe(1);
    expect(wrapper.state().value).toBe('');
  });
});

describe('connect', () => {
  it('should connect to the store with the correct props', () => {
    const initialState = {
      tags: {
        addTag: {
          processing: false,
          error: null,
        },
        tags: [{ title: 'university' }, { title: 'kid-friendly' }],
      },
    };
    const store = storeFactory(initialState);
    const wrapper = mount(
      <Provider store={store}>
        <ConnectedAddTag />
      </Provider>
    );
    const componentProps = wrapper.find(AddTag).props();
    expect(componentProps.processing).toBeDefined();
    expect(componentProps.error).toBeDefined();
    expect(componentProps.tags).toBeDefined();
    expect(componentProps.handleAddTag).toBeInstanceOf(Function);
    expect(componentProps.removeAddTagError).toBeInstanceOf(Function);
  });
});
