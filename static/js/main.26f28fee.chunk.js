(this.webpackJsonppokemonex=this.webpackJsonppokemonex||[]).push([[0],{112:function(e,t,a){},113:function(e,t,a){},231:function(e,t,a){"use strict";a.r(t);var n=a(0),s=a.n(n),c=a(28),o=a.n(c),i=(a(112),a(12)),r=a(10),l=(a(113),a(70),a(250)),d=a(9),j=a(258),p=a(259),u=a(255),b=a(262),g=a(97),h=a.n(g),m=a(7),O=a(251),f=a(263),x=a(252),S=a(253),v=a(254),k=a(256),y=a(98),I=a(2),T=Object(l.a)({root:{maxWidth:345,width:300},media:{height:300}});var N=function(e){var t=e.pkmn,a=T(),s=Object(n.useState)(!1),c=Object(i.a)(s,2),o=c[0],r=c[1];return Object(I.jsx)(O.a,{item:!0,children:function(){var e=new XMLHttpRequest;e.open("GET","https://pokeapi.co/api/v2/pokemon/"+t.name,!1),e.send(null);var n=JSON.parse(e.responseText),s=n.types.map((function(e){return Object(I.jsx)(O.a,{item:!0,children:Object(I.jsx)(f.a,{size:"small",color:"primary",label:e.type.name})})}));if(o){var c={labels:[n.stats[0].stat.name,n.stats[1].stat.name,n.stats[2].stat.name,n.stats[3].stat.name,n.stats[4].stat.name,n.stats[5].stat.name],datasets:[{label:n.name,data:[n.stats[0].base_stat,n.stats[1].base_stat,n.stats[2].base_stat,n.stats[3].base_stat,n.stats[4].base_stat,n.stats[5].base_stat],fill:!0,backgroundColor:"rgba(255, 99, 132, 0.2)",borderColor:"rgb(255, 99, 132)",pointBackgroundColor:"rgb(255, 99, 132)",pointBorderColor:"#fff",pointHoverBackgroundColor:"#fff",pointHoverBorderColor:"rgb(255, 99, 132)"}]};return Object(I.jsx)(x.a,{className:a.root,onClick:function(){r(!o)},onMouseOver:function(){r(!0)},onMouseOut:function(){r(!1)},children:Object(I.jsxs)(S.a,{children:[Object(I.jsx)(y.a,{data:c,type:"undefined"}),Object(I.jsxs)(v.a,{children:[Object(I.jsx)(u.a,{gutterBottom:!0,variant:"h5",component:"h2",children:n.name}),Object(I.jsx)(u.a,{variant:"body2",color:"textSecondary",component:"p",children:Object(I.jsxs)(O.a,{container:!0,justify:"flex-start",alignItems:"baseline",spacing:1,children:["Type: ",s]})})]})]})})}return Object(I.jsx)(x.a,{className:a.root,onClick:function(){r(!o)},onMouseOver:function(){r(!0)},onMouseOut:function(){r(!1)},children:Object(I.jsxs)(S.a,{children:[Object(I.jsx)(k.a,{className:a.media,image:"https://pokeres.bastionbot.org/images/pokemon/"+n.id+".png",title:n.name}),Object(I.jsxs)(v.a,{children:[Object(I.jsx)(u.a,{gutterBottom:!0,variant:"h5",component:"h2",children:t.name}),Object(I.jsx)(u.a,{variant:"body2",color:"textSecondary",component:"p",children:Object(I.jsxs)(O.a,{container:!0,justify:"flex-start",alignItems:"baseline",spacing:1,children:["Type: ",s]})})]})]})})}()})},w=a(257),C=a(233),J=a(260),M=a(261),L=a.p+"static/media/preloader.5d2a87c1.gif";var B=function(e){var t=e.search,a=Object(n.useState)([]),s=Object(i.a)(a,2),c=s[0],o=s[1],r=Object(n.useState)(10),l=Object(i.a)(r,2),d=l[0],j=l[1],p=Object(n.useState)(0),b=Object(i.a)(p,2),g=(b[0],b[1]),h=Object(n.useState)(1),x=Object(i.a)(h,2),S=x[0],v=x[1],k=Object(n.useState)([]),y=Object(i.a)(k,2),T=y[0],B=y[1],R=Object(n.useState)("hidden-preloader"),E=Object(i.a)(R,2),F=E[0],G=E[1];null===localStorage.getItem("selectedTags")&&localStorage.setItem("selectedTags",JSON.stringify([]));var H=function(e){e?G("show-preloader"):(G("hide-preloader"),setInterval((function(){G("hidden-preloader")}),990))},_=function(){if(null===localStorage.getItem("selectedTags")&&localStorage.setItem("selectedTags",JSON.stringify([])),0!==JSON.parse(localStorage.getItem("selectedTags")).length)!function(){for(var e=[],t=0;t<JSON.parse(localStorage.getItem("selectedTags")).length;t++){var a=new XMLHttpRequest;a.open("GET","https://pokeapi.co/api/v2/type/"+JSON.parse(localStorage.getItem("selectedTags"))[t],!1),a.send(null),JSON.parse(a.responseText).pokemon.map((function(t,a){t in e||e.push(t.pokemon)}))}o(e),g(Math.ceil(e.length/d))}();else{var e=new XMLHttpRequest;e.open("GET","https://pokeapi.co/api/v2/pokemon?limit=1118&offset=0",!1),e.send(null),o(JSON.parse(e.responseText).results),g(Math.ceil(Math.ceil(c.length/d)))}H(!1)};return Object(n.useEffect)((function(){_(),function(){var e=new XMLHttpRequest;e.open("GET","https://pokeapi.co/api/v2/type/",!1),e.send(null);for(var t=JSON.parse(e.responseText).results,a=[],n=0;n<t.length;n++)a.push(t[n].name);B(a)}()}),[]),Object(I.jsxs)("div",{id:"body",children:[Object(I.jsx)("div",{id:"preloader",className:F,children:Object(I.jsx)("img",{alt:"preloader",src:L})}),Object(I.jsx)(J.a,{m:3,id:"paginator",children:""===t&&Object(I.jsx)(O.a,{container:!0,direction:"row",justify:"center",alignItems:"flex-start",children:Object(I.jsx)(M.a,{defaultPage:1,count:Math.ceil(c.length/d),onChange:function(e,t){v(t)}})})}),Object(I.jsx)(J.a,{m:2,id:"selected-tags",children:Object(I.jsx)(O.a,{container:!0,direction:"row",justify:"center",spacing:2,alignItems:"flex-start",children:JSON.parse(localStorage.getItem("selectedTags")).map((function(e){return Object(I.jsx)(O.a,{item:!0,children:Object(I.jsx)(f.a,{size:"medium",color:"secondary",label:e,onDelete:function(){!function(e){H(!0);var t=JSON.parse(localStorage.getItem("selectedTags")).filter((function(t){return t!==e}));localStorage.setItem("selectedTags",JSON.stringify(t)),_()}(e)}})})}))})}),Object(I.jsx)(J.a,{m:3,id:"paginator-delta",children:""===t&&Object(I.jsx)(O.a,{container:!0,direction:"row",justify:"center",alignItems:"flex-start",children:Object(I.jsxs)(w.a,{color:"secondary","aria-label":"outlined secondary button group",children:[Object(I.jsx)(C.a,{onClick:function(){j(10)},children:"10"}),Object(I.jsx)(C.a,{onClick:function(){j(20)},children:"20"}),Object(I.jsx)(C.a,{onClick:function(){j(30)},children:"30"}),Object(I.jsx)(C.a,{onClick:function(){j(50)},children:"50"}),Object(I.jsx)(C.a,{onClick:function(){j(100)},children:"100"})]})})}),Object(I.jsx)(J.a,{m:3,id:"pokemones",children:Object(I.jsx)(O.a,{container:!0,spacing:2,justify:"space-evenly",children:0===c.length&&0!==JSON.parse(localStorage.getItem("selectedTags")).length?Object(I.jsx)(J.a,{m:4,children:Object(I.jsx)(u.a,{variant:"h3",children:"Not Found"})}):c.map((function(e,a){if(""===t){if(a<d*S&&a>d*S-d-1)return Object(I.jsx)(N,{pkmn:e})}else if(e.name.slice(0,t.length)===t)return Object(I.jsx)(N,{pkmn:e})}))})}),Object(I.jsxs)(J.a,{m:3,id:"all-tags",children:[Object(I.jsx)(J.a,{m:3,children:Object(I.jsx)(u.a,{align:"center",variant:"h4",children:"All tags"})}),Object(I.jsx)(O.a,{container:!0,direction:"row",justify:"center",spacing:3,alignItems:"flex-start",children:T.map((function(e,t){return Object(I.jsx)(O.a,{item:!0,children:Object(I.jsx)(f.a,{size:"medium",label:e,onClick:function(e){var a;a=t,H(!0),JSON.parse(localStorage.getItem("selectedTags")).includes(T[a])||(JSON.parse(localStorage.getItem("selectedTags")).length>0?localStorage.setItem("selectedTags",JSON.stringify([].concat(Object(m.a)(JSON.parse(localStorage.getItem("selectedTags"))),[T[a]]))):localStorage.setItem("selectedTags",JSON.stringify([T[a]])),_())}})})}))})]})]})},R=Object(l.a)((function(e){return{root:{flexGrow:1},title:Object(r.a)({flexGrow:1,display:"none"},e.breakpoints.up("sm"),{display:"block"}),search:Object(r.a)({position:"relative",borderRadius:e.shape.borderRadius,backgroundColor:Object(d.c)(e.palette.common.white,.15),"&:hover":{backgroundColor:Object(d.c)(e.palette.common.white,.25)},marginLeft:0,width:"100%"},e.breakpoints.up("sm"),{marginLeft:e.spacing(1),width:"auto"}),searchIcon:{padding:e.spacing(0,2),height:"100%",position:"absolute",pointerEvents:"none",display:"flex",alignItems:"center",justifyContent:"center"},inputRoot:{color:"inherit"},inputInput:Object(r.a)({padding:e.spacing(1,1,1,0),paddingLeft:"calc(1em + ".concat(e.spacing(4),"px)"),transition:e.transitions.create("width"),width:"100%"},e.breakpoints.up("sm"),{width:"12ch","&:focus":{width:"20ch"}})}}));var E=function(){var e=R(),t=Object(n.useState)(""),a=Object(i.a)(t,2),s=a[0],c=a[1];return Object(I.jsxs)(I.Fragment,{children:[Object(I.jsx)(j.a,{color:"primary",position:"static",className:e.root,children:Object(I.jsxs)(p.a,{children:[Object(I.jsx)(u.a,{variant:"h6",noWrap:!0,className:e.title,children:"pokemonex"}),Object(I.jsxs)("div",{className:e.search,children:[Object(I.jsx)("div",{className:e.searchIcon,children:Object(I.jsx)(h.a,{})}),Object(I.jsx)(b.a,{classes:{root:e.inputRoot,input:e.inputInput},placeholder:"Search\u2026",value:s,onChange:function(e){c(e.target.value)}})]})]})}),Object(I.jsx)(B,{search:s})]})},F=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,266)).then((function(t){var a=t.getCLS,n=t.getFID,s=t.getFCP,c=t.getLCP,o=t.getTTFB;a(e),n(e),s(e),c(e),o(e)}))};o.a.render(Object(I.jsx)(s.a.StrictMode,{children:Object(I.jsx)(E,{})}),document.getElementById("root")),F()},70:function(e,t,a){}},[[231,1,2]]]);
//# sourceMappingURL=main.26f28fee.chunk.js.map