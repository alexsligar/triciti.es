import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import DateTimePicker from 'react-semantic-datetime';
import { Container, Button, Icon, Label } from 'semantic-ui-react';
import moment from 'moment';

export default class SelectDates extends Component {
    state = {
        editStartDate: false,
        editEndDate: false,
    }

    openStartDate = (e) => {
        e.preventDefault();
        this.setState({ editStartDate: true });
    }

    openEndDate = (e) => {
        e.preventDefault();
        this.setState({ editEndDate: true });
    }

    closeStartDate = (e) => {
        e.preventDefault();
        this.setState({ editStartDate: false });
    }

    closeEndDate = (e) => {
        e.preventDefault();
        this.setState({ editEndDate: false });
    }

    clearStartDate = (e) => {
        //use stopPropagation to ensure the button doesn't trigger the parent button
        e.stopPropagation();
        this.props.handleStartDateChange(undefined);
    }

    clearEndDate = (e) => {
        //use stopPropagation to ensure the button doesn't trigger the parent button
        e.stopPropagation();
        this.props.handleEndDateChange(undefined);
    }

    handleStartDateChange = (value) => {
        this.props.handleStartDateChange(value);
        this.setState({ editStartDate: false });
    }

    handleEndDateChange = (value) => {
        this.props.handleEndDateChange(value);
        this.setState({ editEndDate: false });
    }

    render() {
        const { startDate, endDate, startDateError, endDateError } = this.props;
        const { editStartDate, editEndDate } = this.state;

        let datesErrorLabel;
        if(startDateError) {
            datesErrorLabel = (
                <Label basic pointing color='red'>
                    {startDateError}
                </Label>
            )
        } else if(endDateError) {
            datesErrorLabel = (
                <Label basic pointing color='red'>
                    {endDateError}
                </Label>
            )
        }

        return (
            <Fragment>
                <Button
                    icon
                    onClick={this.openStartDate}
                >
                    <Icon name='calendar' />
                    {startDate ?
                        (<Fragment>
                            {moment(startDate).format('LLL')}
                            <Icon 
                                name='times circle'
                                color='red'
                                onClick={this.clearStartDate}
                            />
                        </Fragment>)
                        : 'Start Date'
                    }
                </Button>
                <span> to </span>
                <Button
                    icon
                    onClick={this.openEndDate}
                >
                    <Icon name='calendar' />
                    {endDate ?
                        (<Fragment>
                            {moment(endDate).format('LLL')}
                            <Icon 
                                name='times circle'
                                color='red'
                                onClick={this.clearEndDate}
                            />
                        </Fragment>)
                        : 'End Date'
                    }
                </Button>
                <Container>
                    {datesErrorLabel}
                </Container>
                {editStartDate && 
                    (<Container>
                        <Button
                            icon
                            floated='right'
                            onClick={this.closeStartDate}
                            style={{'zIndex': 1, 'position': 'relative', 'margin': '2px'}}
                        >
                            <Icon color='red' name='times circle' />
                        </Button>
                        <DateTimePicker
                            color='black'
                            onChange={this.handleStartDateChange}
                            moment=''
                        />
                    </Container>)
                }
                {editEndDate && 
                    (<Container>
                        <Button
                            icon
                            floated='right'
                            onClick={this.closeEndDate}
                            style={{'zIndex': 1, 'position': 'relative', 'margin': '2px'}}
                        >
                            <Icon color='red' name='times circle' />
                        </Button>
                        <DateTimePicker
                            color='black'
                            onChange={this.handleEndDateChange}
                            moment=''
                        />
                    </Container>)
                }
            </Fragment> 
        )
    }
}

SelectDates.propTypes = {
    startDate: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ]),
    startDateError: PropTypes.string,
    endDate: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ]),
    endDateError: PropTypes.string,
    handleStartDateChange: PropTypes.func.isRequired,
    handleEndDateChange: PropTypes.func.isRequired,
}
