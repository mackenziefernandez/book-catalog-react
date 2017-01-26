import {
  FETCH_BOOKMARKS,
  BOOKMARK,
} from '../actions/types';

/*
A reducer is a function that takes the current state and an action, and then returns a
new state. This reducer is responsible for appState.quotes data.
See `initialstate.js` for a clear view of what it looks like!
*/

export default function (state = null, action) {
  switch (action.type) {
    case FETCH_BOOKMARKS:
      return action.payload;
    case BOOKMARK:
      return Object.assign({}, state, action.payload);
  }
  return state;
}
