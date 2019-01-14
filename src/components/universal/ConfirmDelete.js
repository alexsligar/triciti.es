import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Confirm, Button, Icon } from 'semantic-ui-react';

export default class ConfirmDelete extends Component {
  state = {
    deleteMode: false,
  };

  handleOpenDeleteMode = () => {
    this.setState({ deleteMode: true });
  };

  handleCanceledDelete = () => {
    this.setState({ deleteMode: false });
    if (this.props.deleteError) {
      this.props.removeDeleteError();
    }
  };

  handleConfirmedDelete = () => {
    this.props.handleDelete(this.props.entityId);
  };

  render() {
    const { deleteMode } = this.state;
    const { deleteProcessing, deleteError, entityType } = this.props;

    return (
      <Fragment>
        <Button onClick={this.handleOpenDeleteMode} icon>
          <Icon color='red' name='times circle' />
        </Button>
        <Confirm
          open={deleteMode}
          onCancel={this.handleCanceledDelete}
          onConfirm={this.handleConfirmedDelete}
          confirmButton={
            deleteProcessing ? (
              <Button primary loading>
                Loading
              </Button>
            ) : (
              'Yes'
            )
          }
          cancelButton={deleteProcessing ? null : 'Cancel'}
          content={
            deleteError
              ? 'Error deleting ' + entityType + '. Try again?'
              : 'Are you sure you want to delete this' + entityType + '?'
          }
        />
      </Fragment>
    );
  }
}

ConfirmDelete.propTypes = {
  deleteProcessing: PropTypes.bool.isRequired,
  deleteError: PropTypes.string,
  handleDelete: PropTypes.func.isRequired,
  removeDeleteError: PropTypes.func.isRequired,
  entityId: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired,
  ]),
  entityType: PropTypes.string.isRequired,
};
