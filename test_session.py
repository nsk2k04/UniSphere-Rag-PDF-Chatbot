from backend.core.session_manager import (
    create_session,
    set_session_ready,
    get_session_status
)

session_id = create_session()

print(
    "Session:",
    session_id
)

print(
    "Initial:",
    get_session_status(
        session_id
    )["status"]
)

set_session_ready(
    session_id
)

print(
    "Updated:",
    get_session_status(
        session_id
    )["status"]
)