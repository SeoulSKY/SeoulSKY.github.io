import{a as n,j as e,F as u,A as H}from"./react-animated-cursor-42ec1400.js";import{r as m,R as M}from"./react-ba0062d6.js";import{a as I}from"./react-dom-49e8de85.js";import{L as V,B as O}from"./react-router-dom-a40ff180.js";import{u as Y,p as U,t as X,P as z}from"./react-alert-3c423067.js";import{A as Q}from"./react-alert-template-basic-b638aa6d.js";import{u as K,H as W,C as v,O as R,P as b,a as C,b as Z,c as F,d as G}from"./@react-three-e8943e2b.js";import{i as q}from"./maath-4477e668.js";import{m as o,u as J,a as _}from"./framer-motion-fefdb3d4.js";import{o as B}from"./react-parallax-tilt-085ee7ca.js";import{A as $}from"./atropos-03205d61.js";import{A as ee,B as te,C as ae,a as ne,b as se,c as re,D as ie,d as oe,E as le,F as ce,e as de,f as me,G as pe,g as he,h as ue,H as ge,J as Ae,i as fe,L as xe,j as we,M as ve,k as be,l as ye,N as Ne,m as Ee,P as Se,n as De,o as ke,p as Re,q as Ce,R as Be,r as Pe,s as Te,S as je,T as Le,t as He,U as Me,V as Ie}from"./react-skillicons-8a3423a6.js";import{d as f}from"./react-vertical-timeline-component-d162091b.js";import{e as Ve}from"./@emailjs-f8154c7d.js";import"./@chevrotain-94f2bff3.js";import"./lodash-4ed993c7.js";import"./react-router-d52d5ba0.js";import"./@remix-run-ac252428.js";import"./prop-types-4d501b15.js";import"./react-transition-group-6a46ab3e.js";import"./@babel-d20c226c.js";import"./three-099808ff.js";import"./react-use-measure-5538365e.js";import"./debounce-ae8cc837.js";import"./its-fine-53b8726a.js";import"./react-reconciler-5057fb47.js";import"./scheduler-04ce0582.js";import"./zustand-96d19ac0.js";import"./@react-spring-7eb7369e.js";import"./lodash.pick-4ed993c7.js";import"./three-stdlib-7431e16e.js";import"./mmd-parser-4ed993c7.js";import"./chevrotain-add0ba52.js";import"./regexp-to-ast-4ed993c7.js";import"./opentype.js-4ed993c7.js";import"./lodash.omit-4ed993c7.js";import"./stats.js-4ed993c7.js";import"./react-merge-refs-239dbb3c.js";import"./react-composer-7eb7369e.js";import"./suspend-react-00b64780.js";import"./classnames-7e4e529b.js";import"./react-intersection-observer-9cd74798.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const c of r)if(c.type==="childList")for(const l of c.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function s(r){const c={};return r.integrity&&(c.integrity=r.integrity),r.referrerPolicy&&(c.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?c.credentials="include":r.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function i(r){if(r.ep)return;r.ep=!0;const c=s(r);fetch(r.href,c)}})();const P=()=>{const{progress:t}=K();return n(W,{as:"div",center:!0,style:{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"},children:[e("span",{className:"canvas-loader"}),n("p",{style:{fontSize:14,color:"#F1F1F1",fontWeight:800,marginTop:40},children:[t.toFixed(2),"%"]})]})},Oe=()=>{const t=C("./planet/scene.gltf");return n("mesh",{children:[e("hemisphereLight",{intensity:.15,groundColor:"black"}),e("spotLight",{position:[-20,50,10],angle:.12,penumbra:1,intensity:1,castShadow:!0,"shadow-mapSize":1024}),e("pointLight",{intensity:1}),e("primitive",{object:t.scene,scale:2.5,"position-y":0,"rotation-y":0})]})},Ye=()=>e(v,{shadows:!0,frameloop:"demand",dpr:[1,2],gl:{preserveDrawingBuffer:!0},camera:{fov:45,near:.1,far:200,position:[-4,3,6]},children:n(m.Suspense,{fallback:e(P,{}),children:[e(R,{autoRotate:!0,enableZoom:!1,maxPolarAngle:Math.PI/2,minPolarAngle:Math.PI/2}),e(Oe,{}),e(b,{all:!0})]})}),Ue=({isMobile:t})=>{const a=C("./rocket/scene.gltf");return n("mesh",{children:[e("hemisphereLight",{intensity:.15,groundColor:"black"}),e("spotLight",{position:[-20,50,10],angle:.12,penumbra:1,intensity:1,castShadow:!0,"shadow-mapSize":1024}),e("pointLight",{intensity:1}),e("primitive",{object:a.scene,scale:t?.24:.29,position:[0,0,0],rotation:[0,0,0]})]})},Xe=()=>{const[t,a]=m.useState(!1);return m.useEffect(()=>{const s=window.matchMedia("(max-width: 500px)");a(s.matches);const i=r=>{a(r.matches)};return s.addEventListener("change",i),()=>{s.removeEventListener("change",i)}},[]),n(v,{frameloop:"demand",shadows:!0,dpr:[1,2],camera:{position:[20,3,5],fov:25},gl:{preserveDrawingBuffer:!0},children:[n(m.Suspense,{fallback:e(P,{}),children:[e(R,{autoRotate:!0,autoRotateSpeed:-2,enableZoom:!1,maxPolarAngle:Math.PI/2,minPolarAngle:Math.PI/2}),e(Ue,{isMobile:t})]}),e(b,{all:!0})]})},ze=t=>{const a=m.useRef(),[s]=m.useState(()=>q(new Float32Array(5e3),{radius:1.2}));return Z((i,r)=>{a.current.rotation.x-=r/10,a.current.rotation.y-=r/15}),e("group",{rotation:[0,0,Math.PI/4],children:e(F,{ref:a,positions:s,stride:3,frustumCulled:!0,...t,children:e(G,{transparent:!0,color:"#f272c8",size:.002,sizeAttenuation:!0,depthWrite:!1})})})},Qe=()=>e("div",{className:"w-full h-auto absolute inset-0 z-[-1]",children:n(v,{camera:{position:[0,0,1]},children:[e(m.Suspense,{fallback:null,children:e(ze,{})}),e(b,{all:!0})]})}),d={paddingX:"sm:px-16 px-6",paddingY:"sm:py-16 py-6",padding:"sm:px-16 px-6 sm:py-16 py-10",heroHeadText:"font-black text-white lg:text-[80px] sm:text-[60px] xs:text-[50px] text-[40px] lg:leading-[98px] mt-2",heroSubText:"text-[#dfd9ff] font-medium lg:text-[30px] sm:text-[26px] xs:text-[20px] text-[16px] lg:leading-[40px]",sectionHeadText:"text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]",sectionSubText:"sm:text-[18px] text-[14px] text-secondary uppercase tracking-wider"},Ke=()=>n("section",{className:"relative w-full h-screen mx-auto",children:[e(Xe,{}),n("div",{className:`absolute inset-0 top-[120px]  max-w-7xl mx-auto ${d.paddingX} flex flex-row items-start gap-5`,children:[n("div",{className:"flex flex-col justify-center items-center mt-5",children:[e("div",{className:"w-5 h-5 rounded-full bg-[#0ea5e9]"}),e("div",{className:"w-1 sm:h-80 h-40 blue-gradient"})]}),n("div",{children:[n("h1",{className:`${d.heroHeadText} text-white`,children:["Hi, I'm ",e("span",{className:"text-[#0ea5e9]",children:"SeoulSKY"})]}),e("p",{className:`${d.heroSubText} mt-2 text-white-100`,children:"I'm a 4th year undergraduate student with a major of Honours in Software Engineering and a minor in Applied Mathematics"})]})]}),e("div",{className:"absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center",children:e("a",{href:"#about",children:e("div",{className:"w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2",children:e(o.div,{animate:{y:[0,24,0]},transition:{duration:1.5,repeat:1/0,repeatType:"loop"},className:"w-3 h-3 rounded-full bg-secondary mb-1"})})})})]}),We="/assets/logo-cc44ea2a.png",Ze="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAADC0lEQVR4nO3cz4tNYRzH8YcySrI1Y+NHKTtZ+JE/QYnV+LF3l8psZKwUsmfDQv4AxaBYi4TGSikrmyssyEWi4a2nnimdPPfcO3PM8+35fl51N7c5Z77f53N+zZlznhBEREREREREREREREREZATAauA4cBd4CyxQj4XU0x3gaOzV1EYBbANe4Mc8sDUYGvwP+PO+eAjpsONpy296XvRwlI753h0pGcC90t0bMFcygHhl8C9ngIlQCWACmM302i9ZWO5Ss5rBXwSszfS6EErJ7ZOhUljr11xBGcBF4CtwYZnf2+rXXEEZwJdU2mCZ39vq11xBGXFLToN6fpnf2+rXXEHe+jVXkLd+zRXkrd9cQd4EBVCWAihMARSmAApTAIWZCyBUCmv9mivIW7/mCvLWr7mCvPVrriBv/ZoryFu/XRYETAOvgR/AA2BHMKbaAIDdwK/Gaj4Dh4IhNQdwJbOq38A5Kw/D1hzAZYaLTyVv+D9djFVntQHsA362hPCq9Hmh2gAi4BjwvSWEeF44GAqpOoAI2AW8aQkhnhculTgvVB9ABGwEHtLuJrAmrCAXAURxYIdcGf1tJqwgNwEsAk62BHA/rCBXAQDbgZctAdzo4neNUZOPAIADwKeWwf8G7Oymk5HrqjsAYFV6EaJ5W6KpH/926LYb5wEA69OVTZvHwFRj2SmgB5we4dNrLl+i3050VRCwDng6wuBfbb59A+wZ4XDV9DHeACzVr8UAZloGLN6i7mWWjXvEUjwq1a/FAK4PGaj4IuD+IcsOlhjAoFS/FgM4lVnVE2BTy7LaAzo6B8w3VnMtvpk44j9z4jF9HDoHZF4DPZzOB3vHDHASOJFu0rV94s9NjrmNdLrHd8ZcQd76NVeQt37NFeStX3MFeevXXEHe+tVkHeUn68hNVzNb4XQ1Zy1OVxOf1/HuVskA4hSO3k2XnrSveQvBk2fFH5uMUzemKRy9eQdsDhakEOIUjp62/C3BknQ4iueEufQ/29qmLu4Dt9N7DCae1hYREREREREREREREREJ5v0BKVS/1nXyVEMAAAAASUVORK5CYII=",Fe="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAAE6ElEQVR4nO2dXYhVVRTHtx/VmNnXSxEEvfRQQR8gU1QQJOVMWkT1UISVohaFhNq8+ORDiA9a2tdDTzH2UI6KVNBL9gGSH/WYipNWBBpkpKWoNUy/WNw9MA9373s+9rln73PWDy4MzFn3rr3+5+699j57r2uMoiiKoiiKoiiKoiiKogQEmAs8C4wBR4Bz9nUE2G7/N1eDHhhgJvAS8Bu9OQm8CMxQIcLd9TvJz2fAlSpCueBfAnxFcb6U91ARigvwLuXZqgIUC/4dwGQAASaBu1SE/ALs8gR1L7AQuAKYBwwB33qu36EC5Au+BPaCI5iSbs7uYjNbAu2wOV9legrcalPg1fYlf99iUgUYdgTyT+Aqj901wGmH7cLAPg4Aa4EfPd+8cWANcJlJCWClo0GjGWw/dNiuCOjfPcAvZOdn4G6TCsA6R0M2ZLDd4LBdF8i3Jz3dow+xecKkAPCKoxHbSnwDXg505xcJ/nQRBk3iY8DVBceAoQB9fp5ux8VP0Y8JsoQATDgasKPb7JbOrNmVuv4r6WpJn2TA9bEPeMO+9ve4drWJHU9KOdXYYTsHmAc8AhzwXL89gD+ubEe+ccNdrl8EnHHYHDWxI1lDwJnw/JK+3OZ5/2GP3WKPXfzzBOCdAAK8FcCPZxzvvS+Dreub+bSJHRmsSq6G7gEuDeCHq//flMF2s8N2jUkB28fvLhD8XbKkEciHEcdnbM5gK4NyN0ZMYk/EZHZ8KkPgf5dZb8gnYsDzjs/an8H2oMN2iUkNYI447gn+ErmmosU2F4s8do8lPQi7cLXIVPd5M+wEqhuSai52BP8vh81xkzL9FkAAXsPPAdvfv+npdtKZiEUowBzgGOUZr6KbbLwAAnAfcLHkYty9JnXqEmDacvTFgsF/3DSBOgUQ5C6WgTRH8I8n9UAmdgGmjQkjPYQYt7PoAdMkYhBgCtny4nDn18Zuj4xMgLUOdz43TSUWAehshZGd2d143TSViAR41eVLo3fjxSAAsAD4x+HKD6bJ1CkAnXWhlT12RzxlmkwdAgDXA0uB7/Gzt7HZT78EoLM39X7bx48Ch4D/6I08oL/JNJ2QAtB57DloN4N9YINdZDOAbAB+yLSBogIAs+wOhxfs4Y+DnoE0D38DD5q2kFUA4AbgUWA98KndWRcaEfFm0yZ8AgAPAO8DJ6gW2ai1rNtZhcbjCco3FQZ80o4PW+wcoH2Bn4L+cNJ2W+ttN3Zt3e2OhgqCfcbm7xttsK+ru41RUzLYZ22wtwLP2ayo2ROn0OQI9gTwHfCencVKsGfV7X/yZAj8H8Aq32EOpToBjgI3aoArxBP8c62bFEUmwKa6fWu7APPr9q3tAlxet2+NRgJcx/b01jOtZJmkl704ZR8Zzmx94AIeUfqE/OwOdUSptcgBO+ALivN19KfSW1Cy7O2625EktjBGqIPag3W3p+0ly8bqbk9S9CjWUaRk2UTZYh2twhbfCF2ybKi/rUgYT8Gm0ToLNrWGmEuWtQJP0b5tMRTtazw2qwldsuzh/rYi/YrpFwKWLDuvK6X5RdgZsGTZWLC7oy0AtwecCd9Zd3uSJFDJsi11t6PNP+CwR3/AobwIA57U0seY/qBP2INxK+yG2V6cAJbrdsPq0lMpIfkxcNju8zxr//5ISkFquqkoiqIoiqIoiqIoiqKYhvM/XoUmevMwrbMAAAAASUVORK5CYII=",Ge="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAADGUlEQVR4nO3cTWvUQBzH8RG1R2lRQevTxbMFj4qIvgI9+fQi6qpYRAQPRXoprUd79+FkX4HPngShdz3Yg3qsHgtlvxJ2VtJ0s7tpMpmZ5PeBnJKF3z//zKbTTcYYEREREREREREREREREZG4ACeAG0AHmIt869hajpvQAZeBz0CX5ukCn4BLJjTAXmCB9ngG7DchAPYAr2ifF0ntITTgHu3V8X3yDwN/R4T8CpwBJu0NLX1/6AK37b4Ze2xW/5gDNY/qvDxpf4BDdeXa7dU/k/nMamrf68y+pOisbcfUKSdP1h3jMeD7MQJOZj6znNq3nNmXjISsbcfUKSdP1lvjMeCvIt+TtqD11L4f6QYlV9OAz287pub6BuXJ+ukjWz/g1hgBu/Zr52nm5Pet232rQ+YPyTGLNU6+Ho7Ik7blswECqAGeqQGeqQGehdiATeA+MG0iB0zbG/NmTA2YMw1DrwnRNOCoaRjgSDQNMA1FaPUGF6ht9QYXqG31Fg0EPBn218QI34HT9Va4I/9A0QQqcfL7HtRb4Y78A0UTiPIe11vhePmjCaQGVEwN6Kn6vKoBOchhYgmEo3sAvR/Rl8Z4QGCY5MeXNeBsVfU6VzQQ7hpwleqsVVWvc0UDOWzALNXZqKpe54oGctiAU8mJoxqLVdXrXNFALucBwEn7FMPCLrd54Mqwxw3VADQRC3YE1EEjADWg1BWhEdDQBlBsIjZywlVVvc4VDURYE7E11/U6VzQQYU3ENlzX61zRQIQ1EVt0Xa9zRQMRxkRsftSEq6p6W9WAOqgBqAGlrgiNgIqpAT0xNeAb5dyqt8Jy9QYXKHmwCni0y38X3/T9Znr0DYgdodUbXKC21TvkNdUJ0zDARIivqea9qH3ONAxwPsQXtd/lhPoCTJmGAKZsTYO88RnsLvl+AysBLDk2V3JbsbWEt2RNslSLXbKlrTaAg94aMMYoaLpZryc/9XPgS9rnue+J4X/APrviSVssJTWb0AAXgY8NXrbyA3DBhA44Bly3a8QtRL51gGtNWHZBREREREREREREREREREzb/AM6nYsB/RnQqAAAAABJRU5ErkJggg==",qe="data:image/png;base64,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",Je="/assets/github-3b4e1609.png",_e="/assets/play-38fc542b.png",$e="/assets/menu-b5599218.svg",et="/assets/close-54702a70.svg",tt="/assets/uofs-e7a8b20f.png",at="/assets/sorusora-50beaeea.gif",nt="/assets/desdemona-0dabc0c2.gif",st="/assets/gochat-6b3696f2.png",y=[{id:"about",title:"About"},{id:"experience",title:"Experience"},{id:"skill",title:"Skill"},{id:"project",title:"Project"},{id:"award",title:"Award"},{id:"contact",title:"Contact"}],rt=[{title:"Backend Developer",icon:Ze},{title:"Web Developer",icon:Ge},{title:"DevOps Developer",icon:Fe},{title:"Game Developer",icon:qe}],it=[{title:"Research Assistant",company_name:"Interaction Lab",icon:tt,iconBg:"#383E56",date:"May 2021 - August 2021",points:["Worked as a research assistant at the Human-Computer Interaction Laboratory, University of Saskatchewan.","Engaged with the supervisor to elicit detailed project requirements, ensuring a clear understanding of their needs and objectives.","Developed advanced software solutions utilizing official REST APIs from Twitter and Steam for data collection and analysis.","Developed a website using an internal Python-based framework to conduct a survey for their research."]}],ot=[{name:"SoruSora",description:"Engage in lifelike AI chats, translate messages into 25 languages simultaneously, and convert videos to text. Explore innovative features for enhanced communication and content sharing.",tags:[{name:"python",color:"blue-text-gradient"},{name:"MongoDB",color:"green-text-gradient"},{name:"Docker",color:"pink-text-gradient"}],image:at,source_code_link:"https://github.com/SeoulSKY/SoruSora",play_link:"https://sorusora.seoulsky.org"},{name:"Desdemona",description:"Engage in a game of Othello against a powerful AI opponent, Desdemona, and explore the intriguing environment surrounding you, and discover what lies inside various buildings.",tags:[{name:"Rust",color:"blue-text-gradient"},{name:"Unity3D",color:"green-text-gradient"},{name:"Node.js",color:"pink-text-gradient"}],image:nt,source_code_link:"https://github.com/SeoulSKY/Desdemona",play_link:"https://desdemona.seoulsky.org"},{name:"Go Chat",description:"Experience a real-time chat web application powered by WebSocket, Docker, Go, React, and MongoDB. Engage in instant communication and uncover the technical prowess behind this project.",tags:[{name:"Go",color:"blue-text-gradient"},{name:"React.js",color:"green-text-gradient"},{name:"Docker",color:"pink-text-gradient"}],image:st,source_code_link:"https://github.com/SeoulSKY/go-chat",play_link:null}],lt=[{title:"Dean’s Honour List 2020-21",date:"September 2020",description:"The Dean’s Honour List recognizes undergraduate students whose grades rank in the top 5% of those studying with a full course load in the College of Arts and Science"},{title:"University of Saskatchewan Entrance Scholarship",date:"January 2019",description:"Recognizing academic accomplishment with an admission average of 90+%"}],N=900,ct=()=>{const[t,a]=m.useState(""),[s,i]=m.useState(!1),[r,c]=m.useState(window.innerWidth<N);return m.useEffect(()=>{window.addEventListener("resize",()=>{c(window.innerWidth<N)})},[]),e("nav",{className:`${d.paddingX} w-full flex items-center py-5 fixed top-0 z-20 bg-primary`,children:n("div",{className:"w-full flex justify-between items-center max-w-7xl mx-auto",children:[e(o.div,{whileHover:{scale:1.1},children:n(V,{to:"/",className:"flex items-center gap-2",onClick:()=>{a(""),window.scrollTo(0,0)},children:[e("img",{src:We,alt:"logo",className:"w-9 h-9 object-contain"}),e("p",{className:"text-white text-[18px] font-bold flex",children:"SeoulSKY"})]})}),!r&&e("ul",{className:"list-none flex flex-row gap-10",children:y.map(l=>e(o.li,{className:`${t===l.title?"text-white":"text-secondary"} hover:text-white text-[18px] font-medium cursor-pointer`,onClick:()=>a(l.title),whileHover:{scale:1.1},children:e("a",{href:`#${l.id}`,children:l.title})},l.id))}),r&&n("div",{className:"flex flex-1 justify-end items-center",children:[e("img",{src:s?et:$e,alt:"menu",className:"w-[28px] h-[28px] object-contain",onClick:()=>i(!s)}),e("div",{className:`${s?"flex":"hidden"} p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`,children:e("ul",{className:"list-none flex justify-end items-start flex-1 flex-col gap-4",children:y.map(l=>e("li",{className:`font-poppins font-medium cursor-pointer text-[16px] ${t===l.title?"text-white":"text-secondary"}`,onClick:()=>{i(!s),a(l.title)},children:e("a",{href:`#${l.id}`,children:l.title})},l.id))})})]})]})})},g=t=>({hidden:{y:-50,opacity:0},show:{y:0,opacity:1,transition:{type:"spring",duration:1.25,delay:t}}}),A=(t,a,s,i)=>({hidden:{x:t==="left"?100:t==="right"?-100:0,y:t==="up"?100:t==="down"?-100:0,opacity:0},show:{x:0,y:0,opacity:1,transition:{type:a,delay:s,duration:i,ease:"easeOut"}}}),E=(t,a,s,i)=>({hidden:{x:t==="left"?"-100%":t==="right"?"100%":0,y:t==="up"||t==="down"?"100%":0},show:{x:0,y:0,transition:{type:a,delay:s,duration:i,ease:"easeOut"}}}),dt=(t,a)=>({hidden:{},show:{transition:{staggerChildren:t,delayChildren:a||0}}}),p=(t,a)=>function(){return n(o.section,{variants:dt(),initial:"hidden",whileInView:"show",viewport:{once:!0,amount:.25},className:`${d.padding} max-w-7xl mx-auto relative z-0`,children:[e("span",{className:"hash-span",id:a,children:" "}),e(t,{})]})},mt=({index:t,title:a,icon:s})=>e(B,{className:"xs:w-[250px] w-full",children:e(o.div,{variants:A("right","spring",t*.5,.75),className:"w-full green-blue-gradient p-[1px] rounded-[20px] shadow-card",children:e($,{duration:100,children:n("div",{options:{max:45,scale:1,speed:450},className:"bg-blue-950 rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col","data-atropos-offset":"-10",children:[e("img",{src:s,alt:"web-development",className:"w-16 h-16 object-contain"}),e("h3",{className:"text-white text-[20px] font-bold text-center",children:a})]})})})}),pt=()=>n(u,{children:[n(o.div,{variants:g(),children:[e("p",{className:d.sectionSubText,children:"Introduction"}),e("h2",{className:d.sectionHeadText,children:"Overview"})]}),e(o.p,{variants:A("","",.1,1),className:"mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]",children:"I'm a skilled software developer with experience in Python, C#, Rust, TypeScript and JavaScript, specializing in frameworks like React.js, Node.js and Unity3D. My passion lies in creating efficient, scalable, and user-friendly solutions that tackle real-world problems. I thrive on collaboration and quick learning, making me your ideal partner to bring your ideas to life. Let's work together to turn your vision into reality!"}),e("div",{className:"mt-20 flex flex-wrap gap-10",children:rt.map((t,a)=>e(mt,{index:a,...t},t.title))})]}),ht=p(pt,"about"),ut=[e(ee,{}),e(te,{}),e(ae,{}),e(ne,{}),e(se,{}),e(re,{}),e(ie,{}),e(oe,{}),e(le,{}),e(ce,{}),e(de,{}),e(me,{}),e(pe,{}),e(he,{}),e(ue,{}),e(ge,{}),e(Ae,{}),e(fe,{}),e(xe,{}),e(we,{}),e(ve,{}),e(be,{}),e(ye,{}),e(Ne,{}),e(Ee,{}),e(Se,{}),e(De,{}),e(ke,{}),e(Re,{}),e(Ce,{}),e(Be,{}),e(Pe,{}),e(Te,{}),e(je,{}),e(Le,{}),e(He,{}),e(Me,{}),e(Ie,{})],T=50,S=-10,gt=10,D=()=>Array.from({length:T},()=>Math.random()*(gt-S)+S),At=()=>{const t=m.useRef(null),a=J(t,{once:!0});return n(u,{children:[n(o.div,{ref:t,variants:g(),children:[e("p",{className:`${d.sectionSubText} text-center`,children:"What I am capable of"}),e("h2",{className:`${d.sectionHeadText} text-center`,children:"Skills"})]}),a&&e("div",{className:"mt-20 flex flex-row flex-wrap justify-center gap-10",children:ut.map((s,i)=>e(o.div,{className:"w-20 h-20",animate:{x:D(),y:D(),transition:{type:"string",duration:T*2,repeat:1/0,repeatType:"reverse",delay:Math.random()}},whileHover:{scale:1.1,rotate:20},children:e(o.div,{initial:{scale:0},animate:{scale:1,transition:{type:"spring",delay:i*.05}},children:s},`tech-${i}`)},`tech-${i}`))})]})},ft=p(At,"skill"),xt=({experience:t})=>n(f.VerticalTimelineElement,{contentStyle:{background:"#172554",color:"#fff"},contentArrowStyle:{borderRight:"7px solid #172554"},date:t.date,iconStyle:{background:t.iconBg},icon:e("div",{className:"flex justify-center items-center w-full h-full",children:e("img",{src:t.icon,alt:t.company_name,className:"w-[60%] h-[60%] object-contain"})}),children:[n("div",{children:[e("h3",{className:"text-white text-[24px] font-bold",children:t.title}),e("p",{className:"text-secondary text-[16px] font-semibold",style:{margin:0},children:t.company_name})]}),e("ul",{className:"mt-5 list-disc ml-5 space-y-2",children:t.points.map((a,s)=>e("li",{className:"text-white-100 text-[14px] pl-1 tracking-wider",children:a},`experience-point-${s}`))})]}),wt=()=>n(u,{children:[n(o.div,{variants:g(),children:[e("p",{className:`${d.sectionSubText} text-center`,children:"What I have done so far"}),e("h2",{className:`${d.sectionHeadText} text-center`,children:"Work Experience"})]}),e("div",{className:"mt-20 flex flex-col",children:e(f.VerticalTimeline,{children:it.map((t,a)=>e(xt,{experience:t},`experience-${a}`))})})]}),vt=p(wt,"experience"),k=({link:t,icon:a})=>e(o.div,{onClick:()=>window.open(t,"_blank"),className:"black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer",whileHover:{scale:1.1},children:e("img",{src:a,alt:"link",className:"w-1/2 h-1/2 object-contain"})}),bt=({index:t,name:a,description:s,tags:i,image:r,source_code_link:c,play_link:l})=>e(o.div,{variants:A("up","spring",t*.5,.75),children:n(B,{options:{max:45,scale:1,speed:450},className:"bg-blue-950 p-5 rounded-2xl sm:w-[360px] w-full",children:[n("div",{className:"relative w-full h-[230px]",children:[e("img",{src:r,alt:"project_image",className:"w-full h-full object-cover rounded-2xl"}),n("div",{className:"space-x-1 absolute inset-0 flex justify-end m-3 card-img_hover",children:[c&&e(k,{link:c,icon:Je}),l&&e(k,{link:l,icon:_e})]})]}),n("div",{className:"mt-5",children:[e("h3",{className:"text-white font-bold text-[24px]",children:a}),e("p",{className:"mt-2 text-secondary text-[14px]",children:s})]}),e("div",{className:"mt-4 flex flex-wrap gap-2",children:i.map(h=>n("p",{className:`text-[14px] ${h.color}`,children:["#",h.name]},`${a}-${h.name}`))})]})}),yt=()=>n(u,{children:[n(o.div,{variants:g(),children:[e("p",{className:`${d.sectionSubText} `,children:"My work"}),e("h2",{className:`${d.sectionHeadText}`,children:"Projects"})]}),e("div",{className:"w-full flex",children:e(o.p,{variants:A("","",.1,1),className:"mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]",children:"Delve into my personal software development journey, where I've embarked on a range of diverse projects, always striving to deliver top-notch solutions. Explore in detail my approaches to overcoming various challenges in the field."})}),e("div",{className:"mt-20 flex flex-wrap gap-7",children:ot.map((t,a)=>e(bt,{index:a,...t},`project-${a}`))})]}),Nt=p(yt,"project"),Et=()=>e("svg",{focusable:"false",viewBox:"0 0 24 24","aria-hidden":"true",children:e("path",{d:"M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z",fill:"white"})}),St=({index:t,title:a,date:s,description:i})=>e(o.div,{variants:A("","spring",t*.5,.75),children:n(f.VerticalTimelineElement,{contentStyle:{background:"#172554",color:"#fff"},contentArrowStyle:{borderRight:"7px solid #172554"},date:s,iconStyle:{background:"#085e3f",color:"#fff"},icon:e(Et,{}),children:[e("div",{children:e("h3",{className:"pb-4 text-white text-[24px] font-bold",children:a})}),e("div",{className:"text-white-100 text-[14px] tracking-wider",children:i})]})}),Dt=()=>n(u,{children:[n(o.div,{variants:g(),children:[e("p",{className:d.sectionSubText,children:"What I am proud of"}),e("h2",{className:d.sectionHeadText,children:"Awards"})]}),e(f.VerticalTimeline,{layout:"1-column-left",children:e("div",{className:"flex flex-wrap gap-7",children:lt.map((t,a)=>e(St,{index:a,...t},t.title))})})]}),kt=p(Dt,"award"),Rt=()=>{const t=Y(),a=m.useRef(),[s,i]=m.useState({name:"",email:"",message:""}),[r,c]=m.useState(!1),l=x=>{const{target:w}=x,{name:j,value:L}=w;i({...s,[j]:L})},h=x=>{if(x.preventDefault(),s.name===""){t.error("Please enter your name.");return}else if(s.email===""){t.error("Please enter your email.");return}else if(s.message===""){t.error("Please enter your message.");return}c(!0),Ve.send("service_q0iiufs","template_jqv5jud",{from_name:s.name,to_name:"SeoulSKY",from_email:s.email,to_email:"contact@seoulsky.org",message:s.message},"xN64BFgCQDvMyn1NI").then(()=>{c(!1),t.success("Thank you. I will get back to you as soon as possible."),i({name:"",email:"",message:""})},w=>{c(!1),console.error(w),t.error("Ahh, something went wrong. Please try again.")})};return n("div",{className:"xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden",children:[n(o.div,{variants:E("left","tween",.2,1),className:"flex-[0.75] bg-sky-500/50 p-8 rounded-2xl",children:[e("p",{className:d.sectionSubText,children:"Get in touch"}),e("h3",{className:d.sectionHeadText,children:"Contact"}),n("form",{ref:a,onSubmit:h,className:"mt-12 flex flex-col gap-8",children:[n("label",{className:"flex flex-col",children:[e("span",{className:"text-white font-medium mb-4",children:"Your Name"}),e(o.input,{type:"text",name:"name",value:s.name,onChange:l,placeholder:"What's your name?",className:"bg-blue-950 py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium",whileHover:{scale:1.03}})]}),n("label",{className:"flex flex-col",children:[e("span",{className:"text-white font-medium mb-4",children:"Your email"}),e(o.input,{type:"email",name:"email",value:s.email,onChange:l,placeholder:"What's your email address?",className:"bg-blue-950 py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium",whileHover:{scale:1.03}})]}),n("label",{className:"flex flex-col",children:[e("span",{className:"text-white font-medium mb-4",children:"Your Message"}),e(o.textarea,{rows:7,name:"message",value:s.message,onChange:l,placeholder:"What do you want to say?",className:"bg-blue-950 py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium",whileHover:{scale:1.03}})]}),e(o.button,{type:"submit",className:"bg-blue-950 py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary",whileHover:{scale:1.1},children:r?"Sending...":"Send"})]})]}),e(o.div,{variants:E("right","tween",.2,1),className:"xl:flex-1 xl:h-auto md:h-[550px] h-[350px]",children:e(Ye,{})})]})},Ct=p(Rt,"contact"),Bt={position:U.TOP_RIGHT,timeout:5e3,offset:"5rem",transition:X.SCALE},Pt=()=>{const{scrollYProgress:t}=_();return e(o.div,{className:"bg-gray-100 fixed bottom-0 h-2 w-full rounded",style:{scaleX:t}})},Tt=()=>e(O,{children:n(z,{template:Q,...Bt,children:[n("div",{className:"relative z-0 bg-primary",children:[e(ct,{}),e("div",{className:"bg-hero-pattern bg-cover bg-no-repeat bg-center",children:e(Ke,{})}),e(Qe,{}),e(ht,{}),e(vt,{}),e(ft,{}),e(Nt,{}),e(kt,{}),e("div",{className:"relative z-0",children:e(Ct,{})}),e(Pt,{})]}),e(H,{color:"256, 256, 256",outerSize:35,innerScale:1,outerScale:1.7,outerAlpha:0,outerStyle:{border:"3px solid #fff"}})]})});I.createRoot(document.getElementById("root")).render(e(M.StrictMode,{children:e(Tt,{})}));
