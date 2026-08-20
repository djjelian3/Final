import os

from dotenv import load_dotenv
from flask import Flask

load_dotenv()

from routes import register_routes
from services.database import initialize_database

app = Flask(__name__, static_folder=".", static_url_path="")
app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY", "iprime-vision-development-key")

initialize_database()
register_routes(app)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", "5000")), debug=True)
