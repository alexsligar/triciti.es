import React from 'react';
import { Grid, Header } from 'semantic-ui-react';
import RegisterForm from './RegisterForm';

export default function Register() {
    return (
        <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle' className='greyBackground'>
            <Grid.Row>
                <Grid.Column width={6}>
                    <Header as='h2' textAlign='center'>
                        Register for an Account
                    </Header>
                    <RegisterForm />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
} 