from datetime import datetime
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.image import MIMEImage

EMAIL_ADDRESS = "dumy1084@gmail.com"
EMAIL_PASSWORD = "ibfhylrgnmjmhxiz"
ADMIN_EMAIL_ADDRESS = "sriparna.biswas@gmail.com"


# Function to send an email alert with image attachment
def send_email_alert(camera_name, human_count, image_path, subject, body):

    msg = MIMEMultipart()
    msg['From'] = EMAIL_ADDRESS
    msg['To'] = ADMIN_EMAIL_ADDRESS
    msg['Subject'] = subject
    msg.attach(MIMEText(body, 'plain'))

    # Attach the image
    with open(image_path, 'rb') as img_file:
        img = MIMEImage(img_file.read())
        img.add_header('Content-Disposition', f'attachment; filename="{image_path}"')
        msg.attach(img)

    try:
        with smtplib.SMTP('smtp.gmail.com', 587) as server:
            server.starttls()
            server.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
            server.sendmail(EMAIL_ADDRESS, ADMIN_EMAIL_ADDRESS, msg.as_string())
            print(f"Alert email with image sent for {camera_name}.")
    except Exception as e:
        print(f"Failed to send email: {e}")