(this["webpackJsonpmaze-game"]=this["webpackJsonpmaze-game"]||[]).push([[0],{28:function(e,t,c){},29:function(e,t,c){},30:function(e,t,c){},37:function(e,t,c){},38:function(e,t,c){},39:function(e,t,c){},40:function(e,t,c){"use strict";c.r(t);var a=c(0),n=c.n(a),o=c(20),r=c.n(o),s=(c(28),c(29),c(8)),i=c(2),u=c(11),l=c(7),h=c(23),d=c(14),j=(c(30),!1),b=null,f=function(e){var t={x:e.changedTouches[0].pageX,y:e.changedTouches[0].pageY};b=t},v=function(e){j=!0},w=c(1);function O(e){var t=e.setShowModal,c=Object(i.g)().difficulty,n=Object(a.useState)("easy"===c?10:"medium"===c?20:30),o=Object(u.a)(n,2),r=o[0],s=(o[1],Object(a.useState)([])),O=Object(u.a)(s,2),m=O[0],p=O[1],g=Object(a.useRef)([]),x=Object(a.useState)({row:1,col:1}),M=Object(u.a)(x,2),y=M[0],k=M[1],R=Object(a.useRef)({row:1,col:1}),L=function(e){R.current=e,k(e)},N=Object(a.useRef)(null);Object(a.useEffect)((function(){E(),window.addEventListener("keydown",z),document.addEventListener("touchstart",f),document.addEventListener("touchmove",v),document.addEventListener("touchend",(function(e){var t=function(e){var t=e.changedTouches[0].pageX,c=e.changedTouches[0].pageY;if(!j||!b)return!1;var a=(c-b.y)/(b.x-t);return j=!1,a<=-1||a>=1?c<b.y?"up":"down":t>b.x?"right":"left"}(e);if(t)switch(t){case"up":B();break;case"down":U();break;case"right":D();break;case"left":F()}}))}),[]),Object(a.useEffect)((function(){y.col===r&&y.row===r&&t(!0)}),[y]);var E=function(){for(var e,t=[],c=1;c<=Math.pow(r,2);c++){var a={isStart:1===c,isEnd:c===Math.pow(r,2),isBottomRow:c>Math.pow(r,2)-r,isRightCol:c%r===0,isLeftCol:1===c||(c-1)%r===0,isTopRow:c<=r};t.push(a)}C(t),e=t,g.current=e,p(e)},C=function(e){for(var t=["up","down","left","right"],c={right:r-1,down:r-1,left:0,up:0},a=[],n=0,o=Math.pow(r,2)-2,s=!1,i=0;i<o;i++){var u,l=[],h=e[n],j=Object(d.a)(t);try{for(j.s();!(u=j.n()).done;){var b=u.value,f=null;if(h.isEnd){s=!0;break}switch(b){case"up":h.isTopRow||(f=e[n-r]);break;case"right":h.isRightCol||(f=e[n+1]);break;case"down":h.isBottomRow||(f=e[n+r]);break;case"left":h.isLeftCol||(f=e[n-1])}f&&!f.hasBeenVisited&&l.push(b)}}catch(p){j.e(p)}finally{j.f()}var v=void 0;if(s)v=l[Math.floor(Math.random()*l.length)];else v=S(c,l);if(h.hasBeenVisited=!0,0!==l.length){switch(v){case"up":h.canMoveUp=!0,e[n-=r].canMoveDown=!0,c.up--,c.down++;break;case"right":h.canMoveRight=!0,e[n+=1].canMoveLeft=!0,c.right--,c.left++;break;case"down":h.canMoveDown=!0,e[n+=r].canMoveUp=!0,c.down--,c.up++;break;case"left":h.canMoveLeft=!0,e[n-=1].canMoveRight=!0,c.left--,c.right++}a.push(n)}else n=a.shift(),o++}if(!s){var w=Math.pow(r,2)-1,O=e[w],m=e[w-r];O.canMoveUp=!0,m.canMoveDown=!0}},S=function(e,t){var c,a=[],n=Object(d.a)(t);try{for(n.s();!(c=n.n()).done;){var o=c.value,r=0===e[o]?1:e;a.push.apply(a,Object(h.a)(new Array(r).fill(o)))}}catch(s){n.e(s)}finally{n.f()}return a[Math.floor(Math.random()*a.length)]},z=function(e){if(N)switch(e.key.toLowerCase()){case"w":case"arrowup":B();break;case"a":case"arrowleft":F();break;case"s":case"arrowdown":U();break;case"d":case"arrowright":D()}},T=function(e){var t=(e.row-1)*r+e.col-1;return g.current[t]},B=function(){var e=T(R.current);1!==R.current.row&&e.canMoveUp&&L(Object(l.a)(Object(l.a)({},R.current),{},{row:R.current.row-1}))},D=function(){var e=T(R.current);R.current.col>=r||!e.canMoveRight||L(Object(l.a)(Object(l.a)({},R.current),{},{col:R.current.col+1}))},F=function(){var e=T(R.current);1!==R.current.col&&e.canMoveLeft&&L(Object(l.a)(Object(l.a)({},R.current),{},{col:R.current.col-1}))},U=function(){var e=T(R.current);R.current.row>=r||!e.canMoveDown||L(Object(l.a)(Object(l.a)({},R.current),{},{row:R.current.row+1}))};return Object(w.jsx)("div",{className:"maze-aspect-ratio-wrapper",children:Object(w.jsx)("div",{className:"maze-wrapper-outer",children:Object(w.jsxs)("div",{className:"maze-wrapper-inner",children:[Object(w.jsx)("div",{ref:N,className:"player-wrapper",style:{top:"".concat((y.row-1)*(100/r),"%"),left:"".concat((y.col-1)*(100/r),"%"),width:"".concat(100/r,"%"),height:"".concat(100/r,"%")},children:Object(w.jsx)("div",{className:"player"})}),m.map((function(e,t){return Object(w.jsx)("div",{className:"maze-cell".concat(e.isStart?" start":"").concat(e.isEnd?" end":"").concat(e.isRightCol?" right-col":"").concat(e.isBottomRow?" bottom-row":"").concat(e.canMoveUp?" can-move-up":"").concat(e.canMoveRight?" can-move-right":"").concat(e.canMoveDown?" can-move-down":"").concat(e.canMoveLeft?" can-move-left":""),style:{width:"".concat(100/r,"%"),height:"".concat(100/r,"%")}},t)}))]})})})}c(37);function m(e){var t=e.show,c=Object(i.f)();return Object(w.jsxs)(w.Fragment,{children:[Object(w.jsxs)("div",{className:"maze-modal".concat(t?" show":""),children:[Object(w.jsx)("h1",{children:"You Win!"}),Object(w.jsxs)("div",{className:"buttons",children:[Object(w.jsx)("button",{onClick:function(){return c.go(0)},children:"Play Again"}),Object(w.jsx)(s.b,{to:"/",children:"Home"})]})]}),Object(w.jsx)("div",{className:"modal-page-overlay".concat(t?" show":"")})]})}c(38);function p(){var e=Object(a.useState)(!1),t=Object(u.a)(e,2),c=t[0],n=t[1];return Object(w.jsxs)(w.Fragment,{children:[Object(w.jsx)(O,{setShowModal:n}),Object(w.jsx)(m,{show:c})]})}var g=c(22);c(39);function x(e){return Object(g.a)(e),Object(w.jsxs)("div",{className:"home-page",children:[Object(w.jsx)("h1",{children:"The Maze Game"}),Object(w.jsxs)("div",{className:"buttons",children:[Object(w.jsx)(s.b,{to:"/game/easy",children:"Easy"}),Object(w.jsx)(s.b,{to:"/game/medium",children:"Medium"}),Object(w.jsx)(s.b,{to:"/game/hard",children:"Hard"})]})]})}var M=function(){return Object(w.jsx)("div",{className:"App",children:Object(w.jsx)(s.a,{basename:"/maze-game",children:Object(w.jsxs)(i.c,{children:[Object(w.jsx)(i.a,{exact:!0,path:"/",children:Object(w.jsx)(x,{})}),Object(w.jsx)(i.a,{exact:!0,path:"/game/:difficulty",children:Object(w.jsx)(p,{})})]})})})},y=function(e){e&&e instanceof Function&&c.e(3).then(c.bind(null,41)).then((function(t){var c=t.getCLS,a=t.getFID,n=t.getFCP,o=t.getLCP,r=t.getTTFB;c(e),a(e),n(e),o(e),r(e)}))};r.a.render(Object(w.jsx)(n.a.StrictMode,{children:Object(w.jsx)(M,{})}),document.getElementById("root")),y()}},[[40,1,2]]]);
//# sourceMappingURL=main.3e17d41d.chunk.js.map