import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import ConnectedItemForm, { ItemForm } from './ItemForm';
import { Form } from 'semantic-ui-react';
import moment from 'moment';
import { storeFactory } from '../../../test/testUtils';
import SelectDates from '../universal/SelectDates';


const defaultProps = {
    addItemProcessing: false,
    addItemError: null,
    updateItemProcessing: false,
    updateItemError: null,
    handleAddItem: () => {},
    removeAddItemError: () => {},
    handleUpdateItem: () => {},
    removeUpdateItemError: () => {},
    tagsLoading: false,
    tagsError: null,
    tags: [{ title: 'university' }, { title: 'kid-friendly' }],
};

const setup = (props = {}) => {
    const propsPassed = {...defaultProps, ...props};
    const wrapper = shallow(<ItemForm {...propsPassed} />);
    return wrapper;
}

describe('render', () => {

    it('should render a Form component without error', () => {

        const wrapper = setup();
        const form = wrapper.find(Form);
        expect(form.length).toBe(1);
    });

    it('should pass loading=true as a prop to the form when addItemProcessing', () => {

        const wrapper = setup({ addItemProcessing: true });
        const form = wrapper.find(Form);
        expect(form.props().loading).toBe(true);
    });

    it('should pass loading=true as a prop to the form when updateItemProcessing', () => {

        const wrapper = setup({ updateItemProcessing: true });
        const form = wrapper.find(Form);
        expect(form.props().loading).toBe(true);
    });

    it('should pass loading=true as a prop to the form when tags are loading', () => {

        const wrapper = setup({ tagsLoading: true });
        const form = wrapper.find(Form);
        expect(form.props().loading).toBe(true);
    })

    it('should display an error Message when tagsError isnt null', () => {

        const wrapper = setup({ tagsError: 'Uh oh' });
        const message = wrapper.find('Message[error]');
        expect(message.length).toBe(1);
        expect(message.props().content).toBe('Uh oh');
    });

    it('should display an error Message when addItemError isnt null', () => {

        const wrapper = setup({ addItemError: 'Uh oh' });
        const message = wrapper.find('Message[error]');
        expect(message.length).toBe(1);
        expect(message.props().content).toBe('Uh oh');
    });

    it('should display an error Message when updateItemError isnt null', () => {

        const wrapper = setup({ updateItemError: 'Uh oh' });
        const message = wrapper.find('Message[error]');
        expect(message.length).toBe(1);
        expect(message.props().content).toBe('Uh oh');
    });

    it('should display an error label when name error is present', () => {

        const wrapper = setup();
        wrapper.setState({ fieldErrors: { name: 'Name invalid' } });
        const errorLabel = wrapper.find('Label[basic]');
        expect(errorLabel.dive().text()).toBe('Name invalid');
    });

    it('should display an error label when location error is present', () => {

        const wrapper = setup();
        wrapper.setState({ fieldErrors: { location: 'Location invalid' } });
        const errorLabel = wrapper.find('Label[basic]');
        expect(errorLabel.dive().text()).toBe('Location invalid');
    });

    it('should display an error label when type error is present', () => {

        const wrapper = setup();
        wrapper.setState({ fieldErrors: { type: 'Type invalid' } });
        const errorLabel = wrapper.find('Label[basic]');
        expect(errorLabel.dive().text()).toBe('Type invalid');
    });

    it('should display SelectDates component when type is event', () => {

        const wrapper = setup();
        wrapper.setState({ fields: { ...wrapper.state().fields, type: 'event' } });
        const selectDates = wrapper.find(SelectDates);
        expect(selectDates.length).toBe(1);
    });
});

