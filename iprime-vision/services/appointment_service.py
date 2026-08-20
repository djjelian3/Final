import sqlite3
import psycopg

from .database import get_connection, inserted_id, placeholder, using_postgres


def serialize_appointment(appointment):
    return dict(appointment)


def create_appointment(user, details):
    try:
        with get_connection() as connection:
            cursor = connection.execute(
                f"""
                INSERT INTO appointments (patient_id, patient, date, time, service, notes)
                VALUES ({placeholder()}, {placeholder()}, {placeholder()}, {placeholder()}, {placeholder()}, {placeholder()})
                {"RETURNING id" if using_postgres() else ""}
                """,
                (user["id"], user["name"], details["date"], details["time"], details["service"], details.get("notes", "")),
            )
            return connection.execute(
                f"SELECT * FROM appointments WHERE id = {placeholder()}",
                (inserted_id(cursor) if using_postgres() else cursor.lastrowid,),
            ).fetchone()
    except (sqlite3.IntegrityError, psycopg.errors.UniqueViolation):
        return None


def get_user_appointments(user_id):
    with get_connection() as connection:
        return connection.execute(
            f"SELECT * FROM appointments WHERE patient_id = {placeholder()} ORDER BY date, time",
            (user_id,),
        ).fetchall()


def get_all_appointments():
    with get_connection() as connection:
        return connection.execute("SELECT * FROM appointments ORDER BY date, time").fetchall()


def update_appointment_status(appointment_id, status):
    with get_connection() as connection:
        connection.execute(
            f"UPDATE appointments SET status = {placeholder()} WHERE id = {placeholder()}",
            (status, appointment_id),
        )
        return connection.execute(
            f"SELECT * FROM appointments WHERE id = {placeholder()}",
            (appointment_id,),
        ).fetchone()


def delete_appointment(appointment_id):
    with get_connection() as connection:
        cursor = connection.execute(
            f"DELETE FROM appointments WHERE id = {placeholder()}",
            (appointment_id,),
        )
        return cursor.rowcount > 0
