import FireBaseTools from '../utils/firebase';
import {
  LOGIN_WITH_PROVIDER_FIREBASE,
  REGISTER_FIREBASE_USER,
  LOGIN_FIREBASE_USER,
  FETCH_FIREBASE_USER,
  FETCH_BOOKS,
  FETCH_BOOKMARKS,
  FETCH_WISHLIST,
  BOOKMARK,
  FETCH_GOOGLE_API_BOOK_INFO,
  ADD_BOOK,
  ADD_TO_WISHLIST,
  MARK_READ,
  MARK_BEING_READ,
  UPDATE_FIREBASE_USER,
  CHANGE_FIREBASE_USER_PASSWORD,
  FIREBASE_PASSWORD_RESET_EMAIL,
  LOGOUT_FIREBASE_USER
} from './types';


export function loginWithProvider(provider) {
  const request = FireBaseTools.loginWithProvider(provider);
  return {
    type: LOGIN_WITH_PROVIDER_FIREBASE,
    payload: request
  }
}

export function registerUser(user) {
  const request = FireBaseTools.registerUser(user);
  return {
    type: REGISTER_FIREBASE_USER,
    payload: request
  }
}

export function loginUser(user) {
  const request = FireBaseTools.loginUser(user);
  return {
    type: LOGIN_FIREBASE_USER,
    payload: request
  }
}

export function fetchUser() {
  const request = FireBaseTools.fetchUser();
  return {
    type: FETCH_FIREBASE_USER,
    payload: request
  }
}

export function fetchBooks() {
  const request = FireBaseTools.fetchBooks();
  return {
    type: FETCH_BOOKS,
    payload: request
  }
}

export function fetchBookmarks() {
  const request = FireBaseTools.fetchBookmarks();
  return {
    type: FETCH_BOOKMARKS,
    payload: request
  }
}

export function fetchWishlist() {
  const request = FireBaseTools.fetchWishlist();
  return {
    type: FETCH_WISHLIST,
    payload: request
  }
}

export function fetchGoogleAPIBookInfo(isbn) {
  const request = FireBaseTools.fetchGoogleAPIBookInfo(isbn);
  return {
    type: FETCH_GOOGLE_API_BOOK_INFO,
    payload: request
  }
}

export function addBook(book) {
  const request = FireBaseTools.addBook(book);
  return {
    type: ADD_BOOK,
    payload: request
  }
}

export function addToWishlist(book) {
  const request = FireBaseTools.addToWishlist(book);
  return {
    type: ADD_TO_WISHLIST,
    payload: request
  }
}

export function markRead(bookId) {
  const request = FireBaseTools.markRead(bookId);
  return {
    type: MARK_READ,
    payload: request
  }
}

export function markBeingRead(bookId) {
  const request = FireBaseTools.markBeingRead(bookId);
  return {
    type: MARK_BEING_READ,
    payload: request
  }
}

export function bookmark(bookId, page) {
  const request = FireBaseTools.bookmark(bookId, page);
  return {
    type: BOOKMARK,
    payload: request
  }
}

export function updateUser(user) {
  const request = FireBaseTools.updateUserProfile(user);
  return {
    type: UPDATE_FIREBASE_USER,
    payload: request
  }
}

export function changePassword(newPassword) {
  const request = FireBaseTools.changePassword(newPassword);
  return {
    type: CHANGE_FIREBASE_USER_PASSWORD,
    payload: request
  }
}

export function resetPasswordEmail(email) {
  const request = FireBaseTools.resetPasswordEmail(email);
  return {
    type: FIREBASE_PASSWORD_RESET_EMAIL,
    payload: request
  }
}

export function logoutUser(user) {
  const request = FireBaseTools.logoutUser(user);
  return {
    type: LOGOUT_FIREBASE_USER,
    payload: request
  }
}
