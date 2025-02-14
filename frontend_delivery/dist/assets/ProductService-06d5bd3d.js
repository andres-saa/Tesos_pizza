import{L as l,u as i,f as o,U as n,B as c}from"./index-2ea80005.js";const d=l("product",{persist:{key:"product",storage:localStorage,paths:[]},state:()=>({currentProductToEdit:{},currentProductToDelete:{},visibles:{dialogEditProduct:!1,dialogAddProduct:!1,dialogDeleteProduct:!1,dialogGestorCategoria:!1}}),getters:{},actions:{}});i();const g={async getProductsByCategorySite(s,t){try{const e=await o.get(`${n}/products-all/category-id/${s}/site/31/5`);return e.status===200?e.data:(console.error("An error occurred while fetching the ingredients:",e.status),null)}catch(e){return console.error("An error occurred while fetching the ingredients:",e),null}},async updateProductInstanceStatus(s,t){try{const e=await o.put(`${n}/product-instance/${s}/status`,{new_status:t});return e.status===200?(console.log("Product instance status updated successfully:",e.data),e.data):(console.error("Failed to update product instance status:",e.status),null)}catch(e){return console.error("Error updating product instance status:",e),null}},async deleteProduct(s){try{const t=await o.put(`${n}/deactivate-product/${s}`);return t.status===200?(console.log("Product instance status updated successfully:",t.data),t.data):(console.error("Failed to update product instance status:",t.status),null)}catch(t){return console.error("Error updating product instance status:",t),null}},async uploadPhoto(s){try{const t=await o.post(`${n}/upload-photo-product`,s,{headers:{"Content-Type":"multipart/form-data"}});return t.status===200?(console.log("Image uploaded successfully:",t.data),t.data):(console.error("Failed to upload image:",t.status),null)}catch(t){return console.error("Error uploading image:",t),null}},async updateProductInstance(s,t,e){const r=d(),u=c();u.setLoading(!0,"actualizando en todas las sedes"),r.visibles.dialogEditProduct=!1;try{const a=await o.put(`${n}/products/update/${s.product_id}`,{product:s,additional_item_ids:t,flavor_ids:e});return a.status===200?(u.setLoading(!1,"actualizando en todas las sedes"),console.log("Product instance status updated successfully:",a.data),a.data):(console.error("Failed to update product instance status:",a.status),u.setLoading(!1,"actualizando en todas las sedes"),null)}catch(a){return console.error("Error updating product instance status:",a),u.setLoading(!1,"actualizando en todas las sedes"),null}},async createProductInstance(s,t){d();const e=c();e.setLoading(!0,"creando producto en todas las sedes");try{const r=await o.post(`${n}/products/create/`,{product:s,additional_item_ids:t});return r.status===200?(e.setLoading(!1,"creando producto en todas las sedes"),console.log("Product created successfully:",r.data),r.data):(console.error("Failed to create product:",r.status),e.setLoading(!1,"creando producto en todas las sedes"),null)}catch(r){return e.setLoading(!1,"creando producto en todas las sedes"),console.error("Error creating product:",r),null}}};export{g as p,d as u};
