import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isLength } from 'validator';
import { Form, Message, TextArea, Label, Input } from 'semantic-ui-react';
import { handleAddList, removeAddListError } from '../../actions/lists/addList';
import {
  handleUpdateList,
  removeUpdateListError,
} from '../../actions/lists/updateList';

export class ListForm extends Component {
  state = {
    fields: this.props.list
      ? {
          name: this.props.list.name,
          description: this.props.list.description,
        }
      : {
          name: '',
          description: '',
        },
    fieldErrors: {},
    formErrors: false,
  };

  handleInputChange = e => {
    const { name, value } = e.target;
    const fields = Object.assign({}, this.state.fields);
    const fieldErrors = Object.assign({}, this.state.fieldErrors);
    fields[name] = value;
    fieldErrors[name] = this.validations[name](value);
    const errors = Object.keys(fieldErrors).filter(k => fieldErrors[k]);
    const formErrors = errors.length ? true : false;
    this.setState({ fields, fieldErrors, formErrors });

    if (this.props.addListError) {
      this.props.removeAddListError();
    } else if (this.props.updateListError) {
      this.props.removeUpdateListError();
    }
  };

  validations = {
    name: val => {
      if (!val) return 'Name is required';
      if (!isLength(val, { min: 4, max: 60 }))
        return 'Name must be between 4 and 60 characters';
    },
    description: val => {
      if (!val) return 'Description is required';
      if (!isLength(val, { min: 10, max: 250 }))
        return 'Description must be between 10 and 250 characters';
    },
  };

  validate = () => {
    const { fields } = this.state;
    const keys = Object.keys(fields);
    for (var i = 0; i < keys.length; i++) {
      if (this.validations[keys[i]](fields[keys[i]])) return true;
    }
    return false;
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.validate()) return;
    const { fields } = this.state;
    if (this.props.list) {
      this.props.handleUpdateList(this.props.list.id, fields);
    } else {
      this.props.handleAddList(fields);
    }
  };

  render() {
    const {
      addListProcessing,
      addListError,
      updateListProcessing,
      updateListError,
    } = this.props;
    const { name, description } = this.state.fields;
    const { formErrors, fieldErrors } = this.state;

    const errorMessage = addListError || updateListError;

    return (
      <Form
        loading={addListProcessing || updateListProcessing}
        error={errorMessage !== null || formErrors}
        onSubmit={this.handleSubmit}
      >
        {errorMessage && <Message error content={errorMessage} />}
        <Form.Field error={fieldErrors.name !== undefined}>
          <label>Name</label>
          <Input
            placeholder='Name'
            value={name}
            name='name'
            onChange={this.handleInputChange}
          />
          {fieldErrors.name && (
            <Label basic color='red' pointing>
              {fieldErrors.name}
            </Label>
          )}
        </Form.Field>
        <Form.Field error={fieldErrors.description !== undefined}>
          <label>Description</label>
          <TextArea
            placeholder='Description'
            value={description}
            name='description'
            onChange={this.handleInputChange}
          />
          {fieldErrors.description && (
            <Label basic color='red' pointing>
              {fieldErrors.description}
            </Label>
          )}
        </Form.Field>
        <Form.Button fluid disabled={this.validate()}>
          Submit
        </Form.Button>
      </Form>
    );
  }
}

ListForm.propTypes = {
  addListProcessing: PropTypes.bool.isRequired,
  addListError: PropTypes.string,
  handleAddList: PropTypes.func.isRequired,
  removeAddListError: PropTypes.func.isRequired,
  updateListProcessing: PropTypes.bool.isRequired,
  updateListError: PropTypes.string,
  handleUpdateList: PropTypes.func.isRequired,
  removeUpdateListError: PropTypes.func.isRequired,
  list: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
  }),
};

const mapStateToProps = ({ lists }) => {
  return {
    addListProcessing: lists.addList.processing,
    addListError: lists.addList.error,
    updateListProcessing: lists.updateList.processing,
    updateListError: lists.updateList.error,
  };
};

const mapDispatchToProps = {
  handleAddList,
  removeAddListError,
  handleUpdateList,
  removeUpdateListError,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListForm);
