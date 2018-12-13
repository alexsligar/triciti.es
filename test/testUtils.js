import { createStore } from 'redux';

import middleware from '../src/middleware';
import rootReducer from '../src/reducers';

export const storeFactory  = (initialState) => {
    return createStore(rootReducer, initialState, middleware);
}