(this.webpackJsonppokemonex=this.webpackJsonppokemonex||[]).push([[0],{50:function(e,t,n){},51:function(e,t,n){},63:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n.n(a),s=n(16),i=n.n(s),r=(n(50),n(12)),o=n(13),l=(n(51),n(83)),p=n(7),j=n(93),m=n(94),u=n(90),b=n(96),h=n(39),d=n.n(h),O=n(9),g=n(85),x=n(86),f=n(87),k=n(88),v=n(89),y=n(91),N=n(64),S=n(4),w=Object(l.a)({root:{maxWidth:345,width:300},media:{height:300}});var T=function(e){var t=e.pkmn,n=w();return Object(S.jsx)(g.a,{item:!0,children:Object(S.jsxs)(x.a,{className:n.root,children:[Object(S.jsxs)(f.a,{children:[Object(S.jsx)(k.a,{className:n.media,image:"https://pokeres.bastionbot.org/images/pokemon/"+t.url.slice(34).slice(0,-1)+".png",title:t.name}),Object(S.jsxs)(v.a,{children:[Object(S.jsx)(u.a,{gutterBottom:!0,variant:"h5",component:"h2",children:t.name}),Object(S.jsxs)(u.a,{variant:"body2",color:"textSecondary",component:"p",children:["Type: ",function(e){var t=new XMLHttpRequest;t.open("GET","https://pokeapi.co/api/v2/pokemon/"+e,!1),t.send(null);var n=JSON.parse(t.responseText).types,a="";return n.map((function(e,t){a=a+e.type.name+" "})),a}(t.name)]})]})]}),Object(S.jsxs)(y.a,{children:[Object(S.jsx)(N.a,{size:"small",color:"primary",children:"Share"}),Object(S.jsx)(N.a,{size:"small",color:"primary",children:"Learn More"})]})]})})},C=n(97),B=n(92),L=n(95),M=Object(l.a)((function(e){return{pokemones:{marginBottom:"2rem",padding:"0 1rem"},filterBar:{margin:"2rem 0"},pageDelta:{margin:"2rem 0"},paginator:{margin:"2rem 0"},selectedTags:{margin:"2rem 0"},tagsTypography:{margin:"2rem 4rem"},allTags:{margin:"0 4rem",marginBottom:"2rem"}}}));var R=function(e){var t=e.search,n=M(),c=Object(a.useState)([]),s=Object(r.a)(c,2),i=s[0],o=s[1],l=Object(a.useState)([]),p=Object(r.a)(l,2),j=p[0],m=p[1],b=Object(a.useState)(10),h=Object(r.a)(b,2),d=h[0],x=h[1],f=Object(a.useState)(0),k=Object(r.a)(f,2),v=(k[0],k[1]),y=Object(a.useState)(1),w=Object(r.a)(y,2),R=w[0],F=w[1],I=Object(a.useState)(["grass","electric","fire","ground","rock"]),E=Object(r.a)(I,2),J=E[0],G=(E[1],Object(a.useState)([])),z=Object(r.a)(G,2),D=z[0],P=z[1];return Object(a.useEffect)((function(){var e=new XMLHttpRequest;e.open("GET","https://pokeapi.co/api/v2/pokemon?limit=1118&offset=0",!1),e.send(null),o(JSON.parse(e.responseText).results),v(Math.ceil(JSON.parse(e.responseText).results.length/d))}),[]),0!==D.length&&i.map((function(e,t){if(t in j);else{console.log("Filtered by tag in: "+(t+1));var n=new XMLHttpRequest;n.open("GET","https://pokeapi.co/api/v2/pokemon/"+(t+1),!1),n.send(null);try{JSON.parse(n.responseText).types.map((function(e,n){for(var a=0;a<D.length;a++)if(e.type.name===D[a]){m([].concat(Object(O.a)(j),[t]));break}}))}catch(a){console.error(a)}}})),0!==j.length&&v(Math.ceil(j.length/d)),Object(S.jsxs)(S.Fragment,{children:[Object(S.jsxs)(g.a,{container:!0,justify:"space-evenly",xs:12,className:n.filterBar,children:[Object(S.jsx)(g.a,{container:!0,justify:"center",className:n.selectedTags,spacing:1,children:D.map((function(e,t){return Object(S.jsx)(g.a,{item:!0,children:Object(S.jsx)(C.a,{size:"medium",color:"secondary",label:e,onDelete:function(t){!function(e){var t=[];D.map((function(n,a){n!==e&&t.push(n)})),P(t)}(e)}})})}))}),Object(S.jsx)(g.a,{item:!0,children:""===t&&Object(S.jsx)(L.a,{className:n.paginator,defaultPage:1,count:Math.ceil(i.length/d),onChange:function(e,t){F(t)}})}),""===t&&Object(S.jsx)(g.a,{item:!0,className:n.pageDelta,children:Object(S.jsxs)(B.a,{color:"secondary","aria-label":"outlined secondary button group",children:[Object(S.jsx)(N.a,{onClick:function(e){x(10)},children:"10"}),Object(S.jsx)(N.a,{onClick:function(e){x(20)},children:"20"}),Object(S.jsx)(N.a,{onClick:function(e){x(30)},children:"30"}),Object(S.jsx)(N.a,{onClick:function(e){x(50)},children:"50"}),Object(S.jsx)(N.a,{onClick:function(e){x(100)},children:"100"})]})})]}),Object(S.jsx)(g.a,{container:!0,spacing:2,justify:"space-evenly",xs:12,className:n.pokemones,children:i.map((function(e,n){if(0!==j.length);else if(""===t){if(n<d*R&&n>d*R-d-1)return Object(S.jsx)(T,{pkmn:e})}else if(e.name.slice(0,t.length)===t)return Object(S.jsx)(T,{pkmn:e})}))}),Object(S.jsx)(u.a,{className:n.tagsTypography,variant:"h4",children:"All tags"}),Object(S.jsx)(g.a,{container:!0,className:n.allTags,xs:6,spacing:"1",children:J.map((function(e,t){return Object(S.jsx)(g.a,{item:!0,children:Object(S.jsx)(C.a,{size:"medium",label:e,onClick:function(e){var n;n=t,D.includes(J[n])||P([].concat(Object(O.a)(D),[J[n]]))}})})}))})]})},F=Object(l.a)((function(e){return{root:{flexGrow:1},AppBar:{backgroundColor:e.palette.common.black},menuButton:{marginRight:e.spacing(2)},title:Object(o.a)({flexGrow:1,display:"none"},e.breakpoints.up("sm"),{display:"block"}),search:Object(o.a)({position:"relative",borderRadius:e.shape.borderRadius,backgroundColor:Object(p.c)(e.palette.common.white,.15),"&:hover":{backgroundColor:Object(p.c)(e.palette.common.white,.25)},marginLeft:0,width:"100%"},e.breakpoints.up("sm"),{marginLeft:e.spacing(1),width:"auto"}),searchIcon:{padding:e.spacing(0,2),height:"100%",position:"absolute",pointerEvents:"none",display:"flex",alignItems:"center",justifyContent:"center"},inputRoot:{color:"inherit"},inputInput:Object(o.a)({padding:e.spacing(1,1,1,0),paddingLeft:"calc(1em + ".concat(e.spacing(4),"px)"),transition:e.transitions.create("width"),width:"100%"},e.breakpoints.up("sm"),{width:"12ch","&:focus":{width:"20ch"}})}}));var I=function(){var e=F(),t=Object(a.useState)(""),n=Object(r.a)(t,2),c=n[0],s=n[1];return Object(S.jsxs)(S.Fragment,{children:[Object(S.jsx)("div",{className:e.root,children:Object(S.jsx)(j.a,{position:"static",className:e.AppBar,children:Object(S.jsxs)(m.a,{children:[Object(S.jsx)(u.a,{className:e.title,variant:"h6",noWrap:!0,children:"pokemonex"}),Object(S.jsxs)("div",{className:e.search,children:[Object(S.jsx)("div",{className:e.searchIcon,children:Object(S.jsx)(d.a,{})}),Object(S.jsx)(b.a,{placeholder:"Search\u2026",classes:{root:e.inputRoot,input:e.inputInput},inputProps:{"aria-label":"search"},value:c,onChange:function(e){s(e.target.value)}})]})]})})}),Object(S.jsx)(R,{search:c})]})},E=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,99)).then((function(t){var n=t.getCLS,a=t.getFID,c=t.getFCP,s=t.getLCP,i=t.getTTFB;n(e),a(e),c(e),s(e),i(e)}))};i.a.render(Object(S.jsx)(c.a.StrictMode,{children:Object(S.jsx)(I,{})}),document.getElementById("root")),E()}},[[63,1,2]]]);
//# sourceMappingURL=main.24efb8dd.chunk.js.map