from datetime import datetime
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.image import MIMEImage
import os

from db_connection import get_db_connection

def get_email_list_from_db():
    conn = get_db_connection()  # get connection from your db_connection.py
    cursor = conn.cursor()
    cursor.execute("SELECT email FROM alertemail")  # replace with actual table name
    emails = [row[0] for row in cursor.fetchall()]
    conn.close()
    return emails


EMAIL_ADDRESS = "dumy1084@gmail.com"
EMAIL_PASSWORD = "dleryzgiyabysdof"
# ADMIN_EMAIL_ADDRESS = "sriparna.biswas@gmail.com"


# Function to send an email alert with image attachment
def send_email_alert(camera_name, human_count, image_path, subject, body):
    recipient_list = get_email_list_from_db()

    msg = MIMEMultipart()
    msg['From'] = EMAIL_ADDRESS
    msg['To'] = ", ".join(recipient_list)
    msg['Subject'] = subject
    msg.attach(MIMEText(body, 'plain'))

    # Attach the image
    with open(image_path, 'rb') as img_file:
        img = MIMEImage(img_file.read())
        img.add_header('Content-Disposition', f'attachment; filename="{os.path.basename(image_path)}"')
        msg.attach(img)

    try:
        with smtplib.SMTP('smtp.gmail.com', 587) as server:
            server.starttls()
            server.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
            server.sendmail(EMAIL_ADDRESS, recipient_list, msg.as_string())
            # print(f"Alert email with image sent for {camera_name}.")
    except Exception as e:
        print(f"Failed to send email: {e}")