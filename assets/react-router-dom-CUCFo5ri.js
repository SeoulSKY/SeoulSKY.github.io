import{r as o}from"./react-tsooa7JO.js";import{R as m}from"./react-router-DvbsufWj.js";import{c as f}from"./@remix-run-CEHYKPOQ.js";/**
 * React Router DOM v6.8.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function S(t){let{basename:a,children:c,window:l}=t,r=o.useRef();r.current==null&&(r.current=f({window:l,v5Compat:!0}));let e=r.current,[s,u]=o.useState({action:e.action,location:e.location});return o.useLayoutEffect(()=>e.listen(u),[e]),o.createElement(m,{basename:a,children:c,location:s.location,navigationType:s.action,navigator:e})}var n;(function(t){t.UseScrollRestoration="useScrollRestoration",t.UseSubmitImpl="useSubmitImpl",t.UseFetcher="useFetcher"})(n||(n={}));var i;(function(t){t.UseFetchers="useFetchers",t.UseScrollRestoration="useScrollRestoration"})(i||(i={}));export{S as B};
