import {
  FETCH_BOOKS,
  FETCH_GOOGLE_API_BOOK_INFO,
  ADD_BOOK,
  ADD_TO_WISHLIST,
  MARK_READ,
  MARK_BEING_READ
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
    case FETCH_GOOGLE_API_BOOK_INFO:
      return action.payload;
    case ADD_BOOK: {
      const newBookState = {};
      newBookState[action.payload[1]] = action.payload[0];
      return Object.assign({}, state, newBookState);
    }
    case ADD_TO_WISHLIST:
      return state;
    case MARK_READ:
      return action.payload;
    case MARK_BEING_READ:
      return action.payload;
  }
  return state;
}
