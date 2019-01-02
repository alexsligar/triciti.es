import React from 'react';
import { shallow } from 'enzyme';
import SelectDates from './SelectDates';
import moment from 'moment';
import DateTimePicker from 'react-semantic-datetime';
import { Label } from 'semantic-ui-react';

const defaultProps = {
    startDate: undefined,
    startDateError: null,
    endDate: undefined,
    endDateError: null,
    handleStartDateChange: () => {},
    handleEndDateChange: () => {},
};
const setup = (props = {}) => {
    const propsPassed = {...defaultProps, ...props};
    return shallow(<SelectDates {...propsPassed} />);
}

describe('render', () => {

    it('should display a DateTimePicker when editStartDate or editEndDate is true', () => {

        const wrapper = setup();
        wrapper.setState({
            editStartDate: true, 
            editEndDate: true
        });
        const dateTimePicker = wrapper.find(DateTimePicker);
        expect(dateTimePicker.length).toBe(2);
    });

    it('should display startDate on button when startDate has been selected', () => {

        const props = { startDate: moment() };
        const wrapper = setup(props);
        const dateButton = wrapper.find('Button[icon=true]').first();
        expect(dateButton.dive().text()).toBe('<Icon />' + props.startDate.format('LLL') + '<Icon />');
    });

    it('should display endDate on button when endDate has been selected', () => {

        const props = { endDate: moment() };
        const wrapper = setup(props);
        const dateButton = wrapper.find('Button[icon=true]').last();
        expect(dateButton.dive().text()).toBe('<Icon />' + props.endDate.format('LLL') + '<Icon />');
    });

    it('should display an error label when startDateError is not null', () => {

        const props = { startDateError: 'Uh oh', endDateError: 'Shouldnt render' };
        const wrapper = setup(props);
        const label = wrapper.find(Label);
        expect(label.length).toBe(1);
        expect(label.dive().text()).toBe('Uh oh');
    });

    it('should display an error label when endDateError is not null', () => {

        const props = { endDateError: 'Uh oh' };
        const wrapper = setup(props);
        const label = wrapper.find(Label);
        expect(label.length).toBe(1);
        expect(label.dive().text()).toBe('Uh oh');
    });
});

describe('callback functions', () => {

    it('handleStartDateChange should call the prop handleStartDateChange', () => {

        const handleStartDateChange = jest.fn();
        const wrapper = setup({ handleStartDateChange });
        wrapper.setState({ editStartDate: true });
        const startDate = moment();
        wrapper.instance().handleStartDateChange(startDate);
        expect(handleStartDateChange.mock.calls.length).toBe(1);
        expect(handleStartDateChange.mock.calls[0][0]).toBe(startDate);
        expect(wrapper.state().editStartDate).toBe(false);
    });

    it('handleStartDateChange should call the prop handleEndDateChange', () => {

        const handleEndDateChange = jest.fn();
        const wrapper = setup({ handleEndDateChange });
        wrapper.setState({ editEndDate: true });
        const endDate = moment();
        wrapper.instance().handleEndDateChange(endDate);
        expect(handleEndDateChange.mock.calls.length).toBe(1);
        expect(handleEndDateChange.mock.calls[0][0]).toBe(endDate);
        expect(wrapper.state().editEndDate).toBe(false);
    });
});

describe('control functions', () => {

    const preventDefault = jest.fn();

    it('openStartDate should set editStartDate to true', () => {

        const wrapper = setup();
        wrapper.instance().openStartDate({ preventDefault });
        expect(wrapper.state().editStartDate).toBe(true);
    });

    it('openEndDate should set editEndDate to true', () => {

        const wrapper = setup();
        wrapper.instance().openEndDate({ preventDefault });
        expect(wrapper.state().editEndDate).toBe(true);
    });

    it('closeStartDate should set editStartDate to false', () => {

        const wrapper = setup();
        wrapper.setState({ editStartDate: true });
        wrapper.instance().closeStartDate({ preventDefault });
        expect(wrapper.state().editStartDate).toBe(false);
    });

    it('closeEndDate should set editEndDate to false', () => {

        const wrapper = setup();
        wrapper.setState({ editEndDate: true });
        wrapper.instance().closeEndDate({ preventDefault });
        expect(wrapper.state().editEndDate).toBe(false);
    });

    it('clearStartDate should call handleStartDateChange prop', () => {

        const handleStartDateChange = jest.fn();
        const wrapper = setup({ handleStartDateChange });
        const stopPropagation = jest.fn();
        wrapper.instance().clearStartDate({ stopPropagation });
        expect(handleStartDateChange.mock.calls.length).toBe(1);
        expect(stopPropagation.mock.calls.length).toBe(1);
    });

    it('clearEndDate should call handleEndDateChange prop', () => {

        const handleEndDateChange = jest.fn();
        const wrapper = setup({ handleEndDateChange });
        const stopPropagation = jest.fn();
        wrapper.instance().clearEndDate({ stopPropagation });
        expect(handleEndDateChange.mock.calls.length).toBe(1);
        expect(stopPropagation.mock.calls.length).toBe(1);
    });
});