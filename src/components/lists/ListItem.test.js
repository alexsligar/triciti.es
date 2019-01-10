import React from 'react';
import { shallow } from 'enzyme';
import { Card } from 'semantic-ui-react';
import ListItems from './ListItems';
import ItemCard from '../items/ItemCard';

const defaultProps = {
    items: [
        { id: 4, name: 'Test Item', type: 'Activity', location: 'Somewhere' },
        { id: 3, name: 'Another Item', type: 'Place', location: 'Elsewhere' }
    ],
};
const setup = (props = {}) => {
    const propsPassed = { ...defaultProps, ...props };
    return shallow(<ListItems {...propsPassed} />);
}

describe('render', () => {

    it('should render a Card.Group and ItemCards for each item', () => {

        const wrapper = setup();
        const cardGroup = wrapper.find(Card.Group);
        expect(cardGroup.length).toBe(1);
        const itemCards = wrapper.find(ItemCard);
        expect(itemCards.length).toBe(defaultProps.items.length);
    });
});