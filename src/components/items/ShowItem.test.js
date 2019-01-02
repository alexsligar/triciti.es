import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { Dimmer, Message } from 'semantic-ui-react';
import history from '../../history';
import ConnectedShowItem, { ShowItem } from './ShowItem';
import { storeFactory } from '../../../test/testUtils';
import ItemHeader from './ItemHeader';
import ItemDetails from './ItemDetails';
import ItemOptions from './ItemOptions';

const defaultProps = {
    loading: false,
    error: null,
    item: { 
        id: 1, 
        name: 'Test Item', 
        type: 'place',
        location: 'Up the street', 
        owners: ['testuser'], 
        tags: ['test']
    },
    authedUser: {
        username: 'testuser'
    },
    handleGetItem: () => {},
    match: {
        params: {
            id: '1',
        },
    },
};
const setup = (props = {}) => {
    const propsPassed = { ...defaultProps, ...props };
    return shallow(<ShowItem {...propsPassed} />);
}

describe('render', () => {

    it('should render a Dimmer if props loading is true', () => {

        const wrapper = setup({ loading: true });
        const dimmer = wrapper.find(Dimmer);
        expect(dimmer.length).toBe(1);
        expect(dimmer.props().active).toBe(true);
    });

    it('should render a Message with an error if error props is true', () => {

        const wrapper = setup({ error: 'Uh oh' });
        const message = wrapper.find(Message);
        expect(message.length).toBe(1);
        expect(message.props().error).toBe(true);
        expect(message.props().content).toBe('Uh oh');
    });

    it('should render the item if its loads', () => {

        const wrapper = setup();
        expect(wrapper.find(ItemHeader).length).toBe(1);
        expect(wrapper.find(ItemOptions).length).toBe(1);
        expect(wrapper.find(ItemDetails).length).toBe(1);
    });

    it('should not render the ItemOptions component if authedUser is null', () => {

        const wrapper = setup({ authedUser: null });
        expect(wrapper.find(ItemOptions).length).toBe(0);
    });

    it('should not render the ItemOptions component if authedUser is not item owner', () => {

        const wrapper = setup({ authedUser: { username: 'bob' } });
        expect(wrapper.find(ItemOptions).length).toBe(0);
    });
});

describe('connect', () => {

    it('should connect with the correct props passed', () => {

        const initialState = {
            items: {
                getItem: {
                    loading: false,
                    error: null,
                },
                deleteItem: {
                    processing: false,
                    error: null,
                },
                item: { 
                    id: 1, 
                    name: 'Test Item', 
                    type: 'place',
                    location: 'Up the street', 
                    owners: ['testuser'], 
                    tags: ['test']
                },
            },
            authedUser: {
                username: 'testuser',
            },
        };
        const match = {
            params: { id: '1' }
        };
        const store = storeFactory(initialState);
        const wrapper = mount(<Router history={history}><Provider store={store}><ConnectedShowItem match={match} /></Provider></Router>);
        const componentProps = wrapper.find(ShowItem).props();
        expect(componentProps.loading).toBeDefined();
        expect(componentProps.error).toBeDefined();
        expect(componentProps.item).toBeDefined();
        expect(componentProps.authedUser).toBeDefined();
        expect(componentProps.handleGetItem).toBeInstanceOf(Function);
        expect(componentProps.match.params.id).toBeDefined();
    });
});