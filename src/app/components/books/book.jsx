import React from 'react';

export default class Book extends React.Component {

  render() {
    const { title, authorFirst, authorLast, length, imageURL, status } = this.props;
    return (
      <div className='book'>
        <img className="bookCoverList" src={imageURL} />
        <div>
          {!status && <button type="submit" className="btn btn-default btn-block">Mark as read</button>}
        </div>
      </div>
		)
	}

}
