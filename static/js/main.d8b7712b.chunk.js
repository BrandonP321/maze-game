(this["webpackJsonpmaze-game"]=this["webpackJsonpmaze-game"]||[]).push([[0],{28:function(e,t,c){},29:function(e,t,c){},30:function(e,t,c){},37:function(e,t,c){},38:function(e,t,c){},39:function(e,t,c){"use strict";c.r(t);var a=c(0),n=c.n(a),r=c(21),o=c.n(r),i=(c(28),c(29),c(10)),s=c(2),u=c(7),l=c(23),h=c(14),d=c(15),f=c(13),j=(c(30),!1),b=null,v=function(e){var t={x:e.changedTouches[0].pageX,y:e.changedTouches[0].pageY};b=t},w=function(e){e.preventDefault(),j=!0},p=c(1);function m(e){Object(f.a)(e);var t=Object(s.f)().difficulty,c=Object(a.useState)("easy"===t?10:"medium"===t?20:30),n=Object(d.a)(c,2),r=n[0],o=(n[1],Object(a.useState)([])),i=Object(d.a)(o,2),m=i[0],O=i[1],g=Object(a.useRef)([]),M=Object(a.useState)({row:1,col:1}),x=Object(d.a)(M,2),y=x[0],k=x[1],R=Object(a.useRef)({row:1,col:1}),L=function(e){R.current=e,k(e)},E=Object(a.useRef)(null);Object(a.useEffect)((function(){C(),window.addEventListener("keydown",z),document.addEventListener("touchstart",v),document.addEventListener("touchmove",w),document.addEventListener("touchend",(function(e){var t=function(e){var t=e.changedTouches[0].pageX,c=e.changedTouches[0].pageY;if(!j||!b)return!1;var a=(c-b.y)/(b.x-t);return j=!1,a<=-1||a>=1?c<b.y?"up":"down":t>b.x?"right":"left"}(e);if(t)switch(t){case"up":D();break;case"down":U();break;case"right":S();break;case"left":F()}}))}),[]),Object(a.useEffect)((function(){y.col===r&&y.row===r&&alert("You win")}),[y]);var C=function(){for(var e,t=[],c=1;c<=Math.pow(r,2);c++){var a={isStart:1===c,isEnd:c===Math.pow(r,2),isBottomRow:c>Math.pow(r,2)-r,isRightCol:c%r===0,isLeftCol:1===c||(c-1)%r===0,isTopRow:c<=r};t.push(a)}N(t),e=t,g.current=e,O(e)},N=function(e){for(var t=["up","down","left","right"],c={right:r-1,down:r-1,left:0,up:0},a=[],n=0,o=Math.pow(r,2)-2,i=!1,s=0;s<o;s++){var u,l=[],d=e[n],f=Object(h.a)(t);try{for(f.s();!(u=f.n()).done;){var j=u.value,b=null;if(d.isEnd){i=!0;break}switch(j){case"up":d.isTopRow||(b=e[n-r]);break;case"right":d.isRightCol||(b=e[n+1]);break;case"down":d.isBottomRow||(b=e[n+r]);break;case"left":d.isLeftCol||(b=e[n-1])}b&&!b.hasBeenVisited&&l.push(j)}}catch(O){f.e(O)}finally{f.f()}var v=void 0;if(i)v=l[Math.floor(Math.random()*l.length)];else v=T(c,l);if(d.hasBeenVisited=!0,0!==l.length){switch(v){case"up":d.canMoveUp=!0,e[n-=r].canMoveDown=!0,c.up--,c.down++;break;case"right":d.canMoveRight=!0,e[n+=1].canMoveLeft=!0,c.right--,c.left++;break;case"down":d.canMoveDown=!0,e[n+=r].canMoveUp=!0,c.down--,c.up++;break;case"left":d.canMoveLeft=!0,e[n-=1].canMoveRight=!0,c.left--,c.right++}a.push(n)}else n=a.shift(),o++}if(!i){var w=Math.pow(r,2)-1,p=e[w],m=e[w-r];p.canMoveUp=!0,m.canMoveDown=!0}},T=function(e,t){var c,a=[],n=Object(h.a)(t);try{for(n.s();!(c=n.n()).done;){var r=c.value,o=0===e[r]?1:e;a.push.apply(a,Object(l.a)(new Array(o).fill(r)))}}catch(i){n.e(i)}finally{n.f()}return a[Math.floor(Math.random()*a.length)]},z=function(e){if(E)switch(e.key.toLowerCase()){case"w":case"arrowup":D();break;case"a":case"arrowleft":F();break;case"s":case"arrowdown":U();break;case"d":case"arrowright":S()}},B=function(e){var t=(e.row-1)*r+e.col-1;return g.current[t]},D=function(){var e=B(R.current);1!==R.current.row&&e.canMoveUp&&L(Object(u.a)(Object(u.a)({},R.current),{},{row:R.current.row-1}))},S=function(){var e=B(R.current);R.current.col>=r||!e.canMoveRight||L(Object(u.a)(Object(u.a)({},R.current),{},{col:R.current.col+1}))},F=function(){var e=B(R.current);1!==R.current.col&&e.canMoveLeft&&L(Object(u.a)(Object(u.a)({},R.current),{},{col:R.current.col-1}))},U=function(){var e=B(R.current);R.current.row>=r||!e.canMoveDown||L(Object(u.a)(Object(u.a)({},R.current),{},{row:R.current.row+1}))};return Object(p.jsx)("div",{className:"maze-aspect-ratio-wrapper",children:Object(p.jsx)("div",{className:"maze-wrapper-outer",children:Object(p.jsxs)("div",{className:"maze-wrapper-inner",children:[Object(p.jsx)("div",{ref:E,className:"player-wrapper",style:{top:"".concat((y.row-1)*(100/r),"%"),left:"".concat((y.col-1)*(100/r),"%"),width:"".concat(100/r,"%"),height:"".concat(100/r,"%")},children:Object(p.jsx)("div",{className:"player"})}),m.map((function(e,t){return Object(p.jsx)("div",{className:"maze-cell".concat(e.isStart?" start":"").concat(e.isEnd?" end":"").concat(e.isRightCol?" right-col":"").concat(e.isBottomRow?" bottom-row":"").concat(e.canMoveUp?" can-move-up":"").concat(e.canMoveRight?" can-move-right":"").concat(e.canMoveDown?" can-move-down":"").concat(e.canMoveLeft?" can-move-left":""),style:{width:"".concat(100/r,"%"),height:"".concat(100/r,"%")}},t)}))]})})})}c(37);function O(){return Object(p.jsx)(p.Fragment,{children:Object(p.jsx)(m,{})})}c(38);function g(e){return Object(f.a)(e),Object(p.jsxs)("div",{className:"home-page",children:[Object(p.jsx)("h1",{children:"The Maze Game"}),Object(p.jsxs)("div",{className:"buttons",children:[Object(p.jsx)(i.b,{to:"/game/easy",children:"Easy"}),Object(p.jsx)(i.b,{to:"/game/medium",children:"Medium"}),Object(p.jsx)(i.b,{to:"/game/hard",children:"Hard"})]})]})}var M=function(){return Object(p.jsx)("div",{className:"App",children:Object(p.jsx)(i.a,{basename:"/maze-game",children:Object(p.jsxs)(s.c,{children:[Object(p.jsx)(s.a,{exact:!0,path:"/",children:Object(p.jsx)(g,{})}),Object(p.jsx)(s.a,{exact:!0,path:"/game/:difficulty",children:Object(p.jsx)(O,{})})]})})})},x=function(e){e&&e instanceof Function&&c.e(3).then(c.bind(null,40)).then((function(t){var c=t.getCLS,a=t.getFID,n=t.getFCP,r=t.getLCP,o=t.getTTFB;c(e),a(e),n(e),r(e),o(e)}))};o.a.render(Object(p.jsx)(n.a.StrictMode,{children:Object(p.jsx)(M,{})}),document.getElementById("root")),x()}},[[39,1,2]]]);
//# sourceMappingURL=main.d8b7712b.chunk.js.map