describe('state', () => {

    it('should use the item as initial state if passed', () => {

        const wrapper = setup({ item: { name: 'Test Item' } });
        expect(wrapper.state().fields.name).toBe('Test Item');
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

    it('should validate location', () => {

        const locationInput = wrapper.find('[name="location"]');
        locationInput.simulate('change', { target: { name: 'location', value: '' }});
        expect(wrapper.state().fieldErrors.location).toBe('Location is required');
        locationInput.simulate('change', { target: { name: 'location', value: 'abc' }});
        expect(wrapper.state().fieldErrors.location).toBe('Location must be between 10 and 60 characters');
        const letters = 'abcde'
        locationInput.simulate('change', { target: { name: 'location', value: letters.repeat(13) }});
        expect(wrapper.state().fieldErrors.location).toBe('Location must be between 10 and 60 characters');
        locationInput.simulate('change', { target: { name: 'location', value: 'Howard Amon Park' } });
        expect(wrapper.state().fieldErrors.location).toBeUndefined();
    });

    it('should validate type', () => {

        const typeInput = wrapper.find('[name="type"]');
        typeInput.simulate('change', {}, { name: 'type', value: '' });
        expect(wrapper.state().fieldErrors.type).toBe('Type is required');
    });

    it('should validate start_date', () => {

        wrapper.setState({ fields: { type: 'event' } });
        let valid = wrapper.instance().validations['start_date'](undefined);
        expect(valid).toBe('Start date is required');
        let val = moment().subtract(1, 'days');
        valid = wrapper.instance().validations['start_date'](val);
        expect(valid).toBe('Start date must be in the future');
        val = moment().add(2, 'days');
        const end_date = moment().add(1, 'days');
        valid = wrapper.instance().validations['start_date'](val, end_date);
        expect(valid).toBe('End date must be after start date');
    });

    it('should validate end_date', () => {

        const start_date = moment().add(2, 'days');
        const end_date = moment().add(1, 'days');
        const valid = wrapper.instance().validations['end_date'](end_date, start_date);
        expect(valid).toBe('End date must be after start date');
    });

    it('should validate tags', () => {

        const valid = wrapper.instance().validations['tags']([]);
        expect(valid).toBeNull();
    })

});

describe('handleInputChange', () => {

    it('should set the state of fields, fieldErrors, and formErrors', () => {

        const wrapper = setup();
        wrapper.instance().handleInputChange({ target: { name: 'name', value: 'tes' }});
        expect(wrapper.state().fields.name).toBe('tes');
        expect(wrapper.state().formErrors).toBe(true);
        expect(wrapper.state().fieldErrors.name).not.toBeNull();
    });
});

describe('handleSelectChange', () => {

    it('should set the state of fields, fieldErrors, and formErrors', () => {

        const wrapper = setup();
        wrapper.setState({ fieldErrors: { type: 'Type is required' }, formErrors: true });
        wrapper.instance().handleSelectChange({}, { name: 'type', value: 'event' });
        expect(wrapper.state().fields.type).toBe('event');
        expect(wrapper.state().formErrors).toBe(false);
        expect(wrapper.state().fieldErrors.type).not.toBeDefined();
    });

    it('should reset the date fields if type is not event', () => {

        const wrapper = setup();
        wrapper.setState({ 
            fields: {
                ...wrapper.state().fields,
                start_date: moment().add(1, 'days'),
                end_date: moment().add(2, 'days'),
            },
            fieldErrors: {
                ...wrapper.state().fieldErrors,
                start_date: 'Invalid start date',
                end_date: 'Invalid end date',
            },
        });
        wrapper.instance().handleSelectChange({}, { name: 'type', value: 'activity' });
        expect(wrapper.state().fields.type).toBe('activity');
        expect(wrapper.state().fields.start_date).toBeUndefined();
        expect(wrapper.state().fields.end_date).toBeUndefined();
        expect(wrapper.state().fieldErrors.start_date).toBeUndefined();
        expect(wrapper.state().fieldErrors.end_date).toBeUndefined();
    });
});

describe('handleStartDateChange', () => {

    it('should set the state of fields, fieldErrors, and formErrors', () => {

        const wrapper = setup();
        const start_date = moment().subtract(1, 'days');
        wrapper.instance().handleStartDateChange(start_date);
        expect(wrapper.state().fields.start_date).toBe(start_date);
        expect(wrapper.state().formErrors).toBe(true);
        expect(wrapper.state().fieldErrors.start_date).toBe('Start date must be in the future');
    });

    it('should revalidate the end_date field', () => {

        const wrapper = setup();
        wrapper.setState({ fieldErrors: { end_date: 'Uh oh' } });
        wrapper.instance().handleStartDateChange(moment().add(1, 'days'));
        expect(wrapper.state().fieldErrors.end_date).toBeUndefined();
    });
});

describe('handleEndDateChange', () => {

    it('should set the state of fields, fieldErrors, and formErrors and revalidate start_date', () => {

        const wrapper = setup();
        wrapper.setState({ fields: { ...wrapper.state().fields, type: 'event' } });
        const end_date = moment().add(1, 'days');
        wrapper.instance().handleEndDateChange(end_date);
        expect(wrapper.state().fields.end_date).toBe(end_date);
        expect(wrapper.state().formErrors).toBe(true);
        expect(wrapper.state().fieldErrors.start_date).toBe('Start date is required');
    });
});

describe('handleSubmit', () => {

    it('should not call handleAddItem if validation fails', () => {

        const handleAddItem = jest.fn();
        const wrapper = setup({ handleAddItem });
        wrapper.instance().handleSubmit({ preventDefault: jest.fn() });
        expect(handleAddItem.mock.calls.length).toBe(0);
    });

    it('should call handleAddItem if validation passes', () => {

        const handleAddItem = jest.fn();
        const wrapper = setup({ handleAddItem });
        wrapper.instance().validate = jest.fn().mockReturnValueOnce(false);
        wrapper.instance().handleSubmit({ preventDefault: jest.fn() });
        expect(handleAddItem.mock.calls.length).toBe(1);
        expect(handleAddItem.mock.calls[0][0]).toEqual(wrapper.state().fields);
    });

    it('should call handleUpdateItem if an item exists', () => {

        const handleUpdateItem = jest.fn();
        const wrapper = setup({ handleUpdateItem, item: { id: 1, name: 'Test Item '} });
        wrapper.instance().validate = jest.fn().mockReturnValueOnce(false);
        wrapper.instance().handleSubmit({ preventDefault: jest.fn() });
        expect(handleUpdateItem.mock.calls.length).toBe(1);
        expect(handleUpdateItem.mock.calls[0][0]).toEqual(1);
    });
})

describe('connect', () => {

    it('should connect to the store with the correct props', () => {


        const initialState = {
            items: {
                addItem: {
                    processing: false,
                    error: null,
                },
                updateItem: {
                    processing: false,
                    error: null,
                },
                getItem: {
                    loading: false,
                    error: null,
                },
                item: {},
            },
            tags: {
                getTags: {
                    loading: false,
                    error: null,
                },
                tags: [{title: 'university'}, {title: 'kid-friendly'}],
            },
        };
        const store = storeFactory(initialState);
        const wrapper = mount(<Provider store={store}><ConnectedItemForm item={{}} /></Provider>);
        const componentProps = wrapper.find(ItemForm).props();
        expect(componentProps.addItemProcessing).toBeDefined();
        expect(componentProps.addItemError).toBeDefined();
        expect(componentProps.item).toBeDefined();
        expect(componentProps.handleAddItem).toBeInstanceOf(Function);
        expect(componentProps.removeAddItemError).toBeInstanceOf(Function);
        expect(componentProps.handleUpdateItem).toBeInstanceOf(Function);
        expect(componentProps.removeUpdateItemError).toBeInstanceOf(Function);
        expect(componentProps.tagsLoading).toBeDefined();
        expect(componentProps.tagsError).toBeDefined();
        expect(componentProps.tags).toBeInstanceOf(Array);
    });
});