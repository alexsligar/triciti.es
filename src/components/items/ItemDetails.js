import React from 'react';
import PropTypes from 'prop-types';
import { Card, Icon } from 'semantic-ui-react';
import DateString from './DateString';

export default function ItemDetails(props) {
  const { item } = props;

  return (
    <Card color='grey' centered>
      <Card.Header textAlign='center'>The What, Where, When</Card.Header>
      <Card.Content>
        <Icon name='check circle' />
        {item.type}
      </Card.Content>
      <Card.Content>
        <Icon name='map' />
        {item.location}
      </Card.Content>
      {item.type === 'event' && (
        <Card.Content>
          <Icon name='calendar' />
          <DateString start_date={item.start_date} end_date={item.end_date} />
        </Card.Content>
      )}
    </Card>
  );
}

ItemDetails.propTypes = {
  item: PropTypes.shape({
    location: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    start_date: PropTypes.string,
    end_date: PropTypes.string,
  }),
};
