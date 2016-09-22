import React from 'react';

export default class Book extends React.Component {

  render() {
    const { title, authorFirst, authorLast, length, imageURL, status } = this.props;
    console.log("props", this.props);
    return (
      <div className="side-by-side">
        <img className="bookCoverList" src={imageURL} />
        <div>
          <p>{title}</p>
          <p>{authorFirst} {authorLast} ({length} pages)</p>
          {!status && <button type="submit" className="btn btn-default btn-block">Mark as read</button>}
        </div>
      </div>
		)
	}

}
