import React from 'react';

class Links extends React.Component {
  constructor(props) {
    super(props);
    this.setNightmode = this.setNightmode.bind(this);
  }

  setNightmode() {
    document.body.classList.toggle('nightmode');
    if (document.getElementById('night-toggle').innerHTML === 'daymode')
      document.getElementById('night-toggle').innerHTML = 'nightmode';
    else
      document.getElementById('night-toggle').innerHTML = 'daymode';
  }

  render() {
    return(
      <div id="links">
        <a onClick={ this.props.prevPic } id="prev-select" className="link" style={{cursor: 'pointer'}}>prev pic</a>
        <a href={ this.props.currentImg } className="link" target="_blank" rel="noopener noreferrer">direct link</a>
        <a href={ this.props.commentsLink } className="link" target="_blank" rel="noopener noreferrer">comments</a>
        <a onClick={ this.setNightmode } id="night-toggle" className="link" style={{cursor: 'pointer'}}>nightmode</a>
      </div>
    );
  }
}

export default Links;
