import React from 'react';
import { Container, Grid, Header } from 'semantic-ui-react';
import RegisterForm from './RegisterForm';

export default function Register() {
    return (
        <Container className='greyBackground' fluid>
            <Container>
                <Grid>
                    <Grid.Row centered>
                        <Grid.Column width={8} className='outlineBox'>
                            <Header as='h3' textAlign='center'>
                                REGISTER FOR AN ACCOUNT
                            </Header>
                            <RegisterForm />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        </Container>
    );
} 