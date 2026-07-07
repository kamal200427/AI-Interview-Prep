import smtplib
from email.mime.text import MIMEText
from dotenv import load_dotenv
import os

load_dotenv()

EMAIL_USER = os.getenv("EMAIL_USER")
EMAIL_PASSWORD = os.getenv("EMAIL_PASSWORD")


def send_email_otp(receiver_email, otp):

    subject = "SpeechX Login OTP"

    body = f"""
Your SpeechX OTP is:

{otp}

This OTP will expire in 5 minutes.

Do not share it with anyone.

Stay safe and stay healthy
"""

    msg = MIMEText(body)

    msg["Subject"] = subject
    msg["From"] = EMAIL_USER
    msg["To"] = receiver_email

    server = smtplib.SMTP(
        "smtp.gmail.com",
        587
    )

    server.starttls()

    server.login(
        EMAIL_USER,
        EMAIL_PASSWORD
    )

    server.sendmail(
        EMAIL_USER,
        receiver_email,
        msg.as_string()
    )

    server.quit()