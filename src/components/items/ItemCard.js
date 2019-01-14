import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Card, Icon } from 'semantic-ui-react';
import DateString from './DateString';

moment.locale('en');

export default function ItemCard(props) {
  return (
    <Card>
      <Card.Content>
        <Card.Header>
          <Link to={'/items/' + props.id}>{props.name}</Link>
        </Card.Header>
        <Card.Meta>{props.type}</Card.Meta>
        <Card.Meta>
          <Icon name='map marker alternate' />
          {props.location}
        </Card.Meta>
        {props.type === 'event' && (
          <Card.Meta>
            <Icon name='calendar' />
            <DateString
              start_date={props.start_date}
              end_date={props.end_date}
            />
          </Card.Meta>
        )}
      </Card.Content>
    </Card>
  );
}

ItemCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  start_date: PropTypes.string,
  end_date: PropTypes.string,
};
