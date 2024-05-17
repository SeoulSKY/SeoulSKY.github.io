import{j as e,r as d}from"./react-tsooa7JO.js";import{a as H}from"./react-dom-CtjmRZ6W.js";import{B as z}from"./react-router-dom-CUCFo5ri.js";import{A as U}from"./react-animated-cursor-1ge161zJ.js";import{o as k}from"./react-parallax-tilt-fHNMon9b.js";import{A as X}from"./atropos-BxnaKgiE.js";import{m as r,u as Z}from"./framer-motion-CtPhWZmD.js";import{d as b}from"./react-vertical-timeline-component-DJ2LChyD.js";import{u as Q,H as K,C as y,O as M,P as N,a as L,b as W,c as G,d as q}from"./@react-three-TPbfigLg.js";import{e as J}from"./@emailjs-BYBfDvDX.js";import{B as g,Q as $,H as _}from"./react-toastify-CuhRRHLr.js";import"./@chevrotain-C932wzq6.js";import"./react-router-DvbsufWj.js";import"./@remix-run-CEHYKPOQ.js";import"./hey-listen-DkH12NBk.js";import"./@motionone-DOgsiVGs.js";import"./prop-types-BKNjMPK8.js";import"./classnames-BarBPuyi.js";import"./react-intersection-observer-VPuW-8n3.js";import"./@babel-DVPSkNY4.js";import"./three-D4Vw_3Uf.js";import"./react-use-measure-BUoz0hd7.js";import"./debounce-B3kJwtDA.js";import"./its-fine-qQRWqKgQ.js";import"./react-reconciler-D5Wk3Rjb.js";import"./scheduler-CzFDRTuY.js";import"./zustand-3K9hetgj.js";import"./three-stdlib-Bf0Nc8Kp.js";import"./react-merge-refs-BIBY5Z5W.js";import"./suspend-react-CzZ5Hy3S.js";import"./clsx-B-dksMZM.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const a of n)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&o(l)}).observe(document,{childList:!0,subtree:!0});function i(n){const a={};return n.integrity&&(a.integrity=n.integrity),n.referrerPolicy&&(a.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?a.credentials="include":n.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function o(n){if(n.ep)return;n.ep=!0;const a=i(n);fetch(n.href,a)}})();const P="sm:px-16 px-6",ee="sm:px-16 px-6 sm:py-16 py-10",te="font-black text-white lg:text-[80px] sm:text-[60px] xs:text-[50px] text-[40px] lg:leading-[98px] mt-2",se="text-[#dfd9ff] font-medium lg:text-[30px] sm:text-[26px] xs:text-[20px] text-[16px] lg:leading-[40px]",h="text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]",u="sm:text-[18px] text-[14px] text-secondary uppercase tracking-wider";function f(t){return{hidden:{y:-50,opacity:0},show:{y:0,opacity:1,transition:{type:"spring",duration:1.25,delay:t}}}}function A(t,s,i,o){return{hidden:{x:i==="left"?100:i==="right"?-100:0,y:i==="up"?100:i==="down"?-100:0,opacity:0},show:{x:0,y:0,opacity:1,transition:{type:o,delay:t,duration:s,ease:"easeOut"}}}}function E(t,s,i,o){return{hidden:{x:t==="left"?"-100%":t==="right"?"100%":0,y:t==="up"||t==="down"?"100%":0},show:{x:0,y:0,transition:{type:s,delay:i,duration:o,ease:"easeOut"}}}}function ne(t,s){return{hidden:{},show:{transition:{staggerChildren:t,delayChildren:s??0}}}}function p(t){function s(){return e.jsxs(r.section,{variants:ne(),initial:"hidden",whileInView:"show",viewport:{once:!0,amount:.25},className:`${ee} max-w-7xl mx-auto relative z-0`,children:[e.jsx("span",{className:"hash-span",id:t.name.toLowerCase(),children:" "}),e.jsx(t,{})]})}return Object.defineProperty(s,"name",{value:t.name}),s}const ae="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAADC0lEQVR4nO3cz4tNYRzH8YcySrI1Y+NHKTtZ+JE/QYnV+LF3l8psZKwUsmfDQv4AxaBYi4TGSikrmyssyEWi4a2nnimdPPfcO3PM8+35fl51N7c5Z77f53N+zZlznhBEREREREREREREREREZATAauA4cBd4CyxQj4XU0x3gaOzV1EYBbANe4Mc8sDUYGvwP+PO+eAjpsONpy296XvRwlI753h0pGcC90t0bMFcygHhl8C9ngIlQCWACmM302i9ZWO5Ss5rBXwSszfS6EErJ7ZOhUljr11xBGcBF4CtwYZnf2+rXXEEZwJdU2mCZ39vq11xBGXFLToN6fpnf2+rXXEHe+jVXkLd+zRXkrd9cQd4EBVCWAihMARSmAApTAIWZCyBUCmv9mivIW7/mCvLWr7mCvPVrriBv/ZoryFu/XRYETAOvgR/AA2BHMKbaAIDdwK/Gaj4Dh4IhNQdwJbOq38A5Kw/D1hzAZYaLTyVv+D9djFVntQHsA362hPCq9Hmh2gAi4BjwvSWEeF44GAqpOoAI2AW8aQkhnhculTgvVB9ABGwEHtLuJrAmrCAXAURxYIdcGf1tJqwgNwEsAk62BHA/rCBXAQDbgZctAdzo4neNUZOPAIADwKeWwf8G7Oymk5HrqjsAYFV6EaJ5W6KpH/926LYb5wEA69OVTZvHwFRj2SmgB5we4dNrLl+i3050VRCwDng6wuBfbb59A+wZ4XDV9DHeACzVr8UAZloGLN6i7mWWjXvEUjwq1a/FAK4PGaj4IuD+IcsOlhjAoFS/FgM4lVnVE2BTy7LaAzo6B8w3VnMtvpk44j9z4jF9HDoHZF4DPZzOB3vHDHASOJFu0rV94s9NjrmNdLrHd8ZcQd76NVeQt37NFeStX3MFeevXXEHe+tVkHeUn68hNVzNb4XQ1Zy1OVxOf1/HuVskA4hSO3k2XnrSveQvBk2fFH5uMUzemKRy9eQdsDhakEOIUjp62/C3BknQ4iueEufQ/29qmLu4Dt9N7DCae1hYREREREREREREREREJ5v0BKVS/1nXyVEMAAAAASUVORK5CYII=",ie="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAAE6ElEQVR4nO2dXYhVVRTHtx/VmNnXSxEEvfRQQR8gU1QQJOVMWkT1UISVohaFhNq8+ORDiA9a2tdDTzH2UI6KVNBL9gGSH/WYipNWBBpkpKWoNUy/WNw9MA9373s+9rln73PWDy4MzFn3rr3+5+699j57r2uMoiiKoiiKoiiKoiiKogQEmAs8C4wBR4Bz9nUE2G7/N1eDHhhgJvAS8Bu9OQm8CMxQIcLd9TvJz2fAlSpCueBfAnxFcb6U91ARigvwLuXZqgIUC/4dwGQAASaBu1SE/ALs8gR1L7AQuAKYBwwB33qu36EC5Au+BPaCI5iSbs7uYjNbAu2wOV9legrcalPg1fYlf99iUgUYdgTyT+Aqj901wGmH7cLAPg4Aa4EfPd+8cWANcJlJCWClo0GjGWw/dNiuCOjfPcAvZOdn4G6TCsA6R0M2ZLDd4LBdF8i3Jz3dow+xecKkAPCKoxHbSnwDXg505xcJ/nQRBk3iY8DVBceAoQB9fp5ux8VP0Y8JsoQATDgasKPb7JbOrNmVuv4r6WpJn2TA9bEPeMO+9ve4drWJHU9KOdXYYTsHmAc8AhzwXL89gD+ubEe+ccNdrl8EnHHYHDWxI1lDwJnw/JK+3OZ5/2GP3WKPXfzzBOCdAAK8FcCPZxzvvS+Dreub+bSJHRmsSq6G7gEuDeCHq//flMF2s8N2jUkB28fvLhD8XbKkEciHEcdnbM5gK4NyN0ZMYk/EZHZ8KkPgf5dZb8gnYsDzjs/an8H2oMN2iUkNYI447gn+ErmmosU2F4s8do8lPQi7cLXIVPd5M+wEqhuSai52BP8vh81xkzL9FkAAXsPPAdvfv+npdtKZiEUowBzgGOUZr6KbbLwAAnAfcLHkYty9JnXqEmDacvTFgsF/3DSBOgUQ5C6WgTRH8I8n9UAmdgGmjQkjPYQYt7PoAdMkYhBgCtny4nDn18Zuj4xMgLUOdz43TSUWAehshZGd2d143TSViAR41eVLo3fjxSAAsAD4x+HKD6bJ1CkAnXWhlT12RzxlmkwdAgDXA0uB7/Gzt7HZT78EoLM39X7bx48Ch4D/6I08oL/JNJ2QAtB57DloN4N9YINdZDOAbAB+yLSBogIAs+wOhxfs4Y+DnoE0D38DD5q2kFUA4AbgUWA98KndWRcaEfFm0yZ8AgAPAO8DJ6gW2ai1rNtZhcbjCco3FQZ80o4PW+wcoH2Bn4L+cNJ2W+ttN3Zt3e2OhgqCfcbm7xttsK+ru41RUzLYZ22wtwLP2ayo2ROn0OQI9gTwHfCencVKsGfV7X/yZAj8H8Aq32EOpToBjgI3aoArxBP8c62bFEUmwKa6fWu7APPr9q3tAlxet2+NRgJcx/b01jOtZJmkl704ZR8Zzmx94AIeUfqE/OwOdUSptcgBO+ALivN19KfSW1Cy7O2625EktjBGqIPag3W3p+0ly8bqbk9S9CjWUaRk2UTZYh2twhbfCF2ybKi/rUgYT8Gm0ToLNrWGmEuWtQJP0b5tMRTtazw2qwldsuzh/rYi/YrpFwKWLDuvK6X5RdgZsGTZWLC7oy0AtwecCd9Zd3uSJFDJsi11t6PNP+CwR3/AobwIA57U0seY/qBP2INxK+yG2V6cAJbrdsPq0lMpIfkxcNju8zxr//5ISkFquqkoiqIoiqIoiqIoiqKYhvM/XoUmevMwrbMAAAAASUVORK5CYII=",oe="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAADGUlEQVR4nO3cTWvUQBzH8RG1R2lRQevTxbMFj4qIvgI9+fQi6qpYRAQPRXoprUd79+FkX4HPngShdz3Yg3qsHgtlvxJ2VtJ0s7tpMpmZ5PeBnJKF3z//zKbTTcYYEREREREREREREREREZG4ACeAG0AHmIt869hajpvQAZeBz0CX5ukCn4BLJjTAXmCB9ngG7DchAPYAr2ifF0ntITTgHu3V8X3yDwN/R4T8CpwBJu0NLX1/6AK37b4Ze2xW/5gDNY/qvDxpf4BDdeXa7dU/k/nMamrf68y+pOisbcfUKSdP1h3jMeD7MQJOZj6znNq3nNmXjISsbcfUKSdP1lvjMeCvIt+TtqD11L4f6QYlV9OAz287pub6BuXJ+ukjWz/g1hgBu/Zr52nm5Pet232rQ+YPyTGLNU6+Ho7Ik7blswECqAGeqQGeqQGehdiATeA+MG0iB0zbG/NmTA2YMw1DrwnRNOCoaRjgSDQNMA1FaPUGF6ht9QYXqG31Fg0EPBn218QI34HT9Va4I/9A0QQqcfL7HtRb4Y78A0UTiPIe11vhePmjCaQGVEwN6Kn6vKoBOchhYgmEo3sAvR/Rl8Z4QGCY5MeXNeBsVfU6VzQQ7hpwleqsVVWvc0UDOWzALNXZqKpe54oGctiAU8mJoxqLVdXrXNFALucBwEn7FMPCLrd54Mqwxw3VADQRC3YE1EEjADWg1BWhEdDQBlBsIjZywlVVvc4VDURYE7E11/U6VzQQYU3ENlzX61zRQIQ1EVt0Xa9zRQMRxkRsftSEq6p6W9WAOqgBqAGlrgiNgIqpAT0xNeAb5dyqt8Jy9QYXKHmwCni0y38X3/T9Znr0DYgdodUbXKC21TvkNdUJ0zDARIivqea9qH3ONAxwPsQXtd/lhPoCTJmGAKZsTYO88RnsLvl+AysBLDk2V3JbsbWEt2RNslSLXbKlrTaAg94aMMYoaLpZryc/9XPgS9rnue+J4X/APrviSVssJTWb0AAXgY8NXrbyA3DBhA44Bly3a8QtRL51gGtNWHZBREREREREREREREREREzb/AM6nYsB/RnQqAAAAABJRU5ErkJggg==",re="data:image/png;base64,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",le=[{title:"Backend Developer",icon:ae},{title:"Web Developer",icon:oe},{title:"DevOps Developer",icon:ie},{title:"Game Developer",icon:re}];function ce({index:t,title:s,icon:i}){return e.jsx(k,{className:"xs:w-[250px] w-full",children:e.jsx(r.div,{variants:A(t*.5,.75,"right","spring"),className:"w-full green-blue-gradient p-[1px] rounded-[20px] shadow-card",children:e.jsx(X,{shadow:!1,children:e.jsxs("div",{className:"py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col","data-atropos-offset":"-10",children:[e.jsx("img",{src:i,alt:s,className:"w-16 h-16"}),e.jsx("h3",{className:"text-white text-[20px] font-bold text-center",children:s})]})})})})}function de(){return e.jsxs(e.Fragment,{children:[e.jsxs(r.div,{variants:f(),children:[e.jsx("p",{className:u,children:"Introduction"}),e.jsx("h2",{className:h,children:"Overview"})]}),e.jsxs("a",{href:"#about",children:[e.jsx(r.p,{variants:A(.1,1),className:"mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]",children:"I'm a skilled software developer with experience in Python, C#, Rust, TypeScript and JavaScript, specializing in frameworks like React.js, React Native and Unity3D. My passion lies in creating efficient, scalable, and user-friendly solutions that tackle real-world problems. I thrive on collaboration and quick learning, making me your ideal partner to bring your ideas to life. Let's work together to turn your vision into reality!"}),e.jsx("div",{className:"mt-20 flex flex-wrap gap-10",children:le.map((t,s)=>e.jsx(ce,{index:s,...t},t.title))})]})]})}const me=p(de),xe="/assets/uofs-B5pyQkcA.png",he=[{title:"Research Assistant",companyName:"Interaction Lab",icon:xe,iconBg:"#383E56",date:"May 2021 - August 2021",points:["Worked as a research assistant at the Human-Computer Interaction Laboratory, University of Saskatchewan.","Engaged with the supervisor to elicit detailed project requirements, ensuring a clear understanding of their needs and objectives.","Developed advanced software solutions utilizing official REST APIs from Twitter and Steam for data collection and analysis.","Developed a website using an internal Python-based framework to conduct a survey for their research."]}];function ue({experience:t}){return e.jsxs(b.VerticalTimelineElement,{contentStyle:{background:"#172554",color:"#fff"},contentArrowStyle:{borderRight:"7px solid #172554"},date:t.date,iconStyle:{background:t.iconBg},icon:e.jsx("div",{className:"flex justify-center items-center w-full h-full",children:e.jsx("img",{src:t.icon,alt:t.companyName,className:"w-[60%] h-[60%] object-contain"})}),children:[e.jsxs("div",{children:[e.jsx("h3",{className:"text-white text-[24px] font-bold",children:t.title}),e.jsx("p",{className:"text-secondary text-[16px] font-semibold",style:{margin:0},children:t.companyName})]}),e.jsx("ul",{className:"mt-5 list-disc ml-5 space-y-2",children:t.points.map((s,i)=>e.jsx("li",{className:"text-white-100 text-[14px] pl-1 tracking-wider",children:s},`experience-point-${i}`))})]})}function pe(){return e.jsxs(e.Fragment,{children:[e.jsxs(r.div,{variants:f(),children:[e.jsx("p",{className:`${u} text-center`,children:"What I have done so far"}),e.jsx("h2",{className:`${h} text-center`,children:"Work Experience"})]}),e.jsx("div",{className:"mt-20 flex flex-col",children:e.jsx(b.VerticalTimeline,{children:he.map((t,s)=>e.jsx(ue,{experience:t},`experience-${s}`))})})]})}const ge=p(pe);function I(){const{progress:t}=Q();return e.jsxs(K,{as:"div",center:!0,style:{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"},children:[e.jsx("span",{className:"canvas-loader"}),e.jsxs("p",{style:{fontSize:14,color:"#F1F1F1",fontWeight:800,marginTop:40},children:[t.toFixed(2),"%"]})]})}function fe({isMobile:t}){const s=L("./rocket/scene.gltf");return e.jsxs("mesh",{children:[e.jsx("hemisphereLight",{intensity:.15,groundColor:"black"}),e.jsx("spotLight",{position:[-20,50,10],angle:.12,penumbra:1,intensity:1,castShadow:!0,"shadow-mapSize":1024}),e.jsx("pointLight",{intensity:1}),e.jsx("primitive",{object:s.scene,scale:t?.24:.29,position:[0,0,0],rotation:[0,0,0]})]})}function Ae(){const[t,s]=d.useState(!1);return d.useEffect(()=>{const i=window.matchMedia("(max-width: 500px)");s(i.matches);function o(n){s(n.matches)}return i.addEventListener("change",o),()=>{i.removeEventListener("change",o)}},[]),e.jsxs(y,{frameloop:"demand",shadows:!0,dpr:[1,2],camera:{position:[20,3,5],fov:25},gl:{preserveDrawingBuffer:!0},children:[e.jsxs(d.Suspense,{fallback:e.jsx(I,{}),children:[e.jsx(M,{autoRotate:!0,autoRotateSpeed:-2,enableZoom:!1,maxPolarAngle:Math.PI/2,minPolarAngle:Math.PI/2}),e.jsx(fe,{isMobile:t})]}),e.jsx(N,{all:!0})]})}function we(){return e.jsxs("section",{className:"relative w-full h-screen mx-auto",children:[e.jsx(Ae,{}),e.jsxs("div",{className:`absolute inset-0 top-[120px]  max-w-7xl mx-auto ${P} flex flex-row items-start gap-5`,children:[e.jsxs("div",{className:"flex flex-col justify-center items-center mt-5",children:[e.jsx("div",{className:"w-5 h-5 rounded-full bg-[#0ea5e9]"}),e.jsx("div",{className:"w-1 sm:h-80 h-40 blue-gradient"})]}),e.jsxs("div",{children:[e.jsxs("h1",{className:`${te} text-white`,children:["Hi, I'm ",e.jsx("span",{className:"text-[#0ea5e9]",children:"SeoulSKY"})]}),e.jsx("p",{className:`${se} mt-2 text-white-100`,children:"I'm a recent graduate with a major of Honours in Software Engineering and a minor in Applied Mathematics"})]})]}),e.jsx("div",{className:"absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center",children:e.jsx("div",{className:"w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2",children:e.jsx(r.div,{animate:{y:[0,24,0]},transition:{duration:1.5,repeat:1/0,repeatType:"loop"},className:"w-3 h-3 rounded-full bg-secondary mb-1"})})})]})}const je="/assets/logo-DfABMKt5.png",ve="data:image/svg+xml,%3csvg%20width='20'%20height='12'%20viewBox='0%200%2020%2012'%20fill='%23FFF'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M9%202L19%202C19.2652%202%2019.5196%201.89464%2019.7071%201.70711C19.8946%201.51957%2020%201.26522%2020%201C20%200.734784%2019.8946%200.480429%2019.7071%200.292892C19.5196%200.105356%2019.2652%200%2019%200L9%200C8.73478%200%208.48043%200.105356%208.29289%200.292892C8.10536%200.480429%208%200.734784%208%201C8%201.26522%208.10536%201.51957%208.29289%201.70711C8.48043%201.89464%208.73478%202%209%202ZM19%2010L1%2010C0.734784%2010%200.480429%2010.1054%200.292892%2010.2929C0.105356%2010.4804%200%2010.7348%200%2011C0%2011.2652%200.105356%2011.5196%200.292892%2011.7071C0.480429%2011.8946%200.734784%2012%201%2012L19%2012C19.2652%2012%2019.5196%2011.8946%2019.7071%2011.7071C19.8946%2011.5196%2020%2011.2652%2020%2011C20%2010.7348%2019.8946%2010.4804%2019.7071%2010.2929C19.5196%2010.1054%2019.2652%2010%2019%2010V10ZM1%207L19%207C19.2652%207%2019.5196%206.89464%2019.7071%206.70711C19.8946%206.51957%2020%206.26522%2020%206C20%205.73478%2019.8946%205.48043%2019.7071%205.29289C19.5196%205.10536%2019.2652%205%2019%205L1%205C0.734784%205%200.480429%205.10536%200.292892%205.29289C0.105356%205.48043%200%205.73478%200%206C0%206.26522%200.105356%206.51957%200.292892%206.70711C0.480429%206.89464%200.734784%207%201%207Z'%20fill='%23FFFFFF'/%3e%3c/svg%3e",be="data:image/svg+xml,%3csvg%20width='18'%20height='18'%20viewBox='0%200%2018%2018'%20fill='%23FFF'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M10.4099%209L16.7099%202.71C16.8982%202.5217%2017.004%202.2663%2017.004%202C17.004%201.7337%2016.8982%201.47831%2016.7099%201.29C16.5216%201.1017%2016.2662%200.995911%2015.9999%200.995911C15.7336%200.995911%2015.4782%201.1017%2015.2899%201.29L8.99994%207.59L2.70994%201.29C2.52164%201.1017%202.26624%200.995911%201.99994%200.995911C1.73364%200.995911%201.47824%201.1017%201.28994%201.29C1.10164%201.47831%200.995847%201.7337%200.995847%202C0.995847%202.2663%201.10164%202.5217%201.28994%202.71L7.58994%209L1.28994%2015.29C1.19621%2015.383%201.12182%2015.4936%201.07105%2015.6154C1.02028%2015.7373%200.994141%2015.868%200.994141%2016C0.994141%2016.132%201.02028%2016.2627%201.07105%2016.3846C1.12182%2016.5064%201.19621%2016.617%201.28994%2016.71C1.3829%2016.8037%201.4935%2016.8781%201.61536%2016.9289C1.73722%2016.9797%201.86793%2017.0058%201.99994%2017.0058C2.13195%2017.0058%202.26266%2016.9797%202.38452%2016.9289C2.50638%2016.8781%202.61698%2016.8037%202.70994%2016.71L8.99994%2010.41L15.2899%2016.71C15.3829%2016.8037%2015.4935%2016.8781%2015.6154%2016.9289C15.7372%2016.9797%2015.8679%2017.0058%2015.9999%2017.0058C16.132%2017.0058%2016.2627%2016.9797%2016.3845%2016.9289C16.5064%2016.8781%2016.617%2016.8037%2016.7099%2016.71C16.8037%2016.617%2016.8781%2016.5064%2016.9288%2016.3846C16.9796%2016.2627%2017.0057%2016.132%2017.0057%2016C17.0057%2015.868%2016.9796%2015.7373%2016.9288%2015.6154C16.8781%2015.4936%2016.8037%2015.383%2016.7099%2015.29L10.4099%209Z'%20fill='%23FFFFFF'/%3e%3c/svg%3e";function ye(){const[t,s]=d.useState(0);return d.useEffect(()=>{function i(){s(window.scrollY/(document.documentElement.scrollHeight-document.documentElement.clientHeight))}return window.addEventListener("scroll",i),()=>{window.removeEventListener("scroll",i)}},[]),t}function Ne(){const t=ye();return e.jsx("div",{className:"bg-white h-2 rounded",style:{width:`${t*100}%`}})}const S=900;function Ce({sections:t}){const[s,i]=d.useState(!1),[o,n]=d.useState(window.innerWidth<S);return d.useEffect(()=>{window.addEventListener("resize",()=>{n(window.innerWidth<S)})},[]),e.jsxs("div",{className:"flex w-full flex-col items-start fixed top-0 z-20",children:[e.jsx("nav",{className:`${P} w-full flex bg-black pt-3`,children:e.jsxs("div",{className:"w-full flex justify-between items-center max-w-7xl mx-auto pb-3",children:[e.jsx(r.div,{whileHover:{scale:1.1},whileTap:{scale:.9},children:e.jsxs("div",{className:"flex items-center gap-2",onClick:()=>{window.scrollTo(0,0)},children:[e.jsx("img",{src:je,alt:"logo",className:"w-9 h-9 object-contain"}),e.jsx("p",{className:"text-white text-[18px] font-bold flex",children:"SeoulSKY"})]})}),!o&&e.jsx("ul",{className:"list-none flex flex-row gap-10",children:t.map(({name:a,ref:l})=>e.jsx(r.li,{className:"text-secondary hover:text-white text-[18px] font-medium cursor-pointer",onClick:()=>{l.current&&l.current.scrollIntoView({behavior:"smooth"})},whileHover:{scale:1.1},whileTap:{scale:.9,style:{color:"white"}},children:a},a))}),o&&e.jsxs("div",{className:"flex flex-1 justify-end items-center",children:[e.jsx("img",{src:s?be:ve,alt:"menu",className:"w-[28px] h-[28px] object-contain",onClick:()=>i(!s)}),e.jsx("div",{className:`${s?"flex":"hidden"} p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`,children:e.jsx("ul",{className:"list-none flex justify-end items-start flex-1 flex-col gap-4",children:t.map(({name:a,ref:l})=>e.jsx("li",{className:"font-poppins font-medium cursor-pointer text-[16px] text-secondary",onClick:()=>{var m;i(!s),(m=l.current)==null||m.scrollIntoView({behavior:"smooth"})},children:a},a))})})]})]})}),e.jsx(Ne,{})]})}const Ee="/assets/memorymate-513Qhpp-.gif",Se="/assets/desdemona-9cYh2EKl.gif",Re="/assets/gochat-R2FAoLDZ.png",De="/assets/sorusora-BFb1yA7L.gif",Be="/assets/github-BUfx7uqA.png",ke="/assets/play-BgbZa5nO.png",Me=[{name:"Memory Mate",description:"Connect with our empathetic AI companion tailored for those with dementia, offering friendly conversations and engaging personalized brain games to enhance cognitive abilities.",tags:[{name:"React Native",color:"blue-text-gradient"},{name:"Gemini AI",color:"green-text-gradient"},{name:"TypeScript",color:"pink-text-gradient"}],image:Ee,sourceCodeLink:"https://github.com/SeoulSKY/MemoryMate"},{name:"Desdemona",description:"Engage in a game of Othello against a powerful AI opponent, Desdemona, and explore the intriguing environment surrounding you, and discover what lies inside various buildings.",tags:[{name:"Rust",color:"blue-text-gradient"},{name:"Unity3D",color:"green-text-gradient"},{name:"Node.js",color:"pink-text-gradient"}],image:Se,sourceCodeLink:"https://github.com/SeoulSKY/Desdemona",playLink:"https://desdemona.seoulsky.org"},{name:"Go Chat",description:"Experience a real-time chat web application powered by WebSocket, Docker, Go, React, and MongoDB. Engage in instant communication and uncover the technical prowess behind this project.",tags:[{name:"Go",color:"blue-text-gradient"},{name:"React.js",color:"green-text-gradient"},{name:"Docker",color:"pink-text-gradient"}],image:Re,sourceCodeLink:"https://github.com/SeoulSKY/go-chat"},{name:"SoruSora",description:"Engage in lifelike AI chats, translate messages into 25 languages simultaneously, and convert videos to text. Explore innovative features for enhanced communication and content sharing.",tags:[{name:"Python",color:"blue-text-gradient"},{name:"MongoDB",color:"green-text-gradient"},{name:"Docker",color:"pink-text-gradient"}],image:De,sourceCodeLink:"https://github.com/SeoulSKY/SoruSora",playLink:"https://sorusora.seoulsky.org"}];function R({link:t,icon:s}){return e.jsx(r.div,{onClick:()=>window.open(t,"_blank"),className:"black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer",whileHover:{scale:1.1},children:e.jsx("img",{src:s,alt:"link",className:"w-1/2 h-1/2 object-contain"})})}function Le({index:t,name:s,description:i,tags:o,image:n,sourceCodeLink:a,playLink:l}){return e.jsx(r.div,{variants:A(t*.5,.75,"up","spring"),children:e.jsxs(k,{className:"bg-blue-950 p-5 rounded-2xl sm:w-[360px] w-full",children:[e.jsxs("div",{className:"relative w-full aspect-video",children:[e.jsx("img",{src:n,alt:"project_image",className:"w-full h-full object-cover rounded-2xl"}),e.jsxs("div",{className:"space-x-1 absolute inset-0 flex justify-end m-3 card-img_hover",children:[a&&e.jsx(R,{link:a,icon:Be}),l&&e.jsx(R,{link:l,icon:ke})]})]}),e.jsxs("div",{className:"mt-5",children:[e.jsx("h3",{className:"text-white font-bold text-[24px]",children:s}),e.jsx("p",{className:"mt-2 text-secondary text-[14px]",children:i})]}),e.jsx("div",{className:"mt-4 flex flex-wrap gap-2",children:o.map(({name:m,color:c})=>e.jsxs("p",{className:`text-[14px] ${c}`,children:["#",m]},m))})]})},s)}function Pe(){return e.jsxs(e.Fragment,{children:[e.jsxs(r.div,{variants:f(),children:[e.jsx("p",{className:u,children:"My work"}),e.jsx("h2",{className:h,children:"Projects"})]}),e.jsx("div",{className:"w-full flex",children:e.jsx(r.p,{variants:A(.1,1),className:"mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]",children:"Delve into my personal software development journey, where I've embarked on a range of diverse projects, always striving to deliver top-notch solutions. Explore in detail my approaches to overcoming various challenges in the field."})}),e.jsx("div",{className:"mt-20 flex flex-wrap gap-7",children:Me.map((t,s)=>e.jsx(Le,{index:s,...t},t.name))})]})}const Ie=p(Pe),Te=["ae","apple","bash","c","cs","cloudflare","css","discord","docker","express","figma","firebase","flask","gcp","git","github","githubactions","html","idea","java","js","latex","linux","matlab","mongodb","mysql","nginx","nodejs","ps","postgres","postman","pr","py","react","rust","scala","tailwind","ts","unity","vscode","windows"],T=50,D=-10,Ve=10;function B(){return Array.from({length:T},()=>Math.random()*(Ve-D)+D)}function Ye(){const t=d.useRef(null),s=Z(t,{once:!0});return e.jsxs(e.Fragment,{children:[e.jsxs(r.div,{ref:t,variants:f(),children:[e.jsx("p",{className:`${u} text-center`,children:"What I am capable of"}),e.jsx("h2",{className:`${h} text-center`,children:"Skills"})]}),s&&e.jsx("div",{className:"mt-20 flex flex-row flex-wrap justify-center gap-10",children:Te.map((i,o)=>e.jsx(r.div,{className:"w-20 h-20",animate:{x:B(),y:B(),transition:{type:"string",duration:T*2,repeat:1/0,repeatType:"reverse",delay:Math.random()}},whileHover:{scale:1.1,rotate:20},children:e.jsx(r.img,{className:"w-full h-full",src:`https://skillicons.dev/icons?i=${i}`,alt:i,initial:{scale:0},animate:{scale:1,transition:{type:"spring",delay:o*.05}}},`tech-${o}`)},`tech-${o}`))})]})}const Fe=p(Ye);function Oe(){const[t,s]=d.useState(()=>{const n=new Float32Array(15e3);for(let a=0;a<5e3;a+=3){const l=Math.random()*Math.PI*2,m=Math.random()*2-1,c=Math.acos(m),x=Math.cbrt(Math.random())*1.2,w=x*Math.sin(c)*Math.cos(l),j=x*Math.sin(c)*Math.sin(l),v=x*Math.cos(c);n[a]=w,n[a+1]=j,n[a+2]=v}return n});return W((i,o)=>{const n=o/10,a=o/15;s(l=>{const m=new Float32Array(l.length);for(let c=0;c<l.length;c+=3){const x=l[c],w=l[c+1],j=l[c+2],v=x,V=w*Math.cos(n)-j*Math.sin(n),C=w*Math.sin(n)+j*Math.cos(n),Y=v*Math.cos(a)+C*Math.sin(a),F=V,O=-v*Math.sin(a)+C*Math.cos(a);m[c]=Y,m[c+1]=F,m[c+2]=O}return m})}),e.jsx("group",{rotation:[0,0,Math.PI/4],children:e.jsx(G,{positions:t,stride:3,frustumCulled:!0,children:e.jsx(q,{transparent:!0,color:"white",size:.002,sizeAttenuation:!0,depthWrite:!1})})})}function He(){return e.jsx("div",{className:"w-full h-auto absolute inset-0 z-[-1]",children:e.jsxs(y,{camera:{position:[0,0,1]},children:[e.jsx(d.Suspense,{fallback:null,children:e.jsx(Oe,{})}),e.jsx(N,{all:!0})]})})}function ze(){const t=L("./planet/scene.gltf");return e.jsxs("mesh",{children:[e.jsx("hemisphereLight",{intensity:.15,groundColor:"black"}),e.jsx("spotLight",{position:[-20,50,10],angle:.12,penumbra:1,intensity:1,castShadow:!0,"shadow-mapSize":1024}),e.jsx("pointLight",{intensity:1}),e.jsx("primitive",{object:t.scene,scale:2.5,"position-y":0,"rotation-y":0})]})}function Ue(){return e.jsx(y,{shadows:!0,frameloop:"demand",dpr:[1,2],gl:{preserveDrawingBuffer:!0},camera:{fov:45,near:.1,far:200,position:[-4,3,6]},children:e.jsxs(d.Suspense,{fallback:e.jsx(I,{}),children:[e.jsx(M,{autoRotate:!0,enableZoom:!1,maxPolarAngle:Math.PI/2,minPolarAngle:Math.PI/2}),e.jsx(ze,{}),e.jsx(N,{all:!0})]})})}function Xe(){const t=d.useRef(null),[s,i]=d.useState({name:"",email:"",message:""}),[o,n]=d.useState(!1);function a(m){const{name:c,value:x}=m.target;i({...s,[c]:x})}function l(m){if(m.preventDefault(),s.name.trim()===""){g.error("Please enter your name.");return}else if(s.email.trim()===""){g.error("Please enter your email.");return}else if(s.message.trim()===""){g.error("Please enter your message.");return}n(!0),J.send("default_service","template_jqv5jud",{fromName:s.name,fromEmail:s.email,message:s.message},"xN64BFgCQDvMyn1NI").then(()=>{n(!1),g.success("Thank you. I will get back to you as soon as possible."),i({name:"",email:"",message:""})},c=>{n(!1),console.error(c),g.error("Ahh, something went wrong. Please try again later.")})}return e.jsxs("div",{className:"xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden",children:[e.jsxs(r.div,{variants:E("left","tween",.2,1),className:"flex-[0.75] bg-sky-500/50 p-8 rounded-2xl",children:[e.jsx("p",{className:u,children:"Get in touch"}),e.jsx("h3",{className:h,children:"Contact"}),e.jsxs("form",{ref:t,onSubmit:l,className:"mt-12 flex flex-col gap-8",children:[e.jsxs("label",{className:"flex flex-col",children:[e.jsx("span",{className:"text-white font-medium mb-4",children:"Your Name"}),e.jsx(r.input,{type:"text",name:"name",value:s.name,onChange:a,placeholder:"What's your name?",className:`bg-blue-950 py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none
              border-none font-medium`,whileHover:{scale:1.03},whileTap:{scale:.97}})]}),e.jsxs("label",{className:"flex flex-col",children:[e.jsx("span",{className:"text-white font-medium mb-4",children:"Your email"}),e.jsx(r.input,{type:"email",name:"email",value:s.email,onChange:a,placeholder:"What's your email address?",className:`bg-blue-950 py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none
              border-none font-medium`,whileHover:{scale:1.03},whileTap:{scale:.97}})]}),e.jsxs("label",{className:"flex flex-col",children:[e.jsx("span",{className:"text-white font-medium mb-4",children:"Your Message"}),e.jsx(r.textarea,{rows:7,name:"message",value:s.message,onChange:a,placeholder:"What do you want to say?",className:`bg-blue-950 py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none
              border-none font-medium`,whileHover:{scale:1.03},whileTap:{scale:.97}})]}),e.jsx(r.button,{type:"submit",className:"bg-blue-950 py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-primary",disabled:o,whileHover:{scale:1.1},whileTap:{scale:.9},children:o?"Sending...":"Send"})]})]}),e.jsx(r.div,{variants:E("right","tween",.2,1),className:"xl:flex-1 xl:h-auto md:h-[550px] h-[350px]",children:e.jsx(Ue,{})})]})}const Ze=p(Xe),Qe=[{title:"Dean’s Honour List 2020-21",date:"September 2020",description:"The Dean’s Honour List recognizes undergraduate students whose grades rank in the top 5% of those studying with a full course load in the College of Arts and Science"},{title:"University of Saskatchewan Entrance Scholarship",date:"January 2019",description:"Recognizing academic accomplishment with an admission average of 90+%"}];function Ke(){return e.jsx("svg",{focusable:"false",viewBox:"0 0 24 24","aria-hidden":"true",children:e.jsx("path",{d:"M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z",fill:"white"})})}function We({index:t,title:s,date:i,description:o}){return e.jsx(r.div,{variants:A(t*.5,.75,void 0,"spring"),children:e.jsxs(b.VerticalTimelineElement,{contentStyle:{background:"#172554",color:"#fff"},contentArrowStyle:{borderRight:"7px solid #172554"},date:i,iconStyle:{background:"#085e3f",color:"#fff"},icon:e.jsx(Ke,{}),children:[e.jsx("div",{children:e.jsx("h3",{className:"pb-4 text-white text-[24px] font-bold",children:s})}),e.jsx("div",{className:"text-white-100 text-[14px] tracking-wider",children:o})]})})}function Ge(){return e.jsxs(e.Fragment,{children:[e.jsxs(r.div,{variants:f(),children:[e.jsx("p",{className:u,children:"What I am proud of"}),e.jsx("h2",{className:h,children:"Awards"})]}),e.jsx(b.VerticalTimeline,{layout:"1-column-left",children:e.jsx("div",{className:"flex flex-wrap gap-7",children:Qe.map((t,s)=>e.jsx(We,{index:s,...t},t.title))})})]})}const qe=p(Ge),Je=[{name:"About",Section:me},{name:"Experience",Section:ge},{name:"Skills",Section:Fe},{name:"Projects",Section:Ie},{name:"Awards",Section:qe},{name:"Contact",Section:Ze}];function $e(){const t=Je.map(s=>({...s,ref:d.useRef(null)}));return e.jsxs(z,{children:[e.jsxs("div",{className:"relative z-0 bg-black",children:[e.jsx(He,{}),e.jsx(Ce,{sections:t}),e.jsx(we,{}),t.map(s=>e.jsx("div",{ref:s.ref,children:e.jsx(s.Section,{})},s.name))]}),e.jsx($,{theme:"dark",transition:_}),e.jsx(U,{color:"256, 256, 256",outerSize:35,innerScale:1,outerScale:1.7,outerAlpha:0,outerStyle:{border:"3px solid #fff"}})]})}H.createRoot(document.getElementById("root")).render(e.jsx(d.StrictMode,{children:e.jsx($e,{})}));
