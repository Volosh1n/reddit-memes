import React, { Component } from 'react'
import './App.css'

const MEME_API_BASE_URL = 'https://meme-api.com/gimme'
const IMAGE_URL_RE = /\.(png|jpe?g|webp|gif)(\?.*)?$/i
const SUBREDDIT_POOL = [
  'memes',
  'dankmemes',
  'me_irl',
  'BikiniBottomTwitter',
  'funny',
  'wholesomememes',
  'MemeEconomy',
  'terriblefacebookmemes',
  'AdviceAnimals',
  'ComedyCemetery',
  'PrequelMemes',
  'starterpacks'
]

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      posts: [],
      currentPostIndex: 0,
      isLoading: true,
      hasLoadError: false,
      dragOffsetX: 0,
      isDragging: false,
      slideShift: 0,
      isSlideAnimating: false
    }
    this.touchStartX = null
    this.touchStartY = null
    this.brokenImageUrls = {}
    this.nextPic = this.nextPic.bind(this)
    this.prevPic = this.prevPic.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleTouchStart = this.handleTouchStart.bind(this)
    this.handleTouchMove = this.handleTouchMove.bind(this)
    this.handleTouchEnd = this.handleTouchEnd.bind(this)
    this.handleTouchCancel = this.handleTouchCancel.bind(this)
    this.handleSlideTransitionEnd = this.handleSlideTransitionEnd.bind(this)
    this.handleCurrentImageError = this.handleCurrentImageError.bind(this)
    this.commentsLink = this.commentsLink.bind(this)
  }

  isImageUrl(url) {
    return typeof url === 'string' && IMAGE_URL_RE.test(url)
  }

  shuffleArray(items) {
    const copy = items.slice()
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1))
      const tmp = copy[i]
      copy[i] = copy[j]
      copy[j] = tmp
    }
    return copy
  }

  pickRandomSubreddits(count) {
    return this.shuffleArray(SUBREDDIT_POOL).slice(0, count)
  }

  componentDidMount() {
    const selectedSubreddits = this.pickRandomSubreddits(4)
    const cacheBuster = Date.now() + '-' + Math.random().toString(36).slice(2)

    const requests = selectedSubreddits.map(subreddit => {
      const url = MEME_API_BASE_URL + '/' + subreddit + '/40?cb=' + cacheBuster
      return fetch(url, { cache: 'no-store' })
        .then(res => {
          if (!res.ok) throw new Error('Failed to fetch ' + subreddit)
          return res.json()
        })
        .then(payload => (payload && Array.isArray(payload.memes) ? payload.memes : []))
    })

    Promise.allSettled(requests)
      .then(results => {
        const rawMemes = results
          .filter(result => result.status === 'fulfilled')
          .map(result => result.value)
          .reduce((acc, value) => acc.concat(value), [])

        const uniqueByUrl = new Map()
        rawMemes.forEach(meme => {
          if (!meme || meme.nsfw || !this.isImageUrl(meme.url)) return
          if (!uniqueByUrl.has(meme.url)) uniqueByUrl.set(meme.url, meme)
        })

        const loadedPosts = this.shuffleArray(Array.from(uniqueByUrl.values())).map(meme => ({
          data: {
            title: meme.title || 'meme',
            url: meme.url,
            imageUrl: meme.url,
            postLink: meme.postLink || null,
            permalink: meme.postLink ? new URL(meme.postLink).pathname : ''
          }
        }))

        this.addToStatePosts(loadedPosts)
        this.setState({ hasLoadError: loadedPosts.length === 0 })
      })
      .catch(error => {
        console.error(error)
        this.setState({ hasLoadError: true })
      })
      .finally(() => {
        this.setState({ isLoading: false })
      })

    document.addEventListener('keydown', this.handleKeyDown)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown)
  }

  addToStatePosts(newPosts) {
    const onlyImagesPosts = newPosts
      .map(value => {
        if (!value || !value.data || !this.isImageUrl(value.data.imageUrl)) return null
        return value
      })
      .filter(Boolean)

    this.setState(prevState => ({
      posts: prevState.posts.concat(onlyImagesPosts),
      hasLoadError: prevState.posts.length + onlyImagesPosts.length === 0
    }))
  }

  handleKeyDown(event) {
    if (event.key === 'ArrowRight') this.nextPic()
    if (event.key === 'ArrowLeft') this.prevPic()
  }

  relativePost(offset) {
    const { posts, currentPostIndex } = this.state
    const nextIndex = (currentPostIndex + offset + posts.length) % posts.length
    return posts[nextIndex].data
  }

  handleTouchStart(event) {
    if (this.state.posts.length < 2 || this.state.isSlideAnimating) return

    const touch = event.changedTouches && event.changedTouches[0]
    if (!touch) return

    this.touchStartX = touch.clientX
    this.touchStartY = touch.clientY
  }

  handleTouchMove(event) {
    if (this.touchStartX === null || this.touchStartY === null || this.state.posts.length < 2) return

    const touch = event.changedTouches && event.changedTouches[0]
    if (!touch) return

    const deltaX = touch.clientX - this.touchStartX
    const deltaY = touch.clientY - this.touchStartY

    if (!this.state.isDragging && Math.abs(deltaY) >= Math.abs(deltaX)) return

    this.setState({
      isDragging: true,
      dragOffsetX: deltaX
    })
  }

  handleTouchEnd(event) {
    const touch = event.changedTouches && event.changedTouches[0]
    if (!touch || this.touchStartX === null || this.touchStartY === null) {
      this.handleTouchCancel()
      return
    }

    const deltaX = touch.clientX - this.touchStartX
    const deltaY = touch.clientY - this.touchStartY

    this.touchStartX = null
    this.touchStartY = null

    if (Math.abs(deltaX) < 70 || Math.abs(deltaX) < Math.abs(deltaY)) {
      this.setState({
        isDragging: false,
        dragOffsetX: 0
      })
      return
    }

    if (deltaX < 0) {
      this.setState({
        isDragging: false,
        isSlideAnimating: true,
        slideShift: 1,
        dragOffsetX: 0
      })
      return
    }

    this.setState({
      isDragging: false,
      isSlideAnimating: true,
      slideShift: -1,
      dragOffsetX: 0
    })
  }

  handleTouchCancel() {
    this.touchStartX = null
    this.touchStartY = null

    if (this.state.isSlideAnimating) return

    this.setState({
      isDragging: false,
      dragOffsetX: 0
    })
  }

  handleSlideTransitionEnd() {
    if (!this.state.isSlideAnimating || this.state.slideShift === 0) return

    this.setState(prevState => {
      const direction = prevState.slideShift === 1 ? 1 : -1
      const nextIndex =
        (prevState.currentPostIndex + direction + prevState.posts.length) % prevState.posts.length

      return {
        currentPostIndex: nextIndex,
        isSlideAnimating: false,
        slideShift: 0,
        dragOffsetX: 0,
        isDragging: false
      }
    })
  }

  handleCurrentImageError() {
    const current = this.currentPost()
    if (!current || !current.imageUrl) return

    this.brokenImageUrls[current.imageUrl] = true

    if (Object.keys(this.brokenImageUrls).length >= this.state.posts.length) {
      this.setState({ hasLoadError: true })
      return
    }

    if (this.state.posts.length <= 1) {
      this.setState({ hasLoadError: true })
      return
    }

    this.nextPic()
  }

  nextPic() {
    if(this.state.currentPostIndex + 1 !== this.state.posts.length)
      this.setState({ currentPostIndex: this.state.currentPostIndex + 1 })
    else
      this.setState({ currentPostIndex: 0 })
  }

  prevPic() {
    if(this.state.currentPostIndex - 1 >= 0)
      this.setState({ currentPostIndex: this.state.currentPostIndex - 1 })
    else
      this.setState({ currentPostIndex: this.state.posts.length - 1 })
  }

  currentPost() {
    return this.state.posts[this.state.currentPostIndex].data
  }

  toggleDaymode() {
    document.body.classList.toggle('daymode')
    if (document.getElementById('night-toggle').innerHTML === 'daymode')
      document.getElementById('night-toggle').innerHTML = 'nightmode'
    else
      document.getElementById('night-toggle').innerHTML = 'daymode'
  }

  commentsLink() {
    return this.currentPost().postLink || ('https://reddit.com' + this.currentPost().permalink)
  }

  render() {
    if (this.state.isLoading) {
      return <div id="status">Loading memes...</div>
    }

    if (this.state.hasLoadError || !this.state.posts.length) {
      return <div id="status">Could not load memes. Please refresh the page.</div>
    }

    const viewportWidth = Math.max(window.innerWidth, 1)
    const translateX = -viewportWidth + this.state.dragOffsetX - this.state.slideShift * viewportWidth
    const prevPost = this.relativePost(-1)
    const currentPost = this.relativePost(0)
    const nextPost = this.relativePost(1)

    return (
      <div>
        <div id="links">
          <div onClick={ this.prevPic } id="prev-select" className="link service-link">prev pic</div>
          <a href={ currentPost.url } className="link" target="_blank" rel="noopener noreferrer">direct link</a>
          <a href={ this.commentsLink() } className="link" target="_blank" rel="noopener noreferrer">comments</a>
          <div onClick={ this.toggleDaymode } id="night-toggle" className="link service-link">daymode</div>
        </div>
        <div
          className="viewer"
          onTouchStart={ this.handleTouchStart }
          onTouchMove={ this.handleTouchMove }
          onTouchEnd={ this.handleTouchEnd }
          onTouchCancel={ this.handleTouchCancel }
        >
          <div
            className="carousel-track"
            style={{
              transform: 'translate3d(' + translateX + 'px, 0, 0)',
              transition: this.state.isDragging || !this.state.isSlideAnimating ? 'none' : 'transform 220ms ease-out'
            }}
            onTransitionEnd={ this.handleSlideTransitionEnd }
          >
            <div className="carousel-slide">
              <img src={ prevPost.imageUrl } alt={ prevPost.title } style={{zIndex:-1}} />
            </div>
            <div className="carousel-slide">
              <img
                src={ currentPost.imageUrl }
                alt={ currentPost.title }
                style={{zIndex:-1}}
                onError={ this.handleCurrentImageError }
              />
            </div>
            <div className="carousel-slide">
              <img src={ nextPost.imageUrl } alt={ nextPost.title } style={{zIndex:-1}} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
