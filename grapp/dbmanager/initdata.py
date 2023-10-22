import csv
import psycopg2
import os

from dotenv import load_dotenv
from psycopg2 import sql, errorcodes

env_file_path = os.path.join(os.path.dirname(__file__), '..', '.env')
load_dotenv(dotenv_path=env_file_path)

# PostgreSQL database connection parameters
db_params = {
    'dbname': os.getenv("PGDBNAME"),
    'user': os.getenv("PGDBUSERNAME"),
    'password': os.getenv("PGDBPASSWORD"),
    'host': os.getenv("PGDBHOST"),
    'port': os.getenv("PGDBPORT"),
}

# Open the CSV file for reading
csv_filename = '../../docs/govtech docs/csv-team-mapping-long.csv'

with open(csv_filename, 'r') as csv_file:
    # Connect to the PostgreSQL database
    conn = psycopg2.connect(**db_params)
    cursor = conn.cursor()

    # Read the CSV file and insert data into the database
    csv_reader = csv.reader(csv_file)

    for row in csv_reader:
        # Assuming the data you want to insert is in the B column (index 1)
        data_to_insert = row[1]
        data_to_insert_user = row[0]

        # Insert data into the database table (change 'your_table' to your table name)
        insert_query = sql.SQL("INSERT INTO {} (team_name) VALUES (%s)").format(sql.Identifier('teams'))
        insert_query_user = sql.SQL("INSERT INTO {} (username, password) VALUES (%s, %s)").format(sql.Identifier('users'))


        try:
            cursor.execute(insert_query, (data_to_insert,))
        except psycopg2.IntegrityError as e:
            if e.pgcode == errorcodes.UNIQUE_VIOLATION:
                # Handle the unique violation error here (you can log it or simply ignore it)
                print(f"Unique violation error for data: {data_to_insert}. Ignoring.")
            else:
                # Handle other integrity errors as needed
                print(f"An integrity error occurred: {e}")
        except Exception as e:
            # Handle other exceptions as needed
            print(f"An error occurred: {e}")

            # Roll back the current transaction
            conn.rollback()
        try:
            cursor.execute(insert_query_user, (data_to_insert_user, "$2a$10$hJdHlR/ywaR0q./xj5Kofu.7Fwpt2cVi6CTBDj2DxLItmvR3gTI/G"))
        except psycopg2.IntegrityError as e:
            if e.pgcode == errorcodes.UNIQUE_VIOLATION:
                print(f"Unique violation error for data: {data_to_insert_user}. Ignoring.")
            else:
                print(f"An integrity error occurred: {e}")
        except Exception as e:
            print(f"An error occurred: {e}")
            conn.rollback()
    
    # Commit changes and close the database connection
    conn.commit()
    cursor.close()
    conn.close()

print("Data inserted into PostgreSQL successfully.")
