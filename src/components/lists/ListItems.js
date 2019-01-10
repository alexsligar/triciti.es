import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Card } from 'semantic-ui-react';
import ItemCard from '../items/ItemCard';

export default function ListItems (props) {
    return (
        <Grid>
            <Grid.Row centered>
                <Grid.Column width={8}>
                    <br />
                    <Card.Group itemsPerRow={3}>
                        {props.items.map((item) => {
                            return (
                                <ItemCard
                                    key={item.id}
                                    id={item.id}
                                    name={item.name}
                                    type={item.type}
                                    location={item.location}
                                    start_date={item.start_date}
                                    end_date={item.end_date}
                                />
                            );
                        })}
                    </Card.Group>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}

ListItems.propTypes = {
    items: PropTypes.array.isRequired,
}