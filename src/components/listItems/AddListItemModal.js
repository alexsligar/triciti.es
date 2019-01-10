import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Modal, Button, Icon, List, Message } from 'semantic-ui-react';
import ToggleListItem from './ToggleListItem';

export class AddListItemModal extends Component {
    render() {
        const { userLists, itemId, toggleListItemError } = this.props;
        return (
            <Modal
                trigger={<Button icon><Icon name='plus' /> Add to a List</Button>}
                size='tiny'
            >
                <Modal.Header>Add Item to a List</Modal.Header>
                {toggleListItemError &&
                    (
                        <Modal.Content>
                            <Message
                                error
                                content={toggleListItemError}
                            />
                        </Modal.Content>
                    )
                }
                <Modal.Content scrolling>
                    <List divided>
                        {userLists.map((list) => {
                            return (
                                <ToggleListItem
                                    key={list.id}
                                    name={list.name}
                                    itemId={itemId}
                                    listId={list.id}
                                    listItemExists={list.items.includes(itemId)}
                                />
                            );
                        })}
                    </List>
                </Modal.Content>
            </Modal>
        )
    }
}

AddListItemModal.propTypes = {
    userLists: PropTypes.array.isRequired,
    itemId: PropTypes.number.isRequired,
    toggleListItemError: PropTypes.string,
}

const mapStateToProps = ({ users, listItems }) => {
    return {
        userLists: users.userLists.lists,
        toggleListItemError: listItems.toggleListItem.error,
    }
};

export default connect(mapStateToProps)(AddListItemModal);
