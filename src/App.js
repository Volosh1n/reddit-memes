import React, { Component } from 'react';
import './App.css';

const URL = "https://www.reddit.com/r/memes.json?limit=100"
const URL2 = "https://www.reddit.com/r/dankmemes.json?limit=100"
const URL3 = "https://www.reddit.com/r/FreshMemes.json?limit=100"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      currentImg: null,
      previousImg: null,
      currentLink: ''
    };
    this.randomImage = this.randomImage.bind(this);
  }

  componentDidMount() {
    fetch(URL).then(res => res.json())
      .then(posts => {
        this.setState({ posts: posts.data.children });
        this.setState({
          currentImg: this.state.posts[1].data.url,
          previousImg: this.state.posts[1].data.url,
          currentLink: 'https://reddit.com' + this.state.posts[1].data.permalink
        });
      })
    fetch(URL2).then(res => res.json())
      .then(posts2 => {
        var newStateArray = this.state.posts.slice();
        for (var index = 0; index < posts2.data.children.length; index++)
          newStateArray.push(posts2.data.children[index]);
        this.setState({ posts: newStateArray });
      })
    fetch(URL3).then(res => res.json())
      .then(posts3 => {
        var newStateArray = this.state.posts.slice();
        for (var index = 0; index < posts3.data.children.length; index++)
          newStateArray.push(posts3.data.children[index]);
        this.setState({ posts: newStateArray });
      })
  }

  randomImage() {
    do {
      var random = Math.floor(Math.random() * this.state.posts.length);
      var img = this.state.posts[random].data.url;
      var link = 'https://reddit.com' + this.state.posts[random].data.permalink;
      if (/v.redd.it/.test(img))
        continue;
      img = (img.endsWith(".jpg") || img.endsWith(".png")) ? img : (img + '.jpg');
    } while(/comments/.test(img) === true)
    this.setState({
      previousImg: this.state.currentImg,
      currentImg: img,
      currentLink: link
    });
  }

  render() {
    return (
      <div>
        <div id="links">
          <a href={ this.state.previousImg } class="link" target="_blank" rel="noopener noreferrer">previous pic</a>
          <a href={ this.state.currentLink } class="link" target="_blank" rel="noopener noreferrer">comments</a>
          <a href={ this.state.currentImg } class="link" target="_blank" rel="noopener noreferrer">direct link</a>
        </div>
        <a onClick={ this.randomImage }>
          <img src={ this.state.currentImg } alt="" />
        </a>
      </div>
    );
  }
}

export default App;
