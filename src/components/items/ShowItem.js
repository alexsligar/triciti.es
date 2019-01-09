import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Dimmer, Loader, Message } from 'semantic-ui-react';
import { handleGetItem } from '../../actions/items/getItem';
import ItemHeader from './ItemHeader';
import ItemOptions from './ItemOptions';
import ItemDetails from './ItemDetails';
import AddListItem from '../listItems/AddListItem';

export class ShowItem extends Component {

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
                    <Message 
                        icon='thumbs down'
                        content={error}
                        error
                    />
                </Container>
            );
        } else {
            content = (
                <Container textAlign='center'>
                    <ItemHeader item={item} />
                    {authedUser && item.owners.includes(authedUser.username) && <ItemOptions item={item} />}
                    <ItemDetails item={item} />
                    {authedUser && <AddListItem />}
                </Container>
            );
        }

        return content;
    }
}

ShowItem.propTypes = {
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string,
    item: PropTypes.object.isRequired,
    authedUser: PropTypes.shape({
        username: PropTypes.string,
    }),
    handleGetItem: PropTypes.func.isRequired,
    match: PropTypes.shape({
        params: PropTypes.shape({
            id: PropTypes.string.isRequired,
        })
    }),
}

const mapStateToProps = ({ items, authedUser }) => {
    return {
        loading: items.getItem.loading,
        error: items.getItem.error,
        item: items.item,
        authedUser,
    }
};

const mapDispatchToProps = { handleGetItem };

export default connect(mapStateToProps, mapDispatchToProps)(ShowItem);
