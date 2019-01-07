import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Modal, Button, Icon, Container } from 'semantic-ui-react';
import ListForm from './ListForm';
import { handleDeleteList, removeDeleteListError } from '../../actions/lists/deleteList';
import ConfirmDelete from '../universal/ConfirmDelete';

export class ListOptions extends Component {
    state = {
        editMode: false,
    };

    handleOpenEditMode = () => {
        this.setState({ editMode: true });
    }

    handleCloseEditMode = () => {
        this.setState({ editMode: false });
    }

    componentDidUpdate(prevProps) {
        if(prevProps.updateProcessing && !this.props.updateProcessing && !this.props.updateError) {
            this.handleCloseEditMode();
        }
    }

    render() {
        const { editMode } = this.state;
        const { deleteProcessing, deleteError } = this.props;

        return (
            <Container style={{ margin: '10px' }} textAlign='center'>
                <Modal 
                    dimmer='inverted' 
                    size='tiny' 
                    trigger={<Button onClick={this.handleOpenEditMode} icon><Icon name='pencil' /></Button>}
                    open={editMode}
                    onClose={this.handleCloseEditMode}    
                >
                    <Modal.Header>Update List</Modal.Header>
                    <Modal.Content>
                        <ListForm list={this.props.list} />
                    </Modal.Content>
                </Modal>
                <ConfirmDelete
                    entityId={this.props.list.id}
                    entityType='list'
                    handleDelete={this.props.handleDeleteList}
                    removeDeleteError={this.props.removeDeleteListError}
                    deleteProcessing={deleteProcessing}
                    deleteError={deleteError}
                />
            </Container>
        )
    }
}

ListOptions.propTypes = {
    list: PropTypes.object.isRequired,
    updateProcessing: PropTypes.bool.isRequired,
    updateError: PropTypes.string,
    deleteProcessing: PropTypes.bool.isRequired,
    deleteError: PropTypes.string,
    handleDeleteList: PropTypes.func.isRequired,
    removeDeleteListError: PropTypes.func.isRequired,
}

const mapStateToProps = ({ lists }) => {
    return {
        updateProcessing: lists.updateList.processing,
        updateError: lists.updateList.error,
        deleteProcessing: lists.deleteList.processing,
        deleteError: lists.deleteList.error,
    }
}

const mapDispatchToProps = { handleDeleteList, removeDeleteListError };

export default connect(mapStateToProps, mapDispatchToProps)(ListOptions);
