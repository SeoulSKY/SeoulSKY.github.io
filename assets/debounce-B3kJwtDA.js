import{g as p}from"./@chevrotain-C932wzq6.js";function c(r,n,i){var e,l,t,s,o;n==null&&(n=100);function f(){var u=Date.now()-s;u<n&&u>=0?e=setTimeout(f,n-u):(e=null,i||(o=r.apply(t,l),t=l=null))}var a=function(){t=this,l=arguments,s=Date.now();var u=i&&!e;return e||(e=setTimeout(f,n)),u&&(o=r.apply(t,l),t=l=null),o};return a.clear=function(){e&&(clearTimeout(e),e=null)},a.flush=function(){e&&(o=r.apply(t,l),t=l=null,clearTimeout(e),e=null)},a}c.debounce=c;var m=c;const v=p(m);export{v as c};
