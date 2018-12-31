import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, Segment, Label, Button, Icon, Container, Input, Select, Message } from 'semantic-ui-react';
import DateTimePicker from 'react-semantic-datetime';
import moment from 'moment';
import { isLength } from 'validator';
import { handleAddItem, removeAddItemError } from '../../actions/items/addItem';

moment.locale('en');

export class ItemForm extends Component {
    state = {
        fields: {
            name: '',
            location: '',
            type: '',
            start_date: undefined,
            end_date: undefined,
            tags: [],
        },
        fieldErrors: {},
        formErrors: false,
        editStartDate: false,
        editEndDate: false,
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
        'start_date': (val, end_date = this.state.fields.end_date) => {
            if(this.state.fields.type === 'event' && !val) return 'Start date is required';
            if(val && val <= moment()) return 'Start date must be in the future';
            if(end_date && val > end_date) return 'End date must be after start date';
        },
        'end_date': (val, start_date = this.state.fields.start_date) => {
            if(val && start_date >= val) return 'End date must be after start date';
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
            fields['start_date'] = undefined;
            fields['end_date'] = undefined;
            fieldErrors['start_date'] = undefined;
            fieldErrors['end_date'] = undefined;
        }
        this.setState({fields, fieldErrors, formErrors});
    };

    handleStartDateChange = (value) => {
        const fields = Object.assign({}, this.state.fields);
        const fieldErrors = Object.assign({}, this.state.fieldErrors);
        fields['start_date'] = value;
        fieldErrors['start_date'] = this.validations['start_date'](value, fields.end_date);
        //revalidate the end_date field as it is dependent on start_date
        fieldErrors['end_date'] = this.validations['end_date'](fields.end_date, value);

        const errors = Object.keys(fieldErrors).filter((k) => fieldErrors[k])
        const formErrors = errors.length ? true : false;
        this.setState({fields, fieldErrors, formErrors, editStartDate: false });
    }

    handleEndDateChange = (value) => {
        const fields = Object.assign({}, this.state.fields);
        const fieldErrors = Object.assign({}, this.state.fieldErrors);
        fields['end_date'] = value;
        fieldErrors['end_date'] = this.validations['end_date'](value, fields.start_date);
        //revalidate the start_date field as it is dependent on end_date
        fieldErrors['start_date'] = this.validations['start_date'](fields.start_date, value);

        const errors = Object.keys(fieldErrors).filter((k) => fieldErrors[k])
        const formErrors = errors.length ? true : false;
        this.setState({fields, fieldErrors, formErrors, editEndDate: false });
    }

    openStartDate = (e) => {
        e.preventDefault();
        this.setState({ editStartDate: true });
    }

    openEndDate = (e) => {
        e.preventDefault();
        this.setState({ editEndDate: true });
    }

    closeStartDate = (e) => {
        e.preventDefault();
        this.setState({ editStartDate: false });
    }

    closeEndDate = (e) => {
        e.preventDefault();
        this.setState({ editEndDate: false });
    }

    clearStartDate = (e) => {
        //use stopPropagation to ensure the button doesn't trigger the parent button
        e.stopPropagation();
        this.handleStartDateChange(undefined);
    }

    clearEndDate = (e) => {
        //use stopPropagation to ensure the button doesn't trigger the parent button
        e.stopPropagation();
        this.handleEndDateChange(undefined);
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
        this.props.handleAddItem(this.state.fields);
    }

    render() {
        const {
            name,
            location,
            type,
            start_date,
            end_date,
            tags,
        } = this.state.fields;

        const {
            fieldErrors,
            editStartDate,
            editEndDate,
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

        let dates_error_label;
        if(fieldErrors.start_date) {
            dates_error_label = (
                <Label basic pointing color='red'>
                    {fieldErrors.start_date}
                </Label>
            )
        } else if(fieldErrors.end_date) {
            dates_error_label = (
                <Label basic pointing color='red'>
                    {fieldErrors.end_date}
                </Label>
            )
        }

        return (
            <Form 
                loading={this.props.processing || this.props.tagsLoading} 
                onSubmit={this.handleSubmit}
            >
                {this.props.tagsError &&
                    (<Message
                        error
                        content='Uh oh...there was an error loading the form. Please try again.'
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
                            <Button
                                icon
                                onClick={this.openStartDate}
                            >
                                <Icon name='calendar' />
                                {start_date ?
                                    (<Fragment>
                                        {moment(start_date).format('LLL')}
                                        <Icon 
                                            name='times circle'
                                            color='red'
                                            onClick={this.clearStartDate}
                                        />
                                    </Fragment>)
                                    : 'Start Date'
                                }
                            </Button>
                            <span> to </span>
                            <Button
                                icon
                                onClick={this.openEndDate}
                            >
                                <Icon name='calendar' />
                                {end_date ?
                                    (<Fragment>
                                        {moment(end_date).format('LLL')}
                                        <Icon 
                                            name='times circle'
                                            color='red'
                                            onClick={this.clearEndDate}
                                        />
                                    </Fragment>)
                                    : 'End Date'
                                }
                            </Button>
                            <Container>
                                {dates_error_label}
                            </Container>
                            {editStartDate && 
                                (<Container>
                                    <Button
                                        icon
                                        floated='right'
                                        onClick={this.closeStartDate}
                                        style={{'zIndex': 1, 'position': 'relative', 'margin': '2px'}}
                                    >
                                        <Icon color='red' name='times circle' />
                                    </Button>
                                    <DateTimePicker
                                        color='black'
                                        onChange={this.handleStartDateChange}
                                        moment=''
                                    />
                                </Container>)
                            }
                            {editEndDate && 
                                (<Container>
                                    <Button
                                        icon
                                        floated='right'
                                        onClick={this.closeEndDate}
                                        style={{'zIndex': 1, 'position': 'relative', 'margin': '2px'}}
                                    >
                                        <Icon color='red' name='times circle' />
                                    </Button>
                                    <DateTimePicker
                                        color='black'
                                        onChange={this.handleEndDateChange}
                                        moment=''
                                    />
                                </Container>)
                            }
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
    processing: PropTypes.bool.isRequired,
    error: PropTypes.string,
    handleAddItem: PropTypes.func.isRequired,
    removeAddItemError: PropTypes.func.isRequired,
    editItem: PropTypes.bool.isRequired,
    tagsLoading: PropTypes.bool.isRequired,
    tagsError: PropTypes.string,
    tags: PropTypes.array.isRequired,
}

const mapStateToProps = ({ items, tags }) => {

    return {
        error: items.addItem.error,
        processing: items.addItem.processing,
        tagsLoading: tags.getTags.loading,
        tagsError: tags.getTags.error,
        tags: tags.tags,
    };
};

const mapDispatchToProps = { handleAddItem, removeAddItemError };

export default connect(mapStateToProps, mapDispatchToProps)(ItemForm);