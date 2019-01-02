import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Confirm, Button, Icon } from 'semantic-ui-react';
import { handleDeleteItem, removeDeleteItemError } from '../../actions/items/deleteItem';

export class ItemOptions extends Component {
    state = {
        deleteMode: false,
    }

    enterDeleteMode = () => {
        this.setState({ deleteMode: true });
    }

    handleCanceledDelete = () => {
        this.setState({ deleteMode: false });
        if(this.props.deleteError) {
            this.props.removeDeleteItemError();
        }
    }

    handleConfirmedDelete = () => {
        this.props.handleDeleteItem(this.props.item.id);
    }

    render() {
        const { item, deleteProcessing, deleteError, } = this.props;
        const { deleteMode } = this.state;
        return (
            <Fragment>
                <Container style={{ margin: '10px' }} textAlign='center'>
                    <Link to={'/items/' + item.id + '/edit'}>
                        <Button icon>
                            <Icon name='pencil' />
                        </Button>
                    </Link>
                    <Button
                        onClick={this.enterDeleteMode}
                        icon
                    >
                        <Icon color='red' name='times circle' />
                    </Button>
                </Container>
                <Confirm 
                    open={deleteMode}
                    onCancel={this.handleCanceledDelete}
                    onConfirm={this.handleConfirmedDelete}
                    confirmButton={deleteProcessing ? <Button primary loading>Loading</Button> : 'Yes'}
                    cancelButton={deleteProcessing ? null : 'Cancel'}
                    content={deleteError ? 'Error deleting item. Try again?' : 'Are you sure you want to delete this item?'}
                />
            </Fragment>
        );
    }
}

ItemOptions.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.number.isRequired,
    }),
    deleteProcessing: PropTypes.bool.isRequired,
    deleteError: PropTypes.string,
    handleDeleteItem: PropTypes.func.isRequired,
    removeDeleteItemError: PropTypes.func.isRequired,
};

const mapStateToProps = ({ items }) => {
    return {
        deleteProcessing: items.deleteItem.processing,
        deleteError: items.deleteItem.error,
    }
}

const mapDispatchToProps = { handleDeleteItem, removeDeleteItemError };

export default connect(mapStateToProps, mapDispatchToProps)(ItemOptions);
