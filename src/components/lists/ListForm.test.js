import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { Form, Message } from 'semantic-ui-react';
import ConnectedListForm, { ListForm } from './ListForm';
import { storeFactory } from '../../../test/testUtils';

const defaultProps = {
    addListProcessing: false,
    addListError: null,
    handleAddList: () => {},
    removeAddListError: () => {},
};
const setup = (props = {}) => {
    const propsPassed = { ...defaultProps, ...props };
    return shallow(<ListForm {...propsPassed} />);
}

describe('render', () => {

    it('should render a Form', () => {

        const wrapper = setup();
        const form = wrapper.find(Form);
        expect(form.length).toBe(1);
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
        wrapper.instance().handleInputChange({ target: { name: 'name', value: 'tes' } });
        expect(wrapper.state().fields.name).toBe('tes');
        expect(wrapper.state().fieldErrors.name).toBe('Name must be between 4 and 60 characters');
        expect(wrapper.state().formErrors).toBe(true);
    });

    it('should call removeAddListError if addListError prop is not null', () => {

        const removeAddListError = jest.fn();
        const wrapper = setup({ addListError: 'Uh oh', removeAddListError });
        wrapper.instance().handleInputChange({ target: { name: 'name', value: 'tes' } });
        expect(removeAddListError.mock.calls.length).toBe(1);
    });
});

describe('form validations', () => {

    let wrapper;
    beforeEach(() => {

        wrapper = setup();
    });

    it('should validate name', () => {

        const nameInput = wrapper.find('[name="name"]');
        nameInput.simulate('change', { target: { name: 'name', value: '' }});
        expect(wrapper.state().fieldErrors.name).toBe('Name is required');
        nameInput.simulate('change', { target: { name: 'name', value: 'abc' }});
        expect(wrapper.state().fieldErrors.name).toBe('Name must be between 4 and 60 characters');
        const letters = 'abcde'
        nameInput.simulate('change', { target: { name: 'name', value: letters.repeat(13) }});
        expect(wrapper.state().fieldErrors.name).toBe('Name must be between 4 and 60 characters');
        nameInput.simulate('change', { target: { name: 'name', value: 'New Event' }});
        expect(wrapper.state().fieldErrors.name).toBeUndefined();
    });

    it('should validate description', () => {

        const descriptionInput = wrapper.find('[name="description"]');
        descriptionInput.simulate('change', { target: { name: 'description', value: '' }});
        expect(wrapper.state().fieldErrors.description).toBe('Description is required');
        descriptionInput.simulate('change', { target: { name: 'description', value: 'abcde' }});
        expect(wrapper.state().fieldErrors.description).toBe('Description must be between 10 and 250 characters');
        descriptionInput.simulate('change', { target: { name: 'description', value: 'abcde'.repeat(51) }});
        expect(wrapper.state().fieldErrors.description).toBe('Description must be between 10 and 250 characters');
        descriptionInput.simulate('change', { target: { name: 'description', value: 'This is my list' }});
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

    it('should ot ncall handleAddList if validation fails', () => {

        const handleAddList = jest.fn();
        const wrapper = setup({ handleAddList });
        wrapper.instance().validate = jest.fn().mockReturnValue(true);
        wrapper.instance().handleSubmit({ preventDefault: () => {} });
        expect(handleAddList.mock.calls.length).toBe(0);
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
            },
        };
        const store = storeFactory(initialState);
        const wrapper = mount(<Provider store={store}><ConnectedListForm /></Provider>);
        const componentProps = wrapper.find(ListForm).props();
        expect(componentProps.addListProcessing).toBeDefined();
        expect(componentProps.addListError).toBeDefined();
        expect(componentProps.handleAddList).toBeInstanceOf(Function);
    });
});