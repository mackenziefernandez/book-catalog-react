import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addBook, addToWishlist, fetchGoogleAPIBookInfo} from '../../actions/firebase_actions';
import {parseAuthor} from '../../utils/parseAuthor';

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
      imageURL: ''
    }
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onFormSubmit(event) {
    event.preventDefault();
    const book = this.state;
    delete book.message;
    if (this.refs.wishlist.checked) {
      delete book.status;
      this.props.addToWishlist(book).then(data => {
        if (data.payload.errorCode)
          this.setState({message: data.payload.errorMessage})
        else
          this.setState({message: "Book successfully added!"})
      });
    } else {
      book.dateAdded = new Date().toISOString().split('T')[0];
      book.dateFinished = book.finished ? new Date().toISOString().split('T')[0] : '';
      this.props.addBook(book).then(data => {
        if (data.payload.errorCode)
          this.setState({message: data.payload.errorMessage})
        else
          this.setState({message: "Book successfully added!"})
      });
    }
  }

  setISBN = event => this.setState({isbn:event.target.value});

  getBookInfo = () => {
    this.props.fetchGoogleAPIBookInfo(this.state.isbn).then(({payload, type}) => {
      const {totalItems, items} = payload;
      if (totalItems != 0) {
        const volumeInfo = items[0].volumeInfo;
        const author = volumeInfo.authors[0];
        this.setState({
          title: volumeInfo.title || '',
          authorFirst: parseAuthor(author)[0] || '',
          authorLast: parseAuthor(author)[1] || '',
          length: volumeInfo.pageCount || '',
          imageURL: volumeInfo.imageLinks.thumbnail || ''
        });
      } else {
        const amazonUrl = `http://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Dstripbooks&field-keywords=${this.state.isbn}`;
        this.setState({message: `Google could not find any results, try ${amazonUrl}`});
      }
    });
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
                    type="radio"
                    value="paperback" />
                  <label>paperback</label>
                  <input
                    type="radio"
                    value="hardback" />
                  <label>hardback</label>
                </div>
              </div>
            </div>
          </div>
          <input id="wishlist" ref="wishlist" type="checkbox"/>
          <label htmlFor="wishlist">Wishlist?</label>
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
    fetchGoogleAPIBookInfo,
    addBook,
    addToWishlist
  }, dispatch);
}

export default connect(null, mapDispatchToProps)(AddBook);
