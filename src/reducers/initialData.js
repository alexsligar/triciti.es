import {
  INITIAL_DATA_LOADING,
  INITIAL_DATA_SUCCESS,
  INITIAL_DATA_ERROR,
} from '../actions/initialData';

const initialState = {
  loading: true,
  error: null,
};

export default function initialData(state = initialState, action) {
  switch (action.type) {
    case INITIAL_DATA_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case INITIAL_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case INITIAL_DATA_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
}
