import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { List, Checkbox } from 'semantic-ui-react';
import {
  handleAddListItem,
  handleRemoveListItem,
} from '../../actions/listItems/toggleListItem';

export class ToggleListItem extends Component {
  handleToggleListItem = () => {
    const {
      listId,
      itemId,
      listItemExists,
      handleAddListItem,
      handleRemoveListItem,
    } = this.props;
    if (listItemExists) {
      handleRemoveListItem(listId, itemId);
    } else {
      handleAddListItem(listId, itemId);
    }
  };

  render() {
    const { name, listItemExists } = this.props;

    return (
      <List.Item>
        <List.Content>
          <Checkbox
            toggle
            label={name}
            checked={listItemExists}
            onChange={this.handleToggleListItem}
          />
        </List.Content>
      </List.Item>
    );
  }
}

ToggleListItem.propTypes = {
  name: PropTypes.string.isRequired,
  listId: PropTypes.string.isRequired,
  itemId: PropTypes.string.isRequired,
  listItemExists: PropTypes.bool.isRequired,
  handleAddListItem: PropTypes.func.isRequired,
  handleRemoveListItem: PropTypes.func.isRequired,
};

const mapDispatchToProps = { handleAddListItem, handleRemoveListItem };

export default connect(
  null,
  mapDispatchToProps
)(ToggleListItem);
