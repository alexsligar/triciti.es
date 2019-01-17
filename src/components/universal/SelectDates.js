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

  openStartDate = e => {
    e.preventDefault();
    this.setState({ editStartDate: true });
  };

  openEndDate = e => {
    e.preventDefault();
    this.setState({ editEndDate: true });
  };

  closeStartDate = e => {
    e.preventDefault();
    this.setState({ editStartDate: false });
  };

  closeEndDate = e => {
    e.preventDefault();
    this.setState({ editEndDate: false });
  };

  clearStartDate = e => {
    //use stopPropagation to ensure the button doesn't trigger the parent button
    e.stopPropagation();
    this.props.handleStartDateChange(undefined);
  };

  clearEndDate = e => {
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
        <Button icon onClick={this.openStartDate}>
          <Icon name='calendar' />
          {start_date ? (
            <Fragment>
              {moment(start_date).format('LLL')}
              <Icon
                name='times circle'
                color='red'
                onClick={this.clearStartDate}
              />
            </Fragment>
          ) : (
            'Start Date'
          )}
        </Button>
        <span> to </span>
        <Button icon onClick={this.openEndDate}>
          <Icon name='calendar' />
          {end_date ? (
            <Fragment>
              {moment(end_date).format('LLL')}
              <Icon
                name='times circle'
                color='red'
                onClick={this.clearEndDate}
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
              onClick={this.closeStartDate}
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
              onClick={this.closeEndDate}
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
