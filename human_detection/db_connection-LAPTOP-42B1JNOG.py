import mysql.connector
# MySQL Database Connection Setup
import mysql.connector
from urllib.parse import urlparse
from dotenv import load_dotenv
import os

# Load .env file
load_dotenv()

# Get the DATABASE_URL from the .env
db_url = os.getenv("DATABASE_URL")

# Parse the URL
url = urlparse(db_url)

# Extract connection details
user = url.username
password = url.password
host = url.hostname
port = url.port or 3306
database = url.path.lstrip('/')



def get_db_connection():
    """
    Establishes a connection to the MySQL database.
    """
    # Connect to MySQL
    try:
        return mysql.connector.connect(
        host=host,
        user=user,
        password=password,
        database=database,
        port=port
        )
        print("✅ Connected to MySQL successfully.")
    except mysql.connector.Error as err:
        print("❌ Connection failed:", err)

def log_to_database(id, type, image_filename, humans_detected):
    """
    Logs the capture information into the MySQL database.
    """
    db_connection = get_db_connection()
    cursor = db_connection.cursor()

    query = """
        INSERT INTO alert (cameraId, type,noOfPeople,url)
        VALUES (%s, %s, %s, %s)
    """
    values = (id, type, humans_detected,image_filename)

    try:
        cursor.execute(query, values)
        db_connection.commit()
        print(f"Logged data for Cam id{id} with {humans_detected} humans detected.")
    except mysql.connector.Error as err:
        print(f"Error: {err}")
        db_connection.rollback()

    cursor.close()
    db_connection.close()