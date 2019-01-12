import tags from './tags';
import {
  TAGS_ERROR,
  TAGS_LOADING,
  TAGS_SUCCESS,
} from '../actions/tags/getTags';
import {
  UPDATE_TAG_PROCESSING,
  UPDATE_TAG_ERROR,
  REMOVE_UPDATE_TAG_ERROR,
  UPDATE_TAG_SUCCESS,
} from '../actions/tags/updateTag';
import {
  ADD_TAG_PROCESSING,
  ADD_TAG_ERROR,
  REMOVE_ADD_TAG_ERROR,
  ADD_TAG_SUCCESS,
} from '../actions/tags/addTag';
import {
  DELETE_TAG_PROCESSING,
  DELETE_TAG_ERROR,
  REMOVE_DELETE_TAG_ERROR,
  DELETE_TAG_SUCCESS,
} from '../actions/tags/deleteTag';

const initialState = {
  getTags: {
    loading: false,
    error: null,
  },
  addTag: {
    processing: false,
    error: null,
  },
  updateTag: {
    processing: false,
    error: null,
  },
  deleteTag: {
    processing: false,
    error: null,
  },
  tags: [],
};

describe('tags reducer', () => {
  it('should return the expected initial state', () => {
    expect(tags(undefined, {})).toEqual(initialState);
  });

  it('should handle TAGS_LOADING', () => {
    const initial = {
      ...initialState,
      getTags: {
        loading: false,
        error: 'Uh oh..',
      },
    };
    const expected = {
      ...initialState,
      getTags: {
        loading: true,
        error: 'Uh oh..',
      },
    };
    const action = {
      type: TAGS_LOADING,
    };
    expect(tags(initial, action)).toEqual(expected);
  });

  it('should handle TAGS_ERROR', () => {
    const initial = {
      ...initialState,
      getTags: {
        loading: true,
        error: null,
      },
    };
    const expected = {
      ...initialState,
      getTags: {
        loading: false,
        error: 'Uh oh...',
      },
    };
    const action = {
      type: TAGS_ERROR,
      error: 'Uh oh...',
    };
    expect(tags(initial, action)).toEqual(expected);
  });

  it('should handle TAGS_SUCCESS', () => {
    const initial = {
      ...initialState,
      getTags: {
        loading: true,
        error: null,
      },
    };
    const expected = {
      ...initialState,
      getTags: {
        loading: false,
        error: null,
      },
      tags: [{ title: 'test' }],
    };
    const action = {
      type: TAGS_SUCCESS,
      tags: [{ title: 'test' }],
    };
    expect(tags(initial, action)).toEqual(expected);
  });

  it('should handle UPDATE_TAG_PROCESSING', () => {
    const initial = {
      ...initialState,
      updateTag: {
        ...initialState.updateTag,
        processing: false,
      },
    };
    const expected = {
      ...initialState,
      updateTag: {
        ...initialState.updateTag,
        processing: true,
      },
    };
    const action = {
      type: UPDATE_TAG_PROCESSING,
    };
    expect(tags(initial, action)).toEqual(expected);
  });

  it('should handle UPDATE_TAG_ERROR', () => {
    const initial = {
      ...initialState,
      updateTag: {
        processing: true,
        error: null,
      },
    };
    const expected = {
      ...initialState,
      updateTag: {
        processing: false,
        error: 'Uh oh',
      },
    };
    const action = {
      type: UPDATE_TAG_ERROR,
      error: 'Uh oh',
    };
    expect(tags(initial, action)).toEqual(expected);
  });

  it('should handle REMOVE_UPDATE_TAG_ERROR', () => {
    const initial = {
      ...initialState,
      updateTag: {
        ...initialState.updateTag,
        error: 'Uh oh',
      },
    };
    const expected = {
      ...initialState,
      updateTag: {
        ...initialState.updateTag,
        error: null,
      },
    };
    const action = {
      type: REMOVE_UPDATE_TAG_ERROR,
    };
    expect(tags(initial, action)).toEqual(expected);
  });

  it('should handle UPDATE_TAG_SUCCESS', () => {
    const initial = {
      ...initialState,
      updateTag: {
        processing: true,
        error: 'Uh oh',
      },
      tags: [{ title: 'test' }, { title: 'two' }],
    };
    const expected = {
      ...initialState,
      updateTag: {
        processing: false,
        error: null,
      },
      tags: [{ title: 'newTest' }, { title: 'two' }],
    };
    const action = {
      type: UPDATE_TAG_SUCCESS,
      oldTag: 'test',
      newTag: 'newTest',
    };
    expect(tags(initial, action)).toEqual(expected);
  });

  it('should handle ADD_TAG_PROCESSING', () => {
    const initial = {
      ...initialState,
      addTag: {
        ...initialState.addTag,
        processing: false,
      },
    };
    const expected = {
      ...initialState,
      addTag: {
        ...initialState.addTag,
        processing: true,
      },
    };
    const action = {
      type: ADD_TAG_PROCESSING,
    };
    expect(tags(initial, action)).toEqual(expected);
  });

  it('should handle ADD_TAG_ERROR', () => {
    const initial = {
      ...initialState,
      addTag: {
        processing: true,
        error: null,
      },
    };
    const expected = {
      ...initialState,
      addTag: {
        processing: false,
        error: 'Uh oh',
      },
    };
    const action = {
      type: ADD_TAG_ERROR,
      error: 'Uh oh',
    };
    expect(tags(initial, action)).toEqual(expected);
  });

  it('should handle REMOVE_ADD_TAG_ERROR', () => {
    const initial = {
      ...initialState,
      addTag: {
        ...initialState.addTag,
        error: 'Uh oh',
      },
    };
    const expected = {
      ...initialState,
      addTag: {
        ...initialState.addTag,
        error: null,
      },
    };
    const action = {
      type: REMOVE_ADD_TAG_ERROR,
    };
    expect(tags(initial, action)).toEqual(expected);
  });

  it('should handle ADD_TAG_SUCCESS', () => {
    const initial = {
      ...initialState,
      addTag: {
        processing: true,
        error: 'Uh oh',
      },
      tags: [{ title: 'test' }],
    };
    const expected = {
      ...initialState,
      addTag: {
        processing: false,
        error: null,
      },
      tags: [{ title: 'test' }, { title: 'two' }],
    };
    const action = {
      type: ADD_TAG_SUCCESS,
      tag: 'two',
    };
    expect(tags(initial, action)).toEqual(expected);
  });

  it('should handle DELETE_TAG_PROCESSING', () => {
    const initial = {
      ...initialState,
      deleteTag: {
        ...initialState.deleteTag,
        processing: false,
      },
    };
    const expected = {
      ...initialState,
      deleteTag: {
        ...initialState.deleteTag,
        processing: true,
      },
    };
    const action = {
      type: DELETE_TAG_PROCESSING,
    };
    expect(tags(initial, action)).toEqual(expected);
  });

  it('should handle DELETE_TAG_ERROR', () => {
    const initial = {
      ...initialState,
      deleteTag: {
        processing: true,
        error: null,
      },
    };
    const expected = {
      ...initialState,
      deleteTag: {
        processing: false,
        error: 'Uh oh',
      },
    };
    const action = {
      type: DELETE_TAG_ERROR,
      error: 'Uh oh',
    };
    expect(tags(initial, action)).toEqual(expected);
  });

  it('should handle REMOVE_DELETE_TAG_ERROR', () => {
    const initial = {
      ...initialState,
      deleteTag: {
        ...initialState.deleteTag,
        error: 'Uh oh',
      },
    };
    const expected = {
      ...initialState,
      deleteTag: {
        ...initialState.deleteTag,
        error: null,
      },
    };
    const action = {
      type: REMOVE_DELETE_TAG_ERROR,
    };
    expect(tags(initial, action)).toEqual(expected);
  });

  it('should handle DELETE_TAG_SUCCESS', () => {
    const initial = {
      ...initialState,
      deleteTag: {
        processing: true,
        error: 'Uh oh',
      },
      tags: [{ title: 'test' }, { title: 'two' }],
    };
    const expected = {
      ...initialState,
      deleteTag: {
        processing: false,
        error: null,
      },
      tags: [{ title: 'test' }],
    };
    const action = {
      type: DELETE_TAG_SUCCESS,
      tag: 'two',
    };
    expect(tags(initial, action)).toEqual(expected);
  });
});
