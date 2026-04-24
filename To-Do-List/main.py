import sys
from task_manager import TaskManager
from ui import UI

def main():
    manager = TaskManager()

    while True:
        choice = UI.show_menu()
        
        if choice == '1':
            tasks = manager.get_all_tasks()
            UI.display_tasks(tasks)
        elif choice == '2':
            title = UI.get_task_title()
            if title.strip():
                manager.add_task(title)
                UI.show_message("Task added successfully.")
            else:
                UI.show_message("Task title cannot be empty.")
        elif choice == '3':
            task_id = UI.get_task_id()
            if manager.complete_task(task_id):
                UI.show_message("Task marked as completed.")
            else:
                UI.show_message("Task not found.")
        elif choice == '4':
            task_id = UI.get_task_id()
            if manager.delete_task(task_id):
                UI.show_message("Task deleted successfully.")
            else:
                UI.show_message("Task not found.")
        elif choice == '5':
            UI.show_message("Goodbye!")
            sys.exit(0)
        else:
            UI.show_message("Invalid choice, please try again.")

if __name__ == "__main__":
    main()
