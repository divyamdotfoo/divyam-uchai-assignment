import { create } from "zustand";
import { Column } from "./types";
import { persist } from "zustand/middleware";

interface ColumnActions {
  addCol: (col: Column) => void;
  deleteCol: (colId: string) => void;
  editCol: (col: Column) => void;
}

interface ColumnState extends ColumnActions {
  cols: Column[];
}

export const useColumn = create<ColumnState>()(
  persist(
    (set, get) => ({
      cols: [],

      addCol: (col) => set((prev) => ({ cols: [...prev.cols, col] })),

      deleteCol: (colId) =>
        set((prev) => ({ cols: prev.cols.filter((col) => col.id !== colId) })),

      editCol: (col) =>
        set((prev) => {
          const colIdx = prev.cols.findIndex((column) => column.id === col.id);
          if (colIdx === -1) return prev;
          const updatedCols = [...prev.cols];
          updatedCols[colIdx] = col;
          return {
            cols: updatedCols,
          };
        }),
    }),
    {
      name: "column-store",
      version: 1,
    }
  )
);
