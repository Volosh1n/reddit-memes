import React, { Component } from 'react';
import './App.css';
import Links from './components/Links';

const URL = "https://www.reddit.com/r/memes.json?limit=100"
const URL2 = "https://www.reddit.com/r/dankmemes.json?limit=100"
const URL3 = "https://www.reddit.com/r/MemeEconomy.json?limit=100"

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
    fetch(URL).then(res => res.json())
      .then(posts => {
        this.setState({ posts: posts.data.children });
        this.setState({ currentPost: this.state.posts[1].data });
        this.setState({
          currentImg: this.state.currentPost.url,
          previousImg: this.state.currentPost.url,
          commentsLink: 'https://reddit.com' + this.state.currentPost.permalink
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
    document.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount(){
    document.removeEventListener("keydown", this.handleKeyDown);
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
    if (e.keyCode === 39) {
      console.log('next');
      this.randomImage();
    } else if (e.keyCode === 37) {
      console.log('prev');
      this.prevPic();
    }
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
        <h3>Click on the picture to go further</h3>
        <Links prevPic={this.prevPic}
               currentImg={this.state.currentImg}
               commentsLink={this.state.commentsLink} />
        <a onClick={ this.randomImage }>
          <img src={ this.state.currentImg } alt="" />
        </a>
      </div>
    );
  }
}

export default App;
