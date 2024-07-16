document.querySelector(".js-input");document.querySelector(".js-button");document.querySelector(".js-series");let t=[];function r(n,e){for(const o of n)console.log(o)}const s=n=>{fetch(`https://api.jikan.moe/v4/anime?q=${n}`).then(function(e){return e.json()}).then(function(e){console.log(e),t=e.data,r(t)})};s("naruto");
//# sourceMappingURL=main.js.map
