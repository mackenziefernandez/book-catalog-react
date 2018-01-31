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

  orderByDate(booksObject) {
    // convert object into array
    let sortable=[];
    for (let key in booksObject) {
      if(booksObject.hasOwnProperty(key)) {
        sortable.push([key, new Date(booksObject[key].dateFinished)]); // each item is an array in format [key, value]
      }
    }

    // sort items by value
    sortable.sort(function(a, b)
    {
      return a[1]-b[1]; // compare numbers
    });
    return this.toObject(sortable, booksObject); // array in format [ [ key1, val1 ], [ key2, val2 ], ... ]
  }

  toObject(arr, booksObject) {
    let rv = {};
    for (let i = 0; i < arr.length; ++i) {
      rv[arr[i][0]] = booksObject[arr[i][0]];
    }
    return rv;
  }

  getWeekNumber() {
    // Copy date so don't modify original
    let d = new Date();
    d.setHours(0,0,0,0);
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    d.setDate(d.getDate() + 4 - (d.getDay()||7));
    // Get first day of year
    const yearStart = new Date(d.getFullYear(),0,1);
    // Calculate full weeks to nearest Thursday
    const weekNumber = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
    // Return array of year and week number
    return weekNumber;
  }

  getISOWeeks() {
    const y = new Date().getFullYear();
    var d, isLeap;

    d = new Date(y, 0, 1);
    isLeap = new Date(y, 1, 29).getMonth() === 1;

    //check for a Jan 1 that's a Thursday or a leap year that has a 
    //Wednesday jan 1. Otherwise it's 52
    return d.getDay() === 4 || isLeap && d.getDay() === 3 ? 53 : 52
  }

  render() {
    const thisYear = new Date().getFullYear();
    if (!this.props.currentUser) {
      return <Loading/>
    }
    Object.filter = (obj, predicate) =>
      Object.keys(obj)
            .filter( key => predicate(obj[key]) )
            .reduce( (res, key) => (res[key] = obj[key], res), {} );

    const unread = Object.filter(this.props.books, book => book.status === false);
    const readThisYear = Object.filter(this.props.books, book => new Date(book.dateFinished).getFullYear() === thisYear && book.dateFinished != book.dateAdded);
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
        <h2>Goal: Keep 82% of books read</h2>
        <p>{(numBooks*.82 - numRead).toFixed(0)} books to go!</p>
        <h2>{`Goal: Read 50 books in ${thisYear}`}</h2>
        <p>{numReadThisYear} books read so far</p>
        <p>({(50 - numReadThisYear).toFixed(0)} books remaining with {this.getISOWeeks() - this.getWeekNumber(new Date())} weeks to go)</p>
        <h2>Books completed this year:</h2>
        <div>{this.getBooks(this.orderByDate(readThisYear))}</div>
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
