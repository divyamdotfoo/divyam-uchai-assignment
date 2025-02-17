"use client";

import { useBoardStore } from "@/store";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { useEffect, useState } from "react";
import { Task } from "@/store/types";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import Image from "next/image";
import { motion } from "motion/react";
export function TaskView() {
  const taskViewId = useBoardStore.use.taskView();
  const closeTaskView = useBoardStore.use.closeTaskView();
  const getTaskById = useBoardStore.use.getTaskById();
  const editTask = useBoardStore.use.editTask();
  const deleteTask = useBoardStore.use.deleteTask();
  const [editableTask, setEditableTask] = useState<Task | null>(null);

  const handleTitleChange = (z: string) =>
    setEditableTask((prev) => (prev ? { ...prev, title: z } : null));

  const handleDescriptionChange = (z: string) =>
    setEditableTask((prev) => (prev ? { ...prev, description: z } : null));

  useEffect(() => {
    if (taskViewId) {
      const task = getTaskById(taskViewId);
      setEditableTask(task);
    }
  }, [taskViewId]);

  if (!editableTask) return null;
  return (
    <Dialog
      open={!!taskViewId}
      onOpenChange={(e) => {
        if (!e) {
          closeTaskView();
          if (editableTask) {
            editTask(editableTask);
          }
        }
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
          <DialogDescription>
            Your changes will be saved automatically as you edit.
          </DialogDescription>
        </DialogHeader>
        <div className=" w-full flex flex-col gap-6">
          <div className=" w-full">
            <Label>Task Title</Label>
            <Input
              autoFocus={false}
              placeholder="Task title"
              value={editableTask.title}
              onChange={(e) => handleTitleChange(e.target.value)}
            />
          </div>
          <div className=" w-full">
            <Label>Task Description</Label>
            <Input
              autoFocus={true}
              placeholder="Task Description"
              value={editableTask.description}
              onChange={(e) => handleDescriptionChange(e.target.value)}
            />
          </div>
          <div className=" w-full flex items-center justify-between px-1">
            <p className=" text-sm font-medium">
              Date created: {editableTask.createdAt}
            </p>
            <div className=" flex items-center gap-2">
              <p className=" text-sm font-medium">Assigned to</p>
              <div className="w-5 h-5 rounded-full overflow-hidden">
                <Image
                  src={editableTask.assignee.avatar}
                  alt="avatar"
                  width={100}
                  height={100}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>
          </div>

          {editableTask.comments.length ? (
            <>
              <p className=" px-1">
                Comments{" "}
                <span className=" text-sm">{`(${editableTask.comments.length})`}</span>
              </p>
              <div className=" flex flex-col gap-4 items-start border-l mx-3">
                {editableTask.comments.map((comment) => (
                  <div
                    key={comment.id}
                    className=" flex items-start gap-3 -translate-x-[14px]"
                  >
                    <div className="w-7 h-7 rounded-full overflow-hidden">
                      <Image
                        src={comment.by.avatar}
                        alt="avatar"
                        width={100}
                        height={100}
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                    <div className=" tracking-tight">
                      <p className=" font-medium pb-1 tracking-tight">
                        {comment.by.name}
                      </p>
                      <p className=" text-sm">{comment.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p className=" mx-1">No comments yet</p>
          )}

          <motion.button
            onClick={() => {
              closeTaskView();
              deleteTask(editableTask.id, editableTask.columnId);
            }}
            whileHover={{ scale: 1.008 }}
            whileTap={{ scale: 0.998 }}
            className=" bg-red-700 rounded-md hover:bg-red-600 transition-all text-white h-10 px-4 py-2"
          >
            Delete task
          </motion.button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
