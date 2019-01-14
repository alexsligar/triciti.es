import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Button, Icon } from 'semantic-ui-react';
import {
  handleDeleteItem,
  removeDeleteItemError,
} from '../../actions/items/deleteItem';
import ConfirmDelete from '../universal/ConfirmDelete';

export class ItemOptions extends Component {
  render() {
    const { item, deleteProcessing, deleteError } = this.props;
    return (
      <Container style={{ margin: '10px' }} textAlign='center'>
        <Link to={'/items/' + item.id + '/edit'}>
          <Button icon>
            <Icon name='pencil' />
          </Button>
        </Link>
        <ConfirmDelete
          entityId={item.id}
          entityType='item'
          handleDelete={this.props.handleDeleteItem}
          removeDeleteError={this.props.removeDeleteItemError}
          deleteProcessing={deleteProcessing}
          deleteError={deleteError}
        />
      </Container>
    );
  }
}

ItemOptions.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
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
  };
};

const mapDispatchToProps = { handleDeleteItem, removeDeleteItemError };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemOptions);
