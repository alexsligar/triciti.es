import React from 'react';
import { shallow } from 'enzyme';
import { Form, FormButton, Dimmer, Message } from 'semantic-ui-react';
import { RegisterForm } from './RegisterForm';

const setup = (props={}) => {
    const wrapper = shallow(<RegisterForm {...props} />);
    return wrapper;
};

describe('render', () => {

    describe('without registerUserError or registerUserProcessing', () => {

        let wrapper;
        beforeEach(() => {

            const props = {
                registerUserProcessing: false,
                registerUserError: null,
                handleRegisterUser: () => {},
            };
            wrapper = setup(props);
        });

        it('should render component without error', () => {

            const form = wrapper.find(Form);
            expect(form.length).toBe(1);
            const formButton = wrapper.find(FormButton);
            expect(formButton.children().text()).toBe('Submit');
        });

        it('should show field errors when appropriate', () => {

            const usernameInput = wrapper.find('[name="username"]');
            usernameInput.simulate('change', { target: { name: 'username', value: 'a' } });
            const li = wrapper.find(Message).last().find('li');
            expect(li.text()).toBe(wrapper.state().fieldErrors.username);
        });
    });

    describe('with registerUserProcessing', () => {

        let wrapper;
        beforeEach(() => {

            const props = {
                registerUserProcessing: true,
                registerUserError: null,
                handleRegisterUser: () => {},
            };
            wrapper = setup(props);
        });

        it('should render without error', () => {

            const dimmer = wrapper.find(Dimmer);
            expect(dimmer.prop('active')).toBe(true);
        });
    }); 

    describe('with registerUserError', () => {

        const error = 'Username taken.'
        let wrapper;
        beforeEach(() => {

            const props = {
                registerUserProcessing: false,
                registerUserError: error,
                handleRegisterUser: () => {},
            };
            wrapper = setup(props);
        });

        it('should render without error', () => {

            const message = wrapper.find(Message).first();
            expect(message.prop('content')).toBe(error);
        });
    });
});

