import { combineReducers } from 'redux';
import FireBaseUserReducer from './firebase_user_reducer';
import FireBaseBookReducer from './book_reducer';
import FireBaseBookmarkReducer from './bookmark_reducer';
import FireBaseWishlistReducer from './wishlist_reducer';

const rootReducer = combineReducers({
    currentUser: FireBaseUserReducer,
    books: FireBaseBookReducer,
    bookmarks: FireBaseBookmarkReducer,
    wishlist: FireBaseWishlistReducer
});

export default rootReducer;
