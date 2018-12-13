import React, { Component } from 'react';
import { connect } from 'react-redux';

export class App extends Component {
  render() {
    return (
      <div className='test'>
        Hello, TriCiti.es!
      </div>
    );
  }
}

export default connect()(App);
