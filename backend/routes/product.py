from fastapi import APIRouter, HTTPException,Body
from models.product import Product
from schema.product import ProductSchemaPost
from schema.product import Product as Product_schema
from typing import List
from pydantic import BaseModel


product_router = APIRouter()

@product_router.get("/products")
def get_products():
    product_instance = Product()
    products = product_instance.select_all_products()
    product_instance.close_connection()
    return products




@product_router.get("/sabores")
def get_products():
    product_instance = Product()
    products = product_instance.select_all_sabores()
    product_instance.close_connection()
    return products




@product_router.get("/sabores/product_id/{product_id}")
def get_products(product_id:int):
    product_instance = Product()
    products = product_instance.select_all_sabores_by_product_id(product_id)
    product_instance.close_connection()
    return products




@product_router.get("/restaurants")
def get_productss():
    product_instance = Product()
    products = product_instance.select_all_restaurants()
    product_instance.close_connection()
    return products


@product_router.get("/sizes")
def get_productss():
    product_instance = Product()
    products = product_instance.select_all_sizes()
    product_instance.close_connection()
    return products


@product_router.get("/history-my-orden/{order_id}")
def get_productss(order_id:str):
    product_instance = Product()
    products = product_instance.select_history(order_id)
    product_instance.close_connection()
    return products


@product_router.post("/products")
def create_product(product: Product_schema):
    product_instance = Product()
    product_id = product_instance.insert_product(product)
    created_product = product_instance.select_product_by_id(product_id)
    product_instance.close_connection()
    return {"product_id": product_id}



@product_router.put("/deactivate-product/{product_id}")
def deactivate_product(product_id:int):
    product_instance = Product()
    product_id = product_instance.deactivate_product(product_id)
    return {"product_id": product_id}



@product_router.get("/products-active/category-id/{category_id}/site/{site_id}/{restaurant_id}")
def get_products_by_category_name_and_site(category_id: str, site_id: int, restaurant_id):
    product_instance = Product()
    try:
        products = product_instance.select_products_by_site_and_category_active(site_id,category_id,restaurant_id)
        if not products:
            raise HTTPException(status_code=404, detail="No products found for the given category name and site")
        return products
    finally:
        product_instance.close_connection()



class aditionals(BaseModel):
    ids:list[int]


@product_router.put("/products/update/{product_instance_id}")
def update_product_and_instances(product_instance_id: int, product: ProductSchemaPost, additional_item_ids: List[int], flavor_ids: dict):
    product_instance = Product()
    try:
        existing_product = product_instance.select_product_by_id(product_instance_id)
        if existing_product is None:
            raise HTTPException(status_code=404, detail="Product not found")
        
        product_info = {
            "product_instance_id": product.product_id,
            "product_id": existing_product[0]['product_id'],
            "name": product.name,
            "price": product.price,
            "last_price": product.last_price,
            "description": product.description,
            "category_id": product.category_id,
            "status": True,
            "parent_id": product.parent_id,
            "img_identifier": product.img_identifier,
            "max_flavor": product.max_flavor,
            "is_combo": product.is_combo,
            "start_date":product.start_date,
            "end_date":product.end_date
        }
        
        # Llama al método de actualización que maneja el producto, sus instancias, adicionales y sabores
        update_result = product_instance.update_product_and_its_instances(product_info, additional_item_ids, flavor_ids)
        return {"message": update_result}

    except Exception as e:
        # Aquí se puede manejar diferentes tipos de excepciones si es necesario
        raise HTTPException(status_code=500, detail=str(e))

    finally:
        product_instance.close_connection()
        
        
@product_router.post("/products/create/")
def create_product_and_instances(product: ProductSchemaPost, additional_item_ids: list[int]):
    product_instance = Product()
    
    try:
        # Convertir el esquema de entrada en un diccionario
        product_info = {
            "name": product.name,
            "price": product.price,
            "description": product.description,
            "category_id": product.category_id,
            "restaurant_id": product.restaurant_id,
            "status": True,
            "has_recipe": product.has_recipe,
            "gramos": product.gramos,
            "img_identifier": product.img_identifier,
            "size_id":product.size_id
        }

        # Llama al método de creación que maneja tanto el producto como sus instancias y adicionales
        create_result = product_instance.create_product_and_its_instances(product_info, additional_item_ids)
        
        return {"message": create_result}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error creating product: {str(e)}")

    finally:
        product_instance.close_connection()


@product_router.get("/products-all/category-id/{category_id}/site/{site_id}/{restaurant_id}")
def get_products_by_category_name_and_site(category_id: str, site_id: int,restaurant_id:int):
    product_instance = Product()
    try:
        products = product_instance.select_products_by_site_and_category_all(site_id,category_id,restaurant_id)
        if not products:
            raise HTTPException(status_code=404, detail="No products found for the given category name and site")
        return products
    finally:
        product_instance.close_connection()


@product_router.get("/products/category/{category_id}")
def get_products_by_category(category_id: int):
    product_instance = Product()
    try:
        products = product_instance.select_products_by_category(category_id)
        if not products:
            raise HTTPException(status_code=404, detail="No products found for the given category")
        return products
    finally:
        product_instance.close_connection()


@product_router.get("/products/category/name/{category_name}")
def get_products_by_category_name(category_name: str):
    product_instance = Product()
    try:
        products = product_instance.select_products_by_category_name(category_name)
        if not products:
            raise HTTPException(status_code=404, detail="No products found for the given category name")
        return products
    finally:
        product_instance.close_connection()




@product_router.put("/set-main-product/{product_id}")
def update_product(product_id: int):
    product_instance = Product()
    result = product_instance.set_main_product(product_id)

    # product_instance.set_main_product(product_id)
    product_instance.close_connection()
    return result




@product_router.put("/products/{product_id}")
def update_product(product_id: int, product: ProductSchemaPost):
    product_instance = Product()
    existing_product = product_instance.select_product_by_id(product_id)
    if existing_product is None:
        raise HTTPException(status_code=404, detail="Product not found")
    
    product_instance.update_product(product_id, product)
    updated_product = product_instance.select_product_by_id(product_id)
    product_instance.close_connection()
    return {"message": "Product updated successfully", "product_id": product_id}




@product_router.get("/product/{product_id}")
def update_product(product_id: int):
    product_instance = Product()

    product = product_instance.select_product_by_id(product_id)
    product_instance.close_connection()
    return product








@product_router.get("/products/name/{product_name}/sites")
def get_sites_by_product_name(product_name: str):
    product_instance = Product()
    try:
        sites = product_instance.select_sites_by_product_name(product_name)
        if not sites:
            raise HTTPException(status_code=404, detail="No sites found for the given product name")
        return sites
    finally:
        product_instance.close_connection()

@product_router.get("/products/name/{name}")
def get_products_by_name(name: str):
    product_instance = Product()
    try:
        products = product_instance.select_products_by_name(name)
        if not products:
            raise HTTPException(status_code=404, detail="No products found with given name")
        return products
    finally:
        product_instance.close_connection()

@product_router.delete("/products/{product_id}")
def delete_product(product_id: int):
    product_instance = Product()
    existing_product = product_instance.select_product_by_id(product_id)
    if existing_product is None:
        raise HTTPException(status_code=404, detail="Product not found")
    
    product_instance.delete_product(product_id)
    product_instance.close_connection()
    return {"message": "Product deleted successfully", "deleted_product": existing_product}

# Otras rutas según sea necesario
