import React, {Component} from 'react';
import firebase from '../../utils/firebase';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {bookmark, fetchBooks, fetchBookmarks, fetchUser, updateUser}  from '../../actions/firebase_actions';
import Loading  from '../helpers/loading';
import Book from '../books/book';

class InProgress extends Component {

  constructor(props) {
    super(props);
    this.props.fetchUser();
    this.props.fetchBooks();
    this.props.fetchBookmarks();
    this.state = { inputVal: "" };
  }

  onChangeBookmark = (event) => {
    this.setState({inputVal: event.target.value});
  }

  getBooks = (booklist) => {
    let bookArray = [];
    let totalPages = 0;
    let readPages = 0;
    for (const key in booklist) {
      const book = this.props.books[key];
      totalPages += book.length;
      readPages += this.props.bookmarks[key];
      bookArray.push(
        <div>
          <Book { ...book } key={ key } id={ key } />
          <div className='bookList'>
            <input id={`bookmark${key}`} name={`bookmark${key}`} type='number'
            defaultValue={this.props.bookmarks[key]} onChange={ this.onChangeBookmark } 
            onBlur={() => { 
              this.props.bookmark(key, this.state.inputVal); 
              this.setState({}); }} />
              <p>/{book.length} ({(this.props.bookmarks[key]/book.length * 100).toFixed()}%)</p>
          </div>
        </div>
      );
    }
    return (
      <div>
        <div>{totalPages} pages ({totalPages - readPages} to go)</div>
        <div className='bookList'>{bookArray}</div>
      </div>
      );
  }

  render() {
    if (!this.props.currentUser) {
      return <Loading/>
    }

    Object.filter = (obj, predicate) =>
      Object.keys(obj)
            .filter( key => predicate(obj[key]) )
            .reduce( (res, key) => (res[key] = obj[key], res), {} );

    const beingRead = Object.filter(this.props.books, book => book.beingRead === true);
    return (
      <div>
        <h2>{ Object.keys(beingRead).length } Book{Object.keys(beingRead).length === 1 ? '' : 's'} In Progress</h2>
        <div className='bookList'>
          {this.props.books && this.props.bookmarks && this.getBooks(beingRead)}
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({fetchUser, updateUser, fetchBooks, fetchBookmarks, bookmark}, dispatch);
}

function mapStateToProps(state) {
  return {currentUser: state.currentUser, books: state.books, bookmarks: state.bookmarks};
}

export default connect(mapStateToProps, mapDispatchToProps)(InProgress);
