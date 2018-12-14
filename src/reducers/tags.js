import {
    ADD_TAGS
} from '../actions/tags';

export default function initialData (state = [], action) {

    switch (action.type) {
        case ADD_TAGS :
            return state.concat(action.tags)
        default :
            return state;
    }
}