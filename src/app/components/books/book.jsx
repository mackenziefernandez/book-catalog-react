import React from 'react';

export default class Book extends React.Component {

  render() {
    const { title, authorFirst, authorLast, length, imageURL } = this.props;
    console.log("props", this.props);
    return (
      <div className="side-by-side">
        <img className="bookCoverList" src={imageURL} />
        <div>
          <p>{title}</p>
          <p>{authorFirst} {authorLast} ({length} pages)</p>
        </div>
      </div>
		)
	}

}
