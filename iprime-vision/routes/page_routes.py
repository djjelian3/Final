from flask import Blueprint, current_app


page_bp = Blueprint("pages", __name__)


@page_bp.get("/")
def homepage():
    return current_app.send_static_file("index.html")
