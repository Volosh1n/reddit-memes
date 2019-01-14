import React, { Component } from 'react';
import './App.css';
import Links from './components/Links';

const MAIN_URL = "https://www.reddit.com/r/memes.json?limit=100"
const URL2 = "https://www.reddit.com/r/dankmemes.json?limit=100"
const URL3 = "https://www.reddit.com/r/bikinibottomtwitter.json?limit=100"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      currentPost: null,
      currentImg: null,
      previousImg: null,
      commentsLink: ''
    };
    this.randomImage = this.randomImage.bind(this);
    this.prevPic = this.prevPic.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidMount() {
    fetch(MAIN_URL).then(res => res.json())
      .then(posts => {
        this.setState({ posts: posts.data.children });
        this.setState({ currentPost: this.state.posts[1].data });
        this.setState({
          currentImg: this.state.currentPost.url,
          previousImg: this.state.currentPost.url,
          commentsLink: 'https://reddit.com' + this.state.currentPost.permalink
        });
      })
    this.fecthAnother(URL2);
    this.fecthAnother(URL3);
    document.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount(){
    document.removeEventListener("keydown", this.handleKeyDown);
  }

  fecthAnother(url) {
    fetch(url).then(res => res.json())
      .then(posts => {
        var newStateArray = this.state.posts.slice();
        for (var index = 0; index < posts.data.children.length; index++)
          newStateArray.push(posts.data.children[index]);
        this.setState({ posts: newStateArray });
      })
  }

  randomImage() {
    var imageLink = "";
    do {
      var random = Math.floor(Math.random() * this.state.posts.length);
      var post = this.state.posts[random].data;
      if ((/jpg/.test(post.url)) || (/png/.test(post.url)))
        imageLink = post.url;
      else
        continue;
      var link = 'https://reddit.com' + post.permalink;
    } while(imageLink === "")
    this.setState({
      currentPost: post,
      currentImg: imageLink,
      previousImg: this.state.currentPost,
      commentsLink: link
    });
    document.getElementsByTagName('h3')[0].style.opacity = 0;
    document.getElementById('prev-select').style.opacity = ".6"
  }

  handleKeyDown(e) {
    if (e.key === 'ArrowRight')
      this.randomImage();
    else if (e.key === 'ArrowLeft')
      this.prevPic();
  }

  prevPic() {
    var link = 'https://reddit.com' + this.state.previousImg.permalink;
    this.setState({
      currentImg: this.state.previousImg.url,
      commentsLink: link
    });
    document.getElementById('prev-select').style.opacity = "0";
  }

  render() {
    return (
      <div>
        <h3>Click on the picture or use right arrow to go further</h3>
        <Links prevPic={this.prevPic}
               currentImg={this.state.currentImg}
               commentsLink={this.state.commentsLink} />
        <a onClick={ this.randomImage }>
          <img src={ this.state.currentImg } alt="" style={{zIndex:-1}} />
        </a>
      </div>
    );
  }
}

export default App;
