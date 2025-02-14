// I have just used a single big store why?
// When using multiple store it becomes difficult to update states in different stores with one function reactively.
// This store can be reduced by using immer for mutable state updates. (I did not do this to avoid potential misunderstanding between other project maintainers)

// In real application we will instantiate our store with props coming from server components.

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Column, Comment, Task, User } from "./types";
import { defaultColumns, defaultTasks, defaultUsers } from "./default";
import { createSelectors } from "./selector";

interface BoardActions {
  // tasks
  addTask: (task: Task) => void;
  deleteTask: (taskId: string, colId: string) => void;
  editTask: (task: Task) => void;
  addCommentToTask: (taskId: string, comment: Comment) => void;
  moveTask: ({
    activeTaskId,
    overId,
  }: {
    activeTaskId: string;
    overId: string;
  }) => void;

  //cols
  addCol: (col: Column) => void;
  deleteCol: (colId: string) => void;
  editColName: (colId: string, colName: string) => void;
}

interface BoardSelectors {
  getTaskById: (id: string) => Task;
  getColIdByTaskId: (id: string) => string;
}

export interface BoardStoreState extends BoardActions, BoardSelectors {
  tasks: Record<string, Task>;
  columns: Record<string, Column>;
  users: User[];
}

const useBoardStoreBase = create<BoardStoreState>()(
  persist(
    (set, get) => ({
      // for demonstration purpose
      tasks: defaultTasks,
      columns: defaultColumns,
      users: defaultUsers,

      addTask: (task) =>
        set((prev) => {
          const newTasks = { ...prev.tasks, [task.id]: task };

          // nested updates like this can be reduce by using immer
          const newCols: BoardStoreState["columns"] = {
            ...prev.columns,
            [task.columnId]: {
              ...prev.columns[task.columnId],
              taskIds: [...prev.columns[task.columnId].taskIds, task.id],
            },
          };

          return { tasks: newTasks, columns: newCols };
        }),

      deleteTask: (taskId, colId) =>
        set((prev) => {
          const newTasks = { ...prev.tasks };
          delete newTasks[taskId];

          const newCols: BoardStoreState["columns"] = {
            ...prev.columns,
            [colId]: {
              ...prev.columns[colId],
              taskIds: prev.columns[colId].taskIds.filter(
                (tId) => taskId !== tId
              ),
            },
          };

          return {
            tasks: newTasks,
            columns: newCols,
          };
        }),

      editTask: (task) =>
        set((prev) => {
          const newTasks = { ...prev.tasks, [task.id]: task };

          return { tasks: newTasks };
        }),

      addCommentToTask: (taskId, comment) =>
        set((prev) => {
          const newTasks: BoardStoreState["tasks"] = {
            ...prev.tasks,
            [taskId]: {
              ...prev.tasks[taskId],
              comments: [...prev.tasks[taskId].comments, comment],
            },
          };

          return {
            tasks: newTasks,
          };
        }),

      moveTask: ({ activeTaskId, overId }) =>
        // overId is either the column id (if column is empty) or the taskId(below the activeTask)
        set((prev) => {
          if (activeTaskId === overId) return {};
          const newTasks: BoardStoreState["tasks"] = { ...prev.tasks };
          const newCols: BoardStoreState["columns"] = { ...prev.columns };

          //   checking the type of overId
          const isOverAColumn = newCols[overId] === undefined;

          if (isOverAColumn) {
            const taskCount = newCols[overId].taskIds.length;
            if (taskCount === 0) {
              newTasks[activeTaskId].columnId = overId;
              newCols[overId].taskIds.push(activeTaskId);
              return { tasks: newTasks, columns: newCols };
            }
          }

          // if over is a task item
          const overTaskItemColumnId = newTasks[overId].columnId;
          const idxOfOverTaskItemInColumn = newCols[
            overTaskItemColumnId
          ].taskIds.findIndex((t) => t === overId);

          newTasks[activeTaskId].columnId = overTaskItemColumnId;
          newCols[overTaskItemColumnId].taskIds.splice(
            idxOfOverTaskItemInColumn,
            0,
            activeTaskId
          );

          return { tasks: newTasks, columns: newCols };
        }),

      getTaskById: (id) => get().tasks[id],

      //   columns

      addCol: (col) =>
        set((prev) => {
          const newCols = { ...prev.columns, [col.id]: col };
          return { columns: newCols };
        }),

      deleteCol: (colId) =>
        set((prev) => {
          const newCols = { ...prev.columns };
          const taskIds = newCols[colId].taskIds;

          const newTasks = Object.fromEntries(
            Object.entries(prev.tasks).filter(
              ([id, task]) => !taskIds.includes(id)
            )
          );

          delete newCols[colId];

          return { tasks: newTasks, columns: newCols };
        }),

      editColName: (colId, colName) =>
        set((prev) => {
          const newCols = {
            ...prev.columns,
            [colId]: { ...prev.columns[colId], title: colName },
          };
          return { columns: newCols };
        }),

      getColIdByTaskId: (id) => get().tasks[id].columnId,
    }),
    { version: 1, name: "board-store" }
  )
);

// zustand teams recommend this practice
export const useBoardStore = createSelectors(useBoardStoreBase);
