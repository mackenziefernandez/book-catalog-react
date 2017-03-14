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

function mapStateToProps(state) {
  return { currentUser: state.currentUser };
}

class Book extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    }
  }

  markRead(id) {
    this.props.markRead(id);
  }

  getBookActions(status, beingRead) {
    return (
      <div>
        {!status && <button type="submit" className="btn btn-default btn-block" onClick={() => this.markRead(this.props.id)}>Mark as read</button>}
        {!beingRead && !status && <button type="submit" className="btn btn-default btn-block" onClick={() => this.props.markBeingRead(this.props.id)}>Reading</button>}
      </div>
    )
  }

  render() {
    const { title, authorFirst, authorLast, length, imageURL, status, beingRead } = this.props;
    return (
      <div className='book' onMouseEnter={() => this.setState({ show: true })}
                                onMouseLeave={() => this.setState({ show: false })}>
        <img className={`bookCover ${this.state.show ? 'hover' : ''}`} src={imageURL} />
        <div className={`bookInfo ${this.state.show ? '' : 'behind'}`}>
          {title} by {authorFirst} {authorLast}
          { this.props.currentUser && this.props.currentUser.uid == 'zjZzerHEdqSXFwyi0QOH16hdoNu2' && this.getBookActions(status, beingRead)}
          ({ length } pages)
        </div>
      </div>
		)
	}

}

export default connect(mapStateToProps, mapDispatchToProps)(Book);
