import React, {Component} from 'react';
import firebase from '../../utils/firebase';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchBooks}  from '../../actions/firebase_actions';
import {fetchUser, updateUser}  from '../../actions/firebase_actions';
import Loading  from '../helpers/loading';
import Book from '../books/book';

class UnreadBooks extends Component {

  constructor(props) {
    super(props);
    this.props.fetchUser();
    this.props.fetchBooks();
    this.state = {
      message: ''
    }
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onFormSubmit(event) {
    event.preventDefault();
    var email = this.refs.email.value;
    var displayName = this.refs.displayName.value;
    this.props.updateUserProfile({email: email, displayName: displayName}).then(data => {

        if (data.payload.errorCode)
          this.setState({message: data.payload.errorMessage})
        else
          this.setState({
            message: "Updated successfuly!"
          })
      }
    )
  }

  render() {
    if (!this.props.currentUser) {
      return <Loading/>
    }

    Object.filter = (obj, predicate) =>
      Object.keys(obj)
            .filter( key => predicate(obj[key]) )
            .reduce( (res, key) => (res[key] = obj[key], res), {} );

    const beingRead = Object.filter(this.props.books, book => book.status === false);
    return (
      <div className="col-md-6">
        <h2>Unread Books</h2>
        <p>{ Object.keys(beingRead).length } unread books</p>
        { this.getBooks(beingRead) }
      </div>
    )
  }

  getBooks(books) {
    let bookArray = [];
    for (var bookKey in books) {
      const book = books[bookKey];
      bookArray.push(
        <Book { ...book } key={ bookKey } id={ bookKey } />
      );
    }
    return bookArray;
  }



}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({fetchUser, updateUser, fetchBooks}, dispatch);
}


function mapStateToProps(state) {
  return {currentUser: state.currentUser, books: state.books};
}


export default connect(mapStateToProps, mapDispatchToProps)(UnreadBooks);
