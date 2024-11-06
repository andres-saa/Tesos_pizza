import{_ as le,e as F,j as u,g as te,w as K,o as x,c as E,b as t,F as W,i as oe,n as Z,t as j,k as ae,l as ce,U as L,r as d,B as ie,q as w,a,d as c,p as ee,h as H,m as de,y as ue,C as pe,D as se,E as ne}from"./index-357c24f6.js";import{c as J}from"./categoriesService-fadcca61.js";import{u as Q,p as N}from"./ProductService-31eca21a.js";import{a as z}from"./aditionalService-efad3df4.js";import{f as re}from"./formatoPesos-2a38d2e7.js";import"./reportes-868c5829.js";const _e={style:{position:"sticky",top:"4rem","z-index":"999","background-color":"white"},class:"col-12 shadow-3 d-flex p lg:justify-content-center align-items-center mb-5 p-0 md:p-0"},me={class:"col-12 d-flex p lg:justify-content-center align-items-center p-0 md:p-1",style:{"overflow-x":"auto","background-color":"rgba(255, 255, 255, 0.913)"}},ve=["onClick"],fe={class:"text-lg",style:{"min-width":"max-content"}},ge={__name:"BarraCategorias",setup(g){const h=F(),m=u([]),l=(v,i)=>{i>=1e3?ae.push("/tienda-menu/productos/adicionales"):ae.push({name:"sesion",params:{menu_name:v,category_id:i}})};te(async()=>{m.value=await J.getCategories()}),K(()=>h.restaurant_id,async()=>{m.value=await J.getCategories()});const r=v=>ce().params.category_id==v.category_id;return(v,i)=>{var n;return x(),E("div",_e,[t("div",me,[(x(!0),E(W,null,oe((n=m.value)==null?void 0:n.filter(f=>f.category_id!=1e3),f=>(x(),E("div",{key:f.id,class:"p-1"},[t("button",{onClick:A=>l(f.category_name,f.category_id),class:Z([r(f)?"selected menu-button":"menu-button","p-2 text-lg titulo"]),style:{"font-weight":"400","text-transform":"uppercase","min-width":"max-content"}},[t("span",fe,j(f.category_name),1)],10,ve)]))),128))])])}}},ye=le(ge,[["__scopeId","data-v-f9cb0ab0"]]),he={async getSites(){try{return(await fetch(`${L}/sites`)).json()}catch(g){console.log(g)}},async getSiteById(g){try{return(await fetch(`${L}/site/${g}`)).json()}catch(h){console.log(h)}},async siteDirectory(g){try{return(await fetch(`${L}/site/${g}/all-details`)).json()}catch(h){console.log(h)}}},be={class:"image",style:{display:"flex","flex-direction":"column",position:"relative","justify-content":"end","align-items":"end"}},we=["src"],xe=["src"],Pe={key:2,style:{position:"absolute",left:"0",top:"0",width:"100%",display:"flex","justify-content":"center","align-items":"center",height:"100%","background-color":"#ffffff80"}},Ee={style:{display:"flex","flex-direction":"column",gap:"1rem"}},Ve=t("span",null,"Nombre:",-1),$e=t("span",null,"descripcion:",-1),ke=t("span",null,"Precio anterior:",-1),Te=t("span",null,"Precio actual:",-1),De={class:"text-center text-2xl py-4",style:{"font-weight":"bold","text-transform":"capitalize",display:"flex","align-items":"center","justify-content":"center",gap:"1rem"}},Ce={style:{"text-transform":"uppercase"}},Se={style:{"font-weight":"bold"}},Ue={class:"col-12 px-0 pb-0"},Ie={__name:"dialogEditProduct",setup(g){const h=F(),m=u([]),l=Q(),r=u([]),v=u(null),i=u(null),n=u(!1),f=u(""),A=async y=>{const s=y.target.files[0];if(!s)return;v.value=URL.createObjectURL(s);const o=new FormData;o.append("file",s);try{n.value=!0;const e=await N.uploadPhoto(o);f.value=e.image_identifier,URL.revokeObjectURL(v.value),n.value=!1}catch(e){console.error("Error uploading image:",e),n.value=!1}},k=()=>{!r.value||r.value.length===0||Object.entries(r.value).forEach(([y,s])=>{s.forEach(o=>{const e=m.value.some(p=>p.items.some(b=>b.aditional_item_name.toLowerCase()===o.item_name.toLowerCase()&&b.aditional_item_price===o.item_price&&b.aditional_item_type_name===o.type_name));o.status=e})})},T=y=>r.value[y].every(s=>s.status),D=(y,s)=>{r.value[y].forEach(o=>{o.status=s,S(o.item_id,y,s)})},S=(y,s,o)=>{const e=r.value[s].findIndex(p=>p.item_id===y);e!==-1&&(r.value[s][e].status=o)};K(()=>l.currentProductToEdit.id,async()=>{m.value=await z.getAditional(l.currentProductToEdit.id),r.value=await z.getAllAditionsRegistered(),k()});const C=u([]),U=()=>{let y=[];for(const s in r.value)r.value.hasOwnProperty(s)&&r.value[s].forEach(o=>{o.status&&y.push(o.item_id)});C.value=y,X()},X=()=>{const y={product_id:l.currentProductToEdit.id,name:l.currentProductToEdit.product_name,price:l.currentProductToEdit.price,last_price:l.currentProductToEdit.last_price||0,description:l.currentProductToEdit.product_description,category_id:l.currentProductToEdit.category_id,status:!0,img_identifier:f.value,parent_id:l.currentProductToEdit.product_id},s=C.value;N.updateProductInstance(y,s),h.update+=1};return(y,s)=>{const o=d("Button"),e=d("ProgressSpinner"),p=d("InputText"),b=d("Textarea"),B=d("InputNumber"),O=d("InputSwitch"),R=d("Column"),G=d("DataTable"),q=d("Dialog");return x(),ie(q,{closeOnEscape:"",visible:c(l).visibles.dialogEditProduct,"onUpdate:visible":s[6]||(s[6]=I=>c(l).visibles.dialogEditProduct=I),modal:"",style:{width:"40rem"}},{footer:w(()=>[t("div",Ue,[a(o,{class:"",onClick:U,severity:"success",label:"Guardar"})])]),default:w(()=>{var I,M;return[a(o,{onClick:s[0]||(s[0]=V=>c(l).visibles.dialogEditProduct=!1),severity:"danger",style:{position:"absolute",right:"-1rem",top:"-1rem"},rounded:"",icon:"pi pi-times"}),t("div",be,[v.value?(x(),E("img",{key:0,src:v.value,alt:"Preview",style:{width:"100%","aspect-ratio":"1 / 1","background-color":"rgb(255, 255, 255)","object-fit":"cover","border-radius":"0.2rem"}},null,8,we)):(x(),E("img",{key:1,src:`${c(L)}/read-photo-product/${(M=(I=c(l))==null?void 0:I.currentProductToEdit)==null?void 0:M.img_identifier}`,alt:"Preview",style:{width:"100%","aspect-ratio":"1 / 1","background-color":"rgb(255, 255, 255)","object-fit":"cover","border-radius":"0.2rem"}},null,8,xe)),n.value?(x(),E("div",Pe,[a(e,{strokeWidth:"8",style:{color:"white"}})])):ee("",!0),a(o,{class:"my-3",severity:"help",onClick:s[1]||(s[1]=V=>i.value.click())},{default:w(()=>[H("Agregar foto")]),_:1}),t("input",{type:"file",ref_key:"fileInput",ref:i,onChange:A,style:{display:"none"}},null,544)]),t("div",Ee,[t("div",null,[Ve,a(p,{modelValue:c(l).currentProductToEdit.product_name,"onUpdate:modelValue":s[2]||(s[2]=V=>c(l).currentProductToEdit.product_name=V),style:{width:"100%"}},null,8,["modelValue"])]),t("div",null,[$e,a(b,{modelValue:c(l).currentProductToEdit.product_description,"onUpdate:modelValue":s[3]||(s[3]=V=>c(l).currentProductToEdit.product_description=V),rows:"3",style:{width:"100%",resize:"none"}},null,8,["modelValue"])]),t("div",null,[ke,a(B,{modelValue:c(l).currentProductToEdit.last_price,"onUpdate:modelValue":s[4]||(s[4]=V=>c(l).currentProductToEdit.last_price=V),prefix:"$",maxFractionDigits:"0",rows:"3",style:{width:"100%",resize:"none"}},null,8,["modelValue"])]),t("div",null,[Te,a(B,{modelValue:c(l).currentProductToEdit.price,"onUpdate:modelValue":s[5]||(s[5]=V=>c(l).currentProductToEdit.price=V),prefix:"$",maxFractionDigits:"0",rows:"3",style:{width:"100%",resize:"none"}},null,8,["modelValue"])])]),(x(!0),E(W,null,oe(r.value,(V,_)=>(x(),E("div",{class:"m-auto col-12 p-0",style:{"max-width":"600px"},key:_},[t("p",De,[t("span",null,j(_),1),a(O,{modelValue:T(_),"onUpdate:modelValue":P=>D(_,P)},null,8,["modelValue","onUpdate:modelValue"])]),a(G,{stripedRows:"",value:V,class:"p-0"},{default:w(()=>[a(R,{style:{"text-transform":"capitalize"},class:"p-0",field:"aditional_item_name",header:"Nombre"},{body:w(P=>[t("span",Ce,j(P.data.item_name),1)]),_:1}),a(R,{class:"p-0",field:"aditional_item_price",header:"Precio"},{body:w(P=>[t("span",Se,j(c(re)(P.data.item_price)),1)]),_:1}),a(R,{class:"py-0 pl-4 p-0",header:"Estado",headerStyle:"width:1rem"},{body:w(P=>[a(O,{modelValue:P.data.status,"onUpdate:modelValue":[$=>P.data.status=$,$=>S(P.data.item_id,_,$)]},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024)]),_:2},1032,["value"])]))),128))]}),_:1},8,["visible"])}}},je={async getAllRestaurants(){try{const g=await de.get(`${L}/restaurants`);return g.status===200?g.data:(console.error("Error al obtener los restaurantes:",g.status),[])}catch(g){return console.error("Error al obtener los restaurantes:",g),[]}}},Ae={class:"image",style:{display:"flex","flex-direction":"column",position:"relative","justify-content":"end","align-items":"end"}},Be=["src"],Re={key:1,style:{position:"absolute",left:"0",top:"0",width:"100%",display:"flex","justify-content":"center","align-items":"center",height:"100%","background-color":"#ffffff80"}},Le={style:{display:"flex","flex-direction":"column",gap:"1rem"}},Ne=t("span",null,"ID de Categoría:",-1),ze=t("span",null,"Nombre:",-1),Fe=t("span",null,"Descripción:",-1),Oe=t("span",null,"Anterior Precio:",-1),Ge=t("span",null,"Precio Actual:",-1),qe={class:"text-center text-2xl py-4",style:{"font-weight":"bold","text-transform":"capitalize",display:"flex","align-items":"center","justify-content":"center",gap:"1rem"}},Me={style:{"text-transform":"uppercase"}},We={style:{"font-weight":"bold"}},He={class:"col-12 px-0 pb-0"},Je=5,Ke={__name:"dialogAddProduct",setup(g){const h=F(),m=ue(),l=u(!1),r=u([]),v=Q(),i=u([]),n=u({product_name:"",product_description:"",price:0,last_price:0,category_id:null,restaurant_id:5,img_identifier:null}),f=u([]),A=u([]),k=u(null),T=u(null);te(async()=>{try{A.value=await je.getAllRestaurants(),f.value=await J.getCategoriesByRestaurantId(5),i.value=await z.getAllAditionsRegistered()}catch(o){console.error("Error loading data:",o)}}),K(Je,async(o,e)=>{o!==e&&(f.value=await J.getCategoriesByRestaurantId(5),n.value.category_id=null)},{deep:!0});const D=async o=>{const e=o.target.files[0];if(!e)return;k.value=URL.createObjectURL(e);const p=new FormData;p.append("file",e);try{l.value=!0;const b=await N.uploadPhoto(p);n.value.img_identifier=b.image_identifier,URL.revokeObjectURL(k.value),l.value=!1}catch(b){console.error("Error uploading image:",b),l.value=!1}},S=o=>i.value[o].every(e=>e.status),C=(o,e)=>{i.value[o].forEach(p=>{p.status=e,U(p.item_id,o,e)})},U=(o,e,p)=>{const b=i.value[e].findIndex(B=>B.item_id===o);b!==-1&&(i.value[e][b].status=p)},X=()=>{if(typeof i.value!="object"||i.value===null){console.error("adicionales.value no es un objeto",i.value);return}let o=[];for(const e in i.value)i.value.hasOwnProperty(e)&&i.value[e].forEach(p=>{p.status&&o.push(p.item_id)});r.value=o,y()},y=async()=>{const o={name:n.value.product_name,price:n.value.price||0,last_price:n.value.last_price||0,description:n.value.product_description,category_id:n.value.category_id,restaurant_id:5,status:!0,img_identifier:n.value.img_identifier||"",parent_id:null},e=r.value;await N.createProductInstance(o,e),s()},s=()=>{var o,e;n.value={product_name:"",product_description:"",price:0,last_price:0,category_id:null,restaurant_id:5,img_identifier:null},k.value=null,((o=i.value)==null?void 0:o.length)>0&&((e=i.value)==null||e.forEach(p=>{p.forEach(b=>{b.status=!1})})),m.add({severity:"success",summary:"Producto agregado",detail:"Listo",life:3e3}),v.visibles.dialogAddProduct=!1,h.update+=1};return(o,e)=>{const p=d("Button"),b=d("ProgressSpinner"),B=d("Dropdown"),O=d("InputText"),R=d("Textarea"),G=d("InputNumber"),q=d("InputSwitch"),I=d("Column"),M=d("DataTable"),V=d("Dialog");return x(),E(W,null,[a(c(pe)),a(V,{closeOnEscape:"",visible:c(v).visibles.dialogAddProduct,"onUpdate:visible":e[7]||(e[7]=_=>c(v).visibles.dialogAddProduct=_),modal:"",style:{width:"40rem"}},{footer:w(()=>[t("div",He,[a(p,{onClick:X,severity:"success",label:"Guardar"})])]),default:w(()=>[a(p,{onClick:e[0]||(e[0]=_=>c(v).visibles.dialogAddProduct=!1),severity:"danger",style:{position:"absolute",right:"-1rem",top:"-1rem"},rounded:"",icon:"pi pi-times"}),t("div",Ae,[k.value?(x(),E("img",{key:0,src:k.value,alt:"Preview",style:{width:"100%","aspect-ratio":"1 / 1","background-color":"rgb(255, 255, 255)","object-fit":"cover","border-radius":"0.2rem"}},null,8,Be)):ee("",!0),l.value?(x(),E("div",Re,[a(b,{strokeWidth:"8",style:{color:"white"}})])):ee("",!0),a(p,{class:"my-3",severity:"help",onClick:e[1]||(e[1]=_=>T.value.click())},{default:w(()=>[H("Agregar foto")]),_:1}),t("input",{type:"file",ref_key:"fileInput",ref:T,onChange:D,style:{display:"none"}},null,544)]),t("div",Le,[t("div",null,[Ne,a(B,{modelValue:n.value.category_id,"onUpdate:modelValue":e[2]||(e[2]=_=>n.value.category_id=_),options:f.value,optionLabel:"name",optionValue:"id",placeholder:"Selecciona una categoría",style:{width:"100%"}},null,8,["modelValue","options"])]),t("div",null,[ze,a(O,{modelValue:n.value.product_name,"onUpdate:modelValue":e[3]||(e[3]=_=>n.value.product_name=_),style:{width:"100%"}},null,8,["modelValue"])]),t("div",null,[Fe,a(R,{modelValue:n.value.product_description,"onUpdate:modelValue":e[4]||(e[4]=_=>n.value.product_description=_),rows:"3",style:{width:"100%",resize:"none"}},null,8,["modelValue"])]),t("div",null,[Oe,a(G,{modelValue:n.value.last_price,"onUpdate:modelValue":e[5]||(e[5]=_=>n.value.last_price=_),prefix:"$",maxFractionDigits:"0",style:{width:"100%"}},null,8,["modelValue"])]),t("div",null,[Ge,a(G,{modelValue:n.value.price,"onUpdate:modelValue":e[6]||(e[6]=_=>n.value.price=_),prefix:"$",maxFractionDigits:"0",style:{width:"100%"}},null,8,["modelValue"])])]),(x(!0),E(W,null,oe(i.value,(_,P)=>(x(),E("div",{class:"m-auto col-12 p-0",style:{"max-width":"600px"},key:P},[t("p",qe,[t("span",null,j(P),1),a(q,{modelValue:S(P),"onUpdate:modelValue":$=>C(P,$)},null,8,["modelValue","onUpdate:modelValue"])]),a(M,{stripedRows:"",value:_,class:"p-0"},{default:w(()=>[a(I,{style:{"text-transform":"capitalize"},class:"p-0",field:"aditional_item_name",header:"Nombre"},{body:w($=>[t("span",Me,j($.data.item_name),1)]),_:1}),a(I,{class:"p-0",field:"aditional_item_price",header:"Precio"},{body:w($=>[t("span",We,j(c(re)($.data.item_price)),1)]),_:1}),a(I,{class:"py-0 pl-4 p-0",header:"Estado",headerStyle:"width:1rem"},{body:w($=>[a(q,{modelValue:$.data.status,"onUpdate:modelValue":[Y=>$.data.status=Y,Y=>U($.data.item_id,P,Y)]},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024)]),_:2},1032,["value"])]))),128))]),_:1},8,["visible"])],64)}}};const Qe={class:"py-3",style:{overflow:"hidden"}},Xe=["src"],Ye={class:"col-12 p-0"},Ze={__name:"dialogDeleteProduct",setup(g){const h=F(),m=u(!1),l=()=>{m.value=!0,r.value=!r.value},r=u(!1),v=u([]),i=Q(),n=u([]);u(i.currentProductToDelete);const f=()=>{!n.value||n.value.length===0||Object.entries(n.value).forEach(([k,T])=>{T.forEach(D=>{const S=v.value.some(C=>C.items.some(U=>U.aditional_item_name.toLowerCase()===D.item_name.toLowerCase()&&U.aditional_item_price===D.item_price&&U.aditional_item_type_name===D.type_name));D.status=S})})},A=async k=>{await N.deleteProduct(k),i.visibles.dialogDeleteProduct=!1,h.update+=1};return K(()=>i.currentProductToEdit.id,async()=>{v.value=await z.getAditional(i.currentProductToEdit.id),n.value=await z.getAllAditionsRegistered(),f()}),u([]),(k,T)=>{const D=d("Button"),S=d("Dialog");return x(),ie(S,{close:m.value=!1,closeOnEscape:"",visible:c(i).visibles.dialogDeleteProduct,"onUpdate:visible":T[1]||(T[1]=C=>c(i).visibles.dialogDeleteProduct=C),modal:"",style:{width:"20rem"}},{footer:w(()=>[t("div",Ye,[a(D,{style:{width:"100%"},onClick:T[0]||(T[0]=C=>A(c(i).currentProductToDelete.product_id)),severity:"danger",label:"Eliminar producto"})])]),default:w(()=>[H(" Esta seguro de eliminar "),t("b",null,j(c(i).currentProductToDelete.product_name),1),H(" ? "),t("div",Qe,[se(t("img",{onLoad:l,class:Z([m.value&&r.value?"cargado1":m.value&&!r.value?"cargado2":"nada",""]),style:{width:"100%",height:"100%","background-color":"rgb(255, 255, 255)","object-fit":"contain","border-radius":"0.2rem"},src:`https://backend.salchimonster.com/read-product-image/300/${c(i).currentProductToDelete.product_name}`,alt:""},null,42,Xe),[[ne,m.value]]),se(t("div",{onLoad:l,class:Z([m.value?"cargado":"sin-cargar","p-0"]),style:{width:"100%","aspect-ratio":"1 / 1","background-color":"rgb(255, 255, 255)",height:"100%","object-fit":"contain","border-radius":"0.2rem"},alt:""},null,34),[[ne,!m.value]])])]),_:1},8,["close","visible"])}}},et=le(Ze,[["__scopeId","data-v-cb127641"]]),tt={style:{"border-radius":"1rem",position:"relative"},class:"mx-auto mx-0 p-0 mt-0"},ot={class:"mx-3 my0 mx-auto px-4",style:{"min-width":"max-content","max-width":"1024px","justify-content":"end",display:"flex","align-items":"end"}},ct={__name:"MenuTienda",setup(g){const h=Q();F();const m=u([]),l=()=>{h.visibles.dialogAddProduct=!0},r=async()=>{m.value=await he.getSites()};return te(async()=>{r()}),(v,i)=>{const n=d("Button"),f=d("router-view");return x(),E("div",tt,[a(ye,{class:"m-0"}),t("div",ot,[a(n,{onClick:l,class:"ml-3",style:{"min-width":"max-content"},severity:"help",label:"Nuevo producto"})]),a(f,{class:""}),a(Ie,{class:"m-3"}),a(et),a(Ke)])}}};export{ct as default};