import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/initialData';

export class App extends Component {
  componentDidMount() {
    this.props.handleInitialData();
  }

  render() {
    return (
      <div className='test'>
        Hello, TriCiti.es!
      </div>
    );
  }
}

App.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  handleInitialData: PropTypes.func.isRequired,
}

const mapStateToProps = ({ initialData }) => {
  return {
    loading: initialData.loading,
    error: initialData.error,
  }
}

const mapDispatchToProps = { handleInitialData };

export default connect(mapStateToProps, mapDispatchToProps)(App);
