import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Modal, Button, List, Message } from 'semantic-ui-react';
import ToggleListItem from './ToggleListItem';

export class AddListItemModal extends Component {
  render() {
    const { userLists, item, toggleListItemError } = this.props;
    return (
      <Modal
        trigger={
          <Button
            color='blue'
            content='Add to List'
            icon='plus'
            label={{
              basic: true,
              color: 'blue',
              pointing: 'left',
              content: item.list_number,
            }}
          />
        }
        size='tiny'
      >
        <Modal.Header>Add Item to a List</Modal.Header>
        {toggleListItemError && (
          <Modal.Content>
            <Message error content={toggleListItemError} />
          </Modal.Content>
        )}
        <Modal.Content scrolling>
          <List divided>
            {userLists.map(list => {
              return (
                <ToggleListItem
                  key={list.id}
                  name={list.name}
                  itemId={item.id}
                  listId={list.id}
                  listItemExists={list.items.includes(item.id)}
                />
              );
            })}
          </List>
        </Modal.Content>
      </Modal>
    );
  }
}

AddListItemModal.propTypes = {
  userLists: PropTypes.array.isRequired,
  item: PropTypes.object.isRequired,
  toggleListItemError: PropTypes.string,
};

const mapStateToProps = ({ users, listItems }) => {
  return {
    userLists: users.userLists.lists,
    toggleListItemError: listItems.toggleListItem.error,
  };
};

export default connect(mapStateToProps)(AddListItemModal);
