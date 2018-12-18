import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Menu, Search } from 'semantic-ui-react';

export class TagSearch extends Component {
    state = {
        isLoading: false,
        results: [],
        value: '',
    }

    resetComponent = () => this.setState({ isLoading: false, results: [], value: '' });

    handleResultSelect = (e, { result }) => {
        this.props.history.push(`/tags/${result.title}`);
    }
    
    handleSearchChange = (e, { value }) => {
        this.setState({ isLoading: true, value });

        setTimeout(() => {

            if (this.state.value.length < 1) return this.resetComponent();
            const re = new RegExp(_.escapeRegExp(this.state.value), 'i');
            const isMatch = result => re.test(result.title)

            this.setState({
                isLoading: false,
                results: _.filter(this.props.tags, isMatch),
            });
        }, 300);
    }

    render() {
        const { isLoading, value, results } = this.state;

        return (
            <Menu.Item>
                <Search
                    loading={isLoading}
                    onResultSelect={this.handleResultSelect}
                    onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
                    results={results}
                    value={value}
                    placeholder='Search by tag...'
                />
            </Menu.Item>
        );
    }
}

TagSearch.propTypes = {
    tags: PropTypes.array.isRequired,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
    })
}

const mapStateToProps = ({ tags }) => {
    return {
        tags,
    }
}

export const ConnectedTagSearch = connect(mapStateToProps)(TagSearch);

export default withRouter(ConnectedTagSearch);
