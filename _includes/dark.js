!function(){var t={init:function(){this.loadState()===!0&&this.add(),this.addListener()},toggle:function(){this.isDark?this.remove():this.add()},create:function(){var t=document.createElement("style");t.appendChild(document.createTextNode("body{background-color:#263238;color:#fff}figcaption{background:#37474f;color:rgba(255,255,255,0.7)}code{background:#37474f}blockquote{border-color:rgba(255,255,255,0.7)}.highlight{background:#37474f;color:#eceff1}.post-meta{color:rgba(255,255,255,0.7)}.site-title-link{color:#fff}.site-nav a{color:rgba(255,255,255,0.7)}.post-link{color:rgba(255,255,255,0.7)}.star-logo__circle{fill:rgba(255,255,255,0.5)}.star-logo__star{fill:#263238}")),this.ss=t},add:function(){this.ss||this.create(),document.head.appendChild(this.ss),this.saveState(!0)},remove:function(){this.ss.remove(),this.saveState(!1)},saveState:function(t){this.isDark=t,sessionStorage.setItem("darkmode",t)},loadState:function(){var t=sessionStorage.getItem("darkmode"),e="true"===t;return this.isDark=e,e},addListener:function(){document.addEventListener("keydown",function(e){68===e.keyCode&&t.toggle()})}};t.init()}();