import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isLength } from 'validator';
import { Form, Message, TextArea, Label, Input } from 'semantic-ui-react';
import { handleAddList } from '../../actions/lists/addList';

export class ListForm extends Component {
    state = {
        fields: {
            name: '',
            description: '',
        },
        fieldErrors: {},
        formErrors: false,
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;
        const fields = Object.assign({}, this.state.fields);
        const fieldErrors = Object.assign({}, this.state.fieldErrors);
        fields[name] = value;
        fieldErrors[name] = this.validations[name](value);
        const errors = Object.keys(fieldErrors).filter((k) => fieldErrors[k])
        const formErrors = errors.length ? true : false;
        this.setState({fields, fieldErrors, formErrors});
    }

    validations = {
        'name': val => {
            if(!val) return 'Name is required';
            if(!isLength(val, {min:4, max:60})) return 'Name must be between 4 and 60 characters';
        },
        'description': val => {
            if(!val) return 'Description is required';
            if(!isLength(val, {min: 10, max: 250})) return 'Description must be between 10 and 250 characters';
        }
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
        const { fields } = this.state;
        this.props.handleAddList(fields);
    }

    render() {
        const { addListProcessing, addListError } = this.props;
        const { name, description } = this.state.fields;
        const { formErrors, fieldErrors } = this.state;

        return (
            <Form 
                loading={addListProcessing}
                error={addListError !== null || formErrors}
                onSubmit={this.handleSubmit}   
            >
                {addListError && 
                    (<Message
                        error
                        content={addListError}
                    />)
                }
                <Form.Field error={fieldErrors.name !== undefined}>
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
                <Form.Field error={fieldErrors.description !== undefined}>
                    <label>Description</label>
                    <TextArea
                        placeholder='Description'
                        value={description}
                        name='description'
                        onChange={this.handleInputChange}
                    /> 
                    {
                        fieldErrors.description &&
                            (
                                <Label basic color='red' pointing>
                                    {fieldErrors.description}
                                </Label>
                            )
                    }
                </Form.Field>
                <Form.Button
                    fluid
                    disabled={this.validate()}
                >
                    Submit
                </Form.Button>
            </Form>
        )
    }
}

ListForm.propTypes = {
    addListProcessing: PropTypes.bool.isRequired,
    addListError: PropTypes.string,
    handleAddList: PropTypes.func.isRequired,
}

const mapStateToProps = ({ lists }) => {
    return {
        addListProcessing: lists.addList.processing,
        addListError: lists.addList.error,
    }
}

const mapDispatchToProps = { handleAddList };

export default connect(mapStateToProps, mapDispatchToProps)(ListForm);