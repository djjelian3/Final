from flask import Blueprint, jsonify, request, session

from services.appointment_service import (
    create_appointment,
    delete_appointment,
    get_all_appointments,
    get_user_appointments,
    serialize_appointment,
    update_appointment_status,
)
from services.auth_service import find_patient_by_name, find_user_by_id


appointment_bp = Blueprint("appointments", __name__)


def signed_in_user():
    user_id = session.get("user_id")
    return find_user_by_id(user_id) if user_id else None


@appointment_bp.get("")
def list_appointments():
    user = signed_in_user()
    if not user:
        return jsonify({"ok": False, "message": "Sign in to view appointments."}), 401
    appointments = get_all_appointments() if user["role"] == "admin" else get_user_appointments(user["id"])
    return jsonify({"ok": True, "appointments": [serialize_appointment(item) for item in appointments]})


@appointment_bp.patch("/<int:appointment_id>")
def change_appointment_status(appointment_id):
    user = signed_in_user()
    if not user or user["role"] != "admin":
        return jsonify({"ok": False, "message": "Admin access is required."}), 403
    status = (request.get_json(silent=True) or {}).get("status")
    if status not in ("Pending", "Confirmed", "Cancelled"):
        return jsonify({"ok": False, "message": "Invalid appointment status."}), 400
    appointment = update_appointment_status(appointment_id, status)
    if not appointment:
        return jsonify({"ok": False, "message": "Appointment not found."}), 404
    return jsonify({"ok": True, "appointment": serialize_appointment(appointment)})


@appointment_bp.delete("/<int:appointment_id>")
def remove_appointment(appointment_id):
    user = signed_in_user()
    if not user or user["role"] != "admin":
        return jsonify({"ok": False, "message": "Admin access is required."}), 403
    if not delete_appointment(appointment_id):
        return jsonify({"ok": False, "message": "Appointment not found."}), 404
    return jsonify({"ok": True})


@appointment_bp.post("")
def book_appointment():
    user = signed_in_user()
    if not user:
        return jsonify({"ok": False, "message": "You must sign in before booking an appointment."}), 401
    payload = request.get_json(silent=True) or {}
    if not all(payload.get(field) for field in ("service", "date", "time")):
        return jsonify({"ok": False, "message": "Service, date, and time are required."}), 400
    appointment = create_appointment(user, payload)
    if appointment is None:
        return jsonify({"ok": False, "message": "That date and time is already booked. Please choose another slot."}), 409
    return jsonify({"ok": True, "appointment": serialize_appointment(appointment)}), 201


@appointment_bp.post("/admin")
def admin_book_appointment():
    user = signed_in_user()
    if not user or user["role"] != "admin":
        return jsonify({"ok": False, "message": "Admin access is required."}), 403
    payload = request.get_json(silent=True) or {}
    patient_name = payload.get("patient", "").strip()
    if not patient_name or not all(payload.get(field) for field in ("service", "date", "time")):
        return jsonify({"ok": False, "message": "Patient, service, date, and time are required."}), 400
    patient = find_patient_by_name(patient_name)
    if not patient:
        return jsonify({"ok": False, "message": "No patient account matches that name."}), 404
    appointment = create_appointment(patient, payload)
    if appointment is None:
        return jsonify({"ok": False, "message": "That date and time is already booked."}), 409
    return jsonify({"ok": True, "appointment": serialize_appointment(appointment)}), 201
