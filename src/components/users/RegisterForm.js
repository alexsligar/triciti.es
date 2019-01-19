import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, Message, Dimmer, Loader, Segment } from 'semantic-ui-react';
import { handleRegisterUser } from '../../actions/users/registerUser';
import { isEmail, isLength, equals } from 'validator';

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

  validations = {
    name: val => {
      if (!val) return 'Name is required';
      if (!isLength(val, { min: 2, max: 30 }))
        return 'Name must be between 2 and 30 characters';
    },
    username: val => {
      if (!val) return 'Username required';
      if (!val.match(/^[A-Za-z0-9_.]+$/))
        return 'Username must only contain letters, numbers, underscores and periods';
      if (!isLength(val, { min: 3, max: 30 }))
        return 'Username must be between 3 and 30 characters';
    },
    email: val => {
      if (!val) return 'Email required';
      if (!isEmail(val)) return 'Invalid email';
    },
    password: val => {
      if (!val) return 'Password required';
      if (!isLength(val, { min: 8, max: 30 }))
        return 'Password must be between 8 and 30 characters';
      if (!val.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,31}$/))
        return 'Password must contain uppercase, lowercase, and number';
    },
    passwordConfirmation: val => {
      if (!equals(val, this.state.fields.password))
        return 'Password confirmation must match password';
    },
    bio: val => {
      if (!isLength(val, { max: 255 }))
        return 'Bio must be 255 characters or less';
    },
  };

  handleInputChange = e => {
    const { value, name } = e.target;

    const fields = Object.assign({}, this.state.fields);
    const fieldErrors = Object.assign({}, this.state.fieldErrors);
    fields[name] = value;
    fieldErrors[name] = this.validations[name](value);

    const errors = Object.keys(fieldErrors).filter(k => fieldErrors[k]);
    const formErrors = errors.length ? true : false;

    this.setState({ fields, fieldErrors, formErrors });
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
    const errorFields = Object.keys(fieldErrors).filter(k => fieldErrors[k]);

    return (
      <Dimmer.Dimmable active={this.props.registerUserProcessing.toString()}>
        {this.props.registerUserError ? (
          <Message error content={this.props.registerUserError} />
        ) : null}
        <Form onSubmit={this.handleSubmit} error={this.state.formErrors}>
          <Segment textAlign='left'>
            <Form.Input
              fluid
              label='Name'
              placeholder='Name'
              name='name'
              value={name}
              error={fieldErrors.name}
              onChange={this.handleInputChange}
            />
            <Form.Input
              fluid
              label='Username'
              placeholder='Username'
              name='username'
              value={username}
              error={fieldErrors.username}
              onChange={this.handleInputChange}
            />
            <Form.Input
              fluid
              label='Email'
              placeholder='Email'
              name='email'
              value={email}
              error={fieldErrors.email}
              onChange={this.handleInputChange}
            />
            <Form.Input
              fluid
              label='Password'
              placeholder='Password'
              type='password'
              name='password'
              value={password}
              error={fieldErrors.password}
              onChange={this.handleInputChange}
            />
            <Form.Input
              fluid
              label='Confirm Password'
              placeholder='Confirm Password'
              type='password'
              name='passwordConfirmation'
              value={passwordConfirmation}
              error={fieldErrors.passwordConfirmation}
              onChange={this.handleInputChange}
            />
            <Form.TextArea
              fluid='true'
              label='Bio'
              placeholder='Bio'
              name='bio'
              value={bio}
              error={fieldErrors.bio}
              onChange={this.handleInputChange}
            />
            <Message error>
              <ul>
                {errorFields.map((err, index) => (
                  <li key={index}>{fieldErrors[err]}</li>
                ))}
              </ul>
            </Message>
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
