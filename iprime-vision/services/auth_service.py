import hmac

from .database import get_connection, inserted_id, placeholder, using_postgres
from werkzeug.security import check_password_hash, generate_password_hash


def serialize_user(user):
    if not user:
        return None
    return {
        "id": user["id"],
        "role": user["role"],
        "name": user["name"],
        "email": user["email"],
        "phone": user["phone"],
        "dob": user["dob"],
        "address": user["address"],
    }


def find_user_by_id(user_id):
    with get_connection() as connection:
        return connection.execute(f"SELECT * FROM users WHERE id = {placeholder()}", (user_id,)).fetchone()


def find_patient_by_name(name):
    with get_connection() as connection:
        return connection.execute(
            f"SELECT * FROM users WHERE role = 'patient' AND LOWER(name) = LOWER({placeholder()})",
            (name,),
        ).fetchone()


def authenticate(email, password):
    with get_connection() as connection:
        user = connection.execute(
            f"SELECT * FROM users WHERE LOWER(email) = LOWER({placeholder()})",
            (email,),
        ).fetchone()
        if not user:
            return None
        stored_password = user["password"]
        is_hash = stored_password.startswith(("scrypt:", "pbkdf2:"))
        password_matches = (
            check_password_hash(stored_password, password)
            if is_hash
            else hmac.compare_digest(stored_password, password)
        )
        if not password_matches:
            return None
        if not is_hash:
            connection.execute(
                f"UPDATE users SET password = {placeholder()} WHERE id = {placeholder()}",
                (generate_password_hash(password), user["id"]),
            )
    return user


def create_patient(name, email, password, phone):
    with get_connection() as connection:
        try:
            cursor = connection.execute(
                f"""
                INSERT INTO users (role, name, email, password, phone)
                VALUES ('patient', {placeholder()}, {placeholder()}, {placeholder()}, {placeholder()})
                {"RETURNING id" if using_postgres() else ""}
                """,
                (name, email, generate_password_hash(password), phone),
            )
        except Exception as error:
            if "UNIQUE constraint failed" in str(error) or "duplicate key value" in str(error):
                return None
            raise
        user_id = inserted_id(cursor) if using_postgres() else cursor.lastrowid
        return connection.execute(
            f"SELECT * FROM users WHERE id = {placeholder()}", (user_id,)
        ).fetchone()


def update_user_profile(user_id, name, email, phone):
    with get_connection() as connection:
        try:
            connection.execute(
                f"UPDATE users SET name = {placeholder()}, email = {placeholder()}, phone = {placeholder()} WHERE id = {placeholder()}",
                (name, email, phone, user_id),
            )
        except Exception as error:
            if "UNIQUE constraint failed" in str(error) or "duplicate key value" in str(error):
                return None
            raise
        return connection.execute(
            f"SELECT * FROM users WHERE id = {placeholder()}", (user_id,)
        ).fetchone()
