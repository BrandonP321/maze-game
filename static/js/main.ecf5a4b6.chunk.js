(this["webpackJsonpmaze-game"]=this["webpackJsonpmaze-game"]||[]).push([[0],{28:function(e,t,c){},29:function(e,t,c){},30:function(e,t,c){},32:function(e,t,c){},38:function(e,t,c){"use strict";c.r(t);var a=c(0),n=c.n(a),r=c(19),o=c.n(r),i=(c(28),c(29),c(21)),s=c(2),u=c(7),l=c(23),f=c(12),h=c(13),w=c(20),b=(c(30),c(1));function j(e){Object(w.a)(e);var t=Object(a.useState)(30),c=Object(h.a)(t,2),n=c[0],r=(c[1],Object(a.useState)([])),o=Object(h.a)(r,2),i=o[0],s=o[1],j=Object(a.useRef)([]),v=Object(a.useState)({row:1,col:1}),d=Object(h.a)(v,2),p=d[0],O=d[1],m=Object(a.useRef)({row:1,col:1}),g=function(e){m.current=e,O(e)},M=Object(a.useRef)(null);Object(a.useEffect)((function(){x(),window.addEventListener("keydown",y)}),[]),Object(a.useEffect)((function(){p.col===n&&p.row===n&&alert("You win")}),[p]);var x=function(){for(var e,t=[],c=1;c<=Math.pow(n,2);c++){var a={isStart:1===c,isEnd:c===Math.pow(n,2),isBottomRow:c>Math.pow(n,2)-n,isRightCol:c%n===0,isLeftCol:1===c||(c-1)%n===0,isTopRow:c<=n};t.push(a)}R(t),e=t,j.current=e,s(e)},R=function(e){for(var t=["up","down","left","right"],c={right:n-1,down:n-1,left:0,up:0},a=[],r=0,o=Math.pow(n,2)-2,i=!1,s=0;s<o;s++){var u,l=[],h=e[r],w=Object(f.a)(t);try{for(w.s();!(u=w.n()).done;){var b=u.value,j=null;if(h.isEnd){i=!0;break}switch(b){case"up":h.isTopRow||(j=e[r-n]);break;case"right":h.isRightCol||(j=e[r+1]);break;case"down":h.isBottomRow||(j=e[r+n]);break;case"left":h.isLeftCol||(j=e[r-1])}j&&!j.hasBeenVisited&&l.push(b)}}catch(d){w.e(d)}finally{w.f()}var v=void 0;if(i)v=l[Math.floor(Math.random()*l.length)];else v=k(c,l);if(h.hasBeenVisited=!0,0!==l.length){switch(v){case"up":h.canMoveUp=!0,e[r-=n].canMoveDown=!0,c.up--,c.down++;break;case"right":h.canMoveRight=!0,e[r+=1].canMoveLeft=!0,c.right--,c.left++;break;case"down":h.canMoveDown=!0,e[r+=n].canMoveUp=!0,c.down--,c.up++;break;case"left":h.canMoveLeft=!0,e[r-=1].canMoveRight=!0,c.left--,c.right++}a.push(r)}else r=a.pop(),o++}},k=function(e,t){var c,a=[],n=Object(f.a)(t);try{for(n.s();!(c=n.n()).done;){var r=c.value,o=0===e[r]?1:e;a.push.apply(a,Object(l.a)(new Array(o).fill(r)))}}catch(i){n.e(i)}finally{n.f()}return a[Math.floor(Math.random()*a.length)]},y=function(e){if(M)switch(e.key.toLowerCase()){case"w":case"arrowup":C();break;case"a":case"arrowleft":B();break;case"s":case"arrowdown":E();break;case"d":case"arrowright":z()}},L=function(e){var t=(e.row-1)*n+e.col-1;return j.current[t]},C=function(){var e=L(m.current);1!==m.current.row&&e.canMoveUp&&g(Object(u.a)(Object(u.a)({},m.current),{},{row:m.current.row-1}))},z=function(){var e=L(m.current);m.current.col>=n||!e.canMoveRight||g(Object(u.a)(Object(u.a)({},m.current),{},{col:m.current.col+1}))},B=function(){var e=L(m.current);1!==m.current.col&&e.canMoveLeft&&g(Object(u.a)(Object(u.a)({},m.current),{},{col:m.current.col-1}))},E=function(){var e=L(m.current);m.current.row>=n||!e.canMoveDown||g(Object(u.a)(Object(u.a)({},m.current),{},{row:m.current.row+1}))};return Object(b.jsx)("div",{className:"maze-aspect-ratio-wrapper",children:Object(b.jsx)("div",{className:"maze-wrapper-outer",children:Object(b.jsxs)("div",{className:"maze-wrapper-inner",children:[Object(b.jsx)("div",{ref:M,className:"player-wrapper",style:{top:"".concat((p.row-1)*(100/n),"%"),left:"".concat((p.col-1)*(100/n),"%"),width:"".concat(100/n,"%"),height:"".concat(100/n,"%")},children:Object(b.jsx)("div",{className:"player"})}),i.map((function(e,t){return Object(b.jsx)("div",{className:"maze-cell".concat(e.isStart?" start":"").concat(e.isEnd?" end":"").concat(e.isRightCol?" right-col":"").concat(e.isBottomRow?" bottom-row":"").concat(e.canMoveUp?" can-move-up":"").concat(e.canMoveRight?" can-move-right":"").concat(e.canMoveDown?" can-move-down":"").concat(e.canMoveLeft?" can-move-left":""),style:{width:"".concat(100/n,"%"),height:"".concat(100/n,"%")}},t)}))]})})})}c(32);function v(){return Object(b.jsx)(b.Fragment,{children:Object(b.jsx)(j,{})})}var d=function(){return Object(b.jsx)("div",{className:"App",children:Object(b.jsx)(i.a,{basename:"/maze-game",children:Object(b.jsx)(s.c,{children:Object(b.jsx)(s.a,{exact:!0,path:"/",children:Object(b.jsx)(v,{})})})})})},p=function(e){e&&e instanceof Function&&c.e(3).then(c.bind(null,39)).then((function(t){var c=t.getCLS,a=t.getFID,n=t.getFCP,r=t.getLCP,o=t.getTTFB;c(e),a(e),n(e),r(e),o(e)}))};o.a.render(Object(b.jsx)(n.a.StrictMode,{children:Object(b.jsx)(d,{})}),document.getElementById("root")),p()}},[[38,1,2]]]);
//# sourceMappingURL=main.ecf5a4b6.chunk.js.map