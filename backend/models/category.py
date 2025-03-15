from typing import Optional
from pydantic import BaseModel
import psycopg2
from dotenv import load_dotenv
import os
from schema.category import CategorySchemaPost

load_dotenv()

DB_USER = os.getenv('DB_USER')
DB_PASSWORD = os.getenv('DB_PASSWORD')
DB_HOST = os.getenv('DB_HOST')
DB_PORT = os.getenv('DB_PORT')
DB_NAME = os.getenv('DB_NAME')





class Category:
    def __init__(self):
        self.conn_str = f"dbname={DB_NAME} user={DB_USER} password={DB_PASSWORD} host={DB_HOST} port={DB_PORT}"
        self.conn = psycopg2.connect(self.conn_str)
        self.cursor = self.conn.cursor()

    def insert_category(self, category_data: CategorySchemaPost):
        insert_query = "INSERT INTO categories (category_name) VALUES (%s) RETURNING category_id;"
        self.cursor.execute(insert_query, (category_data.category_name,))
        category_id = self.cursor.fetchone()[0]
        self.conn.commit()
        return category_id

    def select_all_categories(self, site_id,resturant_id):
        # Definimos la consulta que verifica la existencia de instancias activas de productos por cada categoría
        select_query = f"""
        SELECT c.*
        FROM inventory.active_product_categories_with_products AS c
        
        """
        self.cursor.execute(select_query)
        columns = [desc[0] for desc in self.cursor.description]
        return [dict(zip(columns, row)) for row in self.cursor.fetchall()]
    
    
    def select_main_categories(self, site_id,resturant_id):
        # Definimos la consulta que verifica la existencia de instancias activas de productos por cada categoría
        select_query = f"""
        SELECT c.*
        FROM inventory.active_product_categories_with_site AS c
        WHERE c.site_id = {site_id}
        AND C.restaurant_id = {resturant_id}
        AND c.main = true
        AND EXISTS (
            SELECT 1
            FROM inventory.complete_product_instances AS p
            WHERE p.site_id = c.site_id
            AND p.category_id = c.category_id
            AND p.status = TRUE
            AND p.restaurant_id = {resturant_id}
            order by index
        )
        """
        self.cursor.execute(select_query)
        columns = [desc[0] for desc in self.cursor.description]
        return [dict(zip(columns, row)) for row in self.cursor.fetchall()]



    def select_all_categories_all(self, site_id, restaurant_id):
        # Consulta que devuelve cada categoría activa, añadiéndole
        # el campo products con la lista de productos en formato JSON.
        select_query = f"""
            SELECT
                c.*,
                COALESCE(
                    (
                        SELECT json_agg(row_to_json(pi))
                        FROM (
                            SELECT *
                            FROM inventory.complete_product_instances
                            WHERE site_id = c.site_id
                            AND restaurant_id = c.restaurant_id
                            AND category_id = c.category_id
                            ORDER BY price
                        ) AS pi
                    ),
                    '[]'
                ) AS products
            FROM inventory.active_product_categories AS c
            WHERE c.site_id = {site_id}
            AND c.restaurant_id = {restaurant_id}
            ORDER BY c.index;
        """

        self.cursor.execute(select_query)
        columns = [desc[0] for desc in self.cursor.description]
        rows = self.cursor.fetchall()

        # Convertimos cada fila en un diccionario {columna: valor}
        return [dict(zip(columns, row)) for row in rows]

        
    
    
    
    
    
    def select_all_categories_all_add_product(self, restaurant_id):
        # Construimos la consulta SQL que retorna cada categoría,
        # añadiéndole el campo products en formato JSON con todos los productos de esa categoría.
        select_query = f"""
            SELECT
                c.*,
                COALESCE(
                    (
                        SELECT json_agg(row_to_json(pi))
                        FROM (
                            SELECT *
                            FROM inventory.complete_product_instances
                            WHERE restaurant_id = c.resturant_id
                            AND category_id = c.id
                            ORDER BY price
                        ) AS pi
                    ),
                    '[]'
                ) AS products
            FROM inventory.product_categories c
            WHERE c.resturant_id = {restaurant_id}
            AND c.exist = true
            ORDER BY c.index;  -- o c.id, según desees
        """

        self.cursor.execute(select_query)
        columns = [desc[0] for desc in self.cursor.description]
        rows = self.cursor.fetchall()

        # Convertimos cada fila en un diccionario {column_name: value}
        return [dict(zip(columns, row)) for row in rows]



    def select_products_by_site_and_category_all(self, site_id: int, category_id: int, restaurant_id:int):
        select_query = f"""
        select * from inventory.complete_product_instances
        WHERE site_id = {site_id} AND category_id = {category_id} AND  restaurant_id = {restaurant_id} order by price;
        """
        self.cursor.execute(select_query)
        columns = [desc[0] for desc in self.cursor.description]
        products = self.cursor.fetchall()
        return [dict(zip(columns, row)) for row in products]




    def close_connection(self):
        self.conn.close()