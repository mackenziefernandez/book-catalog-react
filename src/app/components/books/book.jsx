import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { markRead, markBeingRead }  from '../../actions/firebase_actions';

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    markRead,
    markBeingRead
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
    const { title, authorFirst, authorLast, length, imageURL, status, beingRead } = this.props;
    return (
      <div className='book'>
        <img className="bookCoverList" src={imageURL} />
        <div>
          {authorFirst} {authorLast}
          {!status && <button type="submit" className="btn btn-default btn-block" onClick={() => this.markRead(this.props.id)}>Mark as read</button>}
          {!beingRead && !status && <button type="submit" className="btn btn-default btn-block" onClick={() => this.props.markBeingRead(this.props.id)}>Reading</button>}
        </div>
      </div>
		)
	}

}

export default connect(null, mapDispatchToProps)(Book);
