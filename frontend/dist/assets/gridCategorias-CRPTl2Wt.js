import{_ as g,o as s,c as o,e as i,g as l,U as _,t as d,x as u,k as m,l as y,m as p,F as f,q as v,D as C}from"./index-3TSIe7Kj.js";/* empty css                                                                       */const $=["src"],h={class:"name",style:{"text-transform":"capitalize"}},k={__name:"CategoryCard",props:{category:{type:Object,required:!0}},setup(e){const r=(c,t)=>{u.push(`/categoria/${c}/${t}`)};return(c,t)=>{var a;return s(),o("div",{class:"container",onClick:t[0]||(t[0]=n=>r(e.category.category_name,e.category.category_id)),style:{padding:"1rem"}},[i("img",{class:"imagen",src:`${l(_)}/read-photo-product/${e.category.image_identifier}/600`},null,8,$),i("h4",h,d((a=e.category.category_name)==null?void 0:a.toLowerCase()),1)])}}},x=g(k,[["__scopeId","data-v-531cc61e"]]),B={class:"container"},I={__name:"gridCategorias",setup(e){const r=m([]);return y(async()=>{r.value=await p.get(`${_}/categories/31/5`)}),(c,t)=>(s(),o("div",B,[(s(!0),o(f,null,v(r.value,(a,n)=>(s(),C(x,{key:n,class:"card",category:a,title:a.category_name},null,8,["category","title"]))),128))]))}},D=g(I,[["__scopeId","data-v-0ee36caf"]]);export{D as g};
