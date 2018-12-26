import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Input, Label, Form } from 'semantic-ui-react';
import { handleAddTag, removeAddTagError } from '../../actions/tags/addTag';

export class AddTag extends Component {
    state = {
        value: '',
        tagExists: false,
    }

    handleInputChange = (e) => {
        this.setState({ value: e.target.value });
        if (this.props.error) {
            this.props.removeAddTagError();
        }
        if (_.some(this.props.tags, { title: e.target.value })) {
            this.setState({ tagExists: true})
        } else if (this.state.tagExists) {
            this.setState({ tagExists: false });
        }
    }

    handleAddClick = () => {
        if (this.state.tagExists) return;
        if (this.state.value === '') return;
        this.props.handleAddTag(this.state.value);
        this.setState({ value: '' });
    }

    render() {
        const { value, tagExists, } = this.state;
        const { processing, error } = this.props;

        let errorLabel = null;
        if (tagExists) {
            errorLabel = (<Label basic color='red' pointing='right'>Tag already exists</Label>)
        } else if (error) {
            errorLabel = (<Label basic color='red' pointing='right'>Error adding tag. Try again.</Label>)
        }

        let inputAction = { content: 'Add Tag', onClick: this.handleAddClick };
        if (processing) {
            inputAction = { loading: true };
        }

        return (
            <Form>
                <Form.Field inline>
                    {errorLabel}
                    <Input 
                        value={value}
                        action={inputAction}
                        placeholder='Add tag...'
                        onChange={this.handleInputChange}
                    />
                </Form.Field>
            </Form>
        );
    }
}

AddTag.propTypes = {
    processing: PropTypes.bool.isRequired,
    error: PropTypes.string,
    tags: PropTypes.array.isRequired,
    handleAddTag: PropTypes.func.isRequired,
    removeAddTagError: PropTypes.func.isRequired,
};

const mapStateToProps = ({ tags }) => {
    return {
        processing: tags.addTag.processing,
        error: tags.addTag.error,
        tags: tags.tags,
    }
}

const mapDispatchToProps = { handleAddTag, removeAddTagError };

export default connect(mapStateToProps, mapDispatchToProps)(AddTag);
