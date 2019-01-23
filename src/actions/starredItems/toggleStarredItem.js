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

const addStarToItem = (item, username) => {
  return {
    type: ADD_STAR_TO_ITEM,
    item,
    username,
  };
};

const removeStarFromItem = (itemId, username) => {
  return {
    type: REMOVE_STAR_FROM_ITEM,
    itemId,
    username,
  };
};

export const handleAddStarredItem = item => {
  return async (dispatch, getState) => {
    const { token, user } = getState().authedUser;
    dispatch(addStarToItem(item, user.username));
    try {
      const body = JSON.stringify({
        item_id: item.id,
      });
      const response = await api('starred_items', 'POST', token, body);
      if (response.status === 201) {
        dispatch(toggleStarredItemSuccess());
      } else {
        throw new Error();
      }
    } catch {
      dispatch(removeStarFromItem(item.id, user.username));
      dispatch(
        toggleStarredItemError('Failed to star item. Please try again.')
      );
    }
  };
};

export const handleRemoveStarredItem = item => {
  return async (dispatch, getState) => {
    const { token, user } = getState().authedUser;
    dispatch(removeStarFromItem(item.id, user.username));
    try {
      const body = JSON.stringify({
        item_id: item.id,
      });
      const response = await api('starred_items', 'DELETE', token, body);
      if (response.status === 204) {
        dispatch(toggleStarredItemSuccess());
      } else {
        throw new Error();
      }
    } catch (err) {
      dispatch(addStarToItem(item, user.username));
      dispatch(
        toggleStarredItemError(
          'Failed to remove star from item. Please try again.'
        )
      );
    }
  };
};