describe('form validations', () => {

    let wrapper;
    beforeEach(() => {

        const props = {
            registerUserProcessing: false,
            registerUserError: null,
            handleRegisterUser: () => {},
        };
        wrapper = setup(props);
    });

    it('should validate name', () => {

        const nameInput = wrapper.find('[name="name"]');
        nameInput.simulate('change', { target: { name: 'name', value: '' }});
        expect(wrapper.state().fieldErrors.name).toBe('Name is required');
        nameInput.simulate('change', { target: { name: 'name', value: 'a' }});
        expect(wrapper.state().fieldErrors.name).toBe('Name must be between 2 and 30 characters');
        nameInput.simulate('change', { target: { name: 'name', value: 'abcdefghijklmnopqrstuvwxyzabcde' }});
        expect(wrapper.state().fieldErrors.name).toBe('Name must be between 2 and 30 characters');
    });

    it('should validate username', () => {

        const usernameInput = wrapper.find('[name="username"]');
        usernameInput.simulate('change', { target: { name: 'username', value: '' } });
        expect(wrapper.state().fieldErrors.username).toBe('Username required');
        usernameInput.simulate('change', { target: { name: 'username', value: 'abc$23' } });
        expect(wrapper.state().fieldErrors.username).toBe('Username must only contain letters, numbers, underscores and periods');
        usernameInput.simulate('change', { target: { name: 'username', value: 'ab' } });
        expect(wrapper.state().fieldErrors.username).toBe('Username must be between 3 and 30 characters');
        usernameInput.simulate('change', { target: { name: 'username', value: 'abcdefghijklmnopqrstuvwxyzabcde' } });
        expect(wrapper.state().fieldErrors.username).toBe('Username must be between 3 and 30 characters');
    });

    it('should validate email', () => {

        const emailInput = wrapper.find('[name="email"]');
        emailInput.simulate('change', { target: { name: 'email', value: '' } });
        expect(wrapper.state().fieldErrors.email).toBe('Email required');
        emailInput.simulate('change', { target: { name: 'email', value: 'test' } });
        expect(wrapper.state().fieldErrors.email).toBe('Invalid email');
    });

    it('should validate password', () => {

        const passwordInput = wrapper.find('[name="password"]');
        passwordInput.simulate('change', { target: { name: 'password', value: '' }});
        expect(wrapper.state().fieldErrors.password).toBe('Password required');
        passwordInput.simulate('change', { target: { name: 'password', value: 'tesT123' }});
        expect(wrapper.state().fieldErrors.password).toBe('Password must be between 8 and 30 characters');
        passwordInput.simulate('change', { target: { name: 'password', value: 'aBcdefghijklmnopqrstuvwxyzabcd5' }});
        expect(wrapper.state().fieldErrors.password).toBe('Password must be between 8 and 30 characters');
        passwordInput.simulate('change', { target: { name: 'password', value: 'test1234' }});
        expect(wrapper.state().fieldErrors.password).toBe('Password must contain uppercase, lowercase, and number');
        passwordInput.simulate('change', { target: { name: 'password', value: 'TEST1234' }});
        expect(wrapper.state().fieldErrors.password).toBe('Password must contain uppercase, lowercase, and number');
        passwordInput.simulate('change', { target: { name: 'password', value: 'testTEST' }});
        expect(wrapper.state().fieldErrors.password).toBe('Password must contain uppercase, lowercase, and number');
    });

    it('should validate password confirmation', () => {

        const passwordConfirmationInput = wrapper.find('[name="passwordConfirmation"]');
        passwordConfirmationInput.simulate('change', { target: { name: 'passwordConfirmation', value: 'a' }});
        expect(wrapper.state().fieldErrors.passwordConfirmation).toBe('Password confirmation must match password');
    });
    
    it('should validate bio', () => {

        const bioInput = wrapper.find('[name="bio"]');
        const bio = 'abcdefghijklmonpqrstuvwxyz'.repeat(10);
        bioInput.simulate('change', { target: { name: 'bio', value: bio }});
        expect(wrapper.state().fieldErrors.bio).toBe('Bio must be 255 characters or less');
    });
});

describe('form submit', () => {

    const handleRegisterUser = jest.fn();
    const preventDefault = jest.fn();
    const props = {
        registerUserError: null,
        registerUserProcessing: false,
        handleRegisterUser,
    }
    let wrapper;
    beforeEach(() => {

        handleRegisterUser.mockReset();
        preventDefault.mockReset();
        wrapper = shallow(<RegisterForm {...props} />);
    });
    
    it('should call handleRegisterUser when valid form is submitted', () => {

        wrapper.setState({
            fields: {
                name: 'Test',
                username: 'test',
                email: "test@gmail.com",
                password: 'Hapi123$',
                passwordConfirmation: 'Hapi123$',
                bio: 'React'
            }
        });
        const form = wrapper.find(Form);
        form.simulate('submit', { preventDefault });
        expect(preventDefault.mock.calls.length).toBe(1);
        expect(handleRegisterUser.mock.calls.length).toBe(1);
    });

    it('should not call handleRegisterUser when the form is invalid', () => {

        const form = wrapper.find(Form);
        form.simulate('submit', { preventDefault });
        expect(preventDefault.mock.calls.length).toBe(1);
        expect(handleRegisterUser.mock.calls.length).toBe(0);
    });
});

describe('input field changes should update state', () => {

    let wrapper;
    beforeEach(() => {

        const props = {
            registerUserProcessing: false,
            registerUserError: null,
            handleRegisterUser: () => {},
        };
        wrapper = setup(props);
    });

    it('should update state when username is changed', () => {

        const username = 'test';
        const usernameInput = wrapper.find('[name="username"]');
        usernameInput.simulate('change', { target: { name: 'username', value: username } });
        expect(wrapper.state().fields.username).toBe(username);
    });
});
