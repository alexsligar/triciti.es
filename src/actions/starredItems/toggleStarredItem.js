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

export const handleAddStarredItem = itemId => {
  return async (dispatch, getState) => {
    const { token, user } = getState().authedUser;
    dispatch(addStarToItem(itemId, user.id));
    try {
      const body = JSON.stringify({
        item_id: itemId,
      });
      const response = await api('starred_items', 'POST', token, body);
      if (response.status === 201) {
        dispatch(toggleStarredItemSuccess());
      } else {
        throw new Error();
      }
    } catch {
      dispatch(removeStarFromItem(itemId, user.id));
      dispatch(
        toggleStarredItemError('Failed to star item. Please try again.')
      );
    }
  };
};

export const handleRemoveStarredItem = itemId => {
  return async (dispatch, getState) => {
    const { token, user } = getState().authedUser;
    dispatch(removeStarFromItem(itemId, user.id));
    try {
      const body = JSON.stringify({
        item_id: itemId,
      });
      const response = await api('starred_items', 'DELETE', token, body);
      if (response.status === 204) {
        dispatch(toggleStarredItemSuccess());
      } else {
        throw new Error();
      }
    } catch (err) {
      dispatch(addStarToItem(itemId, user.id));
      dispatch(
        toggleStarredItemError(
          'Failed to remove star from item. Please try again.'
        )
      );
    }
  };
};
