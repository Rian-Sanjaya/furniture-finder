(window["webpackJsonpfurniture-finder"]=window["webpackJsonpfurniture-finder"]||[]).push([[0],{15:function(e,t,n){e.exports=n(26)},25:function(e,t,n){},26:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),i=n(14),l=n.n(i),c=n(2),s=n(9),o=n(3),u=n(4),f=n(6),d=n(5),h=n(7),p=n(10),m=n(12),y=function(e){function t(){var e,n;Object(o.a)(this,t);for(var r=arguments.length,a=new Array(r),i=0;i<r;i++)a[i]=arguments[i];return(n=Object(f.a)(this,(e=Object(d.a)(t)).call.apply(e,[this].concat(a)))).state={showList:!1},n.handleClick=function(e){return n.setState({showList:!n.state.showList})},n}return Object(h.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=this.props,t=e.label,n=e.backgroundcolor,r=e.placeholder,i=e.width,l=e.list,c=e.data,s=e.onHandleClick,o=this.state.showList;return a.a.createElement("div",{style:{position:"relative",width:i||null,padding:"5px 10px",cursor:"pointer",backgroundColor:n||null},onClick:this.handleClick},t||null,a.a.createElement("div",{style:{display:"flex"}},a.a.createElement("div",{style:{flex:"1"}},r||null),a.a.createElement("div",null,o?a.a.createElement(p.a,{icon:m.b}):a.a.createElement(p.a,{icon:m.a}))),o&&a.a.createElement("div",{style:{position:"absolute",left:0,right:0,top:35,boxShadow:"0 4px 8px 0 rgba(0,0,0,0.2)"}},a.a.createElement(v,{backgroundcolor:n,list:l,data:c,onHandleClick:s})))}}]),t}(a.a.Component),v=function(e){function t(){return Object(o.a)(this,t),Object(f.a)(this,Object(d.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=this.props,t=e.backgroundcolor,n=e.list,r=e.data,i=e.onHandleClick;return a.a.createElement("div",{style:{backgroundColor:t||"#fff"}},n.map(function(e,t){return a.a.createElement("div",{key:t,style:{display:"flex",padding:"10px 10px",cursor:"default"},onClick:function(e){e.stopPropagation()}},a.a.createElement("div",{style:{flex:1,cursor:"default"},onClick:function(e){return e.stopPropagation()}},e),a.a.createElement("input",{type:"checkbox",name:e,checked:!(!r||!r[e])&&r[e],onChange:function(t){t.stopPropagation(),i(e)},style:{width:20,height:20,cursor:"pointer"}}))}))}}]),t}(a.a.Component),b=y;function g(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function E(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?g(n,!0).forEach(function(t){Object(s.a)(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):g(n).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}var O=function(e){function t(){var e,n;Object(o.a)(this,t);for(var r=arguments.length,a=new Array(r),i=0;i<r;i++)a[i]=arguments[i];return(n=Object(f.a)(this,(e=Object(d.a)(t)).call.apply(e,[this].concat(a)))).state={delivery_time:{"1 week":!1,"2 weeks":!1,"1 month":!1,more:!1},furniture_styles:{},products:[],filters:{name:"",styles:[],times:[]}},n.fetchProducts=function(){return new Promise(function(e,t){fetch("https://www.mocky.io/v2/5c9105cb330000112b649af8").then(function(e){return e.json()}).then(function(t){var r=n.setFurnitureStyles(t.furniture_styles),a=t.products;e({furniture_styles:r,products:a})}).catch(function(e){console.err(e),t(e)})})},n.setFurnitureStyles=function(e){var t={};return e.forEach(function(e){t[e]=!1}),t},n.handleFilters=function(e){n.fetchProducts().then(function(e){var t=E({},n.state.furniture_styles);e.furniture_styles&&e.furniture_styles.length>0&&e.furniture_styles.forEach(function(e){t[e]||(t[e]=!1)}),n.setState({furniture_styles:t,products:e.products},n.filterProcess)})},n.filterProcess=function(){var e=n.state.filters.name.toLowerCase(),t=n.state.filters.styles,r=n.state.filters.times,a=[],i=n.state.products,l=[],s=[],o=[];if(e&&(l=i.filter(function(t){return t.name.toLowerCase().includes(e)})),t&&t.length>0&&t.forEach(function(e){i.filter(function(t){return t.furniture_style.includes(e)}).forEach(function(e){if(0===s.length)s.push(e);else{for(var t=!0,n=0;n<s.length;n++)if(e.name===s[n].name){t=!1;break}t&&s.push(e)}})}),r&&r.length>0&&r.forEach(function(e){i.forEach(function(t){var n=parseInt(t.delivery_time);"1 week"===e?n<=7&&o.push(t):"2 weeks"===e?n>7&&n<=14&&o.push(t):"1 month"===e?n>14&&n<=30&&o.push(t):n>30&&o.push(t)})}),l.length>0){var u=[],f=Object(c.a)(l);s.length>0?(s.forEach(function(e){for(var t=0;t<f.length;t++)if(e.name===f[t].name){u.push(f[t]),f.splice(t,1);break}}),a=Object(c.a)(u)):a=Object(c.a)(f),a.length>0&&(u=[],f=Object(c.a)(a),o.length>0?(o.forEach(function(e){for(var t=0;t<f.length;t++)if(e.name===f[t].name){u.push(f[t]),f.splice(t,1);break}}),a=Object(c.a)(u)):a=r&&r.length?[]:Object(c.a)(a))}else if(s.length>0){var d=[],h=[].concat(s);o.length>0?(o.forEach(function(e){for(var t=0;t<h.length;t++)if(e.name===h[t].name){d.push(h[t]),h.splice(t,1);break}}),a=[].concat(d)):a=r&&r.length?[]:Object(c.a)(h)}else o.length>0&&(a=[].concat(o));0!==a.length||n.state.filters.name||0!==n.state.filters.styles.length||0!==n.state.filters.times.length||(a=Object(c.a)(i)),n.setState({products:a})},n.handleChange=function(e){var t=e.target.value;n.setState(function(e){return{filters:E({},e.filters,{name:t})}},function(){return n.handleFilters(n.state.filters)})},n.handleClickFurniture=function(e){var t=n.state.filters.styles,r=t.indexOf(e);-1===r?t.push(e):t.splice(r,1),n.setState({furniture_styles:E({},n.state.furniture_styles,Object(s.a)({},e,!n.state.furniture_styles[e])),filters:E({},n.state.filters,{styles:t})},function(){return n.handleFilters(n.state.filters)})},n.handleChangeDeliverytime=function(e){var t=n.state.filters.times,r=t.indexOf(e);-1===r?t.push(e):t.splice(r,1),n.setState({delivery_time:E({},n.state.delivery_time,Object(s.a)({},e,!n.state.delivery_time[e])),filters:E({},n.state.filters,{times:t})},function(){return n.handleFilters(n.state.filters)})},n}return Object(h.a)(t,e),Object(u.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.fetchProducts().then(function(t){return e.setState({furniture_styles:t.furniture_styles,products:t.products})})}},{key:"render",value:function(){var e=this.state,t=e.delivery_time,n=e.furniture_styles,r=e.products,i=e.filters.name;return a.a.createElement("div",{className:"container"},a.a.createElement("div",{className:"header"},a.a.createElement("div",{className:"header-input"},a.a.createElement("input",{className:"header-input-text",type:"text",name:"name",val:i,onChange:this.handleChange,placeholder:"Search Furniture"})),a.a.createElement("div",{style:{marginTop:10}},a.a.createElement("div",{style:{display:"inline-block",width:"49%",marginRight:10,zIndex:4}},a.a.createElement(b,{backgroundcolor:"#fff",placeholder:"Furniture Style",list:Object.keys(n),data:n,onHandleClick:this.handleClickFurniture})),a.a.createElement("div",{style:{display:"inline-block",width:"49%",zIndex:3}},a.a.createElement(b,{backgroundcolor:"#fff",placeholder:"Delivery Time",list:Object.keys(t),data:t,onHandleClick:this.handleChangeDeliverytime})))),a.a.createElement("div",{className:"product-wrapper"},r.map(function(e,t){return a.a.createElement("div",{key:e.name,className:"product-box"},a.a.createElement("div",{className:"product-wrap"},a.a.createElement("div",{className:"product-name-price"},a.a.createElement("div",{className:"product-name"},e.name),a.a.createElement("div",{className:"product-price"},"IDR ".concat(e.price.toLocaleString("en")))),a.a.createElement("div",{className:"product-description"},e.description.length>114?"".concat(e.description.substring(0,114),"..."):e.description),a.a.createElement("div",{className:"product-style"},a.a.createElement("span",null,"Furniture Styles"),a.a.createElement("br",null),a.a.createElement("span",null,e.furniture_style.join(", "))),a.a.createElement("div",{className:"product-delivery"},"Delivery ".concat(e.delivery_time," Days"))))})))}}]),t}(a.a.Component);n(25);l.a.render(a.a.createElement(O,null),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.f1f99644.chunk.js.map