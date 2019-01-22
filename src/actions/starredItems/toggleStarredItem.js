import api from '../../api';

export const TOGGLE_STARRED_ITEM_ERROR = 'TOGGLE_STARRED_ITEM_ERROR';
export const TOGGLE_STARRED_ITEM_SUCCESS = 'TOGGLE_STARRED_ITEM_SUCCESS';
export const ADD_STAR_TO_ITEM = 'ADD_STAR_TO_ITEM';
export const REMOVE_STAR_FROM_ITEM = 'REMOVE_STAR_FROM_ITEM';

const toggleStarredItemError = error => {
  return {
    type: TOGGLE_STARRED_ITEM_ERROR,
    error,
  };
};

const toggleStarredItemSuccess = () => {
  return {
    type: TOGGLE_STARRED_ITEM_SUCCESS,
  };
};

const addStarToItem = (itemId, userId) => {
  return {
    type: ADD_STAR_TO_ITEM,
    itemId,
    userId,
  };
};

const removeStarFromItem = (itemId, userId) => {
  return {
    type: REMOVE_STAR_FROM_ITEM,
    itemId,
    userId,
  };
};

export const handleAddStarredItem = (itemId, userId) => {
  return async (dispatch, getState) => {
    dispatch(addStarToItem(itemId, userId));
    try {
      const { token } = getState().authedUser;
      const body = JSON.stringify({
        item_id: itemId,
        user_id: userId,
      });
      const response = await api('/starreditems', 'POST', token, body);
      if (response.status === 201) {
        dispatch(toggleStarredItemSuccess());
      } else {
        throw new Error();
      }
    } catch {
      dispatch(removeStarFromItem(itemId, userId));
      dispatch(
        toggleStarredItemError('Failed to star item. Please try again.')
      );
    }
  };
};

export const handleRemoveStarredItem = (itemId, userId) => {
  return async (dispatch, getState) => {
    dispatch(removeStarFromItem(itemId, userId));
    try {
      const { token } = getState().authedUser;
      const body = JSON.stringify({
        item_id: itemId,
        user_id: userId,
      });
      const response = await api('starreditems', 'DELETE', token, body);
      if (response.status === 204) {
        dispatch(toggleStarredItemSuccess());
      } else {
        throw new Error();
      }
    } catch (err) {
      dispatch(addStarToItem(itemId, userId));
      dispatch(
        toggleStarredItemError(
          'Failed to remove star from item. Please try again.'
        )
      );
    }
  };
};
