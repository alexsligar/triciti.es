import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import { storeFactory } from '../../test/testUtils';
import { App } from './App';

const setup = (initialState={}) => {
    const store = storeFactory(initialState);
    const wrapper = shallow(<Provider store={store}><App /></Provider>).children().dive();
    return wrapper;
};

describe('render', () => {

    it('should render component without error', () => {

        const wrapper = setup();
        expect(wrapper.find('.test').length).toBe(1);
    });

});
