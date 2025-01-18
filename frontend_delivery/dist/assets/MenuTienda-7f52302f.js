import{_ as pe,u as q,b as l,d as X,p as Y,o as x,c as T,e as t,F as J,k as se,n as le,t as A,l as re,m as me,U as R,r as _,B as H,w as p,a as o,i as u,q as F,g as K,f as be,y as _e,C as ve,D as de,E as ce}from"./index-d65d6581.js";import{c as O}from"./categoriesService-b0472875.js";import{u as Z,p as Q}from"./ProductService-b8162a8e.js";import{a as M}from"./aditionalService-1fa7aad6.js";import{f as ue}from"./formatoPesos-2a38d2e7.js";import{f as G}from"./fetchService-ba596ed3.js";import"./reportes-b07101c1.js";const he={style:{position:"sticky",top:"3rem","z-index":"999","background-color":"white"},class:"col-12 shadow-3 d-flex p lg:justify-content-center align-items-center mb-5 p-0 md:p-0"},we={class:"col-12 d-flex p align-items-center p-0 md:p-0",style:{"overflow-x":"auto","background-color":"rgba(255, 255, 255, 0.913)"}},xe=["onClick"],Pe={class:"text-lg",style:{"min-width":"max-content"}},Ee={__name:"BarraCategorias",setup(k){const h=q(),g=l([]),I=(v,d)=>{d==1e3?re.push("/tienda-menu/productos/adiciones"):d==2e3?re.push("/tienda-menu/productos/sabores"):re.push({name:"sesion",params:{menu_name:v,category_id:d}})};X(async()=>{g.value=await O.getCategories(),g.value.push({category_name:"Adiciones",category_id:1e3}),g.value.push({category_name:"Sabores",category_id:2e3})}),Y(()=>h.restaurant_id,async()=>{g.value=await O.getCategories()});const y=v=>{const d=me(),c=d.path.includes("adiciones"),e=d.path.includes("sabores");return v.category_name==="Adiciones"&&c||v.category_name==="Sabores"&&e?!0:d.params.category_id==v.category_id};return(v,d)=>(x(),T("div",he,[t("div",we,[(x(!0),T(J,null,se(g.value,c=>(x(),T("div",{key:c.id,class:"p-1"},[t("button",{onClick:e=>I(c.category_name,c.category_id),class:le([y(c)?"selected menu-button":"menu-button","p-1 text-lg titulo"]),style:{"font-weight":"400","text-transform":"uppercase","min-width":"max-content"}},[t("span",Pe,A(c.category_name),1)],10,xe)]))),128))])]))}},ke=pe(Ee,[["__scopeId","data-v-961da133"]]),$e={async getSites(){try{return(await fetch(`${R}/sites`)).json()}catch(k){console.log(k)}},async getSiteById(k){try{return(await fetch(`${R}/site/${k}`)).json()}catch(h){console.log(h)}},async siteDirectory(k){try{return(await fetch(`${R}/site/${k}/all-details`)).json()}catch(h){console.log(h)}}},Ce={class:"image",style:{display:"flex","flex-direction":"column",position:"relative","justify-content":"end","align-items":"end"}},Ve=["src"],Te=["src"],De={key:2,style:{position:"absolute",left:"0",top:"0",width:"100%",display:"flex","justify-content":"center","align-items":"center",height:"100%","background-color":"#ffffff80"}},Se={style:{display:"flex","flex-direction":"column",gap:"1rem"}},Ue=t("span",null,"Nombre:",-1),Ie=t("span",null,"descripcion:",-1),Ae=t("span",null,"Precio anterior:",-1),Re=t("span",null,"Precio actual:",-1),Be=t("span",null,"cuantos sabores puede combinar?:",-1),je=t("div",{class:"mt-4",style:{display:"flex","align-items":"center",gap:"1rem"}},[t("div",{style:{width:"100%","background-color":"var(--primary-color)",height:"1rem"}}),t("h6",{class:"m-0"},[t("p",{class:"text-center text-2xl py-0",style:{"font-weight":"bold","text-transform":"capitalize",display:"flex","align-items":"center","justify-content":"center",gap:"1rem"}},[t("span",null," ADICIONES")])]),t("div",{style:{width:"100%","background-color":"var(--primary-color)",height:"1rem"}})],-1),Ne={class:"text-center text-2xl py-0 px-2 shadow",style:{"font-weight":"bold","text-transform":"capitalize","border-bottom":"3px solid #00000030",display:"flex","align-items":"center","justify-content":"space-between",gap:"1rem"}},Oe=t("i",{class:"pi pi-angle-down text-3xl"},null,-1),ze={style:{"text-transform":"uppercase"}},Le={style:{"font-weight":"bold"}},Fe=t("div",{class:"mt-4",style:{display:"flex","align-items":"center",gap:"1rem"}},[t("div",{style:{width:"100%","background-color":"var(--primary-color)",height:"1rem"}}),t("h6",{class:"m-0"},[t("p",{class:"text-center text-2xl py-0",style:{"font-weight":"bold","text-transform":"capitalize",display:"flex","align-items":"center","justify-content":"center",gap:"1rem"}},[t("span",null," SABORES")])]),t("div",{style:{width:"100%","background-color":"var(--primary-color)",height:"1rem"}})],-1),Ge={class:"m-auto col-12 p-0",style:{"max-width":"600px"}},Me={class:"text-center text-2xl py-1 shadow px-2",style:{"font-weight":"bold","border-bottom":"3px solid #00000030","text-transform":"capitalize",display:"flex","align-items":"center","justify-content":"space-between",gap:"1rem"}},qe=t("i",{class:"pi pi-angle-down text-3xl"},null,-1),We={style:{"text-transform":"uppercase"}},He={style:{"font-weight":"bold"}},Je={class:"col-12 px-0 pb-0"},Ke={__name:"dialogEditProduct",setup(k){const h=m=>m.flavors.every(a=>a.has_flavor),g=(m,a)=>{m.flavors.forEach(n=>{n.has_flavor=a,I(n.flavor_id,a)})},I=(m,a)=>{v.value.forEach(n=>{const s=n.flavors.find(f=>f.flavor_id===m);s&&(s.has_flavor=a)})},y=l([]),v=l([]),d=q(),c=l([]),e=Z(),b=l([]),D=l(null),C=l(null),V=l(!1),S=l(""),B=async m=>{const a=m.target.files[0];if(!a)return;D.value=URL.createObjectURL(a);const n=new FormData;n.append("file",a);try{V.value=!0;const s=await Q.uploadPhoto(n);S.value=s.image_identifier,URL.revokeObjectURL(D.value),V.value=!1}catch(s){console.error("Error uploading image:",s),V.value=!1}},N=()=>{!b.value||b.value.length===0||Object.entries(b.value).forEach(([m,a])=>{a.forEach(n=>{const s=c.value.some(f=>f.items.some(W=>W.aditional_item_name.toLowerCase()===n.item_name.toLowerCase()&&W.aditional_item_price===n.item_price&&W.aditional_item_type_name===n.type_name));n.status=s})})},j=m=>b.value[m].every(a=>a.status),$=(m,a)=>{b.value[m].forEach(n=>{n.status=a,r(n.item_id,m,a)})},r=(m,a,n)=>{const s=b.value[a].findIndex(f=>f.item_id===m);s!==-1&&(b.value[a][s].status=n)};X(async()=>{S.value=e.currentProductToEdit.img_identifier}),Y(()=>e.currentProductToEdit.id,async()=>{var m;c.value=await M.getAditional(e.currentProductToEdit.id),b.value=await M.getAllAditionsRegistered(),N(),v.value=await G.get(`${R}/get_flavors_by_product/${(m=e==null?void 0:e.currentProductToEdit)==null?void 0:m.product_id}`)});const i=l([]),P=()=>{let m=[],a=[];for(const n in b.value)b.value.hasOwnProperty(n)&&b.value[n].forEach(s=>{s.status&&m.push(s.item_id)});v.value.forEach(n=>{n.flavors.forEach(s=>{s.has_flavor&&a.push(s.flavor_id)})}),i.value=m,z(m,a)},z=(m,a)=>{const n={product_id:e.currentProductToEdit.id,name:e.currentProductToEdit.product_name,price:e.currentProductToEdit.price,last_price:e.currentProductToEdit.last_price||0,description:e.currentProductToEdit.product_description,category_id:e.currentProductToEdit.category_id,status:!0,img_identifier:S.value||e.currentProductToEdit.img_identifier,parent_id:e.currentProductToEdit.product_id,max_flavor:e.currentProductToEdit.max_flavor};Q.updateProductInstance(n,m,a),d.update+=1};return(m,a)=>{const n=_("Button"),s=_("ProgressSpinner"),f=_("InputText"),W=_("Textarea"),oe=_("InputNumber"),ee=_("InputSwitch"),L=_("Column"),ie=_("DataTable"),ge=_("Tag"),ye=_("Dialog");return x(),H(ye,{closeOnEscape:"",visible:u(e).visibles.dialogEditProduct,"onUpdate:visible":a[7]||(a[7]=te=>u(e).visibles.dialogEditProduct=te),modal:"",style:{width:"40rem"}},{footer:p(()=>[t("div",Je,[o(n,{class:"",onClick:P,severity:"success",label:"Guardar"})])]),default:p(()=>{var te,ne;return[o(n,{onClick:a[0]||(a[0]=w=>u(e).visibles.dialogEditProduct=!1),severity:"danger",style:{position:"absolute",right:"-1rem",top:"-1rem","border-radius":"50%"},rounded:"",icon:"pi pi-times"}),t("div",Ce,[D.value?(x(),T("img",{key:0,src:D.value,alt:"Preview",style:{width:"100%","aspect-ratio":"1 / 1","background-color":"rgb(255, 255, 255)","object-fit":"cover","border-radius":"0.2rem"}},null,8,Ve)):(x(),T("img",{key:1,src:`${u(R)}/read-photo-product/${(ne=(te=u(e))==null?void 0:te.currentProductToEdit)==null?void 0:ne.img_identifier}`,alt:"Preview",style:{width:"100%","aspect-ratio":"1 / 1","background-color":"rgb(255, 255, 255)","object-fit":"cover","border-radius":"0.2rem"}},null,8,Te)),V.value?(x(),T("div",De,[o(s,{strokeWidth:"8",style:{color:"white"}})])):F("",!0),o(n,{class:"my-3",severity:"help",onClick:a[1]||(a[1]=w=>C.value.click())},{default:p(()=>[K("Agregar foto")]),_:1}),t("input",{type:"file",ref_key:"fileInput",ref:C,onChange:B,style:{display:"none"}},null,544)]),t("div",Se,[t("div",null,[Ue,o(f,{modelValue:u(e).currentProductToEdit.product_name,"onUpdate:modelValue":a[2]||(a[2]=w=>u(e).currentProductToEdit.product_name=w),style:{width:"100%"}},null,8,["modelValue"])]),t("div",null,[Ie,o(W,{modelValue:u(e).currentProductToEdit.product_description,"onUpdate:modelValue":a[3]||(a[3]=w=>u(e).currentProductToEdit.product_description=w),rows:"3",style:{width:"100%",resize:"none"}},null,8,["modelValue"])]),t("div",null,[Ae,o(oe,{modelValue:u(e).currentProductToEdit.last_price,"onUpdate:modelValue":a[4]||(a[4]=w=>u(e).currentProductToEdit.last_price=w),prefix:"$",maxFractionDigits:"0",rows:"3",style:{width:"100%",resize:"none"}},null,8,["modelValue"])]),t("div",null,[Re,o(oe,{modelValue:u(e).currentProductToEdit.price,"onUpdate:modelValue":a[5]||(a[5]=w=>u(e).currentProductToEdit.price=w),prefix:"$",maxFractionDigits:"0",rows:"3",style:{width:"100%",resize:"none"}},null,8,["modelValue"])]),t("div",null,[Be,o(oe,{modelValue:u(e).currentProductToEdit.max_flavor,"onUpdate:modelValue":a[6]||(a[6]=w=>u(e).currentProductToEdit.max_flavor=w),suffix:" sabores",maxFractionDigits:"0",rows:"3",min:"0",max:"2",style:{width:"100%",resize:"none"}},null,8,["modelValue"])])]),je,(x(!0),T(J,null,se(b.value,(w,E)=>(x(),T("div",{class:"m-auto col-12 p-0",style:{"max-width":"600px"},key:E},[t("p",Ne,[o(n,{onClick:()=>y.value[E]=!y.value[E],class:"p-2",text:"",style:{"aspect-ratio":"1 / 1",border:"none",color:"var(--primary-color)","font-weight":"bold"}},{default:p(()=>[Oe]),_:2},1032,["onClick"]),t("span",null,A(E),1),o(ee,{style:{"min-width":"3rem"},modelValue:j(E),"onUpdate:modelValue":U=>$(E,U)},null,8,["modelValue","onUpdate:modelValue"])]),y.value[E]?(x(),H(ie,{key:0,stripedRows:"",value:w,class:"p-0"},{default:p(()=>[o(L,{style:{"text-transform":"capitalize"},class:"p-0",field:"aditional_item_name",header:"Nombre"},{body:p(U=>[t("span",ze,A(U.data.item_name),1)]),_:1}),o(L,{class:"p-0",field:"aditional_item_price",header:"Precio"},{body:p(U=>[t("span",Le,A(u(ue)(U.data.item_price)),1)]),_:1}),o(L,{class:"py-0 pl-4 p-0",header:"Estado",headerStyle:"width:1rem"},{body:p(U=>[o(ee,{modelValue:U.data.status,"onUpdate:modelValue":[ae=>U.data.status=ae,ae=>r(U.data.item_id,E,ae)]},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024)]),_:2},1032,["value"])):F("",!0)]))),128)),Fe,(x(!0),T(J,null,se(v.value,w=>(x(),T("div",Ge,[t("p",Me,[o(n,{onClick:()=>y.value[w.group_name]=!y.value[w.group_name],class:"p-2",text:"",style:{"aspect-ratio":"1 / 1",border:"none",color:"var(--primary-color)","font-weight":"bold"}},{default:p(()=>[qe]),_:2},1032,["onClick"]),t("span",null,A(w.group_name),1),o(ee,{style:{"min-width":"3rem"},modelValue:h(w),"onUpdate:modelValue":E=>g(w,E)},null,8,["modelValue","onUpdate:modelValue"])]),y.value[w.group_name]?(x(),H(ie,{key:0,stripedRows:"",value:w.flavors,class:"p-0"},{default:p(()=>[o(L,{style:{"text-transform":"capitalize"},class:"p-0",field:"aditional_item_name",header:"Nombre"},{body:p(E=>[t("span",We,A(E.data.flavor_name),1)]),_:1}),o(L,{class:"p-0",field:"aditional_item_price",header:"Precio"},{body:p(E=>[t("span",He,A(u(ue)(E.data.flavor_price)),1)]),_:1}),o(L,{class:"p-0",field:"aditional_item_price",header:"Premium"},{body:p(E=>[E.data.is_premium?(x(),H(ge,{key:0,severity:"success"},{default:p(()=>[K(" Premium")]),_:1})):F("",!0)]),_:1}),o(L,{class:"py-0 pl-4 p-0",header:"Estado",headerStyle:"width:1rem"},{body:p(E=>[o(ee,{modelValue:E.data.has_flavor,"onUpdate:modelValue":[U=>E.data.has_flavor=U,U=>r(E.data.item_id,w,U)]},null,8,["modelValue","onUpdate:modelValue"])]),_:2},1024)]),_:2},1032,["value"])):F("",!0)]))),256))]}),_:1},8,["visible"])}}},fe={async getAllRestaurants(){try{const k=await be.get(`${R}/restaurants`);return k.status===200?k.data:(console.error("Error al obtener los restaurantes:",k.status),[])}catch(k){return console.error("Error al obtener los restaurantes:",k),[]}}},Qe={class:"image",style:{display:"flex","flex-direction":"column",position:"relative","justify-content":"end","align-items":"end"}},Xe=["src"],Ye={key:1,style:{position:"absolute",left:"0",top:"0",width:"100%",display:"flex","justify-content":"center","align-items":"center",height:"100%","background-color":"#ffffff80"}},Ze={style:{display:"flex","flex-direction":"column",gap:"1rem"}},et=t("span",null,"ID de Categoría:",-1),tt=t("span",null,"Nombre:",-1),ot=t("span",null,"Descripción:",-1),at=t("span",null,"Anterior Precio:",-1),rt=t("span",null,"Precio Actual:",-1),st=t("span",null,"cuantos sabores puede combinar?:",-1),lt={class:"col-12 px-0 pb-0"},it=5,nt={__name:"dialogAddProduct",setup(k){const h=l([]),g=q(),I=_e(),y=l(!1),v=l([]),d=Z(),c=l([]),e=l({product_name:"",product_description:"",price:0,last_price:0,category_id:null,restaurant_id:5,img_identifier:null,max_flavor:0}),b=l([]),D=l([]),C=l(null),V=l(null);X(async()=>{try{D.value=await fe.getAllRestaurants(),b.value=await O.getCategoriesByRestaurantId(5),c.value=await M.getAllAditionsRegistered()}catch($){console.error("Error loading data:",$)}h.value=await G.get(`${R}/get-flavor-grouped`)}),Y(it,async($,r)=>{$!==r&&(b.value=await O.getCategoriesByRestaurantId(5),e.value.category_id=null)},{deep:!0});const S=async $=>{const r=$.target.files[0];if(!r)return;C.value=URL.createObjectURL(r);const i=new FormData;i.append("file",r);try{y.value=!0;const P=await Q.uploadPhoto(i);e.value.img_identifier=P.image_identifier,URL.revokeObjectURL(C.value),y.value=!1}catch(P){console.error("Error uploading image:",P),y.value=!1}},B=()=>{if(typeof c.value!="object"||c.value===null){console.error("adicionales.value no es un objeto",c.value);return}let $=[];for(const r in c.value)c.value.hasOwnProperty(r)&&c.value[r].forEach(i=>{i.status&&$.push(i.item_id)});v.value=$,N()},N=async()=>{if(!e.value.product_name){alert("Por favor ingrese el nombre del producto.");return}if(e.value.price===void 0||e.value.price===null||e.value.price===""){alert("Por favor ingrese el precio del producto.");return}else if(isNaN(e.value.price)){alert("El precio debe ser un número.");return}if(e.value.last_price!==void 0&&e.value.last_price!==""&&isNaN(e.value.last_price)){alert('El "last_price" debe ser un número si se proporciona.');return}if(!e.value.product_description){alert("Por favor ingrese la descripción del producto.");return}if(!e.value.category_id){alert("Por favor seleccione una categoría.");return}if(e.value.max_flavor===void 0||e.value.max_flavor===null||e.value.max_flavor===""){alert("Por favor ingrese el número máximo de sabores.");return}else if(isNaN(e.value.max_flavor)){alert("El número máximo de sabores debe ser un número.");return}const $={name:e.value.product_name,price:Number(e.value.price)||0,last_price:Number(e.value.last_price)||0,description:e.value.product_description,category_id:e.value.category_id,restaurant_id:5,status:!0,img_identifier:e.value.img_identifier||"",parent_id:null,max_flavor:Number(e.value.max_flavor)},r=v.value;await Q.createProductInstance($,r),j()},j=()=>{var $,r;e.value={product_name:"",product_description:"",price:0,last_price:0,category_id:null,restaurant_id:5,img_identifier:null},C.value=null,(($=c.value)==null?void 0:$.length)>0&&((r=c.value)==null||r.forEach(i=>{i.forEach(P=>{P.status=!1})})),I.add({severity:"success",summary:"Producto agregado",detail:"Listo",life:3e3}),d.visibles.dialogAddProduct=!1,g.update+=1};return($,r)=>{const i=_("Button"),P=_("ProgressSpinner"),z=_("Dropdown"),m=_("InputText"),a=_("Textarea"),n=_("InputNumber"),s=_("Dialog");return x(),T(J,null,[o(u(ve)),o(s,{closeOnEscape:"",visible:u(d).visibles.dialogAddProduct,"onUpdate:visible":r[8]||(r[8]=f=>u(d).visibles.dialogAddProduct=f),modal:"",style:{width:"40rem"}},{footer:p(()=>[t("div",lt,[o(i,{onClick:B,severity:"success",label:"Guardar"})])]),default:p(()=>[o(i,{onClick:r[0]||(r[0]=f=>u(d).visibles.dialogAddProduct=!1),severity:"danger",style:{position:"absolute",right:"-1rem",top:"-1rem","border-radius":"50%"},rounded:"",icon:"pi pi-times"}),t("div",Qe,[C.value?(x(),T("img",{key:0,src:C.value,alt:"Preview",style:{width:"100%","aspect-ratio":"1 / 1","background-color":"rgb(255, 255, 255)","object-fit":"cover","border-radius":"0.2rem"}},null,8,Xe)):F("",!0),y.value?(x(),T("div",Ye,[o(P,{strokeWidth:"8",style:{color:"white"}})])):F("",!0),o(i,{class:"my-3",severity:"help",onClick:r[1]||(r[1]=f=>V.value.click())},{default:p(()=>[K("Agregar foto")]),_:1}),t("input",{type:"file",ref_key:"fileInput",ref:V,onChange:S,style:{display:"none"}},null,544)]),t("div",Ze,[t("div",null,[et,o(z,{modelValue:e.value.category_id,"onUpdate:modelValue":r[2]||(r[2]=f=>e.value.category_id=f),options:b.value,optionLabel:"name",optionValue:"id",placeholder:"Selecciona una categoría",style:{width:"100%"}},null,8,["modelValue","options"])]),t("div",null,[tt,o(m,{modelValue:e.value.product_name,"onUpdate:modelValue":r[3]||(r[3]=f=>e.value.product_name=f),style:{width:"100%"}},null,8,["modelValue"])]),t("div",null,[ot,o(a,{modelValue:e.value.product_description,"onUpdate:modelValue":r[4]||(r[4]=f=>e.value.product_description=f),rows:"3",style:{width:"100%",resize:"none"}},null,8,["modelValue"])]),t("div",null,[at,o(n,{modelValue:e.value.last_price,"onUpdate:modelValue":r[5]||(r[5]=f=>e.value.last_price=f),prefix:"$",maxFractionDigits:"0",style:{width:"100%"}},null,8,["modelValue"])]),t("div",null,[rt,o(n,{modelValue:e.value.price,"onUpdate:modelValue":r[6]||(r[6]=f=>e.value.price=f),prefix:"$",maxFractionDigits:"0",style:{width:"100%"}},null,8,["modelValue"])]),t("div",null,[st,o(n,{modelValue:e.value.max_flavor,"onUpdate:modelValue":r[7]||(r[7]=f=>e.value.max_flavor=f),suffix:" sabores",maxFractionDigits:"0",rows:"3",min:"0",max:"2",style:{width:"100%",resize:"none"}},null,8,["modelValue"])])])]),_:1},8,["visible"])],64)}}};const dt={class:"py-3",style:{overflow:"hidden"}},ct=["src"],ut={class:"col-12 p-0"},pt={__name:"dialogDeleteProduct",setup(k){const h=q(),g=l(!1),I=()=>{g.value=!0,y.value=!y.value},y=l(!1),v=l([]),d=Z(),c=l([]);l(d.currentProductToDelete);const e=()=>{!c.value||c.value.length===0||Object.entries(c.value).forEach(([D,C])=>{C.forEach(V=>{const S=v.value.some(B=>B.items.some(N=>N.aditional_item_name.toLowerCase()===V.item_name.toLowerCase()&&N.aditional_item_price===V.item_price&&N.aditional_item_type_name===V.type_name));V.status=S})})},b=async D=>{await Q.deleteProduct(D),d.visibles.dialogDeleteProduct=!1,h.update+=1};return Y(()=>d.currentProductToEdit.id,async()=>{v.value=await M.getAditional(d.currentProductToEdit.id),c.value=await M.getAllAditionsRegistered(),e()}),l([]),(D,C)=>{const V=_("Button"),S=_("Dialog");return x(),H(S,{close:g.value=!1,closeOnEscape:"",visible:u(d).visibles.dialogDeleteProduct,"onUpdate:visible":C[1]||(C[1]=B=>u(d).visibles.dialogDeleteProduct=B),modal:"",style:{width:"20rem"}},{footer:p(()=>[t("div",ut,[o(V,{style:{width:"100%"},onClick:C[0]||(C[0]=B=>b(u(d).currentProductToDelete.product_id)),severity:"danger",label:"Eliminar producto"})])]),default:p(()=>[K(" Esta seguro de eliminar "),t("b",null,A(u(d).currentProductToDelete.product_name),1),K(" ? "),t("div",dt,[de(t("img",{onLoad:I,class:le([g.value&&y.value?"cargado1":g.value&&!y.value?"cargado2":"nada",""]),style:{width:"100%",height:"100%","background-color":"rgb(255, 255, 255)","object-fit":"contain","border-radius":"0.2rem"},src:`https://backend.salchimonster.com/read-product-image/300/${u(d).currentProductToDelete.product_name}`,alt:""},null,42,ct),[[ce,g.value]]),de(t("div",{onLoad:I,class:le([g.value?"cargado":"sin-cargar","p-0"]),style:{width:"100%","aspect-ratio":"1 / 1","background-color":"rgb(255, 255, 255)",height:"100%","object-fit":"contain","border-radius":"0.2rem"},alt:""},null,34),[[ce,!g.value]])])]),_:1},8,["close","visible"])}}},mt=pe(pt,[["__scopeId","data-v-cb127641"]]),_t={style:{display:"flex","justify-content":"end",width:"100%"},class:"mb-3"},vt={class:"m-0",style:{"text-transform":"uppercase"}},ft={class:"m-0",style:{"text-transform":"uppercase"}},gt={style:{display:"flex",gap:".5rem","justify-content":"end"}},yt=t("h6",{class:""},[t("b",null,"NOMBRE")],-1),bt={class:"col-12 px-0 py-0 m-0"},ht=t("h6",{class:""},[t("b",null,"NOMBRE")],-1),wt={class:"col-12 px-0 py-0 m-0"},xt={class:"col-12 px-0 py-0 m-0"},Pt=5,Et={__name:"dialogGestorCategorias",setup(k){const h=l({name:"",index:0,resturant_id:5,main:!1}),g=async()=>{if(!h.value){alert("por favor proporcione un nombre para la categoria");return}await G.post(`${R}/product-categories/`,h.value),v.value=!1,j.value=await O.getCategoriesByRestaurantId(5)},I=l([]),y=l({}),v=l(!1),d=l(!1),c=l(!1),e=l({name:""}),b=r=>{d.value=!0,e.value={...r,category_id:r.id}},D=async()=>{await G.put(`${R}/product-categories/${e.value.id}`,e.value),d.value=!1,j.value=await O.getCategoriesByRestaurantId(5)},C=async()=>{await G.delete(`${R}/product-categories/${y.value.id}`),j.value=await O.getCategoriesByRestaurantId(5),c.value=!1},V=async r=>{y.value=r,c.value=!0};q(),_e(),l(!1),l([]);const S=Z(),B=l([]),N=l({product_name:"",product_description:"",price:0,last_price:0,category_id:null,restaurant_id:5,img_identifier:null}),j=l([{}]),$=l([]);return l(null),l(null),X(async()=>{try{$.value=await fe.getAllRestaurants(),j.value=await O.getCategoriesByRestaurantId(5),B.value=await M.getAllAditionsRegistered()}catch(r){console.error("Error loading data:",r)}I.value=await G.get(`${R}/get-flavor-grouped`)}),Y(Pt,async(r,i)=>{r!==i&&(j.value=await O.getCategoriesByRestaurantId(5),N.value.category_id=null)},{deep:!0}),(r,i)=>{const P=_("Button"),z=_("Column"),m=_("DataTable"),a=_("Dialog"),n=_("InputText");return x(),T(J,null,[o(u(ve)),o(a,{closable:!1,header:"GESTOR DE CATEGORIAS",closeOnEscape:"",visible:u(S).visibles.dialogGestorCategoria,"onUpdate:visible":i[2]||(i[2]=s=>u(S).visibles.dialogGestorCategoria=s),modal:"",style:{width:"40rem"}},{default:p(()=>[t("div",_t,[o(P,{onClick:i[0]||(i[0]=s=>v.value=!0),style:{"background-color":"var(--primary-color)","border-radius":".3rem",border:"none"},label:"Nueva categoria",icon:"pi pi-plus"})]),o(P,{onClick:i[1]||(i[1]=s=>u(S).visibles.dialogGestorCategoria=!1),severity:"danger",style:{position:"absolute",right:"-1rem",top:"-1rem","border-radius":"50%"},rounded:"",icon:"pi pi-times"}),t("div",null,[o(m,{style:{"background-color":"white"},showGridlines:"",stripedRows:"",value:j.value},{default:p(()=>[o(z,{style:{"text-transform":"capitalize"},class:"p-0 px-2",field:"aditional_item_name",header:"ID"},{body:p(s=>[t("h6",vt,A(s.data.id),1)]),_:1}),o(z,{style:{"text-transform":"capitalize"},class:"p-0 px-2",field:"aditional_item_name",header:"NOMBRE"},{body:p(s=>[t("h6",ft,A(s.data.name),1)]),_:1}),o(z,{style:{width:"2rem"},class:"p-0 py-1 pl-3 px-2",header:"Interactuar"},{body:p(s=>[t("div",gt,[o(P,{onClick:f=>b(s.data),style:{width:"2.5rem",height:"2.5rem","border-radius":".3rem"},severity:"warning",class:"p-0 m-0",rounded:"",icon:" pi pi-pencil"},null,8,["onClick"]),o(P,{onClick:f=>V(s.data),style:{width:"2.5rem",height:"2.5rem","border-radius":".3rem"},severity:"danger",class:"p-1",rounded:"",icon:" pi pi-trash"},null,8,["onClick"])])]),_:1})]),_:1},8,["value"])])]),_:1},8,["visible"]),o(a,{style:{width:"30rem"},closable:!1,header:"Nueva categoria",modal:"",visible:v.value,"onUpdate:visible":i[5]||(i[5]=s=>v.value=s)},{footer:p(()=>[t("div",bt,[o(P,{onClick:g,style:{"background-color":"var(--primary-color)",border:"none","border-radius":".3rem"},severity:"success",label:"Guardar"})])]),default:p(()=>[o(P,{onClick:i[3]||(i[3]=s=>v.value=!1),severity:"danger",style:{position:"absolute",right:"-1rem",top:"-1rem","border-radius":"50%"},rounded:"",icon:"pi pi-times"}),yt,o(n,{modelValue:h.value.name,"onUpdate:modelValue":i[4]||(i[4]=s=>h.value.name=s),style:{width:"100%"}},null,8,["modelValue"])]),_:1},8,["visible"]),o(a,{style:{width:"30rem"},closable:!1,header:"Editar categoria",modal:"",visible:d.value,"onUpdate:visible":i[8]||(i[8]=s=>d.value=s)},{footer:p(()=>[t("div",wt,[o(P,{onClick:D,style:{"background-color":"var(--primary-color)",border:"none","border-radius":".3rem"},severity:"success",label:"Guardar"})])]),default:p(()=>[o(P,{onClick:i[6]||(i[6]=s=>d.value=!1),severity:"danger",style:{position:"absolute",right:"-1rem",top:"-1rem","border-radius":"50%"},rounded:"",icon:"pi pi-times"}),ht,o(n,{modelValue:e.value.name,"onUpdate:modelValue":i[7]||(i[7]=s=>e.value.name=s),style:{width:"100%"}},null,8,["modelValue"])]),_:1},8,["visible"]),o(a,{style:{width:"30rem"},closable:!1,header:"Eliminar categoria",modal:"",visible:c.value,"onUpdate:visible":i[10]||(i[10]=s=>c.value=s)},{footer:p(()=>[t("div",xt,[o(P,{onClick:C,style:{"background-color":"var(--primary-color)",border:"none","border-radius":".3rem"},severity:"success",label:"Eliminar"})])]),default:p(()=>[o(P,{onClick:i[9]||(i[9]=s=>c.value=!1),severity:"danger",style:{position:"absolute",right:"-1rem",top:"-1rem","border-radius":"50%"},rounded:"",icon:"pi pi-times"}),t("h6",null," Esta seguro de eliminar la categoria "+A(y.value.name)+"?",1)]),_:1},8,["visible"])],64)}}},kt={style:{"border-radius":"1rem",position:"relative"},class:"mx-auto mx-0 p-0 mt-0"},$t={key:0,class:"mx-0 my0 mx-auto px-2",style:{"min-width":"max-content","max-width":"1024px","justify-content":"end",display:"flex","align-items":"end"}},At={__name:"MenuTienda",setup(k){const h=Z(),g=me();q();const I=l([]),y=()=>{h.visibles.dialogAddProduct=!0},v=()=>{h.visibles.dialogGestorCategoria=!0},d=async()=>{I.value=await $e.getSites()};return X(async()=>{d()}),(c,e)=>{const b=_("Button"),D=_("router-view");return x(),T("div",kt,[o(ke,{class:"m-0"}),u(g).path!="/tienda-menu/productos/sabores"&&u(g).path!="/tienda-menu/productos/adiciones"?(x(),T("div",$t,[o(b,{onClick:y,class:"ml-3 mr-2 my-3",style:{"min-width":"max-content"},severity:"help",label:"Nuevo producto"}),o(b,{onClick:v,class:"ml-3 mr-2 my-3",style:{"min-width":"max-content"},severity:"help",label:"Gestionar categorias"})])):F("",!0),o(D,{class:""}),o(Ke,{class:"m-3"}),o(mt),o(nt),o(Et)])}}};export{At as default};
