import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Card, Icon } from 'semantic-ui-react';

moment.locale('en');

export default function ItemCard (props) {
    let dateString;
    if(props.start_date) {
        dateString = moment(props.start_date).format('lll');
    }
    if(props.end_date) {
        dateString += '-'
        if(moment(props.start_date).format('l') === moment(props.end_date).format('l')) {
            dateString += moment(props.end_date).format('h:mm A');
        } else {
            dateString += moment(props.end_date).format('lll');
        }
    }

    return (
        <Card>
            <Card.Content>
                <Card.Header>{props.name}</Card.Header>
                <Card.Meta>{props.type}</Card.Meta>
                <Card.Meta><Icon name='map marker alternate' />{props.location}</Card.Meta>
                {dateString && 
                    (
                        <Card.Meta><Icon name='calendar' />
                            {dateString}
                        </Card.Meta>
                    )
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
