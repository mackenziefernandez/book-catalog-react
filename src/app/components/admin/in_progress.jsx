import React, {Component} from 'react';
import firebase from '../../utils/firebase';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchBooks}  from '../../actions/firebase_actions';
import {fetchUser, updateUser}  from '../../actions/firebase_actions';
import Loading  from '../helpers/loading';
import BookList from '../books/bookList';

class InProgress extends Component {

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

    const beingRead = Object.filter(this.props.books, book => book.beingRead === true);
    return (
      <div>
        <h2>Books In Progress</h2>
        <p>{ Object.keys(beingRead).length } books being read</p>
        <BookList books={beingRead} />
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

export default connect(mapStateToProps, mapDispatchToProps)(InProgress);
