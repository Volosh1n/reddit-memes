(this["webpackJsonpreddit-memes"]=this["webpackJsonpreddit-memes"]||[]).push([[0],{13:function(e,t,n){},14:function(e,t,n){"use strict";n.r(t);var o=n(0),i=n.n(o),r=n(3),s=n.n(r),a=n(4),c=n(5),l=n(1),d=n(6),u=n(7),h=(n(13),["BikiniBottomTwitter","memes","me_irl","dankmemes"]),m=function(e){Object(u.a)(n,e);var t=Object(d.a)(n);function n(e){var o;return Object(a.a)(this,n),(o=t.call(this,e)).state={posts:[],currentPostIndex:0},o.nextPic=o.nextPic.bind(Object(l.a)(o)),o.prevPic=o.prevPic.bind(Object(l.a)(o)),o.handleKeyDown=o.handleKeyDown.bind(Object(l.a)(o)),o.commentsLink=o.commentsLink.bind(Object(l.a)(o)),o}return Object(c.a)(n,[{key:"componentDidMount",value:function(){var e=this;h.forEach((function(t){fetch("https://www.reddit.com/r/"+t+".json?limit=100").then((function(e){return e.json()})).then((function(t){e.addToStatePosts(t.data.children.sort((function(){return.5-Math.random()})))}))})),document.addEventListener("keydown",this.handleKeyDown)}},{key:"componentWillUnmount",value:function(){document.removeEventListener("keydown",this.handleKeyDown)}},{key:"addToStatePosts",value:function(e){var t=e.filter((function(e){return null!=e.data.url.match(/\.(jpeg|jpg|png)$/)}));this.setState({posts:this.state.posts.concat(t)})}},{key:"handleKeyDown",value:function(e){"ArrowRight"===e.key&&this.nextPic(),"ArrowLeft"===e.key&&this.prevPic()}},{key:"nextPic",value:function(){this.state.currentPostIndex+1!==this.state.posts.length?this.setState({currentPostIndex:this.state.currentPostIndex+1}):this.setState({currentPostIndex:0})}},{key:"prevPic",value:function(){this.state.currentPostIndex-1>=0?this.setState({currentPostIndex:this.state.currentPostIndex-1}):this.setState({currentPostIndex:this.state.posts.length-1})}},{key:"currentPost",value:function(){return this.state.posts[this.state.currentPostIndex].data}},{key:"toggleDaymode",value:function(){document.body.classList.toggle("daymode"),"daymode"===document.getElementById("night-toggle").innerHTML?document.getElementById("night-toggle").innerHTML="nightmode":document.getElementById("night-toggle").innerHTML="daymode"}},{key:"commentsLink",value:function(){return"https://reddit.com"+this.currentPost().permalink}},{key:"render",value:function(){return this.state.posts.length?i.a.createElement("div",null,i.a.createElement("div",{id:"links"},i.a.createElement("div",{onClick:this.prevPic,id:"prev-select",className:"link service-link"},"prev pic"),i.a.createElement("a",{href:this.currentPost().url,className:"link",target:"_blank",rel:"noopener noreferrer"},"direct link"),i.a.createElement("a",{href:this.commentsLink(),className:"link",target:"_blank",rel:"noopener noreferrer"},"comments"),i.a.createElement("div",{onClick:this.toggleDaymode,id:"night-toggle",className:"link service-link"},"daymode")),i.a.createElement("div",{onClick:this.nextPic},i.a.createElement("img",{src:this.currentPost().url,alt:this.currentPost().title,style:{zIndex:-1}}))):i.a.createElement("div",null)}}]),n}(o.Component),g=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function f(e){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var t=e.installing;t.onstatechange=function(){"installed"===t.state&&(navigator.serviceWorker.controller?console.log("New content is available; please refresh."):console.log("Content is cached for offline use."))}}})).catch((function(e){console.error("Error during service worker registration:",e)}))}s.a.render(i.a.createElement(m,null),document.getElementById("root")),function(){if("serviceWorker"in navigator){if(new URL("/reddit-memes",window.location).origin!==window.location.origin)return;window.addEventListener("load",(function(){var e="".concat("/reddit-memes","/service-worker.js");g?(!function(e){fetch(e).then((function(t){404===t.status||-1===t.headers.get("content-type").indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):f(e)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://goo.gl/SC7cgQ")}))):f(e)}))}}()},8:function(e,t,n){e.exports=n(14)}},[[8,1,2]]]);
//# sourceMappingURL=main.830ca29f.chunk.js.map