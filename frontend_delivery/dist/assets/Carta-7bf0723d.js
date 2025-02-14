import{_ as W,b as i,h as J,d as K,f as x,U as p,r as C,o as v,c as f,a as c,w,e as s,F as Q,j as X,q as U,g as Y,n as Z,A as $,k as ee,y as ae,z as te}from"./index-2ea80005.js";import{p as oe}from"./ProductService-06d5bd3d.js";const F=g=>(ae("data-v-6de89716"),g=g(),te(),g),re={style:{padding:"3rem"}},ne=F(()=>s("h2",null,[s("b",null,"Arrastra y Reordena las Imágenes de la carta")],-1)),se={class:"image",style:{display:"flex","flex-direction":"column",position:"relative","justify-content":"end","align-items":"end"}},le=["src"],ie={key:1,style:{position:"absolute",left:"0",top:"0",width:"100%",display:"flex","justify-content":"center","align-items":"center",height:"100%","background-color":"#ffffff80"}},ce={class:"col-12 px-0 pb-0"},de={class:"draggable-container"},ue=["onDragstart","onDragenter","onDrop"],pe=["src","alt"],ve=F(()=>s("div",{class:"confirmation-content"},[s("i",{class:"pi pi-exclamation-triangle",style:{"font-size":"2rem",color:"#ff9800"}}),s("span",{class:"message"},"¿Estás seguro de que deseas eliminar esta imagen?")],-1)),fe={class:"dialog-footer"},ge={__name:"Carta",setup(g){const o=i([]),m=i(-1),_=i(-1),y=i(!1),u=i(null),h=i(!1),k=i(!1),d=i([]),b=i(null),E=i(null),S=J(()=>o.value.slice().sort((e,a)=>e.index-a.index));K(async()=>{await P()});async function P(){try{const e=await x.get(`${p}/carta/`);o.value=e.data.map((a,t)=>({...a,id:a.id??Date.now()+Math.random(),index:a.index??t,src:a.img_identifier,title:a.title??"Sin título"}))}catch(e){console.error("Error al obtener cartas:",e)}}async function j(e){return(await x.post(`${p}/carta/`,e)).data}async function B(e){return(await x.post(`${p}/carta/reorder`,e)).data}async function R(e){return(await x.delete(`${p}/carta/${e}`)).data}function L(e){m.value=e}function M(e){_.value=e}function N(){_.value=-1}async function O(e){if(e===m.value)return;const a=S.value[m.value],t=o.value.findIndex(n=>n.id===a.id);o.value.splice(t,1),o.value.splice(e,0,a),o.value.forEach((n,l)=>{n.index=l}),m.value=-1,_.value=-1;try{const n=o.value.map(l=>({id:l.id,index:l.index,img_identifier:l.src}));await B(n)}catch(n){console.error("Error al reordenar cartas:",n)}}function V(e){u.value=e,y.value=!0}function A(){y.value=!1,u.value=null}async function z(){if(u.value){try{await R(u.value.id);const e=o.value.findIndex(a=>a.id===u.value.id);e!==-1&&(o.value.splice(e,1),o.value.forEach((a,t)=>{a.index=t}))}catch(e){console.error("Error al eliminar carta:",e)}A()}}function T(){h.value=!0}function q(){E.value.click()}function G(e){const a=e.target.files;!a||a.length===0||(d.value=Array.from(a),d.value.length>0&&(b.value=URL.createObjectURL(d.value[0])),e.target.value="")}async function H(){if(d.value.length===0){alert("Por favor selecciona al menos una imagen.");return}k.value=!0;try{for(const e of d.value){const a=new FormData;a.append("file",e);const t=await oe.uploadPhoto(a),{image_identifier:n}=t,l={index:o.value.length,img_identifier:n},r=await j(l);o.value.push({id:r.id??Date.now()+Math.random(),index:r.index??o.value.length-1,src:r.img_identifier,title:e.name})}d.value=[],b.value=null,h.value=!1}catch(e){console.error("Error al subir las imágenes o crear cartas:",e),alert("Hubo un error al subir las imágenes.")}finally{k.value=!1}}return(e,a)=>{const t=C("Button"),n=C("ProgressSpinner"),l=C("Dialog");return v(),f("div",re,[ne,c(t,{style:{margin:"1rem 0","background-color":"var(--primary-color)",border:"none"},label:"Agregar Imágenes",icon:"pi pi-upload",onClick:T}),c(l,{header:"Agregar Imágenes",visible:h.value,"onUpdate:visible":a[0]||(a[0]=r=>h.value=r),modal:"",style:{width:"40rem"}},{footer:w(()=>[s("div",ce,[c(t,{onClick:H,severity:"success",label:"Guardar"})])]),default:w(()=>[s("div",se,[b.value?(v(),f("img",{key:0,src:b.value,alt:"Preview",style:{width:"100%","aspect-ratio":"19 / 9","background-color":"rgb(255, 255, 255)","object-fit":"cover","border-radius":"0.2rem"}},null,8,le)):U("",!0),k.value?(v(),f("div",ie,[c(n,{strokeWidth:"8",style:{color:"white"}})])):U("",!0),c(t,{class:"my-3",severity:"help",onClick:q},{default:w(()=>[Y("Agregar foto")]),_:1}),s("input",{type:"file",ref_key:"fileInput",ref:E,onChange:G,style:{display:"none"},multiple:"",accept:"image/*"},null,544)])]),_:1},8,["visible"]),s("div",de,[(v(!0),f(Q,null,X(S.value,(r,D)=>(v(),f("div",{key:r.id,class:Z(["draggable-item",{"drag-over":_.value===D}]),draggable:"true",onDragstart:I=>L(D),onDragenter:$(I=>M(D),["prevent"]),onDragover:a[1]||(a[1]=$(()=>{},["prevent"])),onDragleave:N,onDrop:I=>O(D)},[s("img",{src:`${ee(p)}/read-photo-product/${r.src}`,alt:r.title},null,8,pe),c(t,{style:{"border-radius":"50%",position:"absolute","background-color":"var(--primary-color)",border:"3px solid","aspect-ratio":"1 / 1",right:"-1.5rem",top:"-1.5rem"},icon:"pi pi-times",severity:"info",class:"delete-button",onClick:$(I=>V(r),["stop"])},null,8,["onClick"])],42,ue))),128)),c(l,{header:"Confirmar Eliminación",visible:y.value,"onUpdate:visible":a[2]||(a[2]=r=>y.value=r),modal:"",closable:!1,style:{width:"350px"}},{default:w(()=>[ve,s("div",fe,[c(t,{label:"Sí, eliminar",icon:"pi pi-check",class:"p-button-danger",onClick:z}),c(t,{label:"Cancelar",icon:"pi pi-times",class:"p-button-secondary",onClick:A})])]),_:1},8,["visible"])])])}}},ye=W(ge,[["__scopeId","data-v-6de89716"]]);export{ye as default};
