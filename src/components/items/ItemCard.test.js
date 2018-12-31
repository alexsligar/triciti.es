import React from 'react';
import { shallow } from 'enzyme';
import { Card } from 'semantic-ui-react';
import moment from 'moment';
import ItemCard from './ItemCard';

const defaultProps = {
    name: 'Test Item',
    type: 'Activity',
    location: '1500 W. 1st Ave., Kennewick, WA 99336',
    start_date: moment().add(1, 'days').format('YYYY-MM-DD hh:mm:ss'),
    end_date: moment().add(2, 'days').format('YYYY-MM-DD hh:mm:ss'),
}
const setup = (props = {}) => {
    const propsPassed = {...defaultProps, ...props};
    return shallow(<ItemCard {...propsPassed } />);
}

describe('render', () => {

    it('should render without error', () => {

        const wrapper = setup();
        const card = wrapper.find(Card);
        expect(card.length).toBe(1);
    });

    it('should render only the time of the end_date if dates match', () => {

        const props = {
            start_date: moment().format('YYYY-MM-DD hh:mm:ss'),
            end_date: moment().add(1, 'minutes').format('YYYY-MM-DD hh:mm:ss'),
        };
        const wrapper = setup(props);
        const dateMeta = wrapper.find(Card.Meta).last();
        let dateString = moment(props.start_date).format('lll');
        dateString += '-';
        dateString += moment(props.end_date).format('h:mm A');
        expect(dateMeta.dive().text()).toBe('<Icon />' + dateString);
    });

    it('should render without error when start_date is undefined', () => {

        const noDates = Object.assign({}, defaultProps);
        delete noDates.start_date;
        delete noDates.end_date;
        const wrapper = shallow(<ItemCard {...noDates} />);
        const cardMetas = wrapper.find(Card.Meta);
        expect(cardMetas.length).toBe(2);
    });
});