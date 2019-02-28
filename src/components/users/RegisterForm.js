import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Form,
  Message,
  Dimmer,
  Loader,
  Segment,
  Label,
  Input,
  TextArea,
} from 'semantic-ui-react';
import { handleRegisterUser } from '../../actions/users/registerUser';
import userValidations from '../../validations/users';

export class RegisterForm extends Component {
  state = {
    fields: {
      name: '',
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      bio: '',
    },
    fieldErrors: {},
    formErrors: false,
  };

  handleInputChange = e => {
    const { value, name } = e.target;

    const fields = Object.assign({}, this.state.fields);
    const fieldErrors = Object.assign({}, this.state.fieldErrors);
    fields[name] = value;
    fieldErrors[name] = userValidations[name](fields);

    const errors = Object.keys(fieldErrors).filter(k => fieldErrors[k]);
    const formErrors = errors.length ? true : false;

    this.setState({ fields, fieldErrors, formErrors });
  };

  validate = () => {
    const { fields } = this.state;
    const keys = Object.keys(fields);
    for (var i = 0; i < keys.length; i++) {
      if (userValidations[keys[i]](fields)) return true;
    }
    return false;
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.validate()) return;
    this.props.handleRegisterUser(this.state.fields);
  };

  render() {
    const {
      name,
      username,
      email,
      password,
      passwordConfirmation,
      bio,
    } = this.state.fields;

    const { fieldErrors } = this.state;

    return (
      <Dimmer.Dimmable active={this.props.registerUserProcessing.toString()}>
        {this.props.registerUserError ? (
          <Message error content={this.props.registerUserError} />
        ) : null}
        <Form onSubmit={this.handleSubmit} error={this.state.formErrors}>
          <Segment textAlign='left'>
            <Form.Field error={typeof fieldErrors.name !== 'undefined'}>
              <label>Name</label>
              <Input
                placeholder='Name'
                fluid
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
            <Form.Field error={typeof fieldErrors.username !== 'undefined'}>
              <label>Username</label>
              <Input
                placeholder='Username'
                fluid
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
                placeholder='Email'
                fluid
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
            <Form.Field error={typeof fieldErrors.password !== 'undefined'}>
              <label>Password</label>
              <Input
                placeholder='Password'
                fluid
                type='password'
                value={password}
                name='password'
                onChange={this.handleInputChange}
              />
              {fieldErrors.password && (
                <Label basic color='red' pointing>
                  {fieldErrors.password}
                </Label>
              )}
            </Form.Field>
            <Form.Field
              error={typeof fieldErrors.passwordConfirmation !== 'undefined'}
            >
              <label>Confirm Password</label>
              <Input
                placeholder='Confirm Password'
                fluid
                type='password'
                value={passwordConfirmation}
                name='passwordConfirmation'
                onChange={this.handleInputChange}
              />
              {fieldErrors.passwordConfirmation && (
                <Label basic color='red' pointing>
                  {fieldErrors.passwordConfirmation}
                </Label>
              )}
            </Form.Field>
            <Form.Field error={typeof fieldErrors.bio !== 'undefined'}>
              <label>Bio</label>
              <TextArea
                placeholder='Bio'
                fluid='true'
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
        <Dimmer active={this.props.registerUserProcessing}>
          <Loader>Welcome aboard. Processing sign up.</Loader>
        </Dimmer>
      </Dimmer.Dimmable>
    );
  }
}

RegisterForm.propTypes = {
  registerUserError: PropTypes.string,
  registerUserProcessing: PropTypes.bool.isRequired,
  handleRegisterUser: PropTypes.func.isRequired,
};

const mapStateToProps = ({ registerUser }) => {
  return {
    registerUserError: registerUser.error,
    registerUserProcessing: registerUser.processing,
  };
};

const mapDispatchToProps = { handleRegisterUser };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterForm);
