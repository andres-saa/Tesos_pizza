import{_ as k,b as E,k as C,u as R,J as I,l as D,B as T,p as U,T as L,x as N,c as p,e as t,t as a,g as s,i as y,F as A,q as O,f as u,w as h,v as B,r as P,o as d,j as g,D as M,K as j,s as _}from"./index-3TSIe7Kj.js";const V={class:"p-2 col-12 my-3",style:{height:"auto","min-height":"90vh",display:"flex","justify-content":"center","align-items":"center"}},q={class:"shadow-3 p-4",style:{"border-radius":"0.5rem","max-width":"500px"}},F={class:"text-4xl text-center mt-5",style:{"font-weight":"bold"}},G={class:"text-4xl text-center my-5",style:{"font-weight":"bold","text-transform":"uppercase"}},H={id:"factura",style:{width:"100%","text-transform":"uppercase"}},z={class:"",style:{width:"auto",color:"black"}},J={style:{display:"grid","grid-template-columns":"auto auto"}},K={class:"p-0 m-0",style:{margin:"0",padding:"0"}},Q={style:{"text-align":"end",color:"black",padding:"0",margin:"0"}},Z={style:{display:"flex",gap:"1rem","align-items":"center","justify-content":"end",padding:"0",width:"100%","flex-wrap":"wrap"}},W={style:{display:"flex",gap:"0.2rem","align-items":"end","flex-direction":"column"}},X={style:{color:"black"}},Y={class:"",style:{display:"grid",color:"","margin-top":"0.5rem","grid-template-columns":"auto auto"}},tt={class:""},et={style:{"text-align":"end","font-weight":"bold",color:"black",margin:"0"}},ot={class:""},st={style:{"text-align":"end","font-weight":"bold",color:"black",margin:"0"}},nt={class:""},at={style:{"text-align":"end",color:"black","font-weight":"bold"}},lt={style:{display:"flex","flex-direction":"column",gap:"1rem"}},it=["href"],rt={__name:"gracias",setup(dt){const b=E(),l=C(""),n=R(),i=I();D(()=>{var c,e;l.value=`Hola soy *${i.user.name.toUpperCase()}* 🤗 acabo de hacer el siguiente pedido en la página web. El número de la orden es *#${n.last_order}*.


*Escribo para Realizar la Transferecia*

*🛒 PRODUCTOS*
${n.cart.products.map(o=>`*${o.quantity}* ${o.product.product_name}`).join(`
`)}

`,n.cart.additions.length>0&&(l.value+=`*➕ ADICIONES*
${n.cart.additions.filter(o=>o.group=="ADICIONES").map(o=>`*${o.quantity}* ${o.name}`).join(`
`)}

`),n.cart.additions.filter(o=>o.group=="CAMBIOS").length>0&&(l.value+=`*➕ CAMBIOS*
${n.cart.additions.filter(o=>o.group=="CAMBIOS").map(o=>`*${o.quantity}* ${o.name}`).join(`
`)}

`),n.cart.additions.filter(o=>o.group=="SALSAS").length>0&&(l.value+=`*➕ SALSAS*
${n.cart.additions.filter(o=>o.group=="SALSAS").map(o=>` ${o.name}`).join(`
`)}

`),l.value+=`*📍 DIRECCIÓN*
${i.user.address} BARRIO ${(e=(c=b.location)==null?void 0:c.neigborhood)==null?void 0:e.name}

*📞 TELEFONO*
${i.user.phone_number}

*📝 NOTAS*
${n.cart.order_notes||"Sin notas"}

*💰 METODO DE PAGO*
${i.user.payment_method_option.name}

*Muchas Gracias* 🙏`,console.log(l.value)});const $=T(()=>{const c="https://api.whatsapp.com/send",e=new URLSearchParams({phone:"573053447255",text:l.value});return`${c}?${e.toString()}`});return U(()=>{n.cart={products:[],total_cost:0,additions:[]}}),L(()=>{n.cart.products.length<=0&&N.push("/")}),(c,e)=>{var f,v,w,x;const o=P("router-link");return d(),p("div",V,[t("div",q,[t("p",F," 🤩"+a(s(i).user.name.toUpperCase())+"🤩",1),e[9]||(e[9]=t("p",{class:"text-2xl text-center mb-5",style:{"font-weight":"bold"}},"🔥MUCHAS GRACIAS POR TU COMPRA!🔥",-1)),t("p",G,[e[0]||(e[0]=t("span",{class:"text-2xl"},"ID DEL PEDIDO",-1)),e[1]||(e[1]=y()),e[2]||(e[2]=t("br",null,null,-1)),y(" #"+a(s(n).last_order),1)]),e[10]||(e[10]=t("p",{class:"text-2xl text-center my-3 p-3",style:{"border-radius":".3rem","background-color":"var(--primary-color)",color:"white"}},"Hemos recibido tu pedido y en breve será despachado",-1)),t("div",H,[t("div",z,[e[8]||(e[8]=t("div",{class:"",style:{"font-weight":"bold",color:"white",margin:"0","justify-content":"space-between","background-color":"black","align-items":"center",display:"grid","grid-template-columns":"auto auto"}},[t("div",{style:{width:"100%"},class:"p-2"},[t("b",null," PRODUCTOS")]),t("div",{class:"p-2"},[t("b",null," TOTAL ")])],-1)),(d(!0),p(A,null,O(s(n).cart.products,r=>(d(),p("div",null,[t("div",J,[t("p",K,a(r.quantity)+" "+a(r.product.product_name),1),t("div",null,[t("p",Q,a(s(g)(r.total_cost)),1)])]),t("div",Z,[t("div",W,[(d(!0),p(A,null,O(r.flavors,(m,S)=>(d(),M(s(j),{key:S,style:{padding:"0"}},{default:h(()=>[t("span",X,a(r.flavors.length>1?`sabor ${S+1}`:"sabor"),1),y(" "+a(m.name)+" "+a(m.price>0?s(g)(r.flavors.length>1?m.price/2:m.price):""),1)]),_:2},1024))),128))])]),e[3]||(e[3]=t("div",{style:{"background-color":"rgba(0, 0, 0, 0.286)",height:"1px"}},null,-1))]))),256)),t("div",Y,[e[4]||(e[4]=t("div",{class:""},[t("span",{style:{"font-weight":"bold"}},[t("b",null,"Subtotal")])],-1)),t("div",tt,[t("p",et,[t("b",null,a(s(g)(s(n).cart.total_cost)),1)])]),e[5]||(e[5]=t("div",{class:""},[t("span",{style:{"font-weight":"bold"}},[t("b",null,"Domicilio")])],-1)),t("div",ot,[t("p",st,[t("b",null,a(s(g)((v=(f=s(b).location)==null?void 0:f.neigborhood)==null?void 0:v.delivery_price)),1)])]),e[6]||(e[6]=t("div",{class:""},[t("span",{style:{"font-weight":"bold",color:"black"}},[t("b",null,"Total")])],-1)),t("div",nt,[t("p",at,[t("b",null,a(s(g)(((x=(w=s(b).location)==null?void 0:w.neigborhood)==null?void 0:x.delivery_price)+s(n).cart.total_cost)),1)])]),e[7]||(e[7]=t("div",{class:""},null,-1))])])]),t("div",lt,[u(o,{to:"/rastrear"},{default:h(()=>[u(s(_),{class:"mt-3",icon:"pi ",iconPos:"right",severity:"warning",style:{"font-weight":"bold",width:"100%"},label:"PUEDES RASTREARLO AQUI"})]),_:1}),s(i).user.payment_method_option.id==6?(d(),p("a",{key:0,href:$.value,target:"_blank"},[u(s(_),{icon:"pi pi-whatsapp",severity:"danger",class:"wsp",style:{"font-weight":"bold","background-color":"#00b66c",border:"none",width:"100%"},label:"REALIZAR TRANSFERENCIA"})],8,it)):B("",!0),u(o,{to:"/"},{default:h(()=>[u(s(_),{icon:"pi pi-arrow-left",severity:"danger",outlined:"",style:{"font-weight":"bold",border:"none",width:"100%"},label:"VOLVER AL MENU"})]),_:1})])])])}}},pt=k(rt,[["__scopeId","data-v-23f93974"]]);export{pt as default};
