import React from 'react';
import Book from './book';
import ScrollToTop from 'react-scroll-up';
require('../../styles/book.scss');

export default class BookList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='bookList'>
        { this.props.books && this.getBooks() }
        <ScrollToTop showUnder={260}>
          <span>Scroll To Top</span>
        </ScrollToTop>
      </div>
    );
	}

  getBooks() {
    let bookArray = [];
    for (var bookKey in this.props.books) {
      const book = this.props.books[bookKey];
      bookArray.push(
        <Book { ...book } key={ bookKey } id={ bookKey } />
      );
    }
    return bookArray;
  }

}
