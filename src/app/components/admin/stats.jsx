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


    const unread = Object.filter(this.props.books, book => book.status === false);
    const numUnread = Object.keys(unread).length;
    const numBooks = Object.keys(this.props.books).length;
    return (
      <div className="col-md-6">
        <h2>Book Stats Page!</h2>
        <p>{numBooks} total books</p>
        <p>{numUnread} unread books</p>
        <p>{((numBooks - numUnread)/numBooks)*100}% of books read</p>
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
