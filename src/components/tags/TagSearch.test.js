import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ConnectedTagSearch, TagSearch } from './TagSearch';
import { Search } from 'semantic-ui-react';
import { storeFactory } from '../../../test/testUtils';

const defaultProps = {
    tags: [{title: 'university'}, {title: 'kid-friendly'}],
    history: {
        push: () => {},
    }
};

const setup = (props = {}) => {
    const propsPassed = {...defaultProps, ...props};
    const wrapper = shallow(<TagSearch {...propsPassed} />);
    return wrapper;
}

describe('render', () => {

    it('should render a Search component without error', () => {

        const wrapper = setup();
        const search = wrapper.find(Search);
        expect(search.length).toBe(1);
    });
});

describe('component functions', () => {
    
    jest.useFakeTimers();
    it('should update the results when value changes', () => {

        const wrapper = setup();
        wrapper.instance().handleSearchChange(() => {}, { value: 'uni'});
        expect(wrapper.state().isLoading).toBe(true);
        jest.runAllTimers();
        expect(wrapper.state().isLoading).toBe(false);
        expect(wrapper.state().value).toBe('uni');
        const expectedResults = [{ title: 'university'}];
        expect(wrapper.state().results).toEqual(expectedResults);

    });

    it('should call resetComponent when value is zero length', () => {

        const wrapper = setup();
        const spy = jest.spyOn(wrapper.instance(), 'resetComponent');
        wrapper.instance().handleSearchChange(() => {}, { value: ''});
        expect(wrapper.state().isLoading).toBe(true);
        jest.runAllTimers();
        expect(wrapper.state().isLoading).toBe(false);
        expect(spy.mock.calls.length).toBe(1);
    });

    it('resetComponent should set state back to default', () => {

        const wrapper = setup();
        const initial = { isLoading: true, results: [], value: 'test' };
        wrapper.setState(initial);
        expect(wrapper.state()).toEqual(initial);
        wrapper.instance().resetComponent();
        const expected = { isLoading: false, results: [], value: '' };
        expect(wrapper.state()).toEqual(expected);
    });

    it('should call history.push when result is clicked on', () => {

        const push = jest.fn();
        const props = {
            history: {
                push,
            }
        };
        const wrapper = setup(props);
        wrapper.instance().handleResultSelect({}, { result: { title: 'university' } });
        expect(push.mock.calls.length).toBe(1);
        expect(push.mock.calls[0][0]).toBe('/tags/university');
    });
});

describe('connect', () => {

    it('should connect to the store with the correct props', () => {

        const store = storeFactory({ tags: defaultProps.tags });
        const wrapper = mount(<Provider store={store}><ConnectedTagSearch /></Provider>);
        expect(wrapper.find(TagSearch).props().tags).toEqual(defaultProps.tags);
    });
});