import React from 'react';
import BookList from './books/bookList';
import Loading from './helpers/loading';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchWishlist}  from '../actions/firebase_actions';

class Wishlist extends React.Component {
  constructor(props) {
    super(props);
    this.props.fetchWishlist();
  }

  render() {
    return this.props.wishlist ? <BookList books={this.props.wishlist}/> : <Loading />;
  }
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({fetchWishlist}, dispatch);
}


function mapStateToProps(state) {
  return {wishlist: state.wishlist};
}

export default connect(mapStateToProps, mapDispatchToProps)(Wishlist);
