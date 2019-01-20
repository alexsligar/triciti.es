import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Header } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Dimmer, Loader, Container, Message } from 'semantic-ui-react';
import ItemForm from './ItemForm';
import { handleGetItem } from '../../actions/items/getItem';

export class EditItem extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.handleGetItem(id);
  }

  render() {
    const { loading, error, item, authedUser } = this.props;

    let content;
    if (loading === true) {
      content = (
        <Dimmer active inverted page>
          <Loader size='large'>Loading</Loader>
        </Dimmer>
      );
    } else if (error !== null) {
      content = (
        <Container>
          <Message icon='thumbs down' content={error} error />
        </Container>
      );
    } else if (!authedUser || !item.owners.includes(authedUser.username)) {
      content = (
        <Container>
          <Message
            icon='thumbs down'
            content='You are not authorized to edit this item.'
            error
          />
        </Container>
      );
    } else {
      content = (
        <Grid
          textAlign='center'
          style={{ height: '100%' }}
          verticalAlign='middle'
          className='greyBackground'
        >
          <Grid.Row>
            <Grid.Column width={6}>
              <Header as='h2' textAlign='center'>
                Edit Item
              </Header>
              <ItemForm item={item} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      );
    }
    return content;
  }
}

EditItem.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  item: PropTypes.object.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }),
  handleGetItem: PropTypes.func.isRequired,
  authedUser: PropTypes.shape({
    username: PropTypes.string.isRequired,
  }),
};

const mapStateToProps = ({ items, authedUser }) => {
  return {
    loading: items.getItem.loading,
    error: items.getItem.error,
    item: items.item,
    authedUser: authedUser.user,
  };
};

const mapDispatchToProps = { handleGetItem };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditItem);
