import React, { Component } from 'react';
import { connect } from 'react-redux';
//import PropTypes from 'prop-types';
import { Container } from 'semantic-ui-react';

export class Homepage extends Component {
    render() {
        return (
            <Container>
                <h3>Welcome to TriCiti.es</h3>
            </Container>
        );
    }
}

//Homepage.propTypes = {}

export default connect()(Homepage)