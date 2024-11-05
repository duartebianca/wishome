import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import os
from dotenv import load_dotenv

class EmailService:
    @staticmethod
    def send_email(to: str, subject: str) -> None:
        print(to)
        # Obtém as credenciais do e-mail do arquivo .env
        load_dotenv()
        USER_EMAIL = os.getenv("USER_EMAIL")
        USER_PASSWORD = os.getenv("USER_PASSWORD")

        # Garante que USER_EMAIL e USER_PASSWORD são strings
        if isinstance(USER_EMAIL, bytes):
            USER_EMAIL = USER_EMAIL.decode("utf-8")
        if isinstance(USER_PASSWORD, bytes):
            USER_PASSWORD = USER_PASSWORD.decode("utf-8")

        SMTP_SERVER = "smtp.gmail.com"
        SMTP_PORT = 587

        # Carrega o conteúdo HTML do e-mail
        current_dir = os.path.dirname(os.path.abspath(__file__))
        email_template_path = os.path.join(current_dir, "email.html")
        with open(email_template_path, "r", encoding="utf-8") as file:
            html_content = file.read()

        # Configura a mensagem de e-mail
        msg = MIMEMultipart()
        msg["From"] = USER_EMAIL
        msg["To"] = to
        msg["Subject"] = subject

        # Adiciona o conteúdo HTML ao e-mail
        msg.attach(MIMEText(html_content, "html"))

        # Envia o e-mail
        try:
            with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
                server.starttls()  # Inicializa a comunicação segura
                server.login(USER_EMAIL, USER_PASSWORD)
                server.send_message(msg)
            print("E-mail enviado com sucesso")
        except Exception as e:
            print(f"Erro ao enviar o e-mail: {e}")
