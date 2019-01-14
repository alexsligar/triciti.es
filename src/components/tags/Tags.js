import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import {
  Container,
  Grid,
  Icon,
  Header,
  Search,
  Label,
  Dimmer,
  Loader,
  Message,
} from 'semantic-ui-react';
import UpdateTag from './UpdateTag';
import AddTag from './AddTag';
import { handleGetTags } from '../../actions/tags/getTags';

export class Tags extends Component {
  state = {
    isLoading: false,
    results: [],
    value: '',
  };

  resetComponent = () =>
    this.setState({ isLoading: false, results: [], value: '' });

  handleResultSelect = (e, { result }) => {
    this.setState({ value: result.title });
    this.handleSearchChange(e, { value: result.title });
  };

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent();
      const re = new RegExp(_.escapeRegExp(this.state.value), 'i');
      const isMatch = result => re.test(result.title);

      this.setState({
        isLoading: false,
        results: _.filter(this.props.tags, isMatch),
      });
    }, 300);
  };

  componentDidMount() {
    this.props.handleGetTags();
  }

  render() {
    if (this.props.loading) {
      return (
        <Dimmer active inverted page>
          <Loader size='large'>Loading</Loader>
        </Dimmer>
      );
    } else if (this.props.error) {
      return (
        <Container>
          <Message negative>
            <Message.Header>
              Sorry, there was an error loading the tags. Please try again.
            </Message.Header>
          </Message>
        </Container>
      );
    }

    const { isLoading, value, results } = this.state;
    let displayed = results;
    if (results.length === 0) displayed = this.props.tags;

    return (
      <Container>
        <Grid>
          <Grid.Row centered>
            <Header as='h2'>
              <Icon name='tag' size='large' />
              Tags
            </Header>
          </Grid.Row>
          {this.props.authedUserAdmin && (
            <Grid.Row centered>
              <AddTag />
            </Grid.Row>
          )}
          <Grid.Row centered>
            <Search
              loading={isLoading}
              onResultSelect={this.handleResultSelect}
              onSearchChange={_.debounce(this.handleSearchChange, 500, {
                leading: true,
              })}
              results={results}
              value={value}
              placeholder='Filter tags...'
            />
          </Grid.Row>
          <Grid.Row centered>
            <Label.Group>
              {displayed.map(tag => {
                if (this.props.authedUserAdmin) {
                  return <UpdateTag key={tag.title} title={tag.title} />;
                } else {
                  return (
                    <Link key={tag.title} to={'/tags/' + tag.title}>
                      <Label tag size='large'>
                        {tag.title}
                      </Label>
                    </Link>
                  );
                }
              })}
            </Label.Group>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

Tags.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  tags: PropTypes.array.isRequired,
  authedUserAdmin: PropTypes.bool.isRequired,
  handleGetTags: PropTypes.func.isRequired,
};

const mapStateToProps = ({ tags, authedUser }) => {
  return {
    loading: tags.getTags.loading,
    error: tags.getTags.error,
    tags: tags.tags,
    authedUserAdmin: authedUser && authedUser.role === 'admin',
  };
};

const mapDispatchToProps = { handleGetTags };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tags);
