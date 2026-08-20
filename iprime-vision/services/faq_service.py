from .database import get_connection, inserted_id, placeholder, using_postgres


def serialize_question(question):
    if not question:
        return None
    created_at = question["created_at"]
    return {
        "id": question["id"],
        "name": question["name"],
        "email": question["email"],
        "question": question["question"],
        "created_at": created_at.isoformat() if hasattr(created_at, "isoformat") else created_at,
        "read": bool(question["read"]),
    }


def create_question(name, email, question):
    with get_connection() as connection:
        cursor = connection.execute(
            f"""
            INSERT INTO faq_questions (name, email, question)
            VALUES ({placeholder()}, {placeholder()}, {placeholder()})
            {"RETURNING id" if using_postgres() else ""}
            """,
            (name, email, question),
        )
        question_id = inserted_id(cursor) if using_postgres() else cursor.lastrowid
        return connection.execute(
            f"SELECT * FROM faq_questions WHERE id = {placeholder()}", (question_id,)
        ).fetchone()


def get_questions():
    with get_connection() as connection:
        return connection.execute("SELECT * FROM faq_questions ORDER BY created_at DESC, id DESC").fetchall()


def mark_question_read(question_id):
    with get_connection() as connection:
        cursor = connection.execute(
            f"UPDATE faq_questions SET read = TRUE WHERE id = {placeholder()}", (question_id,)
        )
        return cursor.rowcount > 0


def mark_all_questions_read():
    with get_connection() as connection:
        connection.execute("UPDATE faq_questions SET read = TRUE WHERE read = FALSE")
