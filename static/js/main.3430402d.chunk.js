(window["webpackJsonpreddit-memes"]=window["webpackJsonpreddit-memes"]||[]).push([[0],{14:function(e,t,n){},15:function(e,t,n){"use strict";n.r(t);var o=n(0),i=n.n(o),r=n(3),s=n.n(r),c=n(4),a=n(5),l=n(7),d=n(6),u=n(1),h=n(8),m=(n(14),["memes","dankmemes","me_irl"]),g=function(e){function t(e){var n;return Object(c.a)(this,t),(n=Object(l.a)(this,Object(d.a)(t).call(this,e))).state={posts:[],currentPostIndex:0},n.nextPic=n.nextPic.bind(Object(u.a)(n)),n.prevPic=n.prevPic.bind(Object(u.a)(n)),n.handleKeyDown=n.handleKeyDown.bind(Object(u.a)(n)),n.commentsLink=n.commentsLink.bind(Object(u.a)(n)),n}return Object(h.a)(t,e),Object(a.a)(t,[{key:"componentDidMount",value:function(){var e=this;m.forEach(function(t){fetch("https://www.reddit.com/r/"+t+".json?limit=100").then(function(e){return e.json()}).then(function(t){e.addToStatePosts(t.data.children.sort(function(){return.5-Math.random()}))})}),document.addEventListener("keydown",this.handleKeyDown)}},{key:"componentWillUnmount",value:function(){document.removeEventListener("keydown",this.handleKeyDown)}},{key:"addToStatePosts",value:function(e){var t=e.filter(function(e){return null!=e.data.url.match(/\.(jpeg|jpg|png)$/)});this.setState({posts:this.state.posts.concat(t)})}},{key:"handleKeyDown",value:function(e){"ArrowRight"===e.key&&this.nextPic(),"ArrowLeft"===e.key&&this.prevPic()}},{key:"nextPic",value:function(){this.state.currentPostIndex+1!==this.state.posts.length?this.setState({currentPostIndex:this.state.currentPostIndex+1}):this.setState({currentPostIndex:0})}},{key:"prevPic",value:function(){this.state.currentPostIndex-1>=0?this.setState({currentPostIndex:this.state.currentPostIndex-1}):this.setState({currentPostIndex:this.state.posts.length-1})}},{key:"currentPost",value:function(){return this.state.posts[this.state.currentPostIndex].data}},{key:"setNightmode",value:function(){document.body.classList.toggle("nightmode"),"daymode"===document.getElementById("night-toggle").innerHTML?document.getElementById("night-toggle").innerHTML="nightmode":document.getElementById("night-toggle").innerHTML="daymode"}},{key:"commentsLink",value:function(){return"https://reddit.com"+this.currentPost().permalink}},{key:"render",value:function(){return this.state.posts.length?i.a.createElement("div",null,i.a.createElement("div",{id:"links"},i.a.createElement("div",{onClick:this.prevPic,id:"prev-select",className:"link service-link"},"prev pic"),i.a.createElement("a",{href:this.currentPost().url,className:"link",target:"_blank",rel:"noopener noreferrer"},"direct link"),i.a.createElement("a",{href:this.commentsLink(),className:"link",target:"_blank",rel:"noopener noreferrer"},"comments"),i.a.createElement("div",{onClick:this.setNightmode,id:"night-toggle",className:"link service-link"},"nightmode")),i.a.createElement("div",{onClick:this.nextPic},i.a.createElement("img",{src:this.currentPost().url,alt:this.currentPost().title,style:{zIndex:-1}}))):i.a.createElement("div",null)}}]),t}(o.Component),f=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function v(e){navigator.serviceWorker.register(e).then(function(e){e.onupdatefound=function(){var t=e.installing;t.onstatechange=function(){"installed"===t.state&&(navigator.serviceWorker.controller?console.log("New content is available; please refresh."):console.log("Content is cached for offline use."))}}}).catch(function(e){console.error("Error during service worker registration:",e)})}s.a.render(i.a.createElement(g,null),document.getElementById("root")),function(){if("serviceWorker"in navigator){if(new URL("/reddit-memes",window.location).origin!==window.location.origin)return;window.addEventListener("load",function(){var e="".concat("/reddit-memes","/service-worker.js");f?(!function(e){fetch(e).then(function(t){404===t.status||-1===t.headers.get("content-type").indexOf("javascript")?navigator.serviceWorker.ready.then(function(e){e.unregister().then(function(){window.location.reload()})}):v(e)}).catch(function(){console.log("No internet connection found. App is running in offline mode.")})}(e),navigator.serviceWorker.ready.then(function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://goo.gl/SC7cgQ")})):v(e)})}}()},9:function(e,t,n){e.exports=n(15)}},[[9,1,2]]]);
//# sourceMappingURL=main.3430402d.chunk.js.map