import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Header, Form, Segment, Message } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { handleAuthUser, removeAuthUserError } from '../actions/authUser';

export class Login extends Component {

    state = {
        username: '',
        password: '',
    };

    handleInputChange = (e) => {
        if(this.props.authUserError) {
            this.props.removeAuthUserError();
        }
        const { value, name } = e.target;

        this.setState(() => ({
            [name]: value
        }))
    };

    isDisabled = () => {
        const {
            username,
            password,
        } = this.state;

        return username === '' || password === '';
    };

    handleKeyPress = (e) => {
        if (e.which === 13) this.handleSubmit(e);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.isDisabled()) return;
        this.props.handleAuthUser(this.state);
    }

    render() {
        const { username, password } = this.state;

        return (
            <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle' className='greyBackground'>
                <Grid.Row>
                    <Grid.Column width={4}>
                        <Header as='h2'>
                            Login to your account
                        </Header>
                        <Form 
                            size='large' 
                            error={this.props.authUserError ? true : false}
                            onSubmit={this.handleSubmit}
                        >
                            <Segment stacked>
                                <Form.Input 
                                    fluid 
                                    icon='user' 
                                    iconPosition='left' 
                                    placeholder='Email/username' 
                                    name='username'
                                    value={username}
                                    onChange={this.handleInputChange}
                                    onKeyPress={this.handleKeyPress}
                                />
                                <Form.Input 
                                    fluid 
                                    icon='lock'
                                    iconPosition='left'
                                    placeholder='Password'
                                    name='password'
                                    value={password}
                                    onChange={this.handleInputChange}
                                    onKeyPress={this.handleKeyPress}
                                    type='password' 
                                />
                                <Message error content={this.props.authUserError} className='loginFormMessage' />
                                <Form.Button fluid secondary size='large'>
                                    Login
                                </Form.Button>
                            </Segment>
                        </Form>
                        <Message>
                            New to us? <Link to='/register'>Sign up</Link>
                        </Message>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}

Login.propTypes = {
    authUserError: PropTypes.string,
    authUserProcessing: PropTypes.bool.isRequired,
    handleAuthUser: PropTypes.func.isRequired,
    removeAuthUserError: PropTypes.func.isRequired,
}

const mapStateToProps = ({ authUser }) => {
    return {
        authUserError: authUser.error,
        authUserProcessing: authUser.processing,
    };
};

const mapDispatchToProps = { 
    handleAuthUser, 
    removeAuthUserError,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
