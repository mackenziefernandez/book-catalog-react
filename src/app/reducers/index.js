import { combineReducers } from 'redux';
import FireBaseUserReducer from './firebase_user_reducer';
import FireBaseBookReducer from './book_reducer';
import FireBaseBookmarkReducer from './bookmark_reducer';

const rootReducer = combineReducers({
    currentUser: FireBaseUserReducer,
    books: FireBaseBookReducer,
    bookmarks: FireBaseBookmarkReducer
});

export default rootReducer;
