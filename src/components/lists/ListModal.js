import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Modal, Icon } from 'semantic-ui-react';
import ListForm from './ListForm';
import {
  showNewListModal,
  closeNewListModal,
} from '../../actions/lists/addList';

export class ListModal extends Component {
  render() {
    return (
      <Modal
        dimmer='inverted'
        size='tiny'
        trigger={
          <Icon
            onClick={this.props.showNewListModal}
            name='list'
            className='asLink'
          />
        }
        open={this.props.showModal}
        onClose={this.props.closeNewListModal}
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
  showModal: PropTypes.bool.isRequired,
  showNewListModal: PropTypes.func.isRequired,
  closeNewListModal: PropTypes.func.isRequired,
};

const mapStateToProps = ({ lists }) => {
  return {
    showModal: lists.addList.showModal,
  };
};

const mapDispatchToProps = { showNewListModal, closeNewListModal };

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ListModal)
);
