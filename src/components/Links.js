import React from 'react';

class Links extends React.Component {
  render() {
    return(
      <div id="links">
        <a onClick={ this.props.prevPic } id="prev-select" className="link" style={{cursor: 'pointer'}}>prev pic</a>
        <a href={ this.props.currentImg } className="link" target="_blank" rel="noopener noreferrer">direct link</a>
        <a href={ this.props.commentsLink } className="link" target="_blank" rel="noopener noreferrer">comments</a>
        <a onClick={ this.props.setNightmode } id="night-toggle" className="link" style={{cursor: 'pointer'}}>nightmode</a>
      </div>
    );
  }
}

export default Links;
