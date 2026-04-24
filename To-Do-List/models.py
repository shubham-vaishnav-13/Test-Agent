import datetime

class Task:
    def __init__(self, task_id, title, completed=False, created_at=None):
        self.id = task_id
        self.title = title
        self.completed = completed
        self.created_at = created_at or datetime.datetime.now().isoformat()

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "completed": self.completed,
            "created_at": self.created_at
        }

    @classmethod
    def from_dict(cls, data):
        return cls(
            task_id=data["id"],
            title=data["title"],
            completed=data["completed"],
            created_at=data["created_at"]
        )
