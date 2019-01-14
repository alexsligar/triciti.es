import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { Router, Link } from 'react-router-dom';
import history from '../../history';
import ConnectedUpdateTag, { UpdateTag } from './UpdateTag';
import { Confirm, Label, Button, Input, Modal } from 'semantic-ui-react';
import { storeFactory } from '../../../test/testUtils';

const defaultProps = {
  tags: [{ title: 'university' }, { title: 'kid-friendly' }],
  title: 'university',
  updateProcessing: false,
  updateError: null,
  deleteProcessing: false,
  deleteError: null,
  authedUserAdmin: false,
  handleUpdateTag: () => {},
  removeUpdateTagError: () => {},
  handleDeleteTag: () => {},
  removeDeleteTagError: () => {},
};

const setup = (props = {}) => {
  const propsPassed = { ...defaultProps, ...props };
  const wrapper = shallow(<UpdateTag {...propsPassed} />);
  return wrapper;
};

describe('render', () => {
  describe('non editMode', () => {
    it('should display a label with a link', () => {
      const wrapper = setup();
      const label = wrapper.find(Label);
      expect(label.length).toBe(1);
      const link = label.find(Link);
      expect(link.props().to).toBe('/tags/' + defaultProps.title);
    });
  });

  describe('editMode', () => {
    it('should display an input with buttons when not processing', () => {
      const wrapper = setup();
      wrapper.setState({ editMode: true });
      const input = wrapper.find(Input);
      expect(input.length).toBe(1);
      const buttons = wrapper.find(Button);
      expect(buttons.length).toBe(2);
    });

    it('should display a single loading button when processing', () => {
      const wrapper = setup({ updateProcessing: true });
      wrapper.setState({ editMode: true });
      const button = wrapper.find(Button);
      expect(button.length).toBe(1);
      expect(button.props().loading).toBe(true);
    });

    it('should display a label when the tag exists', () => {
      const wrapper = setup();
      wrapper.setState({ editMode: true, tagExists: true });
      const label = wrapper.find('Label[pointing="right"]');
      expect(label.length).toBe(1);
      expect(label.dive().text()).toBe('Tag already exists');
    });

    it('should display a label when an updateError occurs', () => {
      const wrapper = setup({ updateError: 'Uh oh' });
      wrapper.setState({ editMode: true });
      const label = wrapper.find('Label[pointing="right"]');
      expect(label.length).toBe(1);
      expect(label.dive().text()).toBe('Error saving. Try again.');
    });
  });

  describe('delete Confirm component', () => {
    it('should be open when deleteMode is true', () => {
      const wrapper = setup();
      wrapper.setState({ deleteMode: true });
      const confirm = wrapper.find(Confirm);
      expect(confirm.props().open).toBe(true);
    });

    it('should show a loading button if deleteProcessing is true', () => {
      const wrapper = setup({ deleteProcessing: true });
      const confirm = wrapper.find(Confirm);
      const button = confirm.dive().find(Button);
      expect(button.props().loading).toBe(true);
    });

    it('should display an error message when deleteError prop is not null', () => {
      const wrapper = setup({ deleteError: 'Uh oh' });
      const confirm = wrapper.find(Confirm).dive();
      const content = confirm.find(Modal.Content);
      expect(content.props().content).toBe('Error deleting tag. Try again?');
    });
  });
});

describe('handleInputChange', () => {
  it('should set the value to the input value', () => {
    const wrapper = setup();
    wrapper.instance().handleInputChange({ target: { value: 'test' } });
    expect(wrapper.state().value).toBe('test');
  });

  it('should call removeUpdateTagError when input changes', () => {
    const removeUpdateTagError = jest.fn();
    const wrapper = setup({ removeUpdateTagError, updateError: 'Uh oh' });
    wrapper.instance().handleInputChange({ target: { value: 'test' } });
    expect(removeUpdateTagError.mock.calls.length).toBe(1);
  });

  it('should set tagExists to true if input matches another tag', () => {
    const wrapper = setup();
    expect(wrapper.state().tagExists).toBe(false);
    wrapper.instance().handleInputChange({ target: { value: 'kid-friendly' } });
    expect(wrapper.state().tagExists).toBe(true);
  });

  it('should set tagExists to false if currently true and not a duplicate tag', () => {
    const wrapper = setup();
    wrapper.setState({ tagExists: true });
    wrapper.instance().handleInputChange({ target: { value: 'a' } });
    expect(wrapper.state().tagExists).toBe(false);
  });
});

describe('enterEditMode', () => {
  it('should set editMode to true', () => {
    const wrapper = setup();
    expect(wrapper.state().editMode).toBe(false);
    wrapper.instance().enterEditMode();
    expect(wrapper.state().editMode).toBe(true);
  });
});

