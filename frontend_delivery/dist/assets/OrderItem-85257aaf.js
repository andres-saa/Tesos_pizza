import{_ as I,u as B,r as p,o as t,c as l,b as r,t as s,F as E,i as N,d as V,U as A,a as C,B as n,q as d,h as a,p as o,s as P,v as R}from"./index-0c0fb4fd.js";const f=i=>(P("data-v-4e69311f"),i=i(),R(),i),j={style:{display:"flex","align-items":"center","justify-content":"space-between"}},D={style:{display:"flex","align-items":"center",gap:".5rem","flex-wrap":"wrap"}},T={style:{"min-width":"max-content",color:"black"}},q={style:{width:"3rem",height:"100%"}},F={style:{position:"relative"}},L=["src"],U={class:"text-xl",style:{display:"flex",gap:"1rem","align-items":"center"}},$={style:{"min-width":"max-content",color:"black"}},z={key:1,style:{"font-weight":"bold"}},H=f(()=>r("b",null,"RESPONSABLE:",-1)),W={key:4},Y=f(()=>r("b",null,"OBSERVACIONES:",-1)),Z={__name:"OrderItem",props:{order:{type:Object,default:{}}},setup(i){const e=i,u=B(),k=()=>{u.setVisible("currentOrder",!0),u.setOrder(e.order)},x={generada:"warning","en preparacion":"info",enviada:"success",cancelada:"danger"};return(G,J)=>{var m,y,h,b,g,v;const w=p("Button"),_=p("Tag"),O=p("ProgressSpinner"),S=p("P");return t(),l("div",{onClick:k,class:"col-12",style:{"background-color":"rgba(255, 255, 255, 0.506)",padding:".6rem",position:"relative","border-radius":"0.5rem",cursor:"pointer"}},[r("div",j,[r("div",D,[r("b",T," #"+s((m=e.order)==null?void 0:m.order_id),1),(t(!0),l(E,null,N(e.order.products.slice(0,3),c=>(t(),l("div",q,[r("div",F,[r("img",{style:{width:"100%","border-radius":"10%","background-color":"white","object-fit":"cover","aspect-ratio":"1 / 1"},src:`${V(A)}/read-photo-product/${c.img_identifier}/96`,alt:""},null,8,L),C(w,{severity:"danger",class:"p-0",rounded:"",label:c.quantity,style:{width:"1.5rem",position:"absolute",top:"-.5rem",right:"-.5rem","z-index":"99",height:"1.5rem","border-radius":"1rem"}},null,8,["label"])])]))),256))]),r("span",U,[r("b",$,s((v=(g=(b=(h=(y=e.order)==null?void 0:y.latest_status_timestamp)==null?void 0:h.split("T")[1])==null?void 0:b.split(".")[0])==null?void 0:g.split(":").slice(0,2))==null?void 0:v.join(":")),1),e.order.current_status!="en preparacion"?(t(),n(_,{key:0,style:{"border-radius":".3rem"},severity:x[e.order.current_status]},{default:d(()=>[a(s(e.order.current_status),1)]),_:1},8,["severity"])):o("",!0),e.order.current_status=="en preparacion"?(t(),n(O,{key:1,style:{width:"50px",height:"50px"},strokeWidth:"8",animationDuration:".5s","aria-label":"Custom ProgressSpinner"})):o("",!0)])]),e.order.calcel_sol_state!=null?(t(),n(_,{key:0,style:{"border-radius":".3rem"},severity:e.order.calcel_sol_state?"success":"danger"},{default:d(()=>[a(s(e.order.calcel_sol_state?"REVISADO":" EN REVISION..."),1)]),_:1},8,["severity"])):o("",!0),a(),e.order.calcel_sol_state?(t(),l("span",z," Y ")):o("",!0),e.order.calcel_sol_state?(t(),n(_,{key:2,style:{"border-radius":".3rem"},severity:e.order.calcel_sol_asnwer?"success":"danger"},{default:d(()=>[a(s(e.order.calcel_sol_asnwer?"APROBADO":"RECHAZADO"),1)]),_:1},8,["severity"])):o("",!0),e.order.calcel_sol_state?(t(),n(S,{key:3,class:"m-0"},{default:d(()=>{var c;return[H,a(" "+s((c=e.order.cancelation_solve_responsible)==null?void 0:c.split(" ").slice(0,3).join(" ")),1)]}),_:1})):o("",!0),e.order.responsible_observation?(t(),l("span",W,[r("p",null,[Y,a(" "+s(e.order.responsible_observation||"sin observaciones"),1)])])):o("",!0),e.order.responsible_id?(t(),n(_,{key:5,style:{"border-radius":".3rem"},severity:"success"},{default:d(()=>[a(s(e.order.name),1)]),_:1})):o("",!0)])}}},M=I(Z,[["__scopeId","data-v-4e69311f"]]);export{M as O};
