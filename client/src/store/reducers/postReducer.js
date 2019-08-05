import * as actionTypes from "../actions/actionTypes";

const initialState = {
  post: {},
  posts: [],
  loading: false
};

const post = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_POSTS:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
        loading: false
      };
    case actionTypes.POSTS_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
};

export default post;
