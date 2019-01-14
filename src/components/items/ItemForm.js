import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Form,
  Segment,
  Label,
  Input,
  Select,
  Message,
} from 'semantic-ui-react';
import moment from 'moment';
import { isLength } from 'validator';
import { handleAddItem, removeAddItemError } from '../../actions/items/addItem';
import {
  handleUpdateItem,
  removeUpdateItemError,
} from '../../actions/items/updateItem';
import SelectDates from '../universal/SelectDates';

export class ItemForm extends Component {
  state = {
    fields: this.props.item
      ? {
          name: this.props.item.name,
          location: this.props.item.location,
          type: this.props.item.type,
          start_date: this.props.item.start_date || undefined,
          end_date: this.props.item.end_date || undefined,
          tags: this.props.item.tags,
        }
      : {
          name: '',
          location: '',
          type: '',
          start_date: undefined,
          end_date: undefined,
          tags: [],
        },
    fieldErrors: {},
    formErrors: false,
  };

  validations = {
    name: val => {
      if (!val) return 'Name is required';
      if (!isLength(val, { min: 4, max: 60 }))
        return 'Name must be between 4 and 60 characters';
    },
    location: val => {
      if (!val) return 'Location is required';
      if (!isLength(val, { min: 10, max: 60 }))
        return 'Location must be between 10 and 60 characters';
    },
    type: val => {
      if (!val) return 'Type is required';
    },
    start_date: (val, end_date = this.state.fields.end_date) => {
      if (this.state.fields.type === 'event' && !val)
        return 'Start date is required';
      if (val && val <= moment()) return 'Start date must be in the future';
      if (end_date && val > end_date)
        return 'End date must be after start date';
    },
    end_date: (val, start_date = this.state.fields.start_date) => {
      if (val && start_date >= val) return 'End date must be after start date';
    },
    tags: () => null,
  };

  computeNextState = (name, value) => {
    const fields = Object.assign({}, this.state.fields);
    const fieldErrors = Object.assign({}, this.state.fieldErrors);
    fields[name] = value;
    fieldErrors[name] = this.validations[name](value);

    const errors = Object.keys(fieldErrors).filter(k => fieldErrors[k]);
    const formErrors = errors.length ? true : false;
    return { fields, fieldErrors, formErrors };
  };

  handleInputChange = e => {
    const { value, name } = e.target;
    const { fields, fieldErrors, formErrors } = this.computeNextState(
      name,
      value
    );
    this.setState({ fields, fieldErrors, formErrors });
    this.removeReduxErrors();
  };

  handleSelectChange = (e, { name, value }) => {
    const { fields, fieldErrors, formErrors } = this.computeNextState(
      name,
      value
    );
    //reset the date fields if not an event
    if (name === 'type' && value !== 'event') {
      fields['start_date'] = undefined;
      fields['end_date'] = undefined;
      fieldErrors['start_date'] = undefined;
      fieldErrors['end_date'] = undefined;
    }
    this.setState({ fields, fieldErrors, formErrors });
    this.removeReduxErrors();
  };

  handleStartDateChange = value => {
    const fields = Object.assign({}, this.state.fields);
    const fieldErrors = Object.assign({}, this.state.fieldErrors);
    fields['start_date'] = value;
    fieldErrors['start_date'] = this.validations['start_date'](
      value,
      fields.end_date
    );
    //revalidate the end_date field as it is dependent on start_date
    fieldErrors['end_date'] = this.validations['end_date'](
      fields.end_date,
      value
    );

    const errors = Object.keys(fieldErrors).filter(k => fieldErrors[k]);
    const formErrors = errors.length ? true : false;
    this.setState({ fields, fieldErrors, formErrors });
    this.removeReduxErrors();
  };

  handleEndDateChange = value => {
    const fields = Object.assign({}, this.state.fields);
    const fieldErrors = Object.assign({}, this.state.fieldErrors);
    fields['end_date'] = value;
    fieldErrors['end_date'] = this.validations['end_date'](
      value,
      fields.start_date
    );
    //need to pass null instead of undefined so default params dont set in
    let passedValue = value;
    if (!passedValue) passedValue = null;
    //revalidate the start_date field as it is dependent on
    fieldErrors['start_date'] = this.validations['start_date'](
      fields.start_date,
      passedValue
    );

    const errors = Object.keys(fieldErrors).filter(k => fieldErrors[k]);
    const formErrors = errors.length ? true : false;
    this.setState({ fields, fieldErrors, formErrors });
    this.removeReduxErrors();
  };

