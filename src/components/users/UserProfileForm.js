import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Form,
  Message,
  Segment,
  Input,
  Label,
  TextArea,
} from 'semantic-ui-react';
import { handleUpdateUser } from '../../actions/users/updateUser';
import userValidations from '../../validations/users';

export class UserProfileForm extends Component {
  state = {
    fields: {
      username: this.props.authedUser.username,
      name: this.props.authedUser.name,
      email: this.props.authedUser.email,
      bio: this.props.authedUser.bio,
    },
    fieldErrors: {},
    formErrors: false,
    updateSuccess: false,
  };

  componentDidUpdate(prevProps) {
    const { processing, error } = this.props;
    if (prevProps.processing && !processing && !error) {
      this.setState({ updateSuccess: true });
    }
  }

  handleInputChange = e => {
    const { value, name } = e.target;

    const fields = Object.assign({}, this.state.fields);
    const fieldErrors = Object.assign({}, this.state.fieldErrors);
    fields[name] = value;
    fieldErrors[name] = userValidations[name](fields);

    const errors = Object.keys(fieldErrors).filter(k => fieldErrors[k]);
    const formErrors = errors.length ? true : false;

    this.setState({ fields, fieldErrors, formErrors, updateSuccess: false });
  };

  checkProfileSame = () => {
    const { fields } = this.state;
    const keys = Object.keys(fields);
    for (var i = 0; i < keys.length; i++) {
      if (fields[keys[i]] !== this.props.authedUser[keys[i]]) return false;
    }
    return true;
  };

  validate = () => {
    const { fields } = this.state;
    const keys = Object.keys(fields);
    for (var i = 0; i < keys.length; i++) {
      if (userValidations[keys[i]](fields)) return true;
    }
    return this.checkProfileSame();
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.validate()) return;
    this.props.handleUpdateUser(
      this.state.fields,
      this.props.authedUser.username
    );
  };

  render() {
    const { processing, error } = this.props;
    const { username, name, email, bio } = this.state.fields;
    const { fieldErrors, updateSuccess } = this.state;
    return (
      <Form
        loading={processing}
        error={error !== null}
        success={updateSuccess}
        onSubmit={this.handleSubmit}
      >
        {error && <Message error content={error} />}
        {updateSuccess && (
          <Message success content='Profile successfully updated.' />
        )}
        <Segment textAlign='left'>
          <Form.Field error={typeof fieldErrors.name !== 'undefined'}>
            <label>Name</label>
            <Input value={name} name='name' onChange={this.handleInputChange} />
            {fieldErrors.name && (
              <Label basic color='red' pointing>
                {fieldErrors.name}
              </Label>
            )}
          </Form.Field>
          <Form.Field error={typeof fieldErrors.username !== 'undefined'}>
            <label>Username</label>
            <Input
              value={username}
              name='username'
              onChange={this.handleInputChange}
            />
            {fieldErrors.username && (
              <Label basic color='red' pointing>
                {fieldErrors.username}
              </Label>
            )}
          </Form.Field>
          <Form.Field error={typeof fieldErrors.email !== 'undefined'}>
            <label>Email</label>
            <Input
              value={email}
              name='email'
              onChange={this.handleInputChange}
            />
            {fieldErrors.email && (
              <Label basic color='red' pointing>
                {fieldErrors.email}
              </Label>
            )}
          </Form.Field>
          <Form.Field error={typeof fieldErrors.bio !== 'undefined'}>
            <label>Bio</label>
            <TextArea
              value={bio}
              name='bio'
              onChange={this.handleInputChange}
            />
            {fieldErrors.bio && (
              <Label basic color='red' pointing>
                {fieldErrors.bio}
              </Label>
            )}
          </Form.Field>
          <Form.Button fluid disabled={this.validate()}>
            Submit
          </Form.Button>
        </Segment>
      </Form>
    );
  }
}

UserProfileForm.propTypes = {
  processing: PropTypes.bool.isRequired,
  error: PropTypes.string,
  authedUser: PropTypes.object.isRequired,
  handleUpdateUser: PropTypes.func.isRequired,
};

const mapStateToProps = ({ users, authedUser }) => {
  return {
    processing: users.updateUser.processing,
    error: users.updateUser.error,
    authedUser: authedUser.user,
  };
};

const mapDispatchToProps = { handleUpdateUser };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfileForm);
