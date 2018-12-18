import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { Dimmer, Header } from 'semantic-ui-react';
import ConnectedApp, { App }  from './App';
import Navbar from './Navbar';
import Routes from './Routes';
import { storeFactory } from '../../test/testUtils';

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

    it('should render a Dimmer if loading is true', () => {

        const wrapper = setup();
        const dimmer = wrapper.find(Dimmer);
        expect(dimmer.length).toBe(1);
    });

    it('should render correct components when loading is false and error is null', () => {

        const props = {
            loading: false,
            error: null,
            handleInitialData: () => {},
        }
        const wrapper = setup(props);
        const navbar = wrapper.find(Navbar);
        expect(navbar.length).toBe(1);
        const routes = wrapper.find(Routes);
        expect(routes.length).toBe(1);
        const dimmer = wrapper.find(Dimmer);
        expect(dimmer.length).toBe(0);
    });

    it('should render correct components when error is not null and loading is false', () => {

        const error = 'Uh oh...something went wrong. Please reload.';
        const props = {
            loading: false,
            error,
            handleInitialData: () => {},
        }
        const wrapper = setup(props);
        const navbar = wrapper.find(Navbar);
        expect(navbar.length).toBe(0);
        const dimmer = wrapper.find(Dimmer);
        expect(dimmer.length).toBe(1);
        const header = wrapper.find(Header);
        expect(header.dive().text()).toBe('<Icon />' + error);
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

describe('connect', () => {

    it('should connect to the store with the correct props', () => {

        const initialState = {
            initialData: {
                loading: false,
                error: 'Uh oh..',
            },
        };
        const store = storeFactory(initialState);
        const wrapper = mount(<Provider store={store}><ConnectedApp /></Provider>);
        const componentProps = wrapper.find(App).props();
        expect(componentProps.loading).toBeDefined();
        expect(componentProps.error).toBeDefined();
        expect(componentProps.handleInitialData).toBeInstanceOf(Function);
    });
});