describe('cancelEditMode', () => {
  it('should reset edit state', () => {
    const wrapper = setup();
    wrapper.setState({ editMode: true, value: 'a', tagExists: true });
    wrapper.instance().cancelEditMode();
    expect(wrapper.state().editMode).toBe(false);
    expect(wrapper.state().value).toBe(defaultProps.title);
    expect(wrapper.state().tagExists).toBe(false);
  });
});

describe('handleCheckClick', () => {
  it('should set editMode to false if value equals title', () => {
    const wrapper = setup();
    wrapper.setState({ editMode: true, value: 'university' });
    wrapper.instance().handleCheckClick();
    expect(wrapper.state().editMode).toBe(false);
  });

  it('should return if tagExists is true', () => {
    const handleUpdateTag = jest.fn();
    const wrapper = setup({ handleUpdateTag });
    wrapper.setState({ tagExists: true, value: 'kid-friendly' });
    wrapper.instance().handleCheckClick();
    expect(handleUpdateTag.mock.calls.length).toBe(0);
  });

  it('should call handleUpdateTag if valid', () => {
    const handleUpdateTag = jest.fn();
    const wrapper = setup({ handleUpdateTag });
    wrapper.setState({ value: 'new' });
    wrapper.instance().handleCheckClick();
    expect(handleUpdateTag.mock.calls.length).toBe(1);
    expect(handleUpdateTag.mock.calls[0][0]).toBe(defaultProps.title);
    expect(handleUpdateTag.mock.calls[0][1]).toBe('new');
  });
});

describe('handleTimesClick', () => {
  it('should set deleteMode state to true', () => {
    const wrapper = setup();
    wrapper.setState({ deleteMode: false });
    wrapper.instance().handleTimesClick();
    expect(wrapper.state().deleteMode).toBe(true);
  });
});

describe('handleCanceledDelete', () => {
  it('should set deleteMode state to false and call removeDeleteTagError', () => {
    const removeDeleteTagError = jest.fn();
    const wrapper = setup({ removeDeleteTagError });
    wrapper.setState({ deleteMode: true });
    wrapper.instance().handleCanceledDelete();
    expect(wrapper.state().deleteMode).toBe(false);
    expect(removeDeleteTagError.mock.calls.length).toBe(1);
  });
});

describe('handleConfirmedDelete', () => {
  it('should call handleDeleteTag', () => {
    const handleDeleteTag = jest.fn();
    const wrapper = setup({ handleDeleteTag });
    wrapper.instance().handleConfirmedDelete();
    expect(handleDeleteTag.mock.calls.length).toBe(1);
    expect(handleDeleteTag.mock.calls[0][0]).toBe(defaultProps.title);
  });
});

describe('componentDidUpdate', () => {
  it('should set editMode to false if the title changed', () => {
    const wrapper = setup();
    wrapper.setState({ editMode: true });
    wrapper.instance().componentDidUpdate({ title: 'new' });
    expect(wrapper.state().editMode).toBe(false);
  });

  it('should not set editMode to false if the title hasnt changed', () => {
    const wrapper = setup();
    wrapper.setState({ editMode: true });
    wrapper.instance().componentDidUpdate({ title: 'university' });
    expect(wrapper.state().editMode).toBe(true);
  });
});

describe('connect', () => {
  it('should connect to the store with the correct props', () => {
    const initialState = {
      tags: {
        updateTag: {
          processing: false,
          error: null,
        },
        deleteTag: {
          processing: true,
          error: null,
        },
        tags: [{ title: 'university' }, { title: 'kid-friendly' }],
      },
    };
    const store = storeFactory(initialState);
    const wrapper = mount(
      <Router history={history}>
        <Provider store={store}>
          <ConnectedUpdateTag title='test' />
        </Provider>
      </Router>
    );
    const componentProps = wrapper.find(UpdateTag).props();
    expect(componentProps.updateProcessing).toBeDefined();
    expect(componentProps.updateError).toBeDefined();
    expect(componentProps.deleteProcessing).toBeDefined();
    expect(componentProps.deleteError).toBeDefined();
    expect(componentProps.tags).toBeDefined();
    expect(componentProps.title).toBeDefined();
    expect(componentProps.handleUpdateTag).toBeInstanceOf(Function);
    expect(componentProps.removeUpdateTagError).toBeInstanceOf(Function);
    expect(componentProps.handleDeleteTag).toBeInstanceOf(Function);
    expect(componentProps.removeDeleteTagError).toBeInstanceOf(Function);
  });
});
