import{D as p}from"./DialogoPedido-78ebcfae.js";import{O as r}from"./OrderItem-85257aaf.js";import{_ as h,u as f,g as u,o as e,c as s,a as l,b as t,F as a,i as n,d as i,s as x,v as y}from"./index-0c0fb4fd.js";import"./formatoPesos-2a38d2e7.js";const _=c=>(x("data-v-91698721"),c=c(),y(),c),v={class:"grid xl:mx-2 my-0 py-0"},g={class:"md:px-2 xl:pt-5 p-0 col-12 xl:col-4 top"},b={class:"shadow-4 contenedor pb-2",style:{overflow:"hidden","background-color":"#640097"}},w={style:{height:"100%",width:"100%"}},m=_(()=>t("p",{class:"col-12 text-center shadow-4",style:{"background-color":"#ffffff61"}},[t("span",{class:"text-center text-2xl",style:{color:"black","font-weight":"bold"}}," RECIBIDOS")],-1)),k={class:"lg:pb-8",style:{height:"100%","overflow-y":"auto"}},O={class:"px-3 py-2"},I={class:"md:px-2 xl:pt-5 p-0 col-12 xl:col-4 top"},S={class:"shadow-4 contenedor pb-2",style:{overflow:"hidden","background-color":"#007bff"}},E={style:{height:"100%",width:"100%"}},N=_(()=>t("p",{class:"col-12 text-center shadow-4",style:{"background-color":"#ffffff61"}},[t("span",{class:"text-center text-2xl",style:{color:"black","font-weight":"bold"}}," EN PREPARACION")],-1)),A={class:"lg:pb-8",style:{height:"100%","overflow-y":"auto"}},D={class:"px-3 py-2"},T={class:"md:px-2 xl:pt-5 p-0 col-12 xl:col-4 top"},B={class:"shadow-4 contenedor pb-2",style:{overflow:"hidden","background-color":"#22c55e"}},C={class:"lg:pb-8",style:{height:"100%",width:"100%"}},P=_(()=>t("p",{class:"col-12 text-center shadow-4",style:{"background-color":"#ffffff61"}},[t("span",{class:"text-center text-2xl",style:{color:"black","font-weight":"bold"}}," ENVIADOS")],-1)),R={style:{height:"100%","overflow-y":"auto"}},V={class:"px-3 py-2"},F={class:"md:px-2 xl:pt-5 p-0 col-12 xl:col-4 top"},L={class:"shadow-4 contenedor pb-2",style:{overflow:"hidden","background-color":"rgb(205, 31, 48)"}},M={class:"lg:pb-8",style:{height:"100%",width:"100%"}},j=_(()=>t("p",{class:"col-12 text-center shadow-4",style:{"background-color":"#ffffff61"}},[t("span",{class:"text-center text-2xl",style:{color:"black","font-weight":"bold"}}," CANCELADOS")],-1)),q={style:{height:"100%","overflow-y":"auto"}},z={class:"px-3 py-2"},G={__name:"pedidos",setup(c){const d=f();return u(()=>{d.getTodayOrders()}),(H,J)=>(e(),s("div",v,[l(p),t("div",g,[t("div",b,[t("div",w,[m,t("div",k,[(e(!0),s(a,null,n(i(d).TodayOrders.filter(o=>o.current_status=="generada"),o=>(e(),s("div",O,[l(r,{order:o},null,8,["order"])]))),256))])])])]),t("div",I,[t("div",S,[t("div",E,[N,t("div",A,[(e(!0),s(a,null,n(i(d).TodayOrders.filter(o=>o.current_status=="en preparacion"),o=>(e(),s("div",D,[l(r,{order:o},null,8,["order"])]))),256))])])])]),t("div",T,[t("div",B,[t("div",C,[P,t("div",R,[(e(!0),s(a,null,n(i(d).TodayOrders.filter(o=>o.current_status=="enviada"),o=>(e(),s("div",V,[l(r,{order:o},null,8,["order"])]))),256))])])])]),t("div",F,[t("div",L,[t("div",M,[j,t("div",q,[(e(!0),s(a,null,n(i(d).TodayOrders.filter(o=>o.current_status=="cancelada"),o=>(e(),s("div",z,[l(r,{order:o},null,8,["order"])]))),256))])])])])]))}},X=h(G,[["__scopeId","data-v-91698721"]]);export{X as default};