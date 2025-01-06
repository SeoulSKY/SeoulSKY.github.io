import{_ as P}from"./tslib-gnqaPs2N.js";const R=(e,t,n)=>Math.min(Math.max(n,e),t),E=e=>typeof e=="number",I=e=>Array.isArray(e)&&!E(e[0]),_=(e,t,n)=>{const s=t-e;return((n-e)%s+s)%s+e};function F(e,t){return I(e)?e[_(0,e.length,t)]:e}const A=(e,t,n)=>-n*e+n*t+e,b=e=>e,z=(e,t,n)=>t-e===0?1:(n-e)/(t-e);function T(e,t){const n=e[e.length-1];for(let s=1;s<=t;s++){const i=z(0,t,s);e.push(A(n,1,i))}}function k(e){const t=[0];return T(t,e-1),t}function N(e,t=k(e.length),n=b){const s=e.length,i=s-t.length;return i>0&&T(t,i),r=>{let o=0;for(;o<s-2&&!(r<t[o+1]);o++);let f=R(0,1,z(t[o],t[o+1],r));return f=F(n,o)(f),A(e[o],e[o+1],f)}}const B=e=>typeof e=="function",M=e=>typeof e=="string";function C(e,t){return t?e*(1e3/t):0}function D(e,t){return typeof e=="string"?e=document.querySelectorAll(e):e instanceof Element&&(e=[e]),Array.from(e||[])}const p=new WeakMap;let u;function G(e,t){if(t){const{inlineSize:n,blockSize:s}=t[0];return{width:n,height:s}}else return e instanceof SVGElement&&"getBBox"in e?e.getBBox():{width:e.offsetWidth,height:e.offsetHeight}}function q({target:e,contentRect:t,borderBoxSize:n}){var s;(s=p.get(e))===null||s===void 0||s.forEach(i=>{i({target:e,contentSize:t,get size(){return G(e,n)}})})}function V(e){e.forEach(q)}function $(){typeof ResizeObserver>"u"||(u=new ResizeObserver(V))}function j(e,t){u||$();const n=D(e);return n.forEach(s=>{let i=p.get(s);i||(i=new Set,p.set(s,i)),i.add(t),u==null||u.observe(s)}),()=>{n.forEach(s=>{const i=p.get(s);i==null||i.delete(t),i!=null&&i.size||u==null||u.unobserve(s)})}}const w=new Set;let v;function J(){v=()=>{const e={width:window.innerWidth,height:window.innerHeight},t={target:window,size:e,contentSize:e};w.forEach(n=>n(t))},window.addEventListener("resize",v)}function K(e){return w.add(e),v||J(),()=>{w.delete(e),!w.size&&v&&(v=void 0)}}function Q(e,t){return B(e)?K(e):j(e,t)}const U=50,L=()=>({current:0,offset:[],progress:0,scrollLength:0,targetOffset:0,targetLength:0,containerLength:0,velocity:0}),X=()=>({time:0,x:L(),y:L()}),Y={x:{length:"Width",position:"Left"},y:{length:"Height",position:"Top"}};function H(e,t,n,s){const i=n[t],{length:r,position:o}=Y[t],f=i.current,h=n.time;i.current=e["scroll"+o],i.scrollLength=e["scroll"+r]-e["client"+r],i.offset.length=0,i.offset[0]=0,i.offset[1]=i.scrollLength,i.progress=z(0,i.scrollLength,i.current);const c=s-h;i.velocity=c>U?0:C(i.current-f,c)}function Z(e,t,n){H(e,"x",t,n),H(e,"y",t,n),t.time=n}function ee(e,t){let n={x:0,y:0},s=e;for(;s&&s!==t;)if(s instanceof HTMLElement)n.x+=s.offsetLeft,n.y+=s.offsetTop,s=s.offsetParent;else if(s instanceof SVGGraphicsElement&&"getBBox"in s){const{top:i,left:r}=s.getBBox();for(n.x+=r,n.y+=i;s&&s.tagName!=="svg";)s=s.parentNode}return n}const te={Enter:[[0,1],[1,1]],Exit:[[0,0],[1,0]],Any:[[1,0],[0,1]],All:[[0,0],[1,1]]},y={start:0,center:.5,end:1};function W(e,t,n=0){let s=0;if(y[e]!==void 0&&(e=y[e]),M(e)){const i=parseFloat(e);e.endsWith("px")?s=i:e.endsWith("%")?e=i/100:e.endsWith("vw")?s=i/100*document.documentElement.clientWidth:e.endsWith("vh")?s=i/100*document.documentElement.clientHeight:e=i}return E(e)&&(s=t*e),n+s}const ne=[0,0];function se(e,t,n,s){let i=Array.isArray(e)?e:ne,r=0,o=0;return E(e)?i=[e,e]:M(e)&&(e=e.trim(),e.includes(" ")?i=e.split(" "):i=[e,y[e]?e:"0"]),r=W(i[0],n,s),o=W(i[1],t),r-o}const ie={x:0,y:0};function re(e,t,n){let{offset:s=te.All}=n;const{target:i=e,axis:r="y"}=n,o=r==="y"?"height":"width",f=i!==e?ee(i,e):ie,h=i===e?{width:e.scrollWidth,height:e.scrollHeight}:{width:i.clientWidth,height:i.clientHeight},c={width:e.clientWidth,height:e.clientHeight};t[r].offset.length=0;let a=!t[r].interpolate;const d=s.length;for(let l=0;l<d;l++){const x=se(s[l],c[o],h[o],f[r]);!a&&x!==t[r].interpolatorOffsets[l]&&(a=!0),t[r].offset[l]=x}a&&(t[r].interpolate=N(k(d),t[r].offset),t[r].interpolatorOffsets=[...t[r].offset]),t[r].progress=t[r].interpolate(t[r].current)}function oe(e,t=e,n){if(n.x.targetOffset=0,n.y.targetOffset=0,t!==e){let s=t;for(;s&&s!=e;)n.x.targetOffset+=s.offsetLeft,n.y.targetOffset+=s.offsetTop,s=s.offsetParent}n.x.targetLength=t===e?t.scrollWidth:t.clientWidth,n.y.targetLength=t===e?t.scrollHeight:t.clientHeight,n.x.containerLength=e.clientWidth,n.y.containerLength=e.clientHeight}function ce(e,t,n,s={}){const i=s.axis||"y";return{measure:()=>oe(e,s.target,n),update:r=>{Z(e,n,r),(s.offset||s.target)&&re(e,n,s)},notify:B(t)?()=>t(n):le(t,n[i])}}function le(e,t){return e.pause(),e.forEachNative((n,{easing:s})=>{var i,r;if(n.updateDuration)s||(n.easing=b),n.updateDuration(1);else{const o={duration:1e3};s||(o.easing="linear"),(r=(i=n.effect)===null||i===void 0?void 0:i.updateTiming)===null||r===void 0||r.call(i,o)}}),()=>{e.currentTime=t.progress}}const g=new WeakMap,O=new WeakMap,m=new WeakMap,S=e=>e===document.documentElement?window:e;function ae(e,t={}){var{container:n=document.documentElement}=t,s=P(t,["container"]);let i=m.get(n);i||(i=new Set,m.set(n,i));const r=X(),o=ce(n,e,r,s);if(i.add(o),!g.has(n)){const c=()=>{const d=performance.now();for(const l of i)l.measure();for(const l of i)l.update(d);for(const l of i)l.notify()};g.set(n,c);const a=S(n);window.addEventListener("resize",c,{passive:!0}),n!==document.documentElement&&O.set(n,Q(n,c)),a.addEventListener("scroll",c,{passive:!0})}const f=g.get(n),h=requestAnimationFrame(f);return()=>{var c;typeof e!="function"&&e.stop(),cancelAnimationFrame(h);const a=m.get(n);if(!a||(a.delete(o),a.size))return;const d=g.get(n);g.delete(n),d&&(S(n).removeEventListener("scroll",d),(c=O.get(n))===null||c===void 0||c(),window.removeEventListener("resize",d))}}export{ae as s};
