import React from 'react';
import { shallow } from 'enzyme';
import { Modal } from 'semantic-ui-react';
import { ListModal } from './ListModal';
import ListForm from './ListForm';

const defaultProps = {
    location: {
        pathname: '/',
    }
}
const setup = (props = {}) => {
    const propsPassed = { ...defaultProps, ...props };
    return shallow(<ListModal {...propsPassed} />);
}

describe('render', () => {

    it('should render a Header and ListForm', () => {

        const wrapper = setup();
        const header = wrapper.find(Modal.Header);
        expect(header.length).toBe(1);
        const listForm = wrapper.find(ListForm);
        expect(listForm.length).toBe(1);
    });
});

describe('handleOpen', () => {

    it('should set state open to true', () => {

        const wrapper = setup();
        wrapper.instance().handleOpen();
        expect(wrapper.state().open).toBe(true);
    });
});

describe('handleClose', () => {

    it('should set state open to false', () => {

        const wrapper = setup();
        wrapper.setState({ open: true });
        wrapper.instance().handleClose();
        expect(wrapper.state().open).toBe(false);
    });
});

describe('componentDidUpdate', () =>{

    it('should set state open to false if path changes', () => {
        
        const wrapper = setup();
        wrapper.setState({ open: true });
        wrapper.instance().componentDidUpdate({ location: { pathname: '/items/abcd' } });
        expect(wrapper.state().open).toBe(false);
    });

    it('should not change state if path doesnt change', () => {

        const wrapper = setup();
        wrapper.setState({ open: true });
        wrapper.instance().componentDidUpdate({ location: { pathname: '/' } });
        expect(wrapper.state().open).toBe(true);
    });
});
