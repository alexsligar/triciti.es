import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

export default function ItemOptions(props) {
    const { item } = props;
    return (
        <Container textAlign='center'>
            <p>
                <Link to={'/items/' + item.id + '/edit'}>
                    EDIT
                </Link>
                <span> | </span>
                <span>DELETE</span>
            </p>
        </Container>
    );
}

ItemOptions.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.number.isRequired,
    })
};