from .appointment_routes import appointment_bp
from .auth_routes import auth_bp
from .faq_routes import faq_bp
from .page_routes import page_bp


def register_routes(app):
    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(appointment_bp, url_prefix="/api/appointments")
    app.register_blueprint(faq_bp, url_prefix="/api/faq")
    app.register_blueprint(page_bp)
