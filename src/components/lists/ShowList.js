import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Dimmer, Loader, Container, Message } from 'semantic-ui-react';
import { handleGetList } from '../../actions/lists/getList';
import ListHeader from './ListHeader';
import ListOptions from './ListOptions';
import ListItems from './ListItems';

export class ShowList extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.handleGetList(id);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      const { id } = this.props.match.params;
      this.props.handleGetList(id);
    }
  }

  render() {
    const { loading, error, list, authedUser } = this.props;
    let content;
    if (
      loading ||
      (error === null &&
        (list.name === undefined || list.id !== this.props.match.params.id))
    ) {
      content = (
        <Dimmer active inverted page>
          <Loader size='large'>Loading</Loader>
        </Dimmer>
      );
    } else if (error) {
      content = (
        <Container>
          <Message icon='thumbs down' content={error} error />
        </Container>
      );
    } else {
      content = (
        <Container>
          <ListHeader list={list} />
          {authedUser && list.owner === authedUser.username && (
            <ListOptions list={list} />
          )}
          {list.items.length > 0 && <ListItems items={list.items} />}
        </Container>
      );
    }
    return content;
  }
}

ShowList.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  list: PropTypes.object.isRequired,
  handleGetList: PropTypes.func.isRequired,
  authedUser: PropTypes.shape({
    username: PropTypes.string,
  }),
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }),
  updateProcessing: PropTypes.bool.isRequired,
  updateError: PropTypes.string,
};

const mapStateToProps = ({ lists, authedUser }) => {
  return {
    loading: lists.getList.loading,
    error: lists.getList.error,
    list: lists.list,
    updateProcessing: lists.updateList.processing,
    updateError: lists.updateList.error,
    authedUser: authedUser.user,
  };
};

const mapDispatchToProps = { handleGetList };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShowList);
