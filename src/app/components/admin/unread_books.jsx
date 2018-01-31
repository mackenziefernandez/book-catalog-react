import React, {Component} from 'react';
import firebase from '../../utils/firebase';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchBooks, fetchUser, updateUser}  from '../../actions/firebase_actions';
import Loading  from '../helpers/loading';
import BookList from '../books/bookList';

class UnreadBooks extends Component {

  constructor(props) {
    super(props);
    this.props.fetchUser();
    this.props.fetchBooks();
  }

  render() {
    if (!this.props.currentUser) {
      return <Loading/>
    }

    Object.filter = (obj, predicate) =>
      Object.keys(obj)
            .filter( key => predicate(obj[key]) )
            .reduce( (res, key) => (res[key] = obj[key], res), {} );

    const unread = Object.filter(this.props.books, book => book.status === false);
    return (
      <div>
        <h2>Unread Books</h2>
        <p>{ Object.keys(unread).length } unread books</p>
        { <BookList books={ unread } /> }
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({fetchUser, updateUser, fetchBooks}, dispatch);
}

function mapStateToProps(state) {
  return {currentUser: state.currentUser, books: state.books};
}

export default connect(mapStateToProps, mapDispatchToProps)(UnreadBooks);
