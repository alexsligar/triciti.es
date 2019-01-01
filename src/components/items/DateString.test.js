import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import DateString from './DateString';

const setup = (props = {}) => {
    return shallow(<DateString {...props} />);
};

describe('return', () => {

    it('should render only the start_date if end_date is null', () => {

        const start_date = moment();
        const wrapper = setup({ start_date: start_date.format() });
        expect(wrapper.text()).toBe(start_date.format('lll'));
        
    });

    it('should render both dates if they are different', () => {

        const start_date = moment();
        const end_date = moment().add(1, 'days');
        const wrapper = setup({ start_date: start_date.format(), end_date: end_date.format() });
        const expected = start_date.format('lll') + '-' + end_date.format('lll');
        expect(wrapper.text()).toBe(expected);
    });

    it('should render only the time of the end_date if dates match', () => {

        const start_date = moment();
        const end_date = moment().add(10, 'minutes');
        const wrapper = setup({ start_date: start_date.format(), end_date: end_date.format() });
        let expected = moment(start_date).format('lll');
        expected += '-';
        expected += moment(end_date).format('h:mm A');
        expect(wrapper.text()).toBe(expected);
    });
})