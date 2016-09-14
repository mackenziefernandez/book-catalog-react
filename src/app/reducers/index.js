import { combineReducers } from 'redux';
import FireBaseUserReducer from './firebase_user_reducer';
import FireBaseBookReducer from './book_reducer';

const rootReducer = combineReducers({
    currentUser: FireBaseUserReducer,
    books: FireBaseBookReducer
});

export default rootReducer;
