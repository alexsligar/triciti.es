import users from './users';
import {
    USER_LOADING,
    USER_ERROR,
    USER_SUCCESS
} from '../actions/users/getUser';
import {
    USER_LISTS_LOADING,
    USER_LISTS_ERROR,
    USER_LISTS_SUCCESS,
} from '../actions/users/getUserLists';
import {
    ADD_ITEM_TO_LIST,
    REMOVE_ITEM_FROM_LIST,
} from '../actions/listItems/toggleListItem';

const initialState = {
    getUser: {
        loading: false,
        error: null,
    },
    getUserLists: {
        loading: false,
        error: null,
    },
    user: {},
    userLists: {
        username: null,
        lists: [],
    },
};

describe('users reducer', () => {
    it('should return the correct initial state', () => {

        expect(users(undefined, {})).toEqual(initialState);
    });

    it('should handle USER_LOADING', () => {

        const action = {
            type: USER_LOADING,
        };
        const initial = {
            ...initialState,
            getUser: {
                loading: false,
                error: 'Uh oh',
            },
        };
        const expected = {
            ...initialState,
            getUser: {
                loading: true,
                error: 'Uh oh',
            },
        };
        expect(users(initial, action)).toEqual(expected);
    });

    it('should handle USER_ERROR', () => {

        const action = {
            type: USER_ERROR,
            error: 'test'
        };
        const initial = {
            ...initialState,
            getUser: {
                loading: true,
                error: null,
            },
        };
        const expected = {
            ...initialState,
            getUser: {
                loading: false,
                error: action.error,
            },
        };
        expect(users(initial, action)).toEqual(expected);
    });

    it('should handle USER_SUCCESS', () => {

        const userExample = { username: 'testuser' };
        const action = {
            type: USER_SUCCESS,
            user: userExample,
        };
        const initial = {
            ...initialState,
            getUser: {
                ...initialState.getUser,
                loading: true,
            },
        };
        const expected = {
            ...initialState,
            getUser: {
                ...initialState.getUser,
                loading: false,
            },
            user: userExample,
        };
        expect(users(initial, action)).toEqual(expected);
    });

    it('should handle USER_LISTS_LOADING', () => {

        const action = {
            type: USER_LISTS_LOADING,
        };
        const initial = {
            ...initialState,
            getUserLists: {
                loading: false,
                error: 'Uh oh',
            },
        };
        const expected = {
            ...initialState,
            getUserLists: {
                loading: true,
                error: 'Uh oh',
            },
        };
        expect(users(initial, action)).toEqual(expected);
    });

    it('should handle USER_LISTS_ERROR', () => {

        const action = {
            type: USER_LISTS_ERROR,
            error: 'test'
        };
        const initial = {
            ...initialState,
            getUserLists: {
                loading: true,
                error: null,
            },
        };
        const expected = {
            ...initialState,
            getUserLists: {
                loading: false,
                error: action.error,
            },
        };
        expect(users(initial, action)).toEqual(expected);
    });

    it('should handle USER_LISTS_SUCCESS', () => {

        const username = 'testuser';
        const lists = [{ id: 'abcd', name: 'Test List', description: 'This is a description' }];
        const action = {
            type: USER_LISTS_SUCCESS,
            username,
            lists,
        };
        const initial = {
            ...initialState,
            getUserLists: {
                ...initialState.getUserLists,
                loading: true,
                error: 'Uh oh',
            },
        };
        const expected = {
            ...initialState,
            getUserLists: {
                ...initialState.getUserLists,
                loading: false,
                error: null,
            },
            userLists: {
                username,
                lists,
            }
        };
        expect(users(initial, action)).toEqual(expected);
    });

    it('should handle ADD_ITEM_TO_LIST', () => {

        const action = {
            type: ADD_ITEM_TO_LIST,
            listId: 'abcd',
            itemId: 4,
        };
        const initial = {
            ...initialState,
            userLists: {
                username: 'testuser',
                lists: [
                    { id: 'abcd', name: 'Test List', items: [1,2,6,8] },
                    { id: 'efgh', name: 'Another List', items: [2] },   
                ]
            }
        };
        const expected = {
            ...initialState,
            userLists: {
                username: 'testuser',
                lists: [
                    { id: 'abcd', name: 'Test List', items: [1,2,6,8,4] },
                    { id: 'efgh', name: 'Another List', items: [2] },  
                ]
            },
        };
        expect(users(initial, action)).toEqual(expected);
    });

    it('should handle REMOVE_ITEM_FROM_LIST', () => {

        const action = {
            type: REMOVE_ITEM_FROM_LIST,
            listId: 'abcd',
            itemId: 6,
        };
        const initial = {
            ...initialState,
            userLists: {
                username: 'testuser',
                lists: [
                    { id: 'abcd', name: 'Test List', items: [1,2,6,8] },
                    { id: 'efgh', name: 'Another List', items: [2] },    
                ]
            }
        };
        const expected = {
            ...initialState,
            userLists: {
                username: 'testuser',
                lists: [
                    { id: 'abcd', name: 'Test List', items: [1,2,8] },
                    { id: 'efgh', name: 'Another List', items: [2] },   
                ]
            },
        };
        expect(users(initial, action)).toEqual(expected);
    });

});