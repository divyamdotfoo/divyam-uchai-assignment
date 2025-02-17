import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Ellipsis, Plus, Trash2 } from "lucide-react";
import { nanoid } from "nanoid";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import type { Column, Priority, Task as TaskType, User } from "@/store/types";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useBoardStore } from "@/store";
import Image from "next/image";
import { useState } from "react";
import { Task } from "./task";
import { formattedDate } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

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
                  <AddTask column={column} />
                  <DeleteThisCol id={column.id} />
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

function AddTask({ column }: { column: Column }) {
  const users = useBoardStore.use.users();
  const addTask = useBoardStore.use.addTask();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [assignee, setAssignee] = useState("");

  const handleCreateTask = () => {
    if (!title || !description || !priority || !assignee) {
      return;
    }

    const newTask: TaskType = {
      title,
      description,
      priority: priority as Priority,
      assignee: users.find((user) => user.name === assignee) as User,
      columnId: column.id,
      attachments: [],
      comments: [],
      createdAt: formattedDate(),
      id: nanoid(10),
    };

    addTask(newTask);
    // Reset inputs after task creation
    setTitle("");
    setDescription("");
    setPriority("");
    setAssignee("");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="w-7 h-7 flex items-center justify-center hover:bg-card rounded-md transition-all">
          <Plus size={20} />
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Tender Task</DialogTitle>
          <DialogDescription>
            Your task will be added to the{" "}
            <span className="font-semibold">{column.title}</span> column.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col w-full gap-4">
          <div className="w-full">
            <Label>Task Title</Label>
            <Input
              placeholder="Enter task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="w-full">
            <Label>Task Description</Label>
            <Input
              placeholder="Enter task description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between gap-5 w-full pt-4">
            <Select value={priority} onValueChange={setPriority}>
              <SelectTrigger className="basis-1/2 px-10">
                <SelectValue placeholder="Choose priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
            <Select value={assignee} onValueChange={setAssignee}>
              <SelectTrigger className="basis-1/2 px-10">
                <SelectValue placeholder="Choose Assignee" />
              </SelectTrigger>
              <SelectContent>
                {users.map((user) => (
                  <SelectItem key={user.name} value={user.name}>
                    <div className="w-full flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full overflow-hidden">
                        <Image
                          src={user.avatar}
                          alt="avatar"
                          width={100}
                          height={100}
                          className="w-full h-full object-cover rounded-full"
                        />
                      </div>
                      <p>{user.name}</p>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <DialogClose asChild>
            <button
              onClick={handleCreateTask}
              className="bg-green-700 text-white h-10 py-2 px-4 font-medium text-center rounded-lg my-4"
            >
              Create Task
            </button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function DeleteThisCol({ id }: { id: string }) {
  const delCol = useBoardStore.use.deleteCol();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="w-7 h-7 flex items-center justify-center hover:bg-card rounded-md transition-all">
          <Ellipsis size={20} />
        </button>
      </PopoverTrigger>
      <PopoverContent className=" w-fit bg-card p-0">
        <button
          onClick={() => delCol(id)}
          className=" flex items-center gap-2 bg-inherit hover:bg-black transition-all py-4 px-8 rounded-md"
        >
          <Trash2 size={20} />
          Delete
        </button>
      </PopoverContent>
    </Popover>
  );
}
