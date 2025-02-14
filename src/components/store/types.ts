export type Priority = "high" | "medium" | "low";

export interface Column {
  title: string;
  color: string;
  id: string;
  tasks: number;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  columnId: string;
  priority: Priority;
  assignee: User;
  attachments: Attachment[];
  comments: Comment[];
}

export interface User {
  name: string;
  avatar: string;
  id: string;
}

export interface Comment {
  text: string;
  id: string;
  by: User;
  taskId: string;
}

export interface Attachment {
  type: "file" | "video" | "image";
}
