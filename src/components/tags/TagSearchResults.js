import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid, Icon, Dimmer, Header, Loader, Card } from 'semantic-ui-react';
import TagSearch from './TagSearch';
import { handleTagSearch } from '../../actions/items';
import ItemCard from '../items/ItemCard';

export class TagSearchResults extends Component {
    componentDidMount() {
        const { tag } = this.props.match.params;
        this.props.handleTagSearch(tag);
    }

    componentDidUpdate(prevProps) {
        const { tag } = this.props.match.params;
        if (prevProps.match.params.tag !== tag) {
            this.props.handleTagSearch(tag);
        }
    }

    render() {
        let content;
        if (this.props.itemsError) {
            content = (
                <Dimmer active page>
                    <Header as='h2' icon>
                        <Icon name='thumbs down' />
                        {this.props.itemsError}
                    </Header>
                </Dimmer>
            );
        } else {
            const { tag } = this.props.match.params;
            content = (
                <Dimmer.Dimmable blurring dimmed={this.props.itemsLoading}>
                    <Grid>
                        <Grid.Row centered>
                            <Grid.Column width={5} textAlign='center'>
                                <Icon name='tag' size='big' /><TagSearch initialValue={tag} />
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row centered>
                            <Grid.Column width={8}>
                                <Header as='h3' textAlign='center'>
                                    {this.props.items.length} Item{this.props.items.length === 1 ? null : 's'} Found
                                </Header>
                                <Card.Group itemsPerRow={3}>
                                    {this.props.items.map((item) => {
                                        return (
                                            <ItemCard
                                                key={item.id}
                                                name={item.name}
                                                type={item.type}
                                                location={item.location}
                                                start_date={item.start_date}
                                                end_date={item.end_date}
                                            />
                                        );
                                    })}
                                </Card.Group>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>

                    <Dimmer active={this.props.itemsLoading} inverted>
                        <Loader size='large'>Loading</Loader>
                    </Dimmer>
                </Dimmer.Dimmable>
            )
        }
        return content;
    }
}

TagSearchResults.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            tag: PropTypes.string,
        })
    }),
    itemsError: PropTypes.string,
    itemsLoading: PropTypes.bool.isRequired,
    items: PropTypes.array,
    handleTagSearch: PropTypes.func.isRequired,
}

const mapStateToProps = ({ items }) => {
    return {
        itemsError: items.error,
        itemsLoading: items.loading,
        items: items.items,
    }
}

const mapDispatchToProps = { handleTagSearch };

export default connect(mapStateToProps, mapDispatchToProps)(TagSearchResults);
