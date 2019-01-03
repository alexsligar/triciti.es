import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Modal, Icon } from 'semantic-ui-react';
import ListForm from './ListForm';

export class ListModal extends Component {
    state = {
        open: false,
    }
    
    handleOpen = () => {
        this.setState({ open: true });
    }

    handleClose = () => {
        this.setState({ open: false });
    }

    componentDidUpdate(prevProps) {
        if(prevProps.location.pathname !== this.props.location.pathname) {
            this.handleClose();
        }
    }

    render() {
        return (
            <Modal 
                dimmer='inverted' 
                size='tiny' 
                trigger={<Icon onClick={this.handleOpen} name='list' className='asLink' />}
                open={this.state.open}
                onClose={this.handleClose}    
            >
                <Modal.Header>Make a list</Modal.Header>
                <Modal.Content>
                    <ListForm />
                </Modal.Content>
            </Modal>
        );
    }
}

ListModal.propTypes = {
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
    })
}

export default withRouter(ListModal)
