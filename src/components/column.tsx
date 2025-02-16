import { type Column } from "@/store/types";
import { useDroppable } from "@dnd-kit/core";
import { Task } from "./task";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Ellipsis, Plus } from "lucide-react";

export function Column({ column }: { column: Column }) {
  const { setNodeRef } = useDroppable({ id: column.id });
  return (
    <SortableContext
      id={column.id}
      items={column.taskIds}
      strategy={verticalListSortingStrategy}
    >
      <div
        className="relative h-full w-[350px] shrink-0 bg-black rounded-md"
        suppressHydrationWarning
      >
        <div
          ref={setNodeRef}
          className="h-full w-full overflow-y-auto"
          style={{
            maskImage:
              "linear-gradient(to bottom, transparent 0%, black 16px, black calc(100% - 16px), transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, black 16px, black calc(100% - 16px), transparent 100%)",
          }}
        >
          <div className=" p-4">
            <div className="flex flex-col gap-4">
              <div className="w-full flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span
                    suppressHydrationWarning
                    className="w-2 h-2 rounded-full"
                    style={{
                      backgroundColor: column.colors.bg,
                    }}
                  ></span>
                  <p className="text-xl font-medium">{column.title}</p>
                  <p
                    suppressHydrationWarning
                    className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-medium"
                    style={{
                      backgroundColor: column.colors.bg,
                      color: column.colors.text,
                    }}
                  >
                    {column.taskIds.length}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button className="w-7 h-7 flex items-center justify-center hover:bg-card rounded-md transition-all">
                    <Plus size={20} />
                  </button>
                  <button className="w-7 h-7 flex items-center justify-center hover:bg-card rounded-md transition-all">
                    <Ellipsis size={20} />
                  </button>
                </div>
              </div>

              {column.taskIds.map((taskId) => (
                <Task key={taskId} taskId={taskId} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </SortableContext>
  );
}
