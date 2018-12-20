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
    },
    loading: false,
    error: null,
    handleGetTags: () => {},
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

    it('should render a spinner icon when loading', () => {

        const props = {
            loading: true,
        }
        const wrapper = setup(props);
        const icon = wrapper.find('Icon[name="spinner"]');
        expect(icon.length).toBe(1);
    });

    it('should display the error message when error is present', () => {

        const props = {
            error: 'Uh oh...'
        };
        const wrapper = setup(props);
        expect(wrapper.text()).toBe(props.error);
    });
});

describe('componentDidMount', () => {

    it('should call handleGetTags', () => {

        const handleGetTags = jest.fn();
        const props = {
            handleGetTags,
        }
        const wrapper = setup(props);
        wrapper.instance().componentDidMount();
        expect(handleGetTags.mock.calls.length).toBe(1);
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

        const initialState = {
            tags: {
                loading: false,
                error: null,
                tags: defaultProps.tags,
            }
        }
        const store = storeFactory(initialState);
        const wrapper = mount(<Provider store={store}><ConnectedTagSearch /></Provider>);
        const tagSearchProps = wrapper.find(TagSearch).props();
        expect(tagSearchProps.tags).toEqual(defaultProps.tags);
        expect(tagSearchProps.loading).toBeDefined();
        expect(tagSearchProps.error).toBeDefined();
    });
});