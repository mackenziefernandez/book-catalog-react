import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchGoogleAPIBookInfo} from '../../actions/firebase_actions';
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
    this.props.fetchGoogleAPIBookInfo(this.state.isbn).then(({payload, type}) => {
      const {totalItems, items} = payload;
      if (totalItems != 0) {
        const volumeInfo = items[0].volumeInfo;
        const author = volumeInfo.authors[0];
        this.setState({
          title: volumeInfo.title || '',
          authorFirst: parseAuthor(author)[0] || '',
          authorLast: parseAuthor(author)[1] || '',
          length: volumeInfo.pageCount || ''//,
          // imageUrl: volumeInfo.imageLinks.thumbnail || ''
        });
      } else {
        this.setState({message: 'Google could not find any results'});
      }
    });
    const amazonUrl = `http://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Dstripbooks&field-keywords=${this.state.isbn}`;
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
    fetchGoogleAPIBookInfo
  }, dispatch);
}

export default connect(null, mapDispatchToProps)(AddBook);
