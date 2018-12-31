import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { Dimmer, Header } from 'semantic-ui-react';
import ConnectedTagSearchResults, { TagSearchResults } from './TagSearchResults';
import ItemCard from '../items/ItemCard';
import history from '../../history';
import { storeFactory } from '../../../test/testUtils';

const defaultProps = {
    match: {
        params: {
            tag: 'test',
        },
    },
    itemsError: null,
    itemsLoading: false,
    items: [{ id: 1, name: 'Test Item', type: 'Activity', location: 'Kennewick' }],
    handleTagSearch: () => {},
};

const setup = (props = {}) => {
    const propsPassed = {...defaultProps, ...props};
    const wrapper = shallow(<TagSearchResults {...propsPassed} />);
    return wrapper;
};

describe('render', () => {

    it('should render correct components when loading results', () => {

        const props = {
            itemsLoading: true,
        };
        const wrapper = setup(props);
        const dimmer = wrapper.find(Dimmer);
        expect(dimmer.length).toBe(1);
        expect(dimmer.props().active).toBe(true);
    });

    it('should render correct components when items are loaded', () => {

        const wrapper = setup();
        const dimmer = wrapper.find(Dimmer);
        expect(dimmer.props().active).toBe(false);
        const header = wrapper.find(Header);
        expect(header.dive().text()).toBe('1 Item Found');
        const itemCard = wrapper.find(ItemCard);
        expect(itemCard.length).toBe(1);
    });

    it('should render correct header with multiple items', () => {

        const props = {
            items: [
                { id: 1, name: 'Test Item 1', type: 'Event', location: 'Kennewick' }, 
                { id: 2, name: 'Test Item 2', type: 'Activity', location: 'Pasco' },
            ],
        }
        const wrapper = setup(props);
        const header = wrapper.find(Header);
        expect(header.dive().text()).toBe('2 Items Found');
    });

    it('should render correct components when error is not null', () => {

        const props = {
            itemsError: 'Uh oh...no bueno',
        };
        const wrapper = setup(props);
        const header = wrapper.find(Header).dive();
        expect(header.text()).toBe('<Icon />' + props.itemsError);
    });

});

describe('componentDidMount', () => {

    it('should call handleTagSearch with the correct params', () => {

        const props = {
            handleTagSearch: jest.fn(),
        };
        const wrapper = setup(props);
        wrapper.instance().componentDidMount();
        expect(props.handleTagSearch.mock.calls.length).toBe(1);
        expect(props.handleTagSearch.mock.calls[0][0]).toBe('test');
    });
});

describe('componentDidUpdate', () => {

    it('should call handleTagSearch if the tag changes', () => {

        const props = {
            handleTagSearch: jest.fn(),
        };
        const wrapper = setup(props);
        const prevProps = {
            match: {
                params: {
                    tag: 'old',
                }
            }
        };
        wrapper.instance().componentDidUpdate(prevProps);
        expect(props.handleTagSearch.mock.calls.length).toBe(1);
        expect(props.handleTagSearch.mock.calls[0][0]).toBe('test');
    });

    it('should not call handleTagSearch if the tag doesnt change', () => {

        const props = {
            handleTagSearch: jest.fn(),
        };
        const wrapper = setup(props);
        const prevProps = {
            match: {
                params: {
                    tag: 'test',
                }
            }
        };
        wrapper.instance().componentDidUpdate(prevProps);
        expect(props.handleTagSearch.mock.calls.length).toBe(0);
    });
});

describe('connect', () => {

    it('should connect to the store with the correct props', () => {

        const initialState = {
            items: {
                getItems: {
                    loading: false,
                    error: 'Uh oh..',
                },
                items: [{ id: 1, name: 'Test Item', type: 'Place', location: 'Richland', }],
            },
        };
        const store = storeFactory(initialState);
        const matchParam = {
            match: {
                params: {
                    tag: 'test',
                }
            }
        }
        const wrapper = mount(<Router history={history}><Provider store={store}><ConnectedTagSearchResults {...matchParam} /></Provider></Router>);
        const componentProps = wrapper.find(TagSearchResults).props();
        expect(componentProps.itemsLoading).toBeDefined();
        expect(componentProps.itemsError).toBeDefined();
        expect(componentProps.items).toBeDefined();
    });
});