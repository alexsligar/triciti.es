import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { List, Checkbox, Icon } from 'semantic-ui-react';
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
    const { name, listId, listItemExists } = this.props;

    return (
      <List.Item>
        <List.Content>
          <Checkbox
            toggle
            label={name}
            checked={listItemExists}
            onChange={this.handleToggleListItem}
          />
          <span> </span>
          <Link to={'/lists/' + listId}>
            <Icon name='eye' />
          </Link>
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
