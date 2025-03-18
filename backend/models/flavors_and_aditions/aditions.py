from db.db import Db as DataBase
from pydantic import BaseModel
from typing import List, Optional


class aditional_type_schema(BaseModel):
    name:str



class BannerAppSchema(BaseModel):
    index: int
    img_identifier: str

class BannerReorderSchema(BaseModel):
    banners: List[BannerAppSchema]

class group_sabor_schema(BaseModel):
    flavor_id:int
    flavor_group_id:int
    

class aditional_schema(BaseModel):
    name:str
    type_id:int
    price:int


class ProductCategorySchema(BaseModel):
    name: str
    index: int
    restaurant_id: int
    main: bool
    

class Aditions:
    
    
    def __init__(self):
        self.db = DataBase()
    
    

    def associate_flavors_with_product(self, product_id: int, flavor_ids: List[int]):
        

        # Primero, eliminar todos los sabores asociados actuales
        clear_query = "DELETE FROM inventory.sabor_product WHERE product_id = %s"
        self.db.execute_query(query=clear_query, params=(product_id,))

        # Luego, asignar los nuevos sabores al producto
        insert_query = "INSERT INTO inventory.sabor_product (sabor_id, product_id) VALUES (%s, %s)"
        for flavor_id in flavor_ids:
            self.db.execute_query(query=insert_query, params=(flavor_id, product_id))

   
    

    def get_flavor_grouped(self):
        
        
        query = self.db.build_select_query('inventory.view_flavor_groups',fields=["*"])
        result = self.db.fetch_all(query=query)
        
        return result



    def create_flavor_group(self,data):
        
        
        query,params = self.db.build_insert_query(table_name='inventory.flavor_group',data=data,returning='id')
        result = self.db.execute_query(query=query,params=params,fetch=True)
        
        return result
    
    def update_flavor_group_available(self,status:bool,group_id:int):
        query_1 = "UPDATE inventory.flavor_group SET available = %s where id = %s returning id"
        query_2 = "UPDATE inventory.sabor set available = %s where id in (SELECT flavor_id from inventory.flavor_group_flavor where flavor_group_id = %s)"
        
        result1 = self.db.execute_query(query_1,[status,group_id],fetch=True)
        result2 = self.db.execute_query(query_2,[status,group_id])

        return result1
    
        
    def update_flavor_available(self, status: bool, flavor_id: int):
        # 1) Actualiza el sabor
        query_1 = """
            UPDATE inventory.sabor
            SET available = %s
            WHERE id = %s
            RETURNING id
        """
        result1 = self.db.execute_query(query_1, [status, flavor_id], fetch=True)

        # 2) Si desactivamos el sabor -> desactivamos el/los grupo(s) asociado(s)
        if not status:
            query_2 = """
                UPDATE inventory.flavor_group
                SET available = false
                WHERE id IN (
                    SELECT flavor_group_id
                    FROM inventory.flavor_group_flavor
                    WHERE flavor_id = %s
                )
            """
            self.db.execute_query(query_2, [flavor_id])
        else:
            # 3) Si activamos el sabor -> verificamos si el grupo puede reactivarse
            #    Esto se logra revisando si *todos* los sabores del grupo están activos
            query_3 = """
                UPDATE inventory.flavor_group fg
                SET available = true
                WHERE fg.id IN (
                    SELECT flavor_group_id
                    FROM inventory.flavor_group_flavor
                    WHERE flavor_id = %s
                )
                AND NOT EXISTS (
                    SELECT 1
                    FROM inventory.flavor_group_flavor fff
                    JOIN inventory.sabor s ON fff.flavor_id = s.id
                    WHERE fff.flavor_group_id = fg.id
                    AND s.available = false
                )
            """
            self.db.execute_query(query_3, [flavor_id])

        return result1

    
    
    
    def create_flavor(self,data,id):
        
        
        query,params = self.db.build_insert_query(table_name='inventory.sabor',data=data,returning='id')
        result = self.db.execute_query(query=query,params=params,fetch=True)
        
        flavor_id = result[0]['id']
        
        
        new_flavor_relation = group_sabor_schema(
            flavor_id=flavor_id,
            flavor_group_id = id,
        )
        
        query,params = self.db.build_insert_query(table_name='inventory.flavor_group_flavor',data=new_flavor_relation,returning='id')
        result_final = self.db.execute_query(query=query,params=params,fetch=True)
        
        
        # print(result)
        
        
        return result_final






    def edit_flavor_group(self,data):
        
        
        query,params = self.db.build_update_query(table_name='inventory.flavor_group',data=data,returning='id',condition=f'id = {data.id}')
        result = self.db.execute_query(query=query,params=params,fetch=True)
        
        return result
    
    
    def edit_flavor(self,data,id):
        
        
        query,params = self.db.build_update_query(table_name='inventory.sabor',data=data,returning='id',condition=f'id = {id}')
        result = self.db.execute_query(query=query,params=params,fetch=True)
        
        return result
    
    
    
        

    def get_additional_categories(self):
        
        query = self.db.build_select_query('inventory.flavor_group',fields=["*"],condition='exist=true')
        result = self.db.fetch_all(query=query)
        
        return result
    
    

    def get_additional_categories_categories(self):
        
        query = self.db.build_select_query('orders.aditional_order_types',fields=["*"],condition='exist=true')
        result = self.db.fetch_all(query=query)
        
        return result
    
    def get_flavors_by_product(self, product_id: int):
        # Consulta para obtener los grupos de sabores y los sabores asociados
        query_flavors = """
        SELECT fg.name AS group_name,
            fg.id AS group_id,
            s.id AS flavor_id,
            s.name AS flavor_name,
            s.price AS flavor_price,
            s.premium AS is_premium,
            CASE WHEN sp.product_id IS NOT NULL THEN TRUE ELSE FALSE END AS has_flavor
        FROM inventory.flavor_group fg
        JOIN inventory.flavor_group_flavor fgf ON fg.id = fgf.flavor_group_id
        JOIN inventory.sabor s ON s.id = fgf.flavor_id
        LEFT JOIN inventory.sabor_product sp ON s.id = sp.sabor_id AND sp.product_id = %s
        WHERE fg.exist = TRUE AND s.exist = TRUE AND s.available = true
        ORDER BY s.premium DESC;
        """
        params = (product_id,)
        raw_flavors = self.db.fetch_all(query=query_flavors, params=params)

        # Procesamiento para agrupar los sabores por su grupo
        grouped_flavors = {}
        for row in raw_flavors:
            group_id = row['group_id']
            group_name = row['group_name']
            flavor = {
                'flavor_id': row['flavor_id'],
                'flavor_name': row['flavor_name'],
                'flavor_price': row['flavor_price'],
                'is_premium': row['is_premium'],
                'has_flavor': row['has_flavor']
            }
            if group_id in grouped_flavors:
                grouped_flavors[group_id]['flavors'].append(flavor)
            else:
                grouped_flavors[group_id] = {
                    'group_id': group_id,
                    'group_name': group_name,
                    'flavors': [flavor]
                }
        flavor_groups = list(grouped_flavors.values())

        # Consulta para obtener los selectores del producto
        query_selectors = """
        SELECT id, product_id, flavor_group_id, shoping_name, invoice_name, combine,price,reference_id
        FROM inventory.product_flavor_selector 
        WHERE product_id = %s and exist = true;
        """
        raw_selectors = self.db.fetch_all(query=query_selectors, params=params)
        selectors = []
        for row in raw_selectors:
            selectors.append({
                'id': row['id'],
                'product_id': row['product_id'],
                'flavor_group_id': row['flavor_group_id'],
                'shoping_name': row['shoping_name'],
                'invoice_name': row['invoice_name'],
                'combine': row['combine'],
                'reference_id': row['reference_id'],
                'price': row['price']
            })

        # Se retorna un objeto que contiene tanto los grupos de sabores como los selectores
        result = {
            'flavor_groups': flavor_groups,
            'selectors': selectors
        }
        return result



    
    
    def create_aditional_group(self, name:str):
        
        data = aditional_type_schema(
            name=name
        )
        query , params = self.db.build_insert_query('orders.aditional_order_types',data=data,returning='id')
        result = self.db.execute_query(query=query,params=params,fetch=True)
        
        return result
    
    
    
    def create_aditional_to_group(self,data:aditional_schema):
        
        data = aditional_schema(
            name= data.name,
            type_id= data.type_id,
            price=data.price
        )
        
        query , params = self.db.build_insert_query('orders.aditional_items',data=data,returning='id')
        result = self.db.execute_query(query=query,params=params,fetch=True)
        
        return result
    
    
    
    
    
    def edit_aditional_group(self, name:str, type_id:int):
        
        data = aditional_type_schema(
            name=name
        )
        query , params = self.db.build_update_query('orders.aditional_order_types',data=data,returning='id',condition=f'id = {type_id}')
        result = self.db.execute_query(query=query,params=params,fetch=True)
        
        return result
    
    
    def edit_aditional(self, data, id:int):
        
        query , params = self.db.build_update_query('orders.aditional_items',data=data,returning='id',condition=f'id = {id}')
        result = self.db.execute_query(query=query,params=params,fetch=True)
        
        return result
    
    def delete_aditional(self, id:int):
        
        query  = self.db.build_soft_delete_query('orders.aditional_items',condition=f'id = {id}',returning='id')
        result = self.db.execute_query(query=query,fetch=True)
        
        return result
    
    
    def delete_aditional_group(self,type_id:int):
        
        query  = self.db.build_soft_delete_query('orders.aditional_order_types',condition=f'id = {type_id}',returning='id')
        result = self.db.execute_query(query=query,fetch=True)
        
        return result
    

    def delete_flavor_group(self,id:int):
        
        query  = self.db.build_soft_delete_query('inventory.flavor_group',condition=f'id = {id}',returning='id')
        result = self.db.execute_query(query=query,fetch=True)
        
        return result
    

    def delete_flavor(self,id:int):
        
        query  = self.db.build_soft_delete_query('inventory.sabor',condition=f'id = {id}',returning='id')
        result = self.db.execute_query(query=query,fetch=True)
        
        return result


    def create_product_category(self, data: ProductCategorySchema):
        query, params = self.db.build_insert_query(
            table_name='inventory.product_categories',
            data=data,  # Pasa directamente el objeto Pydantic
            returning='id'
        )
        result = self.db.execute_query(query=query, params=params, fetch=True)
        return result

    def get_product_categories(self):
        query = self.db.build_select_query(
            'inventory.product_categories',
            fields=["*"]
        )
        result = self.db.fetch_all(query=query)
        return result

    def update_product_category(self, data: ProductCategorySchema, category_id: int):
        query, params = self.db.build_update_query(
            table_name='inventory.product_categories',
            data=data,  # Pasa directamente el objeto Pydantic
            condition=f'id = {category_id}',
            returning='id'
        )
        result = self.db.execute_query(query=query, params=params, fetch=True)
        return result

    def delete_product_category(self, category_id: int):
        query = self.db.build_soft_delete_query(
            'inventory.product_categories',
            condition=f'id = {category_id}',
            returning='id'
        )
        result = self.db.execute_query(query=query, fetch=True)
        return result
    





    def create_banner(self, data: BannerAppSchema):
        query, params = self.db.build_insert_query(
            table_name='app.banner_app',
            data=data,
            returning='id'
        )
        result = self.db.execute_query(query=query, params=params, fetch=True)
        return result

    def get_banners(self):
        query = self.db.build_select_query(
            'app.banner_app',
            fields=["*"],
            order_by='id',
              condition='exist = true'  # Ordenar por id
        )
        result = self.db.execute_query(query=query,fetch=True)
        return result

    def get_banner_by_id(self, banner_id: int):
        query = self.db.build_select_query(
            'app.banner_app',
            fields=["*"],
            condition=f'id = {banner_id}'
        )
        result = self.db.fetch_one(query=query)
        return result

    def update_banner(self, banner_id: int, data: BannerAppSchema):
        query, params = self.db.build_update_query(
            table_name='app.banner_app',
            data=data,
            condition=f'id = {banner_id}',
            returning='id'
        )
        result = self.db.execute_query(query=query, params=params, fetch=True)
        return result

    def delete_banner(self, banner_id: int):
        query = self.db.build_soft_delete_query(
            'app.banner_app',
            condition=f'id = {banner_id}',
            returning='id'
        )
        result = self.db.execute_query(query=query, fetch=True)
        return result

    # Método para reordenar banners
    def reorder_banners(self, banners: List[BannerAppSchema]):
        # Construir la consulta para actualizar múltiples filas en una sola operación
        update_queries = []
        for banner in banners:
            update_queries.append(
                f"UPDATE app.banner_app SET index = {banner.index} WHERE id = {banner.id}"
            )
        
        # Unir todas las consultas en un solo comando usando un punto y coma
        final_query = ";\n".join(update_queries)
        
        # Ejecutar la consulta final
        self.db.execute_query(query=final_query, fetch=False)
        return {"status": "success", "message": "Banners reordered successfully"}




