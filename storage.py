import json
import os
from models import Task

class Storage:
    def __init__(self, filename="todos.json"):
        self.filename = filename

    def load_tasks(self):
        if not os.path.exists(self.filename):
            return []
        try:
            with open(self.filename, 'r') as f:
                data = json.load(f)
                return [Task.from_dict(item) for item in data]
        except json.JSONDecodeError:
            return []

    def save_tasks(self, tasks):
        with open(self.filename, 'w') as f:
            data = [task.to_dict() for task in tasks]
            json.dump(data, f, indent=4)
