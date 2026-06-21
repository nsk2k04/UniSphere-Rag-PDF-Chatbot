import uuid

sessions = {}

def create_session():

    session_id = str(
        uuid.uuid4()
    )[:8]

    sessions[session_id] = {
        "status": "processing"
    }

    return session_id


def set_session_ready(
    session_id
):

    sessions[session_id]["status"] = "ready"


def get_session_status(
    session_id
):

    return sessions.get(
        session_id,
        {
            "status": "not_found"
        }
    )