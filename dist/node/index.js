var f=Object.defineProperty;var h=Object.getOwnPropertyDescriptor;var v=Object.getOwnPropertyNames;var w=Object.prototype.hasOwnProperty;var A=(e,t)=>{for(var o in t)f(e,o,{get:t[o],enumerable:!0})},C=(e,t,o,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of v(t))!w.call(e,n)&&n!==o&&f(e,n,{get:()=>t[n],enumerable:!(r=h(t,n))||r.enumerable});return e};var g=e=>C(f({},"__esModule",{value:!0}),e);var j={};A(j,{createStore:()=>b,mergeState:()=>W,set:()=>O,useStoreProvider:()=>m});module.exports=g(j);var d=require("react"),i=require("use-context-selector"),s=require("react/jsx-runtime");function O(e){return(t,o)=>({...t,[e]:o})}function T(e){let t=Object.assign({},e);return Object.keys(e).forEach(o=>{t[o]=()=>{}}),t}function b(e,t){let o=[e,T(t)],r=(0,i.createContext)(o),n=null;function l(c,u){return{...c,...t[u.type](c,...u.payload)}}function M({children:c}){let[u,a]=(0,d.useReducer)(l,e);n=(0,d.useMemo)(()=>{let p=Object.assign({},t);return Object.keys(t).forEach(S=>{p[S]=(...x)=>{a({type:S,payload:x})}}),p},[a]);let P=[u,n];return(0,s.jsx)(r.Provider,{value:P,children:c})}function y(){return(0,i.useContextSelector)(r,c=>c)}function k(c){return[(0,i.useContextSelector)(r,a=>a[0][c]),n]}return{Provider:M,useStore:y,useStoreProp:k}}function m(...e){function t({children:o}){let r=o;return e.forEach(({Provider:n})=>{r=(0,s.jsx)(n,{children:r})}),(0,s.jsx)(s.Fragment,{children:r})}return t}function W(e,t,o,r){let n=r||o[e]||t[e];return{...o,[e]:n}}0&&(module.exports={createStore,mergeState,set,useStoreProvider});
//# sourceMappingURL=index.js.map