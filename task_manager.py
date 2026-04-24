from storage import Storage
from models import Task

class TaskManager:
    def __init__(self):
        self.storage = Storage()
        self.tasks = self.storage.load_tasks()
        self._update_next_id()

    def _update_next_id(self):
        if not self.tasks:
            self.next_id = 1
        else:
            self.next_id = max(task.id for task in self.tasks) + 1

    def add_task(self, title):
        task = Task(self.next_id, title)
        self.tasks.append(task)
        self.next_id += 1
        self.storage.save_tasks(self.tasks)
        return task

    def complete_task(self, task_id):
        for task in self.tasks:
            if task.id == task_id:
                task.completed = True
                self.storage.save_tasks(self.tasks)
                return True
        return False

    def delete_task(self, task_id):
        initial_count = len(self.tasks)
        self.tasks = [task for task in self.tasks if task.id != task_id]
        if len(self.tasks) < initial_count:
            self.storage.save_tasks(self.tasks)
            return True
        return False

    def get_all_tasks(self):
        return self.tasks
