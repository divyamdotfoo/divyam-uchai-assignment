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
import { useEffect, useState } from "react";
import { Column } from "./column";
import { Task } from "./task";
import { Plus } from "lucide-react";
import { TaskView } from "./task-view";
import { BoardSkeleton } from "./board-skeleton";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { generateContainerColor } from "@/lib/utils";
import { nanoid } from "nanoid";

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

  // showing loading animation while the data is fetched from the localstorage
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  if (isLoading) {
    return <BoardSkeleton />;
  }
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
          <AddColumn />
        </div>
      </div>

      <DragOverlay>{activeId ? <Task taskId={activeId} /> : null}</DragOverlay>
      <TaskView />
    </DndContext>
  );
}

function AddColumn() {
  const [colName, setColName] = useState("");
  const addCol = useBoardStore.use.addCol();
  const handleClick = () => {
    if (!colName) return;
    addCol({
      title: colName,
      colors: generateContainerColor(),
      id: nanoid(10),
      taskIds: [],
    });
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className=" w-20 h-20 rounded-full bg-card flex items-center justify-center group">
          <Plus className=" w-16 h-16 group-hover:scale-105 transition-all cursor-pointer" />
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Column</DialogTitle>
          <DialogDescription>
            This will add a new column in the current board.
          </DialogDescription>
        </DialogHeader>
        <div className=" w-full">
          <Label>Column name</Label>
          <Input
            value={colName}
            onChange={(e) => setColName(e.target.value)}
            placeholder="Please enter column name"
          />
        </div>
        <DialogClose asChild>
          <button
            onClick={handleClick}
            className=" w-full bg-green-700 hover:bg-green-600 transition-all rounded-lg py-2 px-4 h-10 my-4"
          >
            Add Column
          </button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
