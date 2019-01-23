import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Homepage from '../Homepage';
import Register from '../users/Register';
import Login from '../Login';
import TagSearchResults from '../tags/TagSearchResults';
import Tags from '../tags/Tags';
import AddItem from '../items/AddItem';
import EditItem from '../items/EditItem';
import ShowItem from '../items/ShowItem';
import ShowList from '../lists/ShowList';
import NoMatch from '../universal/NoMatch';
import userIsNotAuthenticated from './userIsNotAuthenticated';
import userIsAuthenticated from './userIsAuthenticated';

export default function Routes() {
  return (
    <Switch>
      <Route exact path='/' component={Homepage} />
      <Route path='/login' component={userIsNotAuthenticated(Login)} />
      <Route path='/register' component={userIsNotAuthenticated(Register)} />
      <Route path='/tags/:tag' component={TagSearchResults} />
      <Route path='/tags' component={Tags} />
      <Route path='/items/add' component={userIsAuthenticated(AddItem)} />
      <Route path='/items/:id/edit' component={userIsAuthenticated(EditItem)} />
      <Route path='/items/:id' component={ShowItem} />
      <Route path='/lists/:id' component={ShowList} />
      <Route component={NoMatch} />
    </Switch>
  );
}
