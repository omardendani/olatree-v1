const i=(t,o)=>{let e;return function(...u){const c=()=>{clearTimeout(e),t(...u)};clearTimeout(e),e=setTimeout(c,o)}};export{i as debounce};
