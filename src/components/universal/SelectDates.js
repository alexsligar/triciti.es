import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import DateTimePicker from 'react-semantic-datetime';
import { Container, Button, Icon, Label } from 'semantic-ui-react';
import moment from 'moment';

export default class SelectDates extends Component {
  state = {
    editStartDate: false,
    editEndDate: false,
  };

  openstart_date = e => {
    e.preventDefault();
    this.setState({ editStartDate: true });
  };

  openend_date = e => {
    e.preventDefault();
    this.setState({ editEndDate: true });
  };

  closestart_date = e => {
    e.preventDefault();
    this.setState({ editStartDate: false });
  };

  closeend_date = e => {
    e.preventDefault();
    this.setState({ editEndDate: false });
  };

  clearstart_date = e => {
    //use stopPropagation to ensure the button doesn't trigger the parent button
    e.stopPropagation();
    this.props.handleStartDateChange(undefined);
  };

  clearend_date = e => {
    //use stopPropagation to ensure the button doesn't trigger the parent button
    e.stopPropagation();
    this.props.handleEndDateChange(undefined);
  };

  handleStartDateChange = value => {
    this.props.handleStartDateChange(value);
    this.setState({ editStartDate: false });
  };

  handleEndDateChange = value => {
    this.props.handleEndDateChange(value);
    this.setState({ editEndDate: false });
  };

  render() {
    const {
      start_date,
      end_date,
      start_date_error,
      end_date_error,
    } = this.props;
    const { editStartDate, editEndDate } = this.state;

    let datesErrorLabel;
    if (start_date_error) {
      datesErrorLabel = (
        <Label basic pointing color='red'>
          {start_date_error}
        </Label>
      );
    } else if (end_date_error) {
      datesErrorLabel = (
        <Label basic pointing color='red'>
          {end_date_error}
        </Label>
      );
    }

    return (
      <Fragment>
        <Button icon onClick={this.openstart_date}>
          <Icon name='calendar' />
          {start_date ? (
            <Fragment>
              {moment(start_date).format('LLL')}
              <Icon
                name='times circle'
                color='red'
                onClick={this.clearstart_date}
              />
            </Fragment>
          ) : (
            'Start Date'
          )}
        </Button>
        <span> to </span>
        <Button icon onClick={this.openend_date}>
          <Icon name='calendar' />
          {end_date ? (
            <Fragment>
              {moment(end_date).format('LLL')}
              <Icon
                name='times circle'
                color='red'
                onClick={this.clearend_date}
              />
            </Fragment>
          ) : (
            'End Date'
          )}
        </Button>
        <Container>{datesErrorLabel}</Container>
        {editStartDate && (
          <Container>
            <Button
              icon
              floated='right'
              onClick={this.closestart_date}
              style={{ zIndex: 1, position: 'relative', margin: '2px' }}
            >
              <Icon color='red' name='times circle' />
            </Button>
            <DateTimePicker
              color='black'
              onChange={this.handleStartDateChange}
              moment=''
            />
          </Container>
        )}
        {editEndDate && (
          <Container>
            <Button
              icon
              floated='right'
              onClick={this.closeend_date}
              style={{ zIndex: 1, position: 'relative', margin: '2px' }}
            >
              <Icon color='red' name='times circle' />
            </Button>
            <DateTimePicker
              color='black'
              onChange={this.handleEndDateChange}
              moment=''
            />
          </Container>
        )}
      </Fragment>
    );
  }
}

SelectDates.propTypes = {
  start_date: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  start_date_error: PropTypes.string,
  end_date: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  end_date_error: PropTypes.string,
  handleStartDateChange: PropTypes.func.isRequired,
  handleEndDateChange: PropTypes.func.isRequired,
};
