class UI:
    @staticmethod
    def show_menu():
        print("\n--- ToDo Application ---")
        print("1. View all tasks")
        print("2. Add a task")
        print("3. Complete a task")
        print("4. Delete a task")
        print("5. Exit")
        return input("Choose an option: ")

    @staticmethod
    def display_tasks(tasks):
        print("\n--- Your Tasks ---")
        if not tasks:
            print("No tasks found.")
            return
        for task in tasks:
            status = "[X]" if task.completed else "[ ]"
            print(f"{task.id}. {status} {task.title}")

    @staticmethod
    def get_task_title():
        return input("Enter task title: ")

    @staticmethod
    def get_task_id():
        try:
            return int(input("Enter task ID: "))
        except ValueError:
            print("Invalid ID.")
            return -1

    @staticmethod
    def show_message(msg):
        print(msg)
