import React from 'react';

export default class Book extends React.Component {

  test(id) {
    console.log(id);
  }

  render() {
    const { title, authorFirst, authorLast, length, imageURL, status } = this.props;
    return (
      <div className='book'>
        <img className="bookCoverList" src={imageURL} />
        <div>
          {authorFirst} {authorLast}
          {!status && <button type="submit" className="btn btn-default btn-block" onClick={() => this.test(this.props.id)}>Mark as read</button>}
        </div>
      </div>
		)
	}

}
