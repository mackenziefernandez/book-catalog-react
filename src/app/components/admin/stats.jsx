import React, {Component} from 'react';
import firebase from '../../utils/firebase';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchBooks}  from '../../actions/firebase_actions';
import {fetchUser, updateUser}  from '../../actions/firebase_actions';
import Loading  from '../helpers/loading';

class Stats extends Component {
  constructor(props) {
    super(props);
    this.props.fetchUser();
    this.props.fetchBooks();
  }

  getBooks(books) {
    const bookArray = [];
    for (const bookKey in books) {
      bookArray.push(<p key={bookKey}>{books[bookKey].title}</p>);
    }
    return bookArray;
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
    const readThisYear = Object.filter(this.props.books, book => new Date(book.dateFinished).getFullYear() === 2017);
    const numUnread = Object.keys(unread).length;
    const numBooks = Object.keys(this.props.books).length;
    const numRead = numBooks - numUnread;
    const numReadThisYear = Object.keys(readThisYear).length;
    return (
      <div>
        <h2>Book Stats Page!</h2>
        <p>{numBooks} total books</p>
        <p>{numUnread} unread books, {numBooks - numUnread} books completed</p>
        <p>{(((numBooks - numUnread)/numBooks)*100).toFixed(3)}% of books read</p>
        <h2>Goal: Keep 80% of books read</h2>
        <p>{(numBooks*.8 - numRead).toFixed(0)} books to go!</p>
        <h2>Goal: Get to 1000 books read</h2>
        <p>{(1000 - numRead).toFixed(0)} books to go!</p>
        <h2>Goal: Read 50 books in 2017</h2>
        <p>{numReadThisYear} books read so far ({(50 - numReadThisYear).toFixed(0)} remaining)</p>
        <h2>Books completed this year:</h2>
        <div>{this.getBooks(readThisYear)}</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Stats);
