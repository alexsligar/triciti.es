import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, Segment, Label, Input, Select, Message } from 'semantic-ui-react';
import moment from 'moment';
import { isLength } from 'validator';
import { handleAddItem, removeAddItemError } from '../../actions/items/addItem';
import { handleUpdateItem, removeUpdateItemError } from '../../actions/items/updateItem';
import SelectDates from '../universal/SelectDates';

export class ItemForm extends Component {
    state = {
        fields: this.props.item ? 
            {
                name: this.props.item.name,
                location: this.props.item.location,
                type: this.props.item.type,
                startDate: this.props.item.startDate || undefined,
                endDate: this.props.item.endDate || undefined,
                tags: this.props.item.tags,
            }
        :
            {
                name: '',
                location: '',
                type: '',
                startDate: undefined,
                endDate: undefined,
                tags: [],
            },
        fieldErrors: {},
        formErrors: false,
    };

    validations = {
        'name': val => {
            if (!val) return 'Name is required';
            if (!isLength(val, {min:4, max:60})) return 'Name must be between 4 and 60 characters';
        },
        'location': val => {
            if (!val) return 'Location is required';
            if (!isLength(val, {min:10, max:60})) return 'Location must be between 10 and 60 characters';
        },
        'type': val => {
            if(!val) return 'Type is required';
        },
        'startDate': (val, endDate = this.state.fields.endDate) => {
            if(this.state.fields.type === 'event' && !val) return 'Start date is required';
            if(val && val <= moment()) return 'Start date must be in the future';
            if(endDate && val > endDate) return 'End date must be after start date';
        },
        'endDate': (val, startDate = this.state.fields.startDate) => {
            if(val && startDate >= val) return 'End date must be after start date';
        },
        'tags': () => null,
    }

    computeNextState = (name, value) => {
        const fields = Object.assign({}, this.state.fields);
        const fieldErrors = Object.assign({}, this.state.fieldErrors);
        fields[name] = value;
        fieldErrors[name] = this.validations[name](value);

        const errors = Object.keys(fieldErrors).filter((k) => fieldErrors[k])
        const formErrors = errors.length ? true : false;
        return {fields, fieldErrors, formErrors};
    };

    handleInputChange = (e) => {
        const { value, name } = e.target;
        const { fields, fieldErrors, formErrors } = this.computeNextState(name, value);
        this.setState({fields, fieldErrors, formErrors});
    };

    handleSelectChange = (e, { name, value }) => {
        const { fields, fieldErrors, formErrors } = this.computeNextState(name, value);
        //reset the date fields if not an event
        if (name === 'type' && value !== 'event') {
            fields['startDate'] = undefined;
            fields['endDate'] = undefined;
            fieldErrors['startDate'] = undefined;
            fieldErrors['endDate'] = undefined;
        }
        this.setState({fields, fieldErrors, formErrors});
    };

    handleStartDateChange = (value) => {
        const fields = Object.assign({}, this.state.fields);
        const fieldErrors = Object.assign({}, this.state.fieldErrors);
        fields['startDate'] = value;
        fieldErrors['startDate'] = this.validations['startDate'](value, fields.endDate);
        //revalidate the endDate field as it is dependent on startDate
        fieldErrors['endDate'] = this.validations['endDate'](fields.endDate, value);

        const errors = Object.keys(fieldErrors).filter((k) => fieldErrors[k])
        const formErrors = errors.length ? true : false;
        this.setState({fields, fieldErrors, formErrors });
    }

    handleEndDateChange = (value) => {
        const fields = Object.assign({}, this.state.fields);
        const fieldErrors = Object.assign({}, this.state.fieldErrors);
        fields['endDate'] = value;
        fieldErrors['endDate'] = this.validations['endDate'](value, fields.startDate);
        //need to pass null instead of undefined so default params dont set in
        let passedValue = value;
        if (!passedValue) passedValue = null;
        //revalidate the startDate field as it is dependent on 
        fieldErrors['startDate'] = this.validations['startDate'](fields.startDate, passedValue);

        const errors = Object.keys(fieldErrors).filter((k) => fieldErrors[k])
        const formErrors = errors.length ? true : false;
        this.setState({fields, fieldErrors, formErrors });
    }

