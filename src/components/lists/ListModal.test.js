import React from 'react';
import { shallow } from 'enzyme';
import { Modal } from 'semantic-ui-react';
import ListModal from './ListModal';
import ListForm from './ListForm';

describe('render', () => {

    it('should render a Header and ListForm', () => {

        const wrapper = shallow(<ListModal />);
        const header = wrapper.find(Modal.Header);
        expect(header.length).toBe(1);
        const listForm = wrapper.find(ListForm);
        expect(listForm.length).toBe(1);
    });
});