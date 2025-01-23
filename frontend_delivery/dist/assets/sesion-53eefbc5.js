import{u as D,p as P}from"./ProductService-0ac95a0d.js";import{_ as I,b as h,j as $,U as k,u as j,r as S,o as i,c as u,e as s,z as V,q as z,a as y,H as U,I as L,n as F,t as g,i as T,m as N,d as R,p as f,F as q,k as H,J}from"./index-8c84e25c.js";import{f as O}from"./formatoPesos-2a38d2e7.js";import"./reportes-b03db83c.js";const A={style:{display:"flex",position:"absolute",right:"-1rem",top:"-1rem",gap:"0.2rem","z-index":"9"}},G={class:"imagen",style:{overflow:"hidden"}},K=["src"],Q={class:"texto",style:{}},W={style:{display:"flex",gap:"1rem",height:"100%","flex-direction":"column","justify-content":"space-between"}},X={style:{display:"grid","grid-template-columns":"auto auto",width:"100%","justify-content":"space-between","align-items":"center"}},Y={style:{"text-transform":"uppercase"}},Z={style:{display:"flex","justify-content":"space-between","align-items":"c"}},tt={style:{display:"flex","align-items":"center",gap:"1rem"}},et={class:"text-xl"},st={__name:"TarjetaMenu",props:{product:{type:Object,default:{}}},emits:["update"],setup(w,{emit:n}){const e=w,r=D(),p=h(!1),a=$(()=>`${k}/read-photo-product/${e.product.img_identifier}/600?update=${x.update}`),c=h(!1),d=()=>{c.value=!0},_=o=>{r.visibles.dialogEditProduct=!0,r.currentProductToEdit=o},v=async o=>{e.product.main=!0;try{const t=await fetch(`${k}/set-main-product/${o}`,{method:"PUT",headers:{"Content-Type":"application/json"}});if(!t.ok)throw new Error(`Error: ${t.statusText}`);const l=await t.json();console.log("Producto principal actualizado:",l),n("update")}catch(t){console.error("Error al establecer el producto principal:",t)}},x=j(),C=o=>{r.visibles.dialogDeleteProduct=!0,r.currentProductToDelete=o},B=async o=>{try{const t=await P.updateProductInstanceStatus(e.product.id,o);t&&console.log("Status updated:",t)}catch(t){console.error("Failed to update status:",t)}},E=$(()=>e.product.product_description.substring(0,100)+"...");return(o,t)=>{var b;const l=S("Button"),M=S("InputSwitch");return i(),u("div",{onMouseover:t[5]||(t[5]=()=>p.value=!0),onMouseleave:t[6]||(t[6]=()=>p.value=!1),class:"container shadow-2 col-12 shadow-2 p-3",style:{"border-radius":"0.5rem","background-color":"white",height:"100%",position:"relative"}},[s("div",A,[p.value||e.product.main?(i(),V(l,{key:0,class:"shadow-2",onClick:t[0]||(t[0]=m=>v(e.product.product_id)),severity:"success",style:{"font-weight":"bold",width:"2rem",height:"2rem","border-radius":"50%",right:"0",top:"0"},rounded:"",icon:"pi pi-home"})):z("",!0),y(l,{class:"shadow-2",onClick:t[1]||(t[1]=m=>C(e.product)),severity:"danger",style:{width:"2rem",height:"2rem",right:"0",top:"0","border-radius":"50%"},rounded:"",icon:"pi pi-times"}),y(l,{class:"shadow-2",onClick:t[2]||(t[2]=m=>_(e.product)),severity:"warning",style:{"font-weight":"bold",width:"2rem",height:"2rem","border-radius":"50%",right:"0",top:"0"},rounded:"",icon:"pi pi-pencil"})]),s("div",G,[U(s("img",{onLoad:d,class:F([c.value?"cargado":"sin-cargar",""]),style:{width:"100%","aspect-ratio":"1 / 1","background-color":"rgb(255, 255, 255)","object-fit":"cover","border-radius":"0.2rem"},src:a.value,alt:""},null,42,K),[[L,c.value]])]),s("div",Q,[s("div",W,[s("div",X,[s("span",null,[s("b",Y,g(e.product.product_name),1)]),y(l,{class:"elipsis",text:"",style:{color:"black"},icon:"pi pi-ellipsis-v p-0 text-xl"})]),s("span",null,g((b=E.value)==null?void 0:b.toLocaleLowerCase()),1),s("div",Z,[y(M,{modelValue:e.product.status,"onUpdate:modelValue":[t[3]||(t[3]=m=>e.product.status=m),t[4]||(t[4]=m=>B(e.product.status))]},null,8,["modelValue"]),s("div",tt,[s("span",et,[s("b",null,g(T(O)(e.product.price)),1)])])])])])],32)}}},ot=I(st,[["__scopeId","data-v-63b7b470"]]),rt={class:"text-center text-3xl col-12",style:{"font-weight":"bold",display:"flex",gap:"1rem","align-items":"center"}},at={class:"text-3xl text-center",style:{width:"100%","text-transform":"capitalize"}},it={style:{}},nt={key:0,class:"grid p-1 pb-8",style:{"max-width":"900px",margin:"auto"}},ct={key:1,style:{"font-weight":"bold"},class:"text-4xl text-center my-8 p-0"},mt={__name:"sesion",setup(w){const n=j(),e=N(),r=h([]),p=h(!1);R(async()=>{a()});const a=async()=>{let c=e.params.category_id,d=n.site.site_id;r.value=await P.getProductsByCategorySite(c,d)};return f(()=>e.params.category_id,async()=>{a()},{deep:!0}),f(()=>n.site,async()=>{n.site&&(a(),await J())},{deep:!0}),f(()=>n.update,async()=>{a()},{deep:!0}),(c,d)=>(i(),u("div",null,[s("p",rt,[s("p",at,[s("p",it,g(T(e).params.menu_name),1)])]),p.value?(i(),u("p",ct," Selecciona una sede y una categoria. ")):(i(),u("div",nt,[(i(!0),u(q,null,H(r.value,(_,v)=>(i(),u("div",{key:_.id,class:"col-12 md:col-4 lg:col-3 sm:col-6"},[y(ot,{onUpdate:d[0]||(d[0]=x=>a()),style:{width:"100%"},id:`tarjeta-${v}`,product:_},null,8,["id","product"])]))),128))]))]))}};export{mt as default};
