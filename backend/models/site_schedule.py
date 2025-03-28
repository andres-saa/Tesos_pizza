import psycopg2
from dotenv import load_dotenv
import os
# from schema.role import RoleGroupSchema , RoleSchema
from schema.site_schedule import site_schedule_schema
from datetime import datetime
import pytz
load_dotenv()

DB_USER = os.getenv('DB_USER')
DB_PASSWORD = os.getenv('DB_PASSWORD')
DB_HOST = os.getenv('DB_HOST')
DB_PORT = os.getenv('DB_PORT')
DB_NAME = os.getenv('DB_NAME')



class site_schedule:
    def __init__(self):
        self.conn = psycopg2.connect(f"dbname={DB_NAME} user={DB_USER} password={DB_PASSWORD} host={DB_HOST} port={DB_PORT}")
        self.cursor = self.conn.cursor()

    def create_schedule(self,schedule_data:site_schedule_schema ):
        site_id = schedule_data.site_id
        day_of_week = schedule_data.day_of_week
        opening_time = schedule_data.opening_time
        closing_time = schedule_data.closing_time

        # print(site_id,opening_time,closing_time)

        insert_query = f"""INSERT INTO site_schedule 
        (site_id, day_of_week, opening_time, closing_time) 
        values (
            {day_of_week}, 
            {site_id},
            '{opening_time}',
            '{closing_time}') 
            returning schedule_id"""
        
        self.cursor.execute(insert_query)
        schedule_id = self.cursor.fetchone()[0]
        self.conn.commit()
        return schedule_id

    def get_schedule_by_site_id(self, site_id: int):
        query = f"""
        SELECT schedule_id, site_id, day_of_week, opening_time, closing_time
        FROM site_schedule
        WHERE site_id = {site_id}
        ORDER BY day_of_week;
        """
        self.cursor.execute(query)
        schedule_data = self.cursor.fetchall()
        schedule_list = []
        for schedule_id, site_id, day_of_week, opening_time, closing_time in schedule_data:
            schedule_list.append({"schedule_id": schedule_id, "site_id": site_id, "day_of_week": day_of_week, "opening_time": opening_time, "closing_time": closing_time})
        return schedule_list

    

    def is_site_open(self, site_id: int, current_time: str = None):
        # Zona horaria de Colombia
        colombia_tz = pytz.timezone('America/Bogota')
        
        # Obtener la hora actual en la zona horaria de Colombia si no se pasa current_time
        if current_time is None:
            current_time = datetime.now(colombia_tz).strftime("%H:%M:%S")
        
        current_time_obj = datetime.strptime(current_time, "%H:%M:%S").time()

        # Día de la semana actual en [1..7] (lunes=1, martes=2, ..., domingo=7)
        current_day_of_week = (int(datetime.now(colombia_tz).strftime("%w")) + 1) % 7 or 7
        
        # 1) Verificamos horario para "el día de hoy"
        query_today = f"""
            SELECT opening_time, closing_time
            FROM site_schedule_open
            WHERE site_id = {site_id}
            AND day_of_week = {current_day_of_week}
            AND open = true
            LIMIT 1
        """
        self.cursor.execute(query_today)
        schedule_today = self.cursor.fetchone()
        
        if schedule_today:
            opening_time, closing_time = schedule_today
            # Convert to time objects if they come as strings
            if isinstance(opening_time, str):
                opening_time = datetime.strptime(opening_time, "%H:%M:%S").time()
            if isinstance(closing_time, str):
                closing_time = datetime.strptime(closing_time, "%H:%M:%S").time()

            if opening_time < closing_time:
                # Caso simple (no cruza medianoche)
                if opening_time <= current_time_obj < closing_time:
                    return True, None
                else:
                    # Devuelve la hora de apertura para "hoy"
                    return False, opening_time
            else:
                # Horario que cruza la medianoche, p.e. 17:00 -> 04:00
                # Se considera abierto si ahora >= opening_time (tarde-noche)
                # O si ahora < closing_time (madrugada)
                if current_time_obj >= opening_time or current_time_obj < closing_time:
                    return True, None
                else:
                    return False, opening_time
        
        # 2) Si no se encontró horario o no coincidió, verificamos la "noche anterior"
        #    Solo tiene sentido si la noche anterior cruza la medianoche
        # Calcular el "día anterior" (p.e. si hoy = 1 -> ayer = 7)
        yesterday_day_of_week = current_day_of_week - 1 if current_day_of_week > 1 else 7
        
        query_yesterday = f"""
            SELECT opening_time, closing_time
            FROM site_schedule_open
            WHERE site_id = {site_id}
            AND day_of_week = {yesterday_day_of_week}
            AND open = true
            LIMIT 1
        """
        self.cursor.execute(query_yesterday)
        schedule_yesterday = self.cursor.fetchone()
        
        if schedule_yesterday:
            opening_time, closing_time = schedule_yesterday
            # Convert to time objects if needed
            if isinstance(opening_time, str):
                opening_time = datetime.strptime(opening_time, "%H:%M:%S").time()
            if isinstance(closing_time, str):
                closing_time = datetime.strptime(closing_time, "%H:%M:%S").time()

            # Solo si cruza medianoche:
            if opening_time > closing_time:
                # Significa p.e. 17:00->04:00, pero para "ayer", y son las 01:00 de hoy
                # Estaríamos abiertos si ahora < closing_time (p.e. 01:00 < 04:00)
                if current_time_obj < closing_time:
                    return True, None
                else:
                    # Si estamos de madrugada pero ya pasó "closing_time"
                    return False, opening_time
        
        # 3) Si nada de lo anterior aplica, está cerrado
        return False, None

    
    def update_schedule(self, schedule_id, schedule_data: site_schedule_schema):
        site_id = schedule_data.site_id
        day_of_week = schedule_data.day_of_week
        opening_time = schedule_data.opening_time
        closing_time = schedule_data.closing_time

        update_query = f"""UPDATE site_schedule 
        SET site_id = {site_id}, 
            day_of_week = {day_of_week},
            opening_time = '{opening_time}',
            closing_time = '{closing_time}'
        WHERE schedule_id = {schedule_id}"""
        
        self.cursor.execute(update_query)
        self.conn.commit()

        if current_time is None:
            current_time = datetime.now().strftime("%H:%M:%S")

        current_time = datetime.strptime(current_time, "%H:%M:%S").time()  # Convertir la cadena a datetime.time
        
        # Mapear el nombre del día de la semana a un número
        current_day_of_week = datetime.now().strftime("%w")  # %w devuelve el día de la semana como número (0 para domingo, 1 para lunes, etc.)
        
        query = f"""
        SELECT opening_time, closing_time
        FROM site_schedule
        WHERE site_id = {site_id}
        AND day_of_week = '{current_day_of_week}';
        """
        
        self.cursor.execute(query)
        schedule_data = self.cursor.fetchone()

        if schedule_data:
            opening_time, closing_time = schedule_data
            if opening_time <= current_time < closing_time:
                return True, None  # El sitio está abierto
            else:
                return False, opening_time  # El sitio está cerrado, devolver la hora de apertura
        else:
            return False, None  # No se encontró ningún horario para el sitio y el día dados   

    def update_schedules_all(self, schedules_data):
        for schedule in schedules_data:
            site_id = schedule.site_id
            day_of_week = schedule.day_of_week
            opening_time = schedule.opening_time
            closing_time = schedule.closing_time

            update_query = f"""UPDATE site_schedule 
            SET opening_time = '{opening_time}',
                closing_time = '{closing_time}'
            WHERE site_id = {site_id}
            AND day_of_week = {day_of_week};"""

            self.cursor.execute(update_query)
        
        self.conn.commit()

    def close_connection(self):
        self.conn.close()