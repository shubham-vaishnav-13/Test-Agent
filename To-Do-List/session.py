import uuid
import time
from typing import Dict, Any, Optional

class SessionManager:
    def __init__(self, session_timeout: int = 3600):
        self._sessions: Dict[str, Dict[str, Any]] = {}
        self.session_timeout = session_timeout

    def create_session(self, user_id: str) -> str:
        """Create a new session for a user."""
        session_id = str(uuid.uuid4())
        self._sessions[session_id] = {
            "user_id": user_id,
            "created_at": time.time(),
            "last_accessed": time.time()
        }
        return session_id

    def get_session(self, session_id: str) -> Optional[Dict[str, Any]]:
        """Retrieve a session if it exists and is valid."""
        session = self._sessions.get(session_id)
        if not session:
            return None
        
        current_time = time.time()
        if current_time - session["last_accessed"] > self.session_timeout:
            self.delete_session(session_id)
            return None
            
        session["last_accessed"] = current_time
        return session

    def delete_session(self, session_id: str) -> None:
        """Delete a session."""
        if session_id in self._sessions:
            del self._sessions[session_id]

session_manager = SessionManager()
