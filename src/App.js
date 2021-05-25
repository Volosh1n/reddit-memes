import React, { Component } from 'react';
import './App.css';

const SUBREDDITS = ['BikiniBottomTwitter', 'memes', 'me_irl', 'dankmemes'];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      currentPostIndex: 0
    };
    this.nextPic = this.nextPic.bind(this);
    this.prevPic = this.prevPic.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.commentsLink = this.commentsLink.bind(this);
  }

  componentDidMount() {
    SUBREDDITS.forEach(subreddit => {
      const url = 'https://www.reddit.com/r/' + subreddit + '.json?limit=100';
      fetch(url).then(res => res.json()).then(posts => {
        this.addToStatePosts(posts.data.children.sort(() => 0.5 - Math.random()));
      });
    });
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  addToStatePosts(newPosts) {
    const onlyImagesPosts = newPosts.filter(value => {
      return value.data.url.match(/\.(jpeg|jpg|png)$/) != null;
    });
    this.setState({ posts: this.state.posts.concat(onlyImagesPosts) });
  }

  handleKeyDown(event) {
    if (event.key === 'ArrowRight') this.nextPic();
    if (event.key === 'ArrowLeft') this.prevPic();
  }

  nextPic() {
    if(this.state.currentPostIndex + 1 !== this.state.posts.length)
      this.setState({ currentPostIndex: this.state.currentPostIndex + 1 });
    else
      this.setState({ currentPostIndex: 0 });
  }

  prevPic() {
    if(this.state.currentPostIndex - 1 >= 0)
      this.setState({ currentPostIndex: this.state.currentPostIndex - 1 });
    else
      this.setState({ currentPostIndex: this.state.posts.length - 1 });
  }

  currentPost() {
    return this.state.posts[this.state.currentPostIndex].data;
  }

  toggleDaymode() {
    document.body.classList.toggle('daymode');
    if (document.getElementById('night-toggle').innerHTML === 'daymode')
      document.getElementById('night-toggle').innerHTML = 'nightmode';
    else
      document.getElementById('night-toggle').innerHTML = 'daymode';
  }

  commentsLink() {
    return 'https://reddit.com' + this.currentPost().permalink;
  }

  render() {
    if(!this.state.posts.length) {
      return  <div />
    }
    return (
      <div>
        <div id="links">
          <div onClick={ this.prevPic } id="prev-select" className="link service-link">prev pic</div>
          <a href={ this.currentPost().url } className="link" target="_blank" rel="noopener noreferrer">direct link</a>
          <a href={ this.commentsLink() } className="link" target="_blank" rel="noopener noreferrer">comments</a>
          <div onClick={ this.toggleDaymode } id="night-toggle" className="link service-link">daymode</div>
        </div>
        <div onClick={ this.nextPic }>
          <img src={ this.currentPost().url } alt={ this.currentPost().title } style={{zIndex:-1}} />
        </div>
      </div>
    );
  }
}

export default App;
