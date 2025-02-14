import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Comment, Task } from "./types";

interface TaskActions {
  addTask: (task: Task) => void;
  deleteTask: (taskId: string) => void;
  changeColumn: (taskId: string, columnId: string) => void;
  editTask: (task: Task) => void;
  deleteTasksByCol: (columnId: string) => void;
  addComment: (taskId: string, comment: Comment) => void;
}

interface TaskSelectors {
  filterTaskByCol: (columnId: string) => Task[];
  getTaskById: (taskId: string) => Task | undefined;
}

interface TaskState extends TaskActions, TaskSelectors {
  tasks: Task[];
  isLoading: boolean;
}

export const useTask = create<TaskState>()(
  persist(
    (set, get) => ({
      tasks: [],
      isLoading: false,

      addTask: (task) => set((prev) => ({ tasks: [...prev.tasks, task] })),

      deleteTask: (taskId) =>
        set((prev) => ({
          tasks: prev.tasks.filter((task) => task.id !== taskId),
        })),

      changeColumn: (taskId, columnId) =>
        set((prev) => {
          const taskIndex = prev.tasks.findIndex((task) => task.id === taskId);
          if (taskIndex === -1) return prev;
          const updatedTasks = [...prev.tasks];

          updatedTasks[taskIndex] = {
            ...updatedTasks[taskIndex],
            columnId,
          };

          return { tasks: updatedTasks };
        }),

      editTask: (updatedTask) =>
        set((prev) => {
          const taskIndex = prev.tasks.findIndex(
            (task) => task.id === updatedTask.id
          );
          if (taskIndex === -1) return prev;

          const updatedTasks = [...prev.tasks];
          updatedTasks[taskIndex] = updatedTask;

          return { tasks: updatedTasks };
        }),

      addComment: (taskId, comment) =>
        set((prev) => {
          const taskIndex = prev.tasks.findIndex((task) => task.id === taskId);
          if (taskIndex === -1) return prev;

          const updatedTasks = [...prev.tasks];

          updatedTasks[taskIndex].comments.push(comment);

          return { tasks: updatedTasks };
        }),

      deleteTasksByCol: (colId) =>
        set((prev) => ({
          tasks: prev.tasks.filter((task) => task.columnId !== colId),
        })),

      filterTaskByCol: (columnId) =>
        get().tasks.filter((task) => task.columnId === columnId),

      getTaskById: (taskId) => get().tasks.find((task) => task.id === taskId),
    }),
    {
      name: "task-store",
      version: 1,
    }
  )
);
