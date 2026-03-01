function $(n,r){if(!n)return`rgba(128,128,128,${r})`;let t=n.match(/\d+/g);return!t||t.length<3?`rgba(128,128,128,${r})`:`rgba(${t[0]},${t[1]},${t[2]},${r})`}export{$ as a};