    validate = () => {
        const { fields } = this.state;
        const keys = Object.keys(fields);
        for (var i = 0; i < keys.length; i++) {
            if (this.validations[keys[i]](fields[keys[i]])) return true;
        }
        return false;
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.validate()) return;
        if (this.props.item) {
            this.props.handleUpdateItem(this.props.item.id, this.state.fields);
        } else {
            this.props.handleAddItem(this.state.fields);
        }
    }

    render() {
        const {
            name,
            location,
            type,
            startDate,
            endDate,
            tags,
        } = this.state.fields;

        const {
            fieldErrors,
        } = this.state;

        const eventOptions = [
            { key: 'e', text: 'Event', value: 'event' },
            { key: 'a', text: 'Activity', value: 'activity' },
            { key: 'g', text: 'Group', value: 'group' },
            { key: 'p', text: 'Place', value: 'place' },
        ];

        const tagsOptions = this.props.tags.map(tag => {
            return { key: tag.title, text: tag.title, value: tag.title }
        });

        const { 
            addItemProcessing, 
            addItemError, 
            updateItemProcessing, 
            updateItemError, 
            tagsLoading,
            tagsError 
        } = this.props;

        const errorMessage = (tagsError || addItemError || updateItemError);

        return (
            <Form 
                loading={addItemProcessing || updateItemProcessing || tagsLoading} 
                onSubmit={this.handleSubmit}
                error={typeof errorMessage !== undefined}
            >
                {errorMessage &&
                    (<Message
                        error
                        content={errorMessage}
                    />)
                }
                <Segment textAlign='left'>
                    <Form.Field error={!typeof(fieldErrors.name) === undefined}>
                        <label>Name</label>
                        <Input
                            placeholder='Name'
                            value={name}
                            name='name'
                            onChange={this.handleInputChange}
                        /> 
                        {
                            fieldErrors.name &&
                                (
                                    <Label basic color='red' pointing>
                                        {fieldErrors.name}
                                    </Label>
                                )
                        }
                    </Form.Field>
                    <Form.Field error={!typeof(fieldErrors.location) === undefined}>   
                        <label>Location</label>
                        <Input
                            placeholder='Location'
                            value={location}
                            name='location'
                            onChange={this.handleInputChange}
                            
                        /> 
                        {
                            fieldErrors.location &&
                                (
                                    <Label basic color='red' pointing>
                                        {fieldErrors.location}
                                    </Label>
                                )
                        }
                    </Form.Field>
                    <Form.Field error={!typeof(fieldErrors.type) === undefined}>
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
                        {
                            fieldErrors.type &&
                                (
                                    <Label basic color='red' pointing>
                                        {fieldErrors.type}
                                    </Label>
                                )
                        }
                    </Form.Field>
                    {type === 'event' &&
                        <Form.Field>
                            <label>Dates</label>
                            <SelectDates
                                handleStartDateChange={this.handleStartDateChange}
                                handleEndDateChange={this.handleEndDateChange}
                                startDate={startDate}
                                endDate={endDate}
                                startDateError={fieldErrors.startDate}
                                endDateError={fieldErrors.endDate}
                            />
                        </Form.Field>
                    }
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
                    
                    <Form.Button
                        fluid
                        disabled={this.validate()}
                    >
                        Submit
                    </Form.Button>
                </Segment>
            </Form>
        )
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
        id: PropTypes.number,
        name: PropTypes.string,
        location: PropTypes.string,
        type: PropTypes.string,
        startDate: PropTypes.string,
        endDate: PropTypes.string,
        tags: PropTypes.array,
    }),
}

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

const mapDispatchToProps = { handleAddItem, removeAddItemError, handleUpdateItem, removeUpdateItemError, };

export default connect(mapStateToProps, mapDispatchToProps)(ItemForm);