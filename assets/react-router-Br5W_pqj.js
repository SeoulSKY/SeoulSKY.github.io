import{A as C,i as E,p as L,s as M}from"./@remix-run-CEHYKPOQ.js";import{r as a}from"./react-Bht67Ih-.js";/**
 * React Router v6.8.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */const b=a.createContext(null),g=a.createContext(null);function y(){return a.useContext(g)!=null}var m;(function(e){e.UseBlocker="useBlocker",e.UseRevalidator="useRevalidator"})(m||(m={}));var f;(function(e){e.UseLoaderData="useLoaderData",e.UseActionData="useActionData",e.UseRouteError="useRouteError",e.UseNavigation="useNavigation",e.UseRouteLoaderData="useRouteLoaderData",e.UseMatches="useMatches",e.UseRevalidator="useRevalidator"})(f||(f={}));function R(e){let{basename:h="/",children:x=null,location:n,navigationType:P=C.Pop,navigator:r,static:o=!1}=e;y()&&E(!1);let t=h.replace(/^\/*/,"/"),U=a.useMemo(()=>({basename:t,navigator:r,static:o}),[t,r,o]);typeof n=="string"&&(n=L(n));let{pathname:s="/",search:i="",hash:l="",state:u=null,key:c="default"}=n,v=a.useMemo(()=>{let p=M(s,t);return p==null?null:{pathname:p,search:i,hash:l,state:u,key:c}},[t,s,i,l,u,c]);return v==null?null:a.createElement(b.Provider,{value:U},a.createElement(g.Provider,{children:x,value:{location:v,navigationType:P}}))}var d;(function(e){e[e.pending=0]="pending",e[e.success=1]="success",e[e.error=2]="error"})(d||(d={}));new Promise(()=>{});export{R};
