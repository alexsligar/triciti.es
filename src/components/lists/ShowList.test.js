import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { Dimmer, Message } from 'semantic-ui-react';
import { Router } from 'react-router-dom';
import history from '../../history';
import ConnectedShowList, { ShowList } from './ShowList';
import ListHeader from './ListHeader';
import ListOptions from './ListOptions';
import { storeFactory } from '../../../test/testUtils';

const defaultProps = {
    loading: false,
    error: null,
    list: {
        id: 'abcd',
        name: 'Test List',
        owner: 'testuser',
        items: [{ id: 2, name: 'Test Item', type: 'Activity', location: 'Here', }],
    },
    updateProcessing: false,
    updateError: null,
    handleGetList: () => {},
    match: {
        params: {
            id: 'abcd',
        },
    },
    authedUser: {
        username: 'testuser',
    }
};
const setup = (props = {}) => {
    const propsPassed = { ...defaultProps, ...props };
    return shallow(<ShowList {...propsPassed} />);
}

describe('render', () => {

    describe('loading', () => {

        it('should render a loading dimmer if props loading is true', () => {

            const wrapper = setup({ loading: true });
            const dimmer = wrapper.find(Dimmer);
            expect(dimmer.length).toBe(1);
            expect(dimmer.props().active).toBe(true);
        });

        it('should render a loading dimmer if list hasnt loaded', () => {

            const wrapper = setup({ list: {} });
            const dimmer = wrapper.find(Dimmer);
            expect(dimmer.length).toBe(1);
            expect(dimmer.props().active).toBe(true);
        });

        it('should render a loading dimmer the url list no longer matches the redux list', () => {

            const wrapper = setup({ list: { id: 'abcd' }, match: { params: { id: 'efgh' } } });
            const dimmer = wrapper.find(Dimmer);
            expect(dimmer.length).toBe(1);
            expect(dimmer.props().active).toBe(true);
        });
    });

    describe('error', () => {

        it('should render a Message with the error as the content if error prop is not null', () => {

            const wrapper = setup({ error: 'Uh oh' });
            const errorMessage = wrapper.find(Message);
            expect(errorMessage.length).toBe(1);
            expect(errorMessage.props().error).toBe(true);
            expect(errorMessage.props().content).toBe('Uh oh');
        });
    });

    describe('successfully loaded', () => {

        it('should render the correct child components', () => {

            const wrapper = setup();
            const listHeader = wrapper.find(ListHeader);
            expect(listHeader.length).toBe(1);
            const listOptions = wrapper.find(ListOptions);
            expect(listOptions.length).toBe(1);
        });
    });
});

describe('componentDidMount', () => {

    it('should call handleGetList', () => {

        const handleGetList = jest.fn();
        const wrapper = setup({ handleGetList });
        wrapper.instance().componentDidMount();
        expect(handleGetList.mock.calls.length).toBe(1);
        expect(handleGetList.mock.calls[0][0]).toBe(defaultProps.match.params.id);
    });
});

describe('componentDidUpdate', () => {

    it('should call handleGetList if the url id changes', () => {

        const handleGetList = jest.fn();
        const wrapper = setup({ handleGetList, match: { params: { id: 'efgh' } } });
        wrapper.instance().componentDidUpdate({ match: { params: { id: 'abcd' } } });
        expect(handleGetList.mock.calls.length).toBe(1);
        expect(handleGetList.mock.calls[0][0]).toBe('efgh');
    });
});

describe('connect', () => {

    it('should receive the correct props from connect', () => {

        const initialState = {
            lists: {
                getList: {
                    loading: false,
                    error: null,
                },
                updateList: {
                    processing: false,
                    error: null,
                },
                list: {
                    id: 'abcd',
                    name: 'Test List',
                    owner: 'testuser',
                    items: [],
                },
            },
        };
        const match = {
            params: {
                id: 'abcd',
            },
        };
        const store = storeFactory(initialState);
        const wrapper = mount(
            <Router history={history}>
                <Provider store={store}><ConnectedShowList match={match} /></Provider>
            </Router>
        );
        const componentProps = wrapper.find(ShowList).props();
        expect(componentProps.loading).toBeDefined();
        expect(componentProps.error).toBeDefined();
        expect(componentProps.list).toBeDefined();
        expect(componentProps.handleGetList).toBeInstanceOf(Function);
        expect(componentProps.updateProcessing).toBeDefined();
        expect(componentProps.updateError).toBeDefined();
    });
});
