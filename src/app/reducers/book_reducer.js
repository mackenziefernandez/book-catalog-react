import {
  FETCH_BOOKS,
  ADD_BOOK
} from '../actions/types';

/*
A reducer is a function that takes the current state and an action, and then returns a
new state. This reducer is responsible for appState.quotes data.
See `initialstate.js` for a clear view of what it looks like!
*/

export default function (state = null, action) {
  switch (action.type) {
    case FETCH_BOOKS:
      return action.payload;
    case ADD_BOOK:
      return action.payload;

  }
  return state;
}
