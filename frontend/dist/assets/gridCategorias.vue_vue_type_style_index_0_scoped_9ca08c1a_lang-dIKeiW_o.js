import{j as a,A as n}from"./index-Bttz-1xV.js";const l={router:a,async get(t,s,o={}){try{const e={headers:o.headers||{}},r=await n.get(t,e);return r.status===200?r.data:(console.error("An error occurred while fetching data:",r.status),null)}catch(e){return console.error("An error occurred while fetching data:",e),null}},async post(t,s,o,e=null){try{const r=await n.post(t,s);return r.status===200||r.status===201?(e&&this.router.push(e),r.data):(console.error("An error occurred while posting data:",r.status),null)}catch(r){return console.error("An error occurred while posting data:",r),null}},async put(t,s,o,e=null){try{const r=await n.put(t,s);return r.status===200||r.status===204?(e&&this.router.push(e),r.data):(console.error("An error occurred while updating data:",r.status),null)}catch(r){return console.error("An error occurred while updating data:",r),null}},async delete(t,s,o=null){try{const e=await n.delete(t);return e.status===200||e.status===204?(o&&this.router.push(o),e.data):(console.error("An error occurred while deleting data:",e.status),null)}catch(e){return console.error("An error occurred while deleting data:",e),null}}};export{l as f};
