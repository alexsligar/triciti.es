import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { Dimmer, Message } from 'semantic-ui-react';
import history from '../../history';
import ConnectedEditItem, { EditItem } from './EditItem';
import ItemForm from './ItemForm';
import { storeFactory } from '../../../test/testUtils';

const defaultProps = {
    loading: false,
    error: null,
    item: { id: 1, name: 'Test Item', owners: [ 'testuser' ], },
    match: {
        params: {
            id: '1',
        }
    },
    handleGetItem: () => {},
    authedUser: {
        username: 'testuser',
    },
};
const setup = (props = {}) => {
    const propsPassed = { ...defaultProps, ...props };
    return shallow(<EditItem {...propsPassed} />);
}

describe('render', () => {

    it('should render a Dimmer when loading prop is true', () => {

        const wrapper = setup({ loading: true });
        const dimmer = wrapper.find(Dimmer);
        expect(dimmer.length).toBe(1);
        expect(dimmer.props().active).toBe(true);
    });

    it('should render a Message with the error when error prop is not null', () => {

        const wrapper = setup({ error: 'Uh oh' });
        const message = wrapper.find(Message);
        expect(message.length).toBe(1);
        expect(message.props().error).toBe(true);
        expect(message.props().content).toBe('Uh oh');
    });

    it('should render a Message about authorization when authedUser doesnt match', () => {

        const wrapper = setup({ authedUser: { username: 'bob' } });
        const message = wrapper.find(Message);
        expect(message.length).toBe(1);
        expect(message.props().error).toBe(true);
        expect(message.props().content).toBe('You are not authorized to edit this item.');
    });

    it('should render an ItemForm if authorized user and item is loaded', () => {

        const wrapper = setup();
        const itemForm = wrapper.find(ItemForm);
        expect(itemForm.length).toBe(1);
        expect(itemForm.props().item).toEqual(defaultProps.item);
    });

});

describe('componentDidMount', () => {

    it('should call handleGetItem', () => {

        const handleGetItem = jest.fn();
        const wrapper = setup({ handleGetItem });
        wrapper.instance().componentDidMount();
        expect(handleGetItem.mock.calls.length).toBe(1);
        expect(handleGetItem.mock.calls[0][0]).toBe(defaultProps.match.params.id);
    });
});

describe('connect', () => {

    it('should connect with the correct props passed', () => {

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
                item: { name: 'Test Item', owners: [ 'testuser' ]},
            },
            authedUser: {
                username: 'testuser',
            },
        };
        const match = {
            params: { id: '1' }
        };
        const store = storeFactory(initialState);
        const wrapper = mount(<Router history={history}><Provider store={store}><ConnectedEditItem match={match} /></Provider></Router>);
        const componentProps = wrapper.find(EditItem).props();
        expect(componentProps.loading).toBeDefined();
        expect(componentProps.error).toBeDefined();
        expect(componentProps.item).toBeDefined();
        expect(componentProps.authedUser).toBeDefined();
        expect(componentProps.handleGetItem).toBeInstanceOf(Function);
        expect(componentProps.match.params.id).toBeDefined();
    });
});