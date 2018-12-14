import React from 'react';
import { shallow } from 'enzyme';
import { App }  from './App';

const defaultProps = {
    loading: true,
    error: null,
    handleInitialData: () => {}
};

const setup = (props={...defaultProps}) => {
    const wrapper = shallow(<App {...props} />);
    return wrapper;
};

describe('render', () => {

    it('should render component without error', () => {

        const wrapper = setup();
        expect(wrapper.find('.test').length).toBe(1);
    });

});


describe('componentDidMount', () => {

    it('should call handleInitialData', () => {

        const handleInitialData = jest.fn();
        const props = {
            handleInitialData,
            loading: true,
        };
        const wrapper = setup(props);
        wrapper.instance().componentDidMount();
        expect(handleInitialData.mock.calls.length).toBe(1);
    });
});
