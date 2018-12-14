import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Dimmer, Loader, Header, Icon } from 'semantic-ui-react';
import { Router } from 'react-router-dom';
import history from '../history';
import Routes from './Routes';
import Navbar from './Navbar';
import { handleInitialData } from '../actions/initialData';

export class App extends Component {
  componentDidMount() {
    this.props.handleInitialData();
  }

  render() {
    const { loading, error } = this.props;
    let content;

    if (loading === true) {
      content = (
        <Dimmer active inverted page>
          <Loader size='large'>Loading</Loader>
        </Dimmer>
      );
    } else if (error !== null) {
      content = (
        <Dimmer active page>
          <Header as='h2' inverted icon>
            <Icon name='thumbs down' />
            {error}
          </Header>
        </Dimmer>
      );
    } else {
      content = (
        <Fragment>
          <Navbar />
          <Routes />
        </Fragment>
      );
    }

    return (
      <Router history={history}>
        {content}
      </Router>
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
