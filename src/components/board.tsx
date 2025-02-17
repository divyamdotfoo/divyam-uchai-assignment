"use client";

import { useBoardStore } from "@/store";
import {
  DndContext,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  rectIntersection,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { useState } from "react";
import { Column } from "./column";
import { Task } from "./task";
import { Plus } from "lucide-react";
import { TaskView } from "./task-view";

export function Board() {
  const columns = useBoardStore.use.columns();
  const moveTask = useBoardStore.use.moveTask();
  const [activeId, setActiveId] = useState<string | null>(null);

  const handleDragStart = (ev: DragStartEvent) => {
    setActiveId(ev.active.id as string);
  };

  // fires when a draggable element comes over a droppable element
  const handleDragEnd = (ev: DragOverEvent) => {
    const { active, over } = ev;
    if (!over || !active) return;
    moveTask(active.id as string, over.id as string);
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 0.01,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      sensors={sensors}
      collisionDetection={rectIntersection}
    >
      <div className="pt-6 overflow-x-auto overflow-y-hidden flex items-stretch gap-6 h-full w-full">
        {Object.values(columns).map((col) => (
          <Column column={col} key={col.id} />
        ))}
        <div className="h-full rounded-md p-4 w-[320px] shrink-0 bg-black flex items-center justify-center">
          <div className=" w-20 h-20 rounded-full bg-card flex items-center justify-center group">
            <Plus className=" w-16 h-16 group-hover:scale-105 transition-all cursor-pointer" />
          </div>
        </div>
      </div>

      <DragOverlay>{activeId ? <Task taskId={activeId} /> : null}</DragOverlay>
      <TaskView />
    </DndContext>
  );
}
