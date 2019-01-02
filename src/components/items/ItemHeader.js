import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Container, Header, Label } from 'semantic-ui-react';

export default function ItemHeader(props) {
    const { item } = props;
    return (
        <Container textAlign='center'>
            <Header as='h2'>
                {item.name}
            </Header>
            <p>
                <span>by </span> 
                {item.owners.map((owner) => {
                    return (
                        <Link key={owner} to={'/users/' + owner}>
                            {owner} 
                        </Link>
                    )
                })}
            </p>
            <Label.Group>
                {item.tags.map((tag) => {
                    if (tag) {
                        return (
                            <Link key={tag} to={'/tags/' + tag}>
                                <Label tag>
                                    {tag}
                                </Label>
                            </Link>
                        );
                    } else {
                        return null;
                    }
                })}
            </Label.Group>
        </Container>
    );
}

ItemHeader.propTypes = {
    item: PropTypes.shape({
        name: PropTypes.string.isRequired,
        owners: PropTypes.array.isRequired,
        tags: PropTypes.array.isRequired,
    })
};
