import React from 'react';
import BookList from './books/bookList';
import Loading from './helpers/loading';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchBooks}  from '../actions/firebase_actions';

export default class HomeIndex extends React.Component {
  constructor(props) {
    super(props);
    this.props.fetchBooks();
  }

  render() {
    return this.props.books ? <BookList {...this.props}/> : <Loading />;
  }
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({fetchBooks}, dispatch);
}


function mapStateToProps(state) {
  return {books: state.books};
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeIndex);
