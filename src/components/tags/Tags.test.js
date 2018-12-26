import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import history from '../../history';
import ConnectedTags, { Tags } from './Tags';
import { Header, Dimmer, Search, Label, Message } from 'semantic-ui-react';
import AddTag from './AddTag';
import UpdateTag from './UpdateTag';
import { storeFactory } from '../../../test/testUtils';

const defaultProps = {
    tags: [{title: 'university'}, {title: 'kid-friendly'}],
    loading: false,
    error: null,
    authedUserAdmin: false,
    handleGetTags: () => {},
};

const setup = (props = {}) => {
    const propsPassed = {...defaultProps, ...props};
    const wrapper = shallow(<Tags {...propsPassed} />);
    return wrapper;
}

describe('render', () => {

    it('should render component without error', () => {

        const wrapper = setup();
        const header = wrapper.find(Header);
        expect(header.length).toBe(1);
        expect(header.dive().text()).toBe('<Icon />Tags');
        const search = wrapper.find(Search);
        expect(search.length).toBe(1);
        const labels = wrapper.find(Label);
        expect(labels.length).toBe(defaultProps.tags.length)
    });

    it('should render a Dimmer if loading prop is true', () => {

        const wrapper = setup({ loading: true });
        const dimmer = wrapper.find(Dimmer);
        expect(dimmer.length).toBe(1);
        expect(dimmer.props().active).toBe(true);
    });

    it('should render a Message if the error prop is not null', () => {

        const wrapper = setup({ error: 'Uh oh' });
        const message = wrapper.find(Message.Header);
        expect(message.length).toBe(1);
        expect(message.dive().text()).toBe('Sorry, there was an error loading the tags. Please try again.');
    });

    it('should render an AddTag if authedUserAdmin is true', () => {

        const wrapper = setup({ authedUserAdmin: true });
        const addTag = wrapper.find(AddTag);
        expect(addTag.length).toBe(1);
    });

    it('should render UpdateTag components if authedUserAdmin is true', () => {

        const wrapper = setup({ authedUserAdmin: true });
        const updateTags = wrapper.find(UpdateTag);
        expect(updateTags.length).toBe(defaultProps.tags.length);
    });
});

describe('resetComponent', () => {

    it('should reset the state', () => {

        const wrapper = setup();
        wrapper.setState({ isLoading: true, value: 'test', results: [{ title: 'university' }] });
        wrapper.instance().resetComponent();
        expect(wrapper.state()).toEqual({ isLoading: false, results: [], value: '' });
    });
});

describe('handleResultSelect', () => {

    it('should set state value to the title', () => {

        const wrapper = setup();
        expect(wrapper.state().value).toBe('');
        wrapper.instance().handleResultSelect({}, { result: { title: 'test' } });
        expect(wrapper.state().value).toBe('test');
    });

    it('should call handleSearchChange with the result title', () => {

        const wrapper = setup();
        const spy = jest.spyOn(wrapper.instance(), 'handleSearchChange');
        wrapper.instance().handleResultSelect({}, { result: { title: 'test' } });
        expect(spy.mock.calls.length).toBe(1);
        expect(spy.mock.calls[0][1].value).toBe('test');
    });
});

describe('handleSearchChange', () => {

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
});

describe('componentDidMount', () => {

    it('should call handleGetTags', () => {

        const handleGetTags = jest.fn();
        const wrapper = setup({ handleGetTags });
        wrapper.instance().componentDidMount();
        expect(handleGetTags.mock.calls.length).toBe(1);
    });
});


describe('connect', () => {

    it('should connect to the store with the correct props', () => {


        const initialState = {
            tags: {
                getTags: {
                    loading: false,
                    error: null,
                },
                addTag: {
                    processing: false,
                    error: null,
                },
                updateTag: {
                    processing: false,
                    error: null,
                },
                tags: [{title: 'university'}, {title: 'kid-friendly'}],
            },
            authedUser: {
                role: 'user',
            }
        };
        const store = storeFactory(initialState);
        const wrapper = mount(<Router history={history}><Provider store={store}><ConnectedTags /></Provider></Router>);
        const componentProps = wrapper.find(Tags).props();
        expect(componentProps.loading).toBeDefined();
        expect(componentProps.error).toBeDefined();
        expect(componentProps.tags).toBeDefined();
        expect(componentProps.authedUserAdmin).toBeDefined();
        expect(componentProps.handleGetTags).toBeInstanceOf(Function);
    });
});