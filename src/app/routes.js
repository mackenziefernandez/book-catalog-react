import React from 'react';
import  {Route, IndexRoute} from 'react-router';
import App from './components/app';

import HomeIndex from './components/index_home';
import UserLogin from './components/user/login';
import UserLogout from './components/user/logout';
// import UserRegister from './components/user/register';
import UserProfile from './components/user/profile';
import ResetPassword from './components/user/reset_password';
import AddBook from './components/admin/add_book';
import Stats from './components/admin/stats';
import UnreadBooks from './components/admin/unread_books';
import InProgress from './components/admin/in_progress';
import Wishlist from './components/wishlist';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomeIndex}/>
    <Route path="/login" component={UserLogin}/>
    <Route path="/logout" component={UserLogout}/>
    <Route path="/reset" component={ResetPassword}/>
    <Route path="/profile" component={UserProfile}/>
    <Route path="/add" component={AddBook}/>
    <Route path="/stats" component={Stats}/>
    <Route path="/unread" component={UnreadBooks}/>
    <Route path="/progress" component={InProgress}/>
    <Route path="/wishlist" component={Wishlist}/>
  </Route>

);

    // <Route path="/register" component={UserRegister}/>