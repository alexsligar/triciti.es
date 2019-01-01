import React, { Fragment } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

export default function DateString (props) {
    let dateString = moment(props.start_date).format('lll');
    if(props.end_date) {
        dateString += '-'
        if(moment(props.start_date).format('l') === moment(props.end_date).format('l')) {
            dateString += moment(props.end_date).format('h:mm A');
        } else {
            dateString += moment(props.end_date).format('lll');
        }
    }

    return (
        <Fragment>{dateString}</Fragment>
    );
}

DateString.propTypes = {
    start_date: PropTypes.string.isRequired,
    end_date: PropTypes.string,
}