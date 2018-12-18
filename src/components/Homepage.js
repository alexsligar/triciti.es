import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container } from 'semantic-ui-react';

export class Homepage extends Component {
    render() {
        return (
            <Container>
                <h3>Welcome to TriCiti.es</h3>
                <ul>
                    {this.props.tags.map((tag) => {
                        return (
                            <li key={tag.title}>{tag.title}</li>
                        );
                    })}
                </ul>
            </Container>
        );
    }
}

Homepage.propTypes = {
    tags: PropTypes.array.isRequired,
}

function mapStateToProps({ tags }) {
    return {
        tags,
    }
}

export default connect(mapStateToProps)(Homepage)