  removeReduxErrors = () => {
    if (this.props.addItemError) {
      this.props.removeAddItemError();
    } else if (this.props.updateItemError) {
      this.props.removeUpdateItemError();
    }
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
    if (this.props.item) {
      this.props.handleUpdateItem(this.props.item.id, this.state.fields);
    } else {
      this.props.handleAddItem(this.state.fields);
    }
  };

  render() {
    const {
      name,
      location,
      type,
      start_date,
      end_date,
      tags,
    } = this.state.fields;

    const { fieldErrors } = this.state;

    const eventOptions = [
      { key: 'e', text: 'Event', value: 'event' },
      { key: 'a', text: 'Activity', value: 'activity' },
      { key: 'g', text: 'Group', value: 'group' },
      { key: 'p', text: 'Place', value: 'place' },
    ];

    const tagsOptions = this.props.tags.map(tag => {
      return { key: tag.title, text: tag.title, value: tag.title };
    });

    const {
      addItemProcessing,
      addItemError,
      updateItemProcessing,
      updateItemError,
      tagsLoading,
      tagsError,
    } = this.props;

    const errorMessage = tagsError || addItemError || updateItemError;

    return (
      <Form
        loading={addItemProcessing || updateItemProcessing || tagsLoading}
        onSubmit={this.handleSubmit}
        error={errorMessage !== null}
      >
        {errorMessage && <Message error content={errorMessage} />}
        <Segment textAlign='left'>
          <Form.Field error={typeof fieldErrors.name !== undefined}>
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
          <Form.Field error={typeof fieldErrors.location !== undefined}>
            <label>Location</label>
            <Input
              placeholder='Location'
              value={location}
              name='location'
              onChange={this.handleInputChange}
            />
            {fieldErrors.location && (
              <Label basic color='red' pointing>
                {fieldErrors.location}
              </Label>
            )}
          </Form.Field>
          <Form.Field error={typeof fieldErrors.type !== undefined}>
            <label>Type</label>
            <Select
              fluid
              selection
              placeholder='Type'
              value={type}
              name='type'
              onChange={this.handleSelectChange}
              options={eventOptions}
            />
            {fieldErrors.type && (
              <Label basic color='red' pointing>
                {fieldErrors.type}
              </Label>
            )}
          </Form.Field>
          {type === 'event' && (
            <Form.Field>
              <label>Dates</label>
              <SelectDates
                handleStartDateChange={this.handleStartDateChange}
                handleEndDateChange={this.handleEndDateChange}
                start_date={start_date}
                end_date={end_date}
                start_date_error={fieldErrors.start_date}
                end_date_error={fieldErrors.end_date}
              />
            </Form.Field>
          )}
          <Form.Field>
            <label>Tags</label>
            <Select
              placeholder='Tags'
              name='tags'
              value={tags}
              fluid
              multiple
              search
              selection
              clearable
              options={tagsOptions}
              onChange={this.handleSelectChange}
            />
          </Form.Field>

          <Form.Button fluid disabled={this.validate()}>
            Submit
          </Form.Button>
        </Segment>
      </Form>
    );
  }
}

ItemForm.propTypes = {
  addItemProcessing: PropTypes.bool.isRequired,
  addItemError: PropTypes.string,
  updateItemProcessing: PropTypes.bool.isRequired,
  updateItemError: PropTypes.string,
  handleAddItem: PropTypes.func.isRequired,
  removeAddItemError: PropTypes.func.isRequired,
  handleUpdateItem: PropTypes.func.isRequired,
  removeUpdateItemError: PropTypes.func.isRequired,
  tagsLoading: PropTypes.bool.isRequired,
  tagsError: PropTypes.string,
  tags: PropTypes.array.isRequired,
  item: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    location: PropTypes.string,
    type: PropTypes.string,
    start_date: PropTypes.string,
    end_date: PropTypes.string,
    tags: PropTypes.array,
  }),
};

const mapStateToProps = ({ items, tags }) => {
  return {
    addItemError: items.addItem.error,
    addItemProcessing: items.addItem.processing,
    updateItemError: items.updateItem.error,
    updateItemProcessing: items.updateItem.processing,
    tagsLoading: tags.getTags.loading,
    tagsError: tags.getTags.error,
    tags: tags.tags,
  };
};

const mapDispatchToProps = {
  handleAddItem,
  removeAddItemError,
  handleUpdateItem,
  removeUpdateItemError,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemForm);
