"use client";
import { CSS } from "@dnd-kit/utilities";
import { Calendar, MessageSquare, Paperclip } from "lucide-react";
import Image from "next/image";
import { Separator } from "./ui/separator";
import { useBoardStore } from "@/store";
import { useSortable } from "@dnd-kit/sortable";
import { motion } from "motion/react";
export function Task({ taskId }: { taskId: string }) {
  const { setNodeRef, listeners, attributes, transform, transition, isOver } =
    useSortable({
      id: taskId,
    });
  const getTaskById = useBoardStore.use.getTaskById();
  const task = getTaskById(taskId);
  return (
    <motion.div
      animate={{
        rotateZ: isOver ? "-5deg" : "0deg",
        boxShadow: isOver
          ? "0 1rem 3rem rgba(0,0,0,0.2)"
          : "0 0.5rem 1rem rgba(0,0,0,0.1)",
        scale: isOver ? 1.05 : 1,
      }}
      suppressHydrationWarning
      className=" rounded-md bg-card"
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
    >
      <div className="flex flex-col items-start gap-3 py-3 px-4">
        <div>
          <p className="font-medium text-lg">{task.title}</p>
          <p className="text-xs tracking-wide">{task.description}</p>
        </div>
        <div className="flex items-center justify-between w-full">
          <p className="text-xs font-semibold">Assignee</p>
          <div className="w-5 h-5 rounded-full overflow-hidden">
            <Image
              src={task.assignee.avatar}
              alt="avatar"
              width={100}
              height={100}
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>

        <div className="flex justify-between w-full pt-2">
          <p className="flex items-center gap-1">
            <Calendar size={12} />
            <span className="text-xs font-semibold opacity-80">
              {task.createdAt}
            </span>
          </p>
          <p
            className="px-2 py-[1px] text-xs rounded-sm font-semibold text-opacity-80"
            style={{
              backgroundColor: `var(--priority-${task.priority})`,
            }}
          >
            {task.priority}
          </p>
        </div>
      </div>

      <Separator className="w-full bg-borderCard" />

      <div className="px-4 pt-2 pb-4 flex items-center gap-3 text-xs">
        <p className="flex items-center gap-1">
          <span>
            <MessageSquare size={12} />
          </span>
          <span>{task.comments.length}</span>
          <span>Comments</span>
        </p>
        <p className="flex items-center gap-1">
          <span>
            <Paperclip size={12} />
          </span>
          <span>{task.attachments.length}</span>
          <span>Attachments</span>
        </p>
      </div>
    </motion.div>
  );
}
