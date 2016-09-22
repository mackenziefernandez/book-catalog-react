import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {resetPasswordEmail} from '../../actions/firebase_actions';

class AddBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      isbn: '',
      title: '',
      authorFirst: '',
      authorLast: '',
      status: false,
      format: 'paperback',
      length: '',
      imageUrl: ''
    }
    this.onFormSubmit = this.onFormSubmit.bind(this);

  }

  onFormSubmit(event) {
    event.preventDefault();
    var email = this.refs.email.value;
    this.props.addBook(email).then(data => {

      if (data.payload.errorCode)
        this.setState({message: data.payload.errorMessage})
      else
        this.setState({message: "Please see your email!"})

    });

  }

  setISBN = event => this.setState({isbn:event.target.value});

  getBookInfo = () => {
    const isbn = this.state.isbn;
    console.log("searching the ISBN: " + isbn);
    // var url = 'https://www.googleapis.com/books/v1/volumes?q=isbn:' + isbn;//9780765356130';
    //
    // $http({ method: 'GET', url }).then(function successCallback(response) {
    //   if (response.data.totalItems == 0) {
    //     console.log("No books came back");
    //     // Add iframe to screen with amazon search results
    //     current.amazonURL = "http://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Dstripbooks&field-keywords="+isbn;
    //   } else {
    //     var volumeInfo = response.data.items[0].volumeInfo;
    //     if (typeof current.title == 'undefined') {current.title = volumeInfo.title;}
    //     console.log(volumeInfo);
    //     if (typeof current.authorFirst == 'undefined') {current.authorFirst = _.initial(volumeInfo.authors[0].split(" ")).join(" ");}
    //     if (typeof current.authorLast == 'undefined') {current.authorLast = _.last(volumeInfo.authors[0].split(" "));}
    //     if (typeof current.length == 'undefined') {current.length = volumeInfo.pageCount;}
    //     if (typeof current.imageURL == 'undefined') {current.imageURL = volumeInfo.imageLinks.thumbnail;}
    //   }
    // }, function errorCallback(response) {
    //   console.log(response);
    // });
  }

  render() {
    return (

      <div className="col-md-4">
        <form role="form" onSubmit={this.onFormSubmit}>
          <h4>
            {this.state.message}
          </h4>
          <div className="form-group">
            <div className="side-by-side">
              <div>
                {this.state.imageURL !== '' && <img src={this.state.imageURL} />}
              </div>
              <div>
                <div>
                  <input name='isbn' id="{{isbn}}Input" value={this.state.isbn} onChange={this.setISBN} onBlur={this.getBookInfo} placeholder="ISBN" />
                </div>
                <div>
                  <input
                    name='title'
                    value={this.state.title}
                    placeholder="Title" />
                </div>
                <div>
                  <input
                    value={this.state.authorFirst}
                    placeholder="Author First" />
                  <input
                    value={this.state.authorLast}
                    placeholder="Author Last" />
                </div>
                <div>
                  <input
                    value={this.state.length}
                    placeholder="# of Pages" />
                  <input
                    value={this.state.imageURL}
                    placeholder="Image URL" />
                </div>
                <div>
                  <input
                    id="status"
                    type="checkbox"
                    value={this.state.status} />
                  <label htmlFor="status">finished</label>
                  <input
                    type="radio"
                    ng-model="editBookCtrl.format"
                    value="paperback" />
                  <label>paperback</label>
                  <input
                    type="radio"
                    ng-model="editBookCtrl.format"
                    value="hardback" />
                  <label>hardback</label>
                </div>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-default btn-block">Save</button>
        </form>
      </div>

    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    resetPasswordEmail
  }, dispatch);
}

export default connect(null, mapDispatchToProps)(AddBook);
