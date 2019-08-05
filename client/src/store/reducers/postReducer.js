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
    case actionTypes.GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false
      };
    case actionTypes.GET_POST:
      return {
        ...state,
        post: action.payload,
        loading: false
      };
    case actionTypes.POSTS_LOADING:
      return {
        ...state,
        loading: true
      };
    case actionTypes.DELETE_POST:
      const updatedPosts = [...state.posts];

      const updatedPostIndex = updatedPosts
        .map(post => post._id)
        .indexOf(action.payload);

      updatedPosts.splice(updatedPostIndex, 1);

      return {
        ...state,
        posts: updatedPosts
      };
    default:
      return state;
  }
};

export default post;
