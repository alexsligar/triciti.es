import React from 'react';
import { Modal, Icon } from 'semantic-ui-react';
import ListForm from './ListForm';

export default function ListModal() {
    return (
        <Modal dimmer='inverted' size='tiny' trigger={<Icon name='list' className='asLink' />}>
            <Modal.Header>Make a list</Modal.Header>
            <Modal.Content>
                <ListForm />
            </Modal.Content>
        </Modal>
    )
}