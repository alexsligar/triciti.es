import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { Label, Icon, Input, Confirm, Button } from 'semantic-ui-react';
import {
  handleUpdateTag,
  removeUpdateTagError,
} from '../../actions/tags/updateTag';
import {
  handleDeleteTag,
  removeDeleteTagError,
} from '../../actions/tags/deleteTag';

export class UpdateTag extends Component {
  state = {
    editMode: false,
    deleteMode: false,
    value: this.props.title,
    tagExists: false,
  };

  handleInputChange = e => {
    this.setState({ value: e.target.value });
    if (this.props.updateError) {
      this.props.removeUpdateTagError();
    }
    if (
      _.some(this.props.tags, { title: e.target.value }) &&
      e.target.value !== this.props.title
    ) {
      this.setState({ tagExists: true });
    } else if (this.state.tagExists) {
      this.setState({ tagExists: false });
    }
  };

  enterEditMode = () => {
    this.setState({ editMode: true });
  };

  cancelEditMode = () => {
    this.setState({
      editMode: false,
      value: this.props.title,
      tagExists: false,
    });
  };

  handleCheckClick = () => {
    if (this.state.value === this.props.title) {
      this.setState({ editMode: false });
    } else if (this.state.tagExists) {
      return;
    } else {
      this.props.handleUpdateTag(this.props.title, this.state.value);
    }
  };

  handleTimesClick = () => {
    this.setState({ deleteMode: true });
  };

  handleCanceledDelete = () => {
    this.setState({ deleteMode: false });
    this.props.removeDeleteTagError();
  };

  handleConfirmedDelete = () => {
    this.props.handleDeleteTag(this.props.title);
  };

  componentDidUpdate(prevProps) {
    if (prevProps.title !== this.props.title) {
      this.setState({ editMode: false });
    }
  }

  render() {
    const { editMode, deleteMode, value, tagExists } = this.state;
    const {
      title,
      updateProcessing,
      updateError,
      deleteProcessing,
      deleteError,
    } = this.props;

    let inputAction = (
      <Button.Group>
        <Button onClick={this.cancelEditMode} icon>
          <Icon name='times' color='red' />
        </Button>
        <Button.Or />
        <Button onClick={this.handleCheckClick} icon>
          <Icon name='check' color='green' />
        </Button>
      </Button.Group>
    );
    if (updateProcessing) {
      inputAction = <Button loading>Loading</Button>;
    }

    let errorLabel = null;
    if (tagExists) {
      errorLabel = (
        <Label pointing='right' color='red' basic>
          Tag already exists
        </Label>
      );
    } else if (updateError) {
      errorLabel = (
        <Label pointing='right' color='red' basic>
          Error saving. Try again.
        </Label>
      );
    }

    return (
      <Fragment>
        {editMode ? (
          <Label size='small'>
            {errorLabel}
            <Input value={value} onChange={this.handleInputChange}>
              <input />
              {inputAction}
            </Input>
          </Label>
        ) : (
          <Label tag size='big'>
            <Icon name='pencil' onClick={this.enterEditMode} />
            <Icon name='times' color='red' onClick={this.handleTimesClick} />
            <Link to={'/tags/' + title}>{title}</Link>
          </Label>
        )}
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
              ? 'Error deleting tag. Try again?'
              : 'Are you sure you want to delete this tag?'
          }
        />
      </Fragment>
    );
  }
}

UpdateTag.propTypes = {
  updateProcessing: PropTypes.bool.isRequired,
  updateError: PropTypes.string,
  deleteProcessing: PropTypes.bool.isRequired,
  deleteError: PropTypes.string,
  tags: PropTypes.array.isRequired,
  handleUpdateTag: PropTypes.func.isRequired,
  removeUpdateTagError: PropTypes.func.isRequired,
  handleDeleteTag: PropTypes.func.isRequired,
  removeDeleteTagError: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

const mapStateToProps = ({ tags }) => {
  return {
    updateProcessing: tags.updateTag.processing,
    updateError: tags.updateTag.error,
    deleteProcessing: tags.deleteTag.processing,
    deleteError: tags.deleteTag.error,
    tags: tags.tags,
  };
};

const mapDispatchToProps = {
  handleUpdateTag,
  removeUpdateTagError,
  handleDeleteTag,
  removeDeleteTagError,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateTag);
