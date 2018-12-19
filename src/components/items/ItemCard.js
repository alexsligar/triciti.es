import React from 'react';
import PropTypes from 'prop-types';
import { Card, Icon } from 'semantic-ui-react';

export default function ItemCard (props) {
    return (
        <Card>
            <Card.Content>
                <Card.Header>{props.name}</Card.Header>
                <Card.Meta>{props.type}</Card.Meta>
                <Card.Meta><Icon name='map marker alternate' />{props.location}</Card.Meta>
                {props.start_date 
                    ? (<Card.Meta><Icon name='calendar' />{props.start_date} - {props.end_date}</Card.Meta>)
                    : null
                }
            </Card.Content>
        </Card>
    );
}

ItemCard.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    start_date: PropTypes.string,
    end_date: PropTypes.string,
};
