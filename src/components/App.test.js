import React from 'react';
import { shallow } from 'enzyme';
import { Dimmer, Header } from 'semantic-ui-react';
import { App }  from './App';
import Navbar from './Navbar';
import Routes from './Routes';

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
