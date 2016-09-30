import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { markRead }  from '../../actions/firebase_actions';
// import store from '../../stores/index';
// import actions from '../../actions/index';

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    markRead
  }, dispatch);
}

class Book extends React.Component {
  constructor(props) {
    super(props);
  }

  markRead(id) {
    this.props.markRead(id);
  }

  render() {
    const { title, authorFirst, authorLast, length, imageURL, status } = this.props;
    return (
      <div className='book'>
        <img className="bookCoverList" src={imageURL} />
        <div>
          {authorFirst} {authorLast}
          {!status && <button type="submit" className="btn btn-default btn-block" onClick={() => this.markRead(this.props.id)}>Mark as read</button>}
        </div>
      </div>
		)
	}

}

export default connect(null, mapDispatchToProps)(Book);
