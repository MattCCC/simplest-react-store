var d=Object.defineProperty;var A=Object.getOwnPropertyDescriptor;var y=Object.getOwnPropertyNames;var C=Object.prototype.hasOwnProperty;var v=(e,t)=>{for(var n in t)d(e,n,{get:t[n],enumerable:!0})},m=(e,t,n,o)=>{if(t&&typeof t=="object"||typeof t=="function")for(let r of y(t))!C.call(e,r)&&r!==n&&d(e,r,{get:()=>t[r],enumerable:!(o=A(t,r))||o.enumerable});return e};var w=e=>m(d({},"__esModule",{value:!0}),e);var j={};v(j,{createStore:()=>b,mergeState:()=>W,set:()=>T,useStoreProvider:()=>g});module.exports=w(j);var a=require("react"),f=require("use-context-selector"),s=require("react/jsx-runtime");function T(e){return(t,n)=>({...t,[e]:n})}function O(e){let t=Object.assign({},e);return Object.keys(e).forEach(n=>{t[n]=()=>{}}),t}function b(e,t){let n=[e,O(t)],o=(0,f.createContext)(n),r=null;function p(u,i){let c=t[i.type](u,...i.payload);return typeof c!="object"||c===null?{...u}:{...u,...c}}function M({children:u}){let[i,c]=(0,a.useReducer)(p,e);r=(0,a.useMemo)(()=>{let l=Object.assign({},t);return Object.keys(t).forEach(S=>{l[S]=(...h)=>{c({type:S,payload:h})}}),l},[c]);let P=(0,a.useMemo)(()=>[i,r],[i,r]);return(0,s.jsx)(o.Provider,{value:P,children:u})}function x(){return(0,f.useContextSelector)(o,u=>u)}function k(u){return[(0,f.useContextSelector)(o,c=>c[0][u]),r]}return{Provider:M,useStore:x,useStoreProp:k}}function g(...e){function t({children:n}){let o=n;return e.forEach(({Provider:r})=>{o=(0,s.jsx)(r,{children:o})}),(0,s.jsx)(s.Fragment,{children:o})}return t}function W(e,t,n,o){return{...n,[e]:{...t[e],...n[e],...o}}}0&&(module.exports={createStore,mergeState,set,useStoreProvider});
//# sourceMappingURL=index.js.map