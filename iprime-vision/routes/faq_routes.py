from flask import Blueprint, jsonify, request, session

from services.auth_service import find_user_by_id
from services.faq_service import (
    create_question,
    get_questions,
    mark_all_questions_read,
    mark_question_read,
    serialize_question,
)


faq_bp = Blueprint("faq", __name__)


def signed_in_admin():
    user_id = session.get("user_id")
    user = find_user_by_id(user_id) if user_id else None
    return user if user and user["role"] == "admin" else None


@faq_bp.post("/questions")
def submit_question():
    payload = request.get_json(silent=True) or {}
    name = payload.get("name", "").strip()
    email = payload.get("email", "").strip()
    question = payload.get("question", "").strip()
    if not name or not email or not question:
        return jsonify({"ok": False, "message": "Name, email, and question are required."}), 400
    created = create_question(name, email, question)
    return jsonify({"ok": True, "question": serialize_question(created)}), 201


@faq_bp.get("/questions")
def list_questions():
    if not signed_in_admin():
        return jsonify({"ok": False, "message": "Admin access is required."}), 403
    return jsonify({"ok": True, "questions": [serialize_question(item) for item in get_questions()]})


@faq_bp.patch("/questions/<int:question_id>")
def read_question(question_id):
    if not signed_in_admin():
        return jsonify({"ok": False, "message": "Admin access is required."}), 403
    if not mark_question_read(question_id):
        return jsonify({"ok": False, "message": "Question not found."}), 404
    return jsonify({"ok": True})


@faq_bp.post("/questions/read-all")
def read_all_questions():
    if not signed_in_admin():
        return jsonify({"ok": False, "message": "Admin access is required."}), 403
    mark_all_questions_read()
    return jsonify({"ok": True})
