import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Container, Header } from 'semantic-ui-react';

export default function ListHeader(props) {
    return (
        <Container textAlign='center'>
            <Header as='h2'>
                {props.list.name}
            </Header>
            <p>
                by 
                <Link to={'/users/' + props.list.owner}>
                    {props.list.owner}
                </Link>
            </p>
            <p>
                {props.list.description}
            </p>
        </Container>
    );
}

ListHeader.propTypes = {
    list: PropTypes.shape({
        name: PropTypes.string.isRequired,
        owner: PropTypes.string.isRequired,
        description: PropTypes.string,
    })
}