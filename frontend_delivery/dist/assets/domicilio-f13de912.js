import{b as t,U as u,_ as re,B as ie,p as O,d as V,C as N,D as ne,m as de,r as v,o as T,c as k,a as l,w as d,e as r,n as x,F as j,E as ce,g as ue,j as pe,k as L,G as z,P as G,y as me,z as he}from"./index-2ea80005.js";import"./valoresReactivosCompartidos-57991516.js";const ve=t([{}]);t([]);t([]);t(["Masculino","Femenino"]);t(["COOSALUD EPS-S","NUEVA EPS","MUTUAL SER","ALIANSALUD EPS","SALUD TOTAL EPS S.A.","EPS SANITAS","EPS SURA","FAMISANAR EPS","SERVICIO OCCIDENTAL DE SALUD EPS (SOS EPS)","SALUD MIA EPS","COMFENALCO VALLE EPS","COMPENSAR EPS","EPM - EMPRESAS PUBLICAS DE MEDELLIN","FONDO DE PASIVO SOCIAL DE FERROCARRILES NACIONALES DE COLOMBIA","CAJACOPI ATLANTICO","CAPRESOCA EPS","COMFACHOCO","COMFAORIENTE","EPS FAMILIAR DE COLOMBIA","ASMET SALUD","EMSSANAR E.S.S.","CAPITAL SALUD EPS-S","SAVIA SALUD EPS","DUSAKAWI EPSI","ASOCIACION INDIGENA DEL CAUCA EPSI","ANAS WAYUU EPSI","MALLAMAS EPSI","PIJAOS SALUD EPSI","SALUD BÓLIVAR EPS SAS"]);t(["Soltero/a","Casado/a","Divorciado/a","Union libre"]);t(["Primaria","Secundaria","Técnico/tecnológico","Universitario/a","Posgrado"]);t(["Fijo 3 meses","Turneros","Indefinido"]);t(["Propia","Arrendada","Familiar","Otra"]);t(["XS","S","M","L","XL","XXL"]);t(["28","30","32","34","36","38","40","42"]);t(["Carro","Moto"]);const ye=async()=>{try{const c=await fetch(`${u}/sites`);if(c.ok){const n=await c.json();return ve.value=n,n}else return console.error("Error al obtener los datos de la API"),[]}catch(c){return console.error("Error al obtener los datos de la API",c),[]}};t(["A+","A-","B+","B-","AB+","AB-","O+","O-"]);t(["activo","inactivo","Por remplazar"]);const I=c=>(me("data-v-2cc0d66b"),c=c(),he(),c),fe=I(()=>r("div",null,null,-1)),ge=I(()=>r("p",null,"¿Estás seguro de que quieres eliminar este barrio?",-1)),Se={class:"grid",style:{}},be={class:"col-12 my-0 pb-0"},Ae={class:"col-12 my-0"},_e={class:"grid m-0",style:{width:"100%"}},Ee={class:"col-12 md:col-6 p-0 md:pr-2"},we={class:"col-11 md:col-5 p-0 md:pl-2 my-2 md:my-0",style:{display:"flex","justify-content":"end"}},Ce={class:"col-12 pl-0"},Pe={class:"col-12 m-auto p-0",style:{"max-width":"700px"}},Le={class:"col-12 p-0 m-0",style:{display:"flex","justify-content":"end",border:"none"}},Ie={class:"flex p-0 flex-column md:flex-row md:justify-content-between md:align-items-center"},Ue={class:"block mt-2 md:mt-0 p-input-icon-left"},De=I(()=>r("i",{class:"pi pi-search"},null,-1)),Oe=I(()=>r("span",{class:"p-column-title p-0"},"Code",-1)),Ve={__name:"domicilio",setup(c){const n=ie();t(!1);const p=t([{}]),H=e=>{p.value.length>1&&p.value.splice(e,1)},y=t(!1);t({neighborhood_id:0,name:"",delivery_price:0,site_id:0,city_id:0});const A=t(0),m=t(0);O(m,(e,o)=>{e!=o&&Y().then(a=>{C.value=a,A.value=C.value[0]})}),O(y,(e,o)=>{e==!0&&(m.value={},p.value=[{}])});const J=async()=>{y.value=!1,n.setLoading(!0,"guardando barrios");try{await Promise.all(p.value.map(async e=>{if(e.site_id=A.value.site_id,e.city_id=m.value.city_id,!(await fetch(`${u}/neighborhood`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)})).ok)throw new Error(`Error creating neighborhood: ${e.name}`)})),w.add({severity:"success",summary:"Created",detail:"All neighborhoods created successfully",life:3e3}),p.value=[{}],await _().then(e=>f.value=e),n.setLoading(!1,"guardando barrios")}catch(e){console.error("Request error:",e),w.add({severity:"error",summary:"Error",detail:"Failed to create some neighborhoods",life:3e3}),n.setLoading(!1,"guardando barrios")}},B=t([]),X=async()=>{try{const e=await fetch(`${u}/cities`);if(e.ok)return await e.json()}catch{}},q=async()=>{const e={method:"DELETE"};try{if(!(await fetch(`${u}/neighborhood/${R.value.neighborhood_id}`,e)).ok)throw new Error("Error al eliminar el barrio");await _().then(a=>f.value=a),b.value=!1,w.add({severity:"success",summary:"Eliminado",detail:"Barrio eliminado con éxito",life:3e3})}catch(o){console.error("Error en la petición:",o),w.add({severity:"error",summary:"Error",detail:"No se pudo eliminar el barrio",life:3e3})}};V(async()=>{X().then(e=>B.value=e)});const f=t([]),K=t(!1),b=t(!1),R=t({}),W=e=>{R.value=e,b.value=!0},_=async()=>{try{n.setLoading(!0,"cargando barrios");const o=await fetch(`${u}/neighborhoods/by-site/31`);if(o.ok||(K.value=!1,n.setLoading(!1,"cargando barrios")),o.ok){const a=await o.json();return n.setLoading(!1,"cargando barrios"),a}}catch{n.setLoading(!1,"cargando barrios")}},Y=async()=>{var o;if(!((o=m.value)!=null&&o.city_id))return;const e=m.value.city_id;try{const a=await fetch(`${u}/sites/city/${e}`);if(a.ok||n.setLoading(!1,"cargando barrios"),a.ok){const g=await a.json();return n.setLoading(!1,"cargando barrios"),g}}catch{n.setLoading(!1,"cargando barrios")}};V(async()=>{_().then(e=>{f.value=e})}),N(()=>{n.setLoading(!1)});const M=t(),E=t(null),Q=()=>{E.value={global:{value:null,matchMode:ce.CONTAINS}}};N(()=>{Q()}),t(!1),t(!1);const w=ne(),Z=de();t(!1);const ee=t([]),oe=t([]);t({}),t({});const te=t(!0);t(!1),t([]);const $=async e=>{const o={method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)};fetch(`${u}/neighborhood/${e.neighborhood_id}`,o).then(a=>{if(!a.ok)throw new Error("La petición ha fallado");return a.json()}).then(a=>{console.log("Respuesta del servidor:",a)}).catch(a=>{console.error("Error en la petición:",a)})};async function ae(){try{const e=await fetch(`${u}/employers/grouped-by-site`);if(!e.ok)throw new Error(`HTTP error! Status: ${e.status}`);let o=await e.json();o=o.map(a=>{const g=a.employers.reduce((h,S)=>(h[S.position]=h[S.position]||[],h[S.position].push(S),h),{});return{...a,positions:g}}),ee.value=o,te.value=!1}catch(e){console.error("Error al obtener usuarios agrupados por sede:",e)}}async function se(){try{const e=await fetch(`${u}/employers/grouped-by-position`);if(!e.ok)throw new Error(`HTTP error! Status: ${e.status}`);oe.value=await e.json()}catch(e){console.error("Error al obtener usuarios agrupados por posición:",e)}}const C=t([]);return N(()=>{ye().then(e=>C.value=e)}),V(async()=>{await ae(),await se()}),O(()=>Z.path,()=>{_().then(e=>{f.value=e})}),(e,o)=>{const a=v("Button"),g=v("Dialog"),h=v("Dropdown"),S=v("Divider"),U=v("InputText"),D=v("Column"),le=v("DataTable");return T(),k(j,null,[fe,l(g,{visible:b.value,"onUpdate:visible":o[1]||(o[1]=s=>b.value=s),style:{width:"auto"},header:"Confirmar eliminación",modal:!0,closable:!1},{default:d(()=>[ge,l(a,{label:"Cancelar",onClick:o[0]||(o[0]=s=>b.value=!1),class:"p-button-text"}),l(a,{label:"Eliminar",onClick:q,class:"p-button-danger"})]),_:1},8,["visible"]),l(g,{style:{width:"45rem"},class:"mx-2",visible:y.value,"onUpdate:visible":o[6]||(o[6]=s=>y.value=s),header:"Crear Nuevo Barrio",modal:!0,closable:!1},{footer:d(()=>[l(a,{severity:"danger",label:"Cancelar",onClick:o[5]||(o[5]=s=>y.value=!1),class:"p-button-text"}),l(a,{severity:"help",label:"Crear",onClick:J,class:"p-button m-0"})]),default:d(()=>{var s;return[r("div",Se,[r("div",be,[l(h,{style:{width:"100%"},modelValue:m.value,"onUpdate:modelValue":o[2]||(o[2]=i=>m.value=i),options:B.value,optionLabel:"city_name",placeholder:"Ciudad"},null,8,["modelValue","options"])]),r("div",Ae,[l(h,{style:{width:"100%"},modelValue:A.value,"onUpdate:modelValue":o[3]||(o[3]=i=>A.value=i),options:(s=C.value)==null?void 0:s.filter(i=>i.show_on_web),optionLabel:"site_name",placeholder:"Sede"},null,8,["modelValue","options"])])]),l(S,null,{default:d(()=>[ue(" Nuevos barrios ")]),_:1}),(T(!0),k(j,null,pe(p.value,(i,F)=>(T(),k("div",{key:F,class:"my-3"},[r("div",_e,[r("div",Ee,[l(U,{style:{width:"100%"},modelValue:i.name,"onUpdate:modelValue":P=>i.name=P,placeholder:"Nombre del Barrio"},null,8,["modelValue","onUpdate:modelValue"])]),r("div",we,[l(L(z),{style:{width:"100%"},prefix:"$",modelValue:i.delivery_price,"onUpdate:modelValue":P=>i.delivery_price=P,placeholder:"Precio del Domicilio"},null,8,["modelValue","onUpdate:modelValue"])]),l(a,{icon:"pi pi-trash text-2xl p-0",text:"",class:"col-1 p-0 m-0",size:"small",severity:"danger",onClick:P=>H(F)},null,8,["onClick"])])]))),128)),r("div",Ce,[l(a,{text:"",class:"p-0",onClick:o[4]||(o[4]=()=>{p.value.push({})})},{default:d(()=>[r("i",{class:x(["text-4xl",L(G).PLUS_CIRCLE])},null,2)]),_:1})])]}),_:1},8,["visible"]),r("div",Pe,[r("div",Le,[l(a,{style:{},raised:"",severity:"help",size:"small",class:"m-0 my-0",label:"Nuevo Barrio",onClick:o[7]||(o[7]=s=>y.value=!0)})]),l(le,{class:x(f.value.length>0?"apear":"hide"),stripedRows:"",ref:"dt",value:f.value,selection:M.value,"onUpdate:selection":o[9]||(o[9]=s=>M.value=s),dataKey:"id",paginator:!0,rows:10,filters:E.value,showGridlines:"",paginatorTemplate:"FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown",rowsPerPageOptions:[5,10,25,100],currentPageReportTemplate:"Mostrando {first} a {last} de {totalRecords} neighborhoods",responsiveLayout:"scroll",scrollable:"",frozenValue:e.lockedCustomers},{header:d(()=>[r("div",Ie,[r("span",Ue,[De,l(U,{class:"",modelValue:E.value.global.value,"onUpdate:modelValue":o[8]||(o[8]=s=>E.value.global.value=s),placeholder:"Buscar..."},null,8,["modelValue"])])])]),default:d(()=>[l(D,{class:"px-2 py-0 m-0",field:"name",header:"Barrio",sortable:!0,headerStyle:"width:max-content; min-width:15rem "},{body:d(s=>[Oe,l(U,{onchange:()=>$(s.data),style:{width:"100%",border:"none","border-radius":"0"},modelValue:s.data.name,"onUpdate:modelValue":i=>s.data.name=i},null,8,["onchange","modelValue","onUpdate:modelValue"])]),_:1}),l(D,{class:"px-2 py-0 m-0",field:"delivery_price",header:"Precio del domicilio",sortable:!0,headerStyle:"width:15rem;min-width:15rem "},{body:d(s=>[l(L(z),{prefix:"$",style:{width:"10%",height:"100%",border:"none !important","border-radius":"0"},modelValue:s.data.delivery_price,"onUpdate:modelValue":[i=>s.data.delivery_price=i,()=>$(s.data)]},null,8,["modelValue","onUpdate:modelValue"])]),_:1}),l(D,{field:"actions",header:"",class:"p-0",style:{},frozen:"",alignFrozen:"right"},{body:d(s=>[l(a,{class:"p-button-rounded p-button-danger p-0",style:{width:"2rem",display:"flex","align-items":"center",margin:"auto","justify-content":"center","aspect-ratio":"1 / 1"},onClick:i=>W(s.data)},{default:d(()=>[r("i",{class:x(L(G).TRASH)},null,2)]),_:2},1032,["onClick"])]),_:1})]),_:1},8,["class","value","selection","filters","frozenValue"])])],64)}}},ke=re(Ve,[["__scopeId","data-v-2cc0d66b"]]);export{ke as default};
