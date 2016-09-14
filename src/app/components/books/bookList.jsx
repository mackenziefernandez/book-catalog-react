import React from 'react';
import Book from './book';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchBooks}  from '../../actions/firebase_actions';

class BookList extends React.Component {
  constructor(props) {
    super(props);
    this.props.fetchBooks();
    this.state = {
      message: ''
    }
  }

  render() {
    return (
      <div>
        {this.props.books ? this.getBooks() : "loading ..."}
      </div>
    );
	}

  getBooks() {
    let bookArray = [];
    for (var bookKey in this.props.books) {
      const book = this.props.books[bookKey];
      bookArray.push(
        <Book authorFirst={book.authorFirst} imageURL={book.imageURL} authorLast={book.authorLast} title={book.title} length={book.length} />
      );
    }
    return bookArray;
  }

}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({fetchBooks}, dispatch);
}


function mapStateToProps(state) {
  return {books: state.books};
}


export default connect(mapStateToProps, mapDispatchToProps)(BookList);
