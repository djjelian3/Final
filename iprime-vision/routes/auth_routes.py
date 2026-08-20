from flask import Blueprint, jsonify, request, session

from services.auth_service import authenticate, create_patient, find_user_by_id, serialize_user, update_user_profile


auth_bp = Blueprint("auth", __name__)


@auth_bp.post("/login")
def login():
    payload = request.get_json(silent=True) or {}
    user = authenticate(payload.get("email", "").strip(), payload.get("password", ""))
    if not user:
        return jsonify({"ok": False, "message": "Incorrect email or password. Please try again."}), 401
    session["user_id"] = user["id"]
    return jsonify({"ok": True, "user": serialize_user(user)})


@auth_bp.post("/signup")
def signup():
    payload = request.get_json(silent=True) or {}
    required = [payload.get(field, "").strip() for field in ("name", "email", "phone")]
    password = payload.get("password", "")
    if not all(required) or not password:
        return jsonify({"ok": False, "message": "Please fill in all required fields."}), 400
    user = create_patient(required[0], required[1], password, required[2])
    if not user:
        return jsonify({"ok": False, "message": "An account with this email already exists."}), 409
    session["user_id"] = user["id"]
    return jsonify({"ok": True, "user": serialize_user(user)})


@auth_bp.post("/logout")
def logout():
    session.clear()
    return jsonify({"ok": True})


@auth_bp.get("/me")
def me():
    user = find_user_by_id(session.get("user_id")) if session.get("user_id") else None
    return jsonify({"user": serialize_user(user)})


@auth_bp.patch("/profile")
def update_profile():
    user = find_user_by_id(session.get("user_id")) if session.get("user_id") else None
    if not user:
        return jsonify({"ok": False, "message": "Sign in to update your profile."}), 401
    payload = request.get_json(silent=True) or {}
    name = payload.get("name", "").strip()
    email = payload.get("email", "").strip()
    phone = payload.get("phone", "").strip()
    if not name or not email:
        return jsonify({"ok": False, "message": "Name and email are required."}), 400
    updated = update_user_profile(user["id"], name, email, phone)
    if not updated:
        return jsonify({"ok": False, "message": "That email address is already in use."}), 409
    return jsonify({"ok": True, "user": serialize_user(updated)})
