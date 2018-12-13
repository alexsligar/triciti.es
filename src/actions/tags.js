export const ADD_TAGS = 'ADD_TAGS';

export const addTags = (tags) => {
    return {
        type: ADD_TAGS,
        tags,
    